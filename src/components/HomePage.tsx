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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center',
    animation: 'fadeIn 0.6s ease-out',
  };

  const heroStyle: React.CSSProperties = {
    marginBottom: '4rem',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '4rem',
    fontWeight: 800,
    background: 'var(--primary-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1.5rem',
    lineHeight: 1.2,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    color: 'var(--text-secondary)',
    marginBottom: '3rem',
    fontWeight: 500,
    lineHeight: 1.6,
  };

  const featuresContainerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  };

  const featureCardStyle: React.CSSProperties = {
    background: 'var(--bg-primary)',
    padding: '2rem',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-md)',
    transition: 'all var(--transition-base)',
  };

  const featureIconStyle: React.CSSProperties = {
    fontSize: '3rem',
    marginBottom: '1rem',
  };

  const featureTitleStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: '0.75rem',
  };

  const featureDescStyle: React.CSSProperties = {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.6,
  };

  const ctaContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  };

  const signInButtonStyle: React.CSSProperties = {
    background: 'white',
    color: '#1a202c',
    border: '2px solid var(--border-color)',
    padding: '1rem 3rem',
    fontSize: '1.125rem',
    fontWeight: 600,
    borderRadius: 'var(--radius-md)',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: 'var(--shadow-lg)',
    transition: 'all var(--transition-base)',
    opacity: isLoading ? 0.7 : 1,
  };

  const googleIconStyle: React.CSSProperties = {
    fontSize: '1.5rem',
  };

  const noteStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--text-tertiary)',
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
            Tailor your resume for specific job opportunities using AI-powered analysis
          </p>
        </div>

        <div style={featuresContainerStyle}>
          <div
            style={featureCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div style={featureIconStyle}>🎯</div>
            <h3 style={featureTitleStyle}>Smart Analysis</h3>
            <p style={featureDescStyle}>
              AI-powered analysis of your resume and job descriptions to identify key improvements
            </p>
          </div>

          <div
            style={featureCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div style={featureIconStyle}>🔑</div>
            <h3 style={featureTitleStyle}>Keyword Optimization</h3>
            <p style={featureDescStyle}>
              Get suggestions for relevant keywords and skills to include based on job requirements
            </p>
          </div>

          <div
            style={featureCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
          >
            <div style={featureIconStyle}>⚡</div>
            <h3 style={featureTitleStyle}>Instant Results</h3>
            <p style={featureDescStyle}>
              Receive tailored suggestions and recommendations in seconds, not hours
            </p>
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
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            }}
          >
            <span style={googleIconStyle}>🔐</span>
            <span>{isLoading ? 'Signing in...' : 'Sign in with Google'}</span>
          </button>

          <p style={noteStyle}>
            Sign in to start tailoring your resume for your dream job
          </p>
        </div>
      </div>
    </div>
  );
};
