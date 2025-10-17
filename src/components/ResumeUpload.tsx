import { useState, useRef } from 'react';
import type { ResumeData } from '../types/index';

interface ResumeUploadProps {
  onUpload: (resumeData: ResumeData) => void;
  currentResume: ResumeData;
}

export const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload, currentResume }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type - Claude API only supports JPEG, PNG, and GIF
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPEG, PNG, or GIF image file.\n\nNote: WebP format is not supported by Claude API.');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onUpload({
        imageFile: file,
        imagePreview: preview,
        fileType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadAreaStyle: React.CSSProperties = {
    border: `3px dashed ${dragActive ? 'var(--primary-color)' : 'var(--border-color)'}`,
    borderRadius: 'var(--radius-xl)',
    padding: '3rem 2rem',
    textAlign: 'center',
    cursor: 'pointer',
    background: dragActive ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))' : 'var(--bg-primary)',
    transition: 'all var(--transition-base)',
    position: 'relative',
    overflow: 'hidden',
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '4rem',
    margin: '0 0 1rem 0',
    filter: dragActive ? 'brightness(1.2)' : 'none',
    transition: 'all var(--transition-base)',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    margin: '0 0 0.5rem 0',
    background: 'var(--primary-gradient)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    margin: '0.5rem 0',
    fontSize: '1rem',
  };

  const hintStyle: React.CSSProperties = {
    color: 'var(--text-tertiary)',
    fontSize: '0.875rem',
    margin: '1rem 0 0 0',
  };

  const previewContainerStyle: React.CSSProperties = {
    position: 'relative',
    animation: 'scaleIn 0.4s ease-out',
  };

  const previewImageStyle: React.CSSProperties = {
    maxWidth: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-xl)',
    marginBottom: '1.5rem',
  };

  const fileNameStyle: React.CSSProperties = {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  };

  const replaceButtonStyle: React.CSSProperties = {
    marginTop: '1rem',
    background: 'var(--primary-gradient)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-base)',
  };

  return (
    <div style={{ marginBottom: '2rem', animation: 'slideUp 0.5s ease-out' }}>
      <h2 style={{
        fontSize: '1.75rem',
        marginBottom: '1.5rem',
        color: 'var(--text-primary)',
        fontWeight: 700
      }}>
        📄 Upload Your Resume
      </h2>
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        style={uploadAreaStyle}
        className="card"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        {currentResume.imagePreview ? (
          <div style={previewContainerStyle}>
            <img
              src={currentResume.imagePreview}
              alt="Resume preview"
              style={previewImageStyle}
            />
            <div style={fileNameStyle}>
              <span>✅</span>
              <span>{currentResume.imageFile?.name}</span>
            </div>
            <button
              style={replaceButtonStyle}
              onClick={(e) => {
                e.stopPropagation();
                handleButtonClick();
              }}
            >
              Change Resume
            </button>
          </div>
        ) : (
          <div>
            <div style={iconStyle}>📤</div>
            <p style={titleStyle}>Drop your resume here</p>
            <p style={subtitleStyle}>or click to browse</p>
            <p style={hintStyle}>
              Supports: JPEG, PNG, GIF (max 10MB)
            </p>
            {dragActive && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                borderRadius: 'var(--radius-xl)',
                pointerEvents: 'none',
              }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
