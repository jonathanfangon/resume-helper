import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export const UserProfile = () => {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) return null;

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '1.5rem',
    right: '5rem',
    zIndex: 999,
  };

  const profileButtonStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '3px solid var(--primary-color)',
    cursor: 'pointer',
    overflow: 'hidden',
    background: 'var(--bg-primary)',
    boxShadow: 'var(--shadow-md)',
    transition: 'all var(--transition-base)',
    padding: 0,
  };

  const profileImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '60px',
    right: '0',
    background: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-xl)',
    padding: '0.5rem',
    minWidth: '200px',
    animation: 'slideUp 0.2s ease-out',
    display: showDropdown ? 'block' : 'none',
  };

  const userInfoStyle: React.CSSProperties = {
    padding: '1rem',
    borderBottom: '1px solid var(--border-color)',
  };

  const userNameStyle: React.CSSProperties = {
    fontWeight: 600,
    color: 'var(--text-primary)',
    marginBottom: '0.25rem',
    fontSize: '0.95rem',
  };

  const userEmailStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--text-tertiary)',
  };

  const signOutButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    background: 'transparent',
    border: 'none',
    color: 'var(--error-color)',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 600,
    borderRadius: 'var(--radius-sm)',
    transition: 'all var(--transition-base)',
    textAlign: 'left',
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowDropdown(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={containerStyle}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={profileButtonStyle}
        aria-label="User profile"
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'var(--shadow-md)';
        }}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            style={profileImageStyle}
          />
        ) : (
          <div style={{ fontSize: '1.5rem' }}>👤</div>
        )}
      </button>

      <div style={dropdownStyle}>
        <div style={userInfoStyle}>
          <div style={userNameStyle}>{user.displayName || 'User'}</div>
          <div style={userEmailStyle}>{user.email}</div>
        </div>
        <button
          onClick={handleSignOut}
          style={signOutButtonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(245, 101, 101, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Sign Out
        </button>
      </div>

      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: -1,
          }}
        />
      )}
    </div>
  );
};
