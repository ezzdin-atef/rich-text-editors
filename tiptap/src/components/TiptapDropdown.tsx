import React from "react";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function TiptapDropdown({ children }: DropdownProps) {
  return <div className="border px-2 py-1 rounded">{children}</div>;
}
