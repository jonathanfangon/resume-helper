import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.VITE_ANTHROPIC_API_KEY;

// Validate configuration on startup
if (!API_KEY) {
  console.error('❌ ERROR: VITE_ANTHROPIC_API_KEY not found in .env file');
  console.error('Please create a .env file with your Anthropic API key');
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    apiKeyConfigured: !!API_KEY
  });
});

// Proxy endpoint for Anthropic API
app.post('/api/tailor-resume', async (req, res) => {
  try {
    const { fileBase64, mediaType, prompt } = req.body;

    // Validate request body
    if (!fileBase64 || !mediaType || !prompt) {
      console.error('❌ Missing required fields in request');
      return res.status(400).json({
        error: 'Missing required fields: fileBase64, mediaType, or prompt',
      });
    }

    console.log('📤 Making request to Anthropic API...');
    console.log(`   Media Type: ${mediaType}`);
    console.log(`   Prompt Length: ${prompt.length} characters`);
    console.log(`   Image Size: ${fileBase64.length} bytes (base64)`);
    console.log(`   First 50 chars of base64: ${fileBase64.substring(0, 50)}`);

    // Validate media type - Claude API only supports JPEG, PNG, GIF
    const validMediaTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validMediaTypes.includes(mediaType)) {
      console.error(`❌ Invalid media type: ${mediaType}`);
      return res.status(400).json({
        error: `Unsupported media type: ${mediaType}. Claude API only supports: JPEG, PNG, GIF`
      });
    }

    // Check if base64 data looks valid
    if (!fileBase64 || fileBase64.length < 100) {
      console.error(`❌ Base64 data seems invalid or too small`);
      return res.status(400).json({
        error: 'Image data appears to be invalid or corrupted'
      });
    }

    // Make request to Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: fileBase64,
                },
              },
              {
                type: 'text',
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    console.log(`📥 Anthropic API response status: ${response.status}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Anthropic API error:', errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || 'API request failed',
        details: errorData
      });
    }

    const data = await response.json();
    console.log('✅ Successfully received response from Anthropic API');
    res.json(data);
  } catch (error) {
    console.error('❌ Error in proxy:', error.message);
    console.error(error.stack);
    res.status(500).json({
      error: error.message || 'Internal server error',
    });
  }
});

// 404 handler
app.use((req, res) => {
  console.warn(`⚠️  404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const server = app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════════════════');
  console.log('  🚀 Resume Helper Backend Server');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  ✓ Server running on http://localhost:${PORT}`);
  console.log(`  ✓ API Key configured: Yes`);
  console.log(`  ✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('═══════════════════════════════════════════════════');
  console.log('');
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n⚠️  Received ${signal}, shutting down gracefully...`);
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('❌ Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
