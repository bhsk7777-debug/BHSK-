import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'navy';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-sm font-medium transition-all duration-500 flex items-center justify-center gap-2 tracking-wide text-sm sm:text-base";
  
  const variants = {
    // Gold gradient
    primary: "bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-lg hover:brightness-110 border border-transparent",
    // Navy solid
    navy: "bg-navy-900 text-white border border-navy-800 hover:bg-navy-800",
    // White/Ghost with Gold text (for Navy backgrounds)
    secondary: "bg-white/5 text-gold-400 border border-gold-400/30 hover:bg-gold-400/10 hover:border-gold-400/60 backdrop-blur-sm",
    // Dark outline (for White backgrounds)
    outline: "bg-transparent text-navy-900 border border-navy-900/20 hover:border-navy-900 hover:bg-navy-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};