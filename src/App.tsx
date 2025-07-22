// src/App.tsx
import React, { useState } from 'react';
import JSONInput from './components/JSONInput';
import { Button, Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';
import DynamicRenderer from './components/DynamicRenderer';
import { getUILayoutFromLLM } from './utils/llmHelper';

const App: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [parsedJSON, setParsedJSON] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

   const handleRender = async () => {
    setError('');
    try {
      const parsed = JSON.parse(jsonInput);
      setLoading(true);
  
      let llmLayout = await getUILayoutFromLLM(parsed);
      console.log('LLM Layout:', llmLayout);
  
      // ✅ Normalize schema: extract inner "container" if structure is wrong
      if (!llmLayout.type && llmLayout.container) {
        llmLayout = {
          type: 'container',
          ...llmLayout.container,
        };
      }
  
      setParsedJSON(llmLayout.container || llmLayout);

    } catch (e: any) {
      console.error('Error:', e);
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box display="flex" height="100vh" bgcolor="#f5f5f5">
      <Box width="50%" p={3} overflow="auto">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Paste JSON Here
          </Typography>
          <JSONInput value={jsonInput} onChange={setJsonInput} />
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleRender} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Render'}
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </Box>
        </Paper>
      </Box>
      <Box width="50%" p={3} overflow="auto">
        <Paper elevation={3} sx={{ padding: 3, minHeight: '100%' }}>
          <Typography variant="h5" color="success.main" gutterBottom>
            Rendered UI
          </Typography>
          {parsedJSON ? (
            <DynamicRenderer schema={parsedJSON} />
          ) : (
            <Typography color="textSecondary" fontStyle="italic">
              No UI rendered yet.
            </Typography>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default App;
