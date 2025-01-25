import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  IconButton, 
  Typography,
  Stack,
  Container,
  Dialog,
  DialogTitle,
  DialogContent
} from '@mui/material';
import { Add, Delete, Refresh, Celebration } from '@mui/icons-material';
import WheelComponent from 'react-wheel-of-prizes';
import confetti from 'canvas-confetti';

const SPINNING_SOUND = new Audio('/spinning.mp3');
const WINNING_SOUND = new Audio('/winning.mp3');

const WheelSpinner = () => {
  const [segments, setSegments] = useState([]);
  const [newSegment, setNewSegment] = useState('');
  const [key, setKey] = useState(0);
  const [winner, setWinner] = useState(null);
  
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [segments]);

  useEffect(() => {
    // Preload sounds
    SPINNING_SOUND.load();
    WINNING_SOUND.load();

    return () => {
      SPINNING_SOUND.pause();
      WINNING_SOUND.pause();
    };
  }, []);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#EE4040', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleStartSpin = () => {
    SPINNING_SOUND.currentTime = 0;
    SPINNING_SOUND.play().catch(() => {});
  };

  const handleWinner = (winner) => {
    SPINNING_SOUND.pause();
    SPINNING_SOUND.currentTime = 0;
    WINNING_SOUND.currentTime = 0;
    WINNING_SOUND.play().catch(() => {});
    setWinner(winner);
    triggerConfetti();
  };

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
                onFinished={handleWinner}
                primaryColor="black"
                contrastColor="white"
                buttonText="SPIN"
                isOnlyOnce={false}
                size={290}
                upDuration={100}
                downDuration={1000}
                onSpin={handleStartSpin}
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

      <Dialog
        open={!!winner}
        onClose={() => setWinner(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Celebration sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4">We Have a Winner!</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h3" align="center" color="primary" sx={{ my: 3 }}>
            {winner}
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default WheelSpinner;