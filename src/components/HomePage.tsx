import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const HomePage = () => {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    overflow: 'hidden',
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '750px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    animation: 'fadeIn 0.6s ease-out',
  };

  const heroStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: 800,
    background: 'var(--primary-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1rem',
    lineHeight: 1.1,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    lineHeight: 1.6,
    maxWidth: '650px',
  };

  const featuresContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    width: '100%',
  };

  const featureItemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '1.5rem',
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    transition: 'all var(--transition-base)',
    textAlign: 'left',
  };

  const featureIconStyle: React.CSSProperties = {
    fontSize: '2rem',
  };

  const featureTitleStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  };

  const featureDescStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--text-tertiary)',
    lineHeight: 1.5,
  };

  const ctaContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    width: '100%',
  };

  const signInButtonStyle: React.CSSProperties = {
    background: 'var(--primary-gradient)',
    color: 'white',
    border: 'none',
    padding: '1.25rem 3rem',
    fontSize: '1.25rem',
    fontWeight: 700,
    borderRadius: 'var(--radius-lg)',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.75rem',
    boxShadow: '0 10px 40px -10px rgba(102, 126, 234, 0.4)',
    transition: 'all var(--transition-base)',
    opacity: isLoading ? 0.7 : 1,
  };

  const googleIconStyle: React.CSSProperties = {
    fontSize: '1.75rem',
  };

  const noteStyle: React.CSSProperties = {
    fontSize: '0.9rem',
    color: 'var(--text-tertiary)',
    fontWeight: 500,
  };

  const errorStyle: React.CSSProperties = {
    padding: '1rem',
    background: 'rgba(245, 101, 101, 0.1)',
    border: '1px solid var(--error-color)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--error-color)',
    marginBottom: '1rem',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={heroStyle}>
          <h1 style={titleStyle}>Resume Helper</h1>
          <p style={subtitleStyle}>
            Upload your resume and job description to get AI-powered suggestions
          </p>
        </div>

        <div style={featuresContainerStyle}>
          <div
            style={featureItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>🎯</div>
            <div style={featureTitleStyle}>Smart Analysis</div>
            <div style={featureDescStyle}>
              AI analyzes your resume against job requirements to identify gaps and opportunities
            </div>
          </div>

          <div
            style={featureItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>🔑</div>
            <div style={featureTitleStyle}>Keyword Optimization</div>
            <div style={featureDescStyle}>
              Get specific keywords and phrases to include that match what recruiters are looking for
            </div>
          </div>

          <div
            style={featureItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={featureIconStyle}>⚡</div>
            <div style={featureTitleStyle}>Instant Results</div>
            <div style={featureDescStyle}>
              Receive tailored suggestions in seconds to help you stand out from other applicants
            </div>
          </div>
        </div>

        <div style={ctaContainerStyle}>
          {error && <div style={errorStyle}>{error}</div>}

          <button
            onClick={handleSignIn}
            disabled={isLoading}
            style={signInButtonStyle}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 50px -15px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 40px -10px rgba(102, 126, 234, 0.4)';
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={googleIconStyle}
            >
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>

          <p style={noteStyle}>
            Free to use • No credit card required
          </p>
        </div>
      </div>
    </div>
  );
};
