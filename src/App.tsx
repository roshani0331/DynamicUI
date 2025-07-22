// src/App.tsx
import React, { useState } from 'react';
import JSONInput from './components/JSONInput';
import { Button } from './components/ui/Button';
import DynamicRenderer from './components/DynamicRenderer';
import { getUILayoutFromLLM } from './utils/llmHelper';

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [parsedJSON, setParsedJSON] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRender = async () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setLoading(true);
      const llmLayout = await getUILayoutFromLLM(parsed);
      setParsedJSON(llmLayout);
    } catch (e) {
      alert('Invalid JSON or LLM call failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 p-4 border-r overflow-auto bg-white">
        <h2 className="text-xl font-semibold mb-2">Paste JSON Here</h2>
        <JSONInput value={jsonInput} onChange={setJsonInput} />
        <Button onClick={handleRender} className="mt-4">
          {loading ? 'Rendering...' : 'Render'}
        </Button>
      </div>
      <div className="w-1/2 p-6 overflow-auto bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Rendered UI</h2>
        {parsedJSON ? (
          <DynamicRenderer schema={parsedJSON} />
        ) : (
          <p className="text-gray-500">No UI rendered yet.</p>
        )}
      </div>
    </div>
  );
};

export default App;