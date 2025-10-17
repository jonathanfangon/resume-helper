import { useTheme } from '../contexts/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    top: '1.5rem',
    right: '1.5rem',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'var(--bg-primary)',
    border: '2px solid var(--border-color)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    transition: 'all var(--transition-base)',
    boxShadow: 'var(--shadow-md)',
    zIndex: 1000,
    padding: 0,
  };

  return (
    <button
      onClick={toggleTheme}
      style={buttonStyle}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
