# Resume Helper

An AI-powered application that helps you tailor your resume to specific job opportunities. Upload an image of your resume and provide a job description, and the app will use Claude AI to analyze and provide customized suggestions.

## Features

- Upload resume as an image (JPEG, PNG, GIF, WebP)
- Input job description details (title, company, description, requirements)
- AI-powered resume analysis using Anthropic's Claude
- Get specific suggestions for tailoring your resume
- Identify keywords to incorporate
- Highlight skills that match the job
- Receive detailed recommendations for restructuring content

## Project Structure

```
src/
├── components/          # React components
│   ├── ResumeUpload.tsx        # Resume image upload component
│   ├── JobDescriptionForm.tsx  # Job description form
│   └── ResultsDisplay.tsx      # Display tailored results
├── services/           # Business logic and API calls
│   └── resumeService.ts        # AI service for resume tailoring
├── types/              # TypeScript type definitions
│   └── index.ts                # Shared interfaces and types
├── hooks/              # Custom React hooks (for future use)
├── utils/              # Utility functions (for future use)
├── App.tsx             # Main application component
├── App.css             # Application styles
└── main.tsx            # Application entry point
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- An Anthropic API key ([Get one here](https://console.anthropic.com/))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Add your Anthropic API key to the `.env` file:
```
VITE_ANTHROPIC_API_KEY=your_actual_api_key_here
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

1. **Upload Resume**: Drag and drop or click to upload an image of your resume
2. **Fill Job Details**: Enter the job title, company name, description, and requirements
3. **Submit**: Click "Tailor Resume" to analyze
4. **Review Results**: View AI-generated suggestions, keywords, and recommendations
5. **Start Over**: Click "Start Over" to analyze another resume or job

## Technology Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Anthropic Claude API**: AI-powered analysis
- **CSS3**: Styling

## Best Practices Implemented

- **Component Modularity**: Each component has a single responsibility
- **Type Safety**: Comprehensive TypeScript interfaces
- **Service Layer**: Separated business logic from UI components
- **Error Handling**: Graceful error management throughout the app
- **Loading States**: User feedback during async operations
- **Responsive Design**: Mobile-friendly layout
- **Code Organization**: Clear folder structure for scalability

## Future Enhancements

- Add OCR integration for better text extraction from resume images
- Support PDF resume uploads
- Export tailored resume suggestions as PDF or Word document
- Save and compare multiple versions
- Browser extension for quick analysis
- Support for multiple languages
- Resume templates and formatting suggestions

## API Usage Note

This application uses the Anthropic Claude API which requires an API key and has associated costs. Please review Anthropic's pricing at [https://www.anthropic.com/pricing](https://www.anthropic.com/pricing).

## Security Note

Never commit your `.env` file with actual API keys to version control. The `.env` file is included in `.gitignore` to prevent accidental commits.

## License

MIT
