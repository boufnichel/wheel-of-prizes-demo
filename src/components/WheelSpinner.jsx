import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  IconButton, 
  Typography,
  Stack,
  Container
} from '@mui/material';
import { Add, Delete, Refresh } from '@mui/icons-material';
import WheelComponent from 'react-wheel-of-prizes';

const WheelSpinner = () => {
  const [segments, setSegments] = useState([]);
  const [newSegment, setNewSegment] = useState('');
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [segments]);

  const addSegment = () => {
    if (newSegment.trim()) {
      setSegments([...segments, newSegment.trim()]);
      setNewSegment('');
    }
  };

  const removeSegment = (index) => {
    setSegments(segments.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row" spacing={4} alignItems="start" sx={{ mt: 4 }}>
        {/* Left Panel - List Management */}
        <Box flex={1} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h5" gutterBottom>
            Wheel Items
          </Typography>
          
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                value={newSegment}
                onChange={(e) => setNewSegment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSegment()}
                placeholder="Enter new item"
                size="small"
              />
              <Button
                variant="contained"
                onClick={addSegment}
                startIcon={<Add />}
              >
                Add
              </Button>
            </Box>

            <Stack spacing={1} sx={{ maxHeight: 400, overflow: 'auto' }}>
              {segments.map((segment, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography>{segment}</Typography>
                  <IconButton
                    onClick={() => removeSegment(index)}
                    size="small"
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
              
              {segments.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  <Refresh sx={{ mb: 1, opacity: 0.5 }} />
                  <Typography>Add items to start spinning the wheel</Typography>
                </Box>
              )}
            </Stack>
          </Stack>
        </Box>

        {/* Right Panel - Wheel */}
        <Box flex={1} sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {segments.length > 0 ? (
            <div key={key}>
              <WheelComponent
                segments={segments}
                segColors={['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F']}
                onFinished={(winner) => alert(`Winner: ${winner}`)}
                primaryColor="black"
                contrastColor="white"
                buttonText="SPIN"
                isOnlyOnce={false}
                size={290}
                upDuration={100}
                downDuration={1000}
              />
            </div>
          ) : (
            <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
              <Refresh sx={{ fontSize: 40, mb: 2, opacity: 0.5 }} />
              <Typography>Wheel will appear here</Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default WheelSpinner;