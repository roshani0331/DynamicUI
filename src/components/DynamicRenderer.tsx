// src/components/DynamicRenderer.tsx
import React from 'react';

interface LayoutNode {
  type: string;
  text?: string;
  children?: LayoutNode[];
}

const DynamicRenderer: React.FC<{ schema: LayoutNode }> = ({ schema }) => {
  const renderNode = (node: LayoutNode, key: number | string = 0): React.ReactNode => {
    switch (node.type) {
      case 'container':
        return (
          <div
            key={key}
            className="bg-white border rounded shadow-sm p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {node.children?.map((child, index) => renderNode(child, `${key}-${index}`))}
          </div>
        );
      case 'heading':
        return (
          <h3 key={key} className="col-span-full text-lg font-semibold text-gray-800">
            {node.text}
          </h3>
        );
      case 'text':
        return (
          <div key={key} className="text-sm text-gray-700">
            {node.text}
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="space-y-4">{renderNode(schema)}</div>;
};

export default DynamicRenderer;