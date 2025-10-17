import type { JobDescription, TailoredResume } from '../types/index';

/**
 * Service to handle resume tailoring using AI
 * This uses the Anthropic Claude API to analyze resumes and job descriptions
 */
class ResumeService {
  private proxyUrl = 'http://localhost:3001/api/tailor-resume';

  constructor() {
    // API key is now handled by the backend proxy
  }

  /**
   * Extract text from resume image using OCR (placeholder for actual OCR implementation)
   * In production, you would use a service like Google Vision API, AWS Textract, or Tesseract.js
   */
  private async extractTextFromImage(imageFile: File): Promise<string> {
    // For now, we'll simulate OCR by returning a placeholder
    // In production, implement actual OCR here
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // This is a placeholder - in production, send the image to an OCR service
        resolve('Resume text extracted from image (OCR placeholder)');
      };
      reader.readAsDataURL(imageFile);
    });
  }

  /**
   * Convert file to base64 for API transmission
   */
  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data:...;base64, prefix
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  /**
   * Tailor resume based on job description using Claude AI
   */
  async tailorResume(
    resumeFile: File,
    jobDescription: JobDescription
  ): Promise<TailoredResume> {
    try {
      // Convert file to base64
      const fileBase64 = await this.fileToBase64(resumeFile);
      const mediaType = resumeFile.type as
        | 'image/jpeg'
        | 'image/png'
        | 'image/gif'
        | 'image/webp';

      // Prepare the prompt for Claude
      const prompt = `Analyze this resume image and the job description below. Provide specific, actionable suggestions to tailor the resume for this job.

Job Title: ${jobDescription.title}
Company: ${jobDescription.company}
Job Description: ${jobDescription.description}
Requirements: ${jobDescription.requirements}

Please provide:
1. Specific suggestions for how to modify the resume to better match this job
2. Keywords from the job description that should be incorporated
3. Skills that should be highlighted or emphasized
4. A revised summary or objective statement that aligns with this position

Format your response as JSON with the following structure:
{
  "suggestions": ["suggestion 1", "suggestion 2", ...],
  "keywordsToAdd": ["keyword1", "keyword2", ...],
  "skillsToHighlight": ["skill1", "skill2", ...],
  "updatedContent": "A detailed explanation of how to restructure the resume content"
}`;

      // Send request to our proxy server instead of directly to Anthropic
      const response = await fetch(this.proxyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileBase64,
          mediaType,
          prompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `API request failed: ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      const content = data.content[0].text;

      // Try to parse JSON from the response
      let parsedResult: TailoredResume;
      try {
        // Clean up the JSON string - remove control characters
        let cleanedContent = content
          .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
          .trim();

        // Try to extract JSON if it's wrapped in text
        const jsonMatch = cleanedContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          cleanedContent = jsonMatch[0];
        }

        parsedResult = JSON.parse(cleanedContent);
        console.log('✅ Successfully parsed JSON');

        // Ensure all arrays exist
        parsedResult.suggestions = parsedResult.suggestions || [];
        parsedResult.keywordsToAdd = parsedResult.keywordsToAdd || [];
        parsedResult.skillsToHighlight = parsedResult.skillsToHighlight || [];
        parsedResult.updatedContent = parsedResult.updatedContent || '';
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        console.log('Attempting fallback parsing...');

        // Try to extract useful information from unstructured text
        const lines = content.split('\n').filter((line) => line.trim());
        const suggestions: string[] = [];
        const keywords: string[] = [];
        const skills: string[] = [];

        // Simple heuristic parsing
        let inSuggestions = false;
        let inKeywords = false;
        let inSkills = false;

        for (const line of lines) {
          const lowerLine = line.toLowerCase();

          if (
            lowerLine.includes('suggestion') ||
            lowerLine.includes('recommend')
          ) {
            inSuggestions = true;
            inKeywords = false;
            inSkills = false;
            continue;
          } else if (lowerLine.includes('keyword')) {
            inSuggestions = false;
            inKeywords = true;
            inSkills = false;
            continue;
          } else if (lowerLine.includes('skill')) {
            inSuggestions = false;
            inKeywords = false;
            inSkills = true;
            continue;
          }

          if (
            line.trim().startsWith('-') ||
            line.trim().startsWith('•') ||
            /^\d+\./.test(line.trim())
          ) {
            const cleaned = line.replace(/^[-•\d.]+\s*/, '').trim();
            if (cleaned) {
              if (inSuggestions) suggestions.push(cleaned);
              else if (inKeywords) keywords.push(cleaned);
              else if (inSkills) skills.push(cleaned);
            }
          }
        }

        parsedResult = {
          suggestions:
            suggestions.length > 0
              ? suggestions
              : ['See detailed recommendations below'],
          keywordsToAdd: keywords,
          skillsToHighlight: skills,
          updatedContent: content,
        };
      }

      return parsedResult;
    } catch (error) {
      console.error('Error tailoring resume:', error);
      throw error;
    }
  }

  /**
   * Validate if the proxy server is configured
   */
  isConfigured(): boolean {
    return true; // API key is validated on the backend
  }
}

export const resumeService = new ResumeService();
