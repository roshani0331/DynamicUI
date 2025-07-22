// src/components/DynamicRenderer.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
  useTheme
} from '@mui/material';

const isPrimitive = (val: any) =>
  typeof val === 'string' ||
  typeof val === 'number' ||
  typeof val === 'boolean' ||
  val === null;

interface RenderValueProps {
  label?: string;
  value: any;
  depth?: number;
}

const RenderValue: React.FC<RenderValueProps> = ({ label, value, depth = 0 }) => {
  const theme = useTheme();
  const indent = depth * 2;

  // Render primitive values
  if (isPrimitive(value)) {
    return (
      <Typography
        sx={{
          fontFamily: 'monospace',
          fontSize: 14,
          pl: indent,
          whiteSpace: 'pre-wrap',
        }}
      >
        {label && (
          <Box component="span" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            {label}:{' '}
          </Box>
        )}
        <Box component="span" sx={{ color: theme.palette.text.secondary }}>
          {JSON.stringify(value)}
        </Box>
      </Typography>
    );
  }

  // Render array values
  if (Array.isArray(value)) {
    return (
      <Stack spacing={1} sx={{ pl: indent }}>
        {label && (
          <Typography sx={{ fontFamily: 'monospace', fontSize: 14, color: '#666' }}>
            {label}:
          </Typography>
        )}
        {value.map((item, index) => (
          <RenderValue key={index} value={item} depth={depth + 1} />
        ))}
      </Stack>
    );
  }

  // Render object values
  if (typeof value === 'object') {
    return (
      <Card variant="outlined" sx={{ ml: indent, bgcolor: '#f9f9f9' }}>
        <CardContent>
          <Stack spacing={1}>
            {label && (
              <Typography
                sx={{ fontFamily: 'monospace', fontSize: 14, color: theme.palette.primary.main }}
              >
                {label}
              </Typography>
            )}
            {Object.entries(value).map(([key, val], idx) => (
              <RenderValue key={idx} label={key} value={val} depth={depth + 1} />
            ))}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return null;
};

const DynamicRenderer: React.FC<{ schema: any }> = ({ schema }) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ color: 'green', mb: 2 }}>

      </Typography>
      <RenderValue value={schema} />
    </Box>
  );
};

export default DynamicRenderer;
