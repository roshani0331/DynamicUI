// components/JSONInput.tsx
import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const JSONInput: React.FC<Props> = ({ value, onChange }) => (
  <textarea
    className="w-full h-[75vh] p-3 border rounded shadow-sm font-mono text-sm resize-none bg-white text-gray-800"
    placeholder='{
  "name": "John",
  "email": "john@example.com"
}'
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default JSONInput;