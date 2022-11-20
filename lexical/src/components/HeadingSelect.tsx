import React from "react";

interface HeadingSelectProps {
  onChange: (value: string) => void;
  value: string;
}

export default function HeadingSelect({ onChange, value }: HeadingSelectProps) {
  return (
    <select
      name="heading"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm border px-2 py-1 rounded"
    >
      <option value="">Choose Heading</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
      <option value="h3">Heading 3</option>
      <option value="h4">Heading 4</option>
      <option value="h5">Heading 5</option>
      <option value="h6">Heading 6</option>
    </select>
  );
}
