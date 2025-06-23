import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'default', ...props }) => {
  const baseStyle = "px-4 py-2 rounded focus:outline-none";
  const variantStyle = variant === "outline" ? "border border-gray-300 text-gray-700" : "bg-blue-600 text-white";

  return (
    <button className={`${baseStyle} ${variantStyle}`} {...props}>
      {children}
    </button>
  );
};