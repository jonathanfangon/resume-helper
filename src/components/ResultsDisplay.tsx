import { useEffect } from 'react';
import type { TailoredResume } from '../types/index';

interface ResultsDisplayProps {
  results: TailoredResume;
  onStartOver: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  results,
  onStartOver,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const containerStyle: React.CSSProperties = {
    marginTop: '2rem',
    animation: 'fadeIn 0.6s ease-out',
  };

  const headerContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
    animation: 'slideUp 0.5s ease-out',
  };

  const titleStyle: React.CSSProperties = {
    margin: '0',
    fontSize: '2rem',
    fontWeight: 800,
    background: 'var(--primary-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const startOverButtonStyle: React.CSSProperties = {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    background: 'var(--bg-tertiary)',
    color: 'var(--text-primary)',
    border: '2px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all var(--transition-base)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
    padding: '2rem',
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-md)',
    transition: 'all var(--transition-base)',
    animation: 'slideUp 0.5s ease-out',
  };

  const sectionHeaderStyle: React.CSSProperties = {
    marginTop: '0',
    marginBottom: '1.25rem',
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const listStyle: React.CSSProperties = {
    paddingLeft: '0',
    margin: '0',
    listStyle: 'none',
  };

  const listItemStyle: React.CSSProperties = {
    marginBottom: '1rem',
    padding: '1rem 1.25rem',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-md)',
    lineHeight: '1.7',
    color: 'var(--text-primary)',
    borderLeft: '4px solid var(--primary-color)',
    transition: 'all var(--transition-base)',
    position: 'relative',
    paddingLeft: '3rem',
  };

  const listItemIconStyle: React.CSSProperties = {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1.25rem',
  };

  const tagContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  };

  const keywordTagStyle: React.CSSProperties = {
    padding: '0.625rem 1.25rem',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(102, 126, 234, 0.15))',
    color: 'var(--primary-color)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.95rem',
    fontWeight: 600,
    border: '2px solid rgba(102, 126, 234, 0.2)',
    transition: 'all var(--transition-base)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    animation: 'scaleIn 0.3s ease-out',
  };

  const skillTagStyle: React.CSSProperties = {
    padding: '0.625rem 1.25rem',
    background: 'linear-gradient(135deg, rgba(72, 187, 120, 0.1), rgba(72, 187, 120, 0.15))',
    color: 'var(--success-color)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.95rem',
    fontWeight: 600,
    border: '2px solid rgba(72, 187, 120, 0.2)',
    transition: 'all var(--transition-base)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    animation: 'scaleIn 0.3s ease-out',
  };

  const contentBoxStyle: React.CSSProperties = {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.9',
    color: 'var(--text-primary)',
    padding: '1.5rem',
    background: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
  };

  const noteBoxStyle: React.CSSProperties = {
    marginTop: '2rem',
    padding: '1.5rem',
    background: 'linear-gradient(135deg, rgba(237, 137, 54, 0.1), rgba(237, 137, 54, 0.05))',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid rgba(237, 137, 54, 0.3)',
    color: 'var(--text-primary)',
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
    animation: 'slideUp 0.6s ease-out 0.2s both',
  };

  const noteIconStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    flexShrink: 0,
  };

  const noteTextStyle: React.CSSProperties = {
    lineHeight: '1.6',
    fontSize: '0.95rem',
  };

  return (
    <div style={containerStyle}>
      <div style={headerContainerStyle}>
        <h2 style={titleStyle}>✨ Your Tailored Resume Suggestions</h2>
        <button
          onClick={onStartOver}
          style={startOverButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            e.currentTarget.style.borderColor = 'var(--primary-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          <span>🔄</span>
          <span>Start Over</span>
        </button>
      </div>

      {results.suggestions && results.suggestions.length > 0 && (
        <div
          style={sectionStyle}
          className="card"
        >
          <h3 style={sectionHeaderStyle}>
            <span>💡</span>
            <span>Key Suggestions</span>
          </h3>
          <ul style={listStyle}>
            {results.suggestions.map((suggestion, index) => (
              <li
                key={index}
                style={{
                  ...listItemStyle,
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={listItemIconStyle}>▸</span>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.keywordsToAdd && results.keywordsToAdd.length > 0 && (
        <div
          style={sectionStyle}
          className="card"
        >
          <h3 style={sectionHeaderStyle}>
            <span>🔑</span>
            <span>Keywords to Incorporate</span>
          </h3>
          <div style={tagContainerStyle}>
            {results.keywordsToAdd.map((keyword, index) => (
              <span
                key={index}
                style={{
                  ...keywordTagStyle,
                  animationDelay: `${index * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>#</span>
                <span>{keyword}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {results.skillsToHighlight && results.skillsToHighlight.length > 0 && (
        <div
          style={sectionStyle}
          className="card"
        >
          <h3 style={sectionHeaderStyle}>
            <span>⭐</span>
            <span>Skills to Highlight</span>
          </h3>
          <div style={tagContainerStyle}>
            {results.skillsToHighlight.map((skill, index) => (
              <span
                key={index}
                style={{
                  ...skillTagStyle,
                  animationDelay: `${index * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>✓</span>
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {results.updatedContent && (
        <div
          style={sectionStyle}
          className="card"
        >
          <h3 style={sectionHeaderStyle}>
            <span>📝</span>
            <span>Detailed Recommendations</span>
          </h3>
          <div style={contentBoxStyle}>
            {results.updatedContent}
          </div>
        </div>
      )}

      <div style={noteBoxStyle}>
        <div style={noteIconStyle}>💭</div>
        <div style={noteTextStyle}>
          <strong>Note:</strong> These are AI-generated suggestions. Please review
          and adapt them to accurately represent your experience and skills. Use these
          recommendations as a guide to enhance your resume while maintaining authenticity.
        </div>
      </div>
    </div>
  );
};
