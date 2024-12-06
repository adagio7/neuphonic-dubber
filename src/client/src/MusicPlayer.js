import './App.css';
import img from './zen.png';

import { useState, useRef } from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef(null); // Reference to the audio element

  // Function to fetch and play the audio file from the backend
  const handlePlay = async () => {
    if (playing) {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset to the start
        }

        setPlaying(false); // Set playing to false
        setAudioUrl(''); // Clear the current audio URL
        return;
    }
    
    // Call the endpoint and run the audio file
    try {
      setIsLoading(true);
      setError('');
      
      // Stop the previous audio if it's playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset to the start
      }

      // Fetch the audio file from the backend API
      const response = await fetch('https://localhost:8000');
      if (!response.ok) {
        throw new Error('Failed to fetch audio');
      }

      const audioBlob = await response.blob(); // Get the audio file as a Blob
      const audioUrl = URL.createObjectURL(audioBlob); // Create a URL for the Blob
      setAudioUrl(audioUrl); // Set the audio URL

      // After setting the URL, play the audio
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsLoading(false);

    } catch (err) {
      setError(err.message); // Handle any error that occurs
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh' }}>
    <Card
    variant="outlined"
    sx={{  p: 2,
      width: { xs: '30%', sm: 'auto' },
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: 'center',
      gap: 2,
    }}
  >
    <CardMedia
      component="img"
      width="100"
      height="100"
      alt="Contemplative Reptile album cover"
      src={img}
      sx={{    width: { xs: '30%', sm: 100 },
      }}
    />
    <Stack direction="column" alignItems="center" spacing={1} useFlexGap>
      <div>
        <Typography color="text.primary" fontWeight="semiBold">
            Zen Garden
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight="medium"
          textAlign="center"
          sx={{ width: '100%' }}
        >
          Sounds of Nature
        </Typography>
      </div>
      <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
        <IconButton
          aria-label={playing ? 'Play music' : 'Pause music'}
          onClick={handlePlay}
          sx={{ mx: 1 }}
        >
          {playing ? <PlayArrowRounded /> : <PauseRounded />}
        </IconButton>
      </Stack>
    </Stack>
  </Card>
  </div>
  );
}

export default MusicPlayer;
