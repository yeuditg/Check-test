import React from 'react';

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ variant = 'default', children }) => {
  const baseStyle = "p-4 rounded mb-4";
  const variantStyle = variant === "destructive" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";

  return (
    <div className={`${baseStyle} ${variantStyle}`}>
      {children}
    </div>
  );
};

export const AlertDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};