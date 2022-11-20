import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isActive?: boolean;
}

export default function Button({ children, isActive, ...props }: ButtonProps) {
  return (
    <button
      className={`cursor-pointer p-1 inline-block hover:text-blue-500 ${
        isActive ? "text-blue-500" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
