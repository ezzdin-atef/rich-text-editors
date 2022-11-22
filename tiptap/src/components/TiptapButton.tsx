import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export default function TiptapButton({
  children,
  isActive,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`disabled:opacity-60 disabled:cursor-not-allowed hover:bg-slate-200 ${
        isActive ? "bg-slate-200" : ""
      } text-slate-800 rounded px-2 py-1`}
      {...props}
    >
      {children}
    </button>
  );
}
