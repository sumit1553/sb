import React from 'react';

interface CinematicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const CinematicButton: React.FC<CinematicButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClass = variant === 'ghost' ? 'btn-ghost' : variant === 'danger' ? 'btn-danger' : 'btn-primary';
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClass} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex items-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
