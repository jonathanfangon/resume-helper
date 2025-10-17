import { useState } from 'react';
import type { JobDescription } from '../types/index';

interface JobDescriptionFormProps {
  onSubmit: (jobDescription: JobDescription) => void;
  initialData?: JobDescription;
  isLoading?: boolean;
}

export const JobDescriptionForm: React.FC<JobDescriptionFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<JobDescription>(
    initialData || {
      title: '',
      company: '',
      description: '',
      requirements: '',
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof JobDescription, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof JobDescription]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof JobDescription, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Requirements are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const formContainerStyle: React.CSSProperties = {
    marginBottom: '2rem',
    animation: 'slideUp 0.5s ease-out 0.2s both',
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    marginBottom: '1.5rem',
    color: 'var(--text-primary)',
    fontWeight: 700,
  };

  const formCardStyle: React.CSSProperties = {
    background: 'var(--bg-primary)',
    borderRadius: 'var(--radius-xl)',
    padding: '2rem',
    boxShadow: 'var(--shadow-md)',
    border: '1px solid var(--border-color)',
    transition: 'all var(--transition-base)',
  };

  const fieldGroupStyle: React.CSSProperties = {
    marginBottom: '1.5rem',
    position: 'relative',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    color: 'var(--text-primary)',
    transition: 'color var(--transition-base)',
  };

  const inputBaseStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    fontSize: '1rem',
    border: '2px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'all var(--transition-base)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
  };

  const getInputStyle = (fieldName: keyof JobDescription): React.CSSProperties => ({
    ...inputBaseStyle,
    borderColor: errors[fieldName] ? 'var(--error-color)' : 'var(--border-color)',
    opacity: isLoading ? 0.6 : 1,
  });

  const textareaStyle: React.CSSProperties = {
    resize: 'vertical',
    minHeight: '120px',
    lineHeight: '1.6',
  };

  const errorStyle: React.CSSProperties = {
    color: 'var(--error-color)',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    animation: 'slideUp 0.2s ease-out',
    fontWeight: 500,
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '1rem 2rem',
    fontSize: '1.125rem',
    background: isLoading ? 'var(--bg-tertiary)' : 'var(--primary-gradient)',
    color: isLoading ? 'var(--text-tertiary)' : 'white',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    fontWeight: 700,
    transition: 'all var(--transition-base)',
    boxShadow: isLoading ? 'none' : 'var(--shadow-md)',
    marginTop: '0.5rem',
    letterSpacing: '0.02em',
  };

  const hintStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--text-tertiary)',
    marginTop: '0.375rem',
    fontStyle: 'italic',
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headerStyle}>
        💼 Job Description
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={formCardStyle} className="card">
          <div style={fieldGroupStyle}>
            <label htmlFor="title" style={labelStyle}>
              Job Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Senior Software Engineer"
              style={getInputStyle('title')}
              disabled={isLoading}
            />
            {errors.title && (
              <div style={errorStyle}>
                <span>⚠️</span>
                <span>{errors.title}</span>
              </div>
            )}
          </div>

          <div style={fieldGroupStyle}>
            <label htmlFor="company" style={labelStyle}>
              Company *
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g., Acme Corporation"
              style={getInputStyle('company')}
              disabled={isLoading}
            />
            {errors.company && (
              <div style={errorStyle}>
                <span>⚠️</span>
                <span>{errors.company}</span>
              </div>
            )}
          </div>

          <div style={fieldGroupStyle}>
            <label htmlFor="description" style={labelStyle}>
              Job Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Paste the full job description here..."
              rows={6}
              style={{
                ...getInputStyle('description'),
                ...textareaStyle,
              }}
              disabled={isLoading}
            />
            <div style={hintStyle}>
              Include the main responsibilities and overview of the role
            </div>
            {errors.description && (
              <div style={errorStyle}>
                <span>⚠️</span>
                <span>{errors.description}</span>
              </div>
            )}
          </div>

          <div style={fieldGroupStyle}>
            <label htmlFor="requirements" style={labelStyle}>
              Requirements *
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="List the key requirements and qualifications..."
              rows={6}
              style={{
                ...getInputStyle('requirements'),
                ...textareaStyle,
              }}
              disabled={isLoading}
            />
            <div style={hintStyle}>
              Include required skills, experience, and qualifications
            </div>
            {errors.requirements && (
              <div style={errorStyle}>
                <span>⚠️</span>
                <span>{errors.requirements}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={buttonStyle}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <span>Processing</span>
                <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>...</span>
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <span>✨</span>
                <span>Tailor Resume</span>
                <span>🚀</span>
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
