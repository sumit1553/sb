import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'heavy' | 'card';
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'glass',
  className = '',
  ...props
}) => {
  const variantClass = variant === 'heavy' ? 'glass-heavy' : variant === 'card' ? 'glass-card' : 'glass';
  return (
    <div
      className={`rounded-2xl p-6 ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
