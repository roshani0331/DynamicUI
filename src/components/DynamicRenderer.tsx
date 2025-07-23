import React from 'react';

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
interface JSONObject { [key: string]: JSONValue; }
interface JSONArray extends Array<JSONValue> {}

interface DynamicRendererProps {
  data: JSONValue;
}

const isPrimitive = (value: JSONValue) =>
  typeof value === 'string' ||
  typeof value === 'number' ||
  typeof value === 'boolean' ||
  value === null;

const DynamicRenderer: React.FC<DynamicRendererProps> = ({ data }) => {
  const primitiveItems: React.ReactNode[] = [];
  const boxItems: React.ReactNode[] = [];

  const renderValue = (value: JSONValue, key?: string): React.ReactNode => {
    if (isPrimitive(value)) {
      return (
        <div className="text-sm text-gray-800 w-full break-words">
          {key && <span className="font-semibold text-gray-700 mr-1">{key}:</span>}
          <span>{String(value)}</span>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div className="space-y-2 w-full">
          {value.map((item, idx) => (
            <div key={idx} className="pl-2 border-l border-gray-300">
              {renderValue(item)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      const entries = Object.entries(value);
      const hasPrimitiveChildren = entries.every(([, val]) => isPrimitive(val));

      return (
        <div className="w-full border rounded-md shadow-sm">
          <div className="bg-gray-200 px-4 py-2 text-lg font-bold text-gray-900 w-full">
            {key}
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {entries.map(([k, v]) => renderValue(v, k))}
          </div>
        </div>
      );
    }

    return null;
  };

  // Group primitives and objects separately
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    Object.entries(data).forEach(([k, v]) => {
      if (isPrimitive(v)) {
        primitiveItems.push(renderValue(v, k));
      } else {
        boxItems.push(
          <div key={k}>{renderValue(v, k)}</div>
        );
      }
    });
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white space-y-6">
      {/* Top-level key-value primitives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {primitiveItems}
      </div>

      {/* Nested objects in boxed layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {boxItems}
      </div>
    </div>
  );
};

export default DynamicRenderer;
