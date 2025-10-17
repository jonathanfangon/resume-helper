import { useState } from 'react';
import { StepIndicator } from './components/StepIndicator';
import { ResumeUpload } from './components/ResumeUpload';
import { JobDescriptionForm } from './components/JobDescriptionForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { ThemeToggle } from './components/ThemeToggle';
import { HomePage } from './components/HomePage';
import { UserProfile } from './components/UserProfile';
import { useAuth } from './hooks/useAuth';
import type { ResumeData, JobDescription, TailoredResume } from './types/index';
import { resumeService } from './services/resumeService';
import './App.css';

function App() {
  const { user, loading } = useAuth();
  const [resume, setResume] = useState<ResumeData>({
    imageFile: null,
    imagePreview: null,
  });

  const [jobDescription, setJobDescription] = useState<JobDescription>({
    title: '',
    company: '',
    description: '',
    requirements: '',
  });

  const [tailoredResume, setTailoredResume] = useState<TailoredResume | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleResumeUpload = (resumeData: ResumeData) => {
    setResume(resumeData);
    setError(null);
    setCurrentStep(2);
  };

  const handleJobDescriptionSubmit = async (jobDesc: JobDescription) => {
    if (!resume.imageFile) {
      setError('Please upload your resume first');
      return;
    }

    setJobDescription(jobDesc);
    setIsLoading(true);
    setError(null);
    setLoadingProgress(0);

    try {
      // Check if API key is configured
      if (!resumeService.isConfigured()) {
        throw new Error(
          'Anthropic API key not configured. Please create a .env file with VITE_ANTHROPIC_API_KEY'
        );
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const result = await resumeService.tailorResume(
        resume.imageFile,
        jobDesc
      );

      clearInterval(progressInterval);
      setLoadingProgress(100);

      setTimeout(() => {
        setTailoredResume(result);
        setCurrentStep(3);
      }, 300);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setCurrentStep(2);
      console.error('Error processing resume:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setResume({ imageFile: null, imagePreview: null });
    setJobDescription({
      title: '',
      company: '',
      description: '',
      requirements: '',
    });
    setTailoredResume(null);
    setError(null);
    setCurrentStep(1);
    setLoadingProgress(0);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className='loading-spinner-container'>
          <div className='loading-spinner-glow'></div>
          <div className='loading-spinner'></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <ThemeToggle />
        <HomePage />
      </>
    );
  }

  return (
    <div className='app-container'>
      <ThemeToggle />
      <UserProfile />
      <header className='app-header'>
        <h1>✨ Resume Helper</h1>
        <p>Tailor your resume for specific job opportunities using AI</p>
      </header>

      <StepIndicator currentStep={currentStep} />

      <main className='app-main'>
        {error && (
          <div className='error-message'>
            <strong>Error:</strong> {error}
          </div>
        )}

        {!tailoredResume ? (
          <>
            <ResumeUpload
              onUpload={handleResumeUpload}
              currentResume={resume}
            />

            {resume.imageFile && (
              <JobDescriptionForm
                onSubmit={handleJobDescriptionSubmit}
                initialData={jobDescription}
                isLoading={isLoading}
              />
            )}

            {isLoading && (
              <div className='loading-container'>
                <div className='loading-spinner-container'>
                  <div className='loading-spinner-glow'></div>
                  <div className='loading-spinner'></div>
                </div>
                <p>
                  Analyzing your resume and tailoring it to the job
                  description...
                </p>
                <div className='loading-progress'>
                  <div className='loading-progress-bar'>
                    <div
                      className='loading-progress-fill'
                      style={{ width: `${loadingProgress}%` }}
                    />
                    <div className='loading-progress-shimmer' />
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <ResultsDisplay
            results={tailoredResume}
            onStartOver={handleStartOver}
          />
        )}
      </main>

      <footer className='app-footer'>
        <p>Made by Jonathan Fangon | Made with ❤️ for job seekers</p>
      </footer>
    </div>
  );
}

export default App;
