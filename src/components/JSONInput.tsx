import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const JSONInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <textarea
      className="w-full h-[80vh] p-3 border rounded resize-none font-mono text-sm bg-gray-100"
      placeholder='{ "key": "value" }'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default JSONInput;
