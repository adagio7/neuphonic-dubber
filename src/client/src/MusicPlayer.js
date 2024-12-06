import './App.css';
import img from './zen.png';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';

function MusicPlayer() {
  let paused = false;
  const setPaused = () => {
    paused = !paused;
  }

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
          aria-label={paused ? 'Play music' : 'Pause music'}
          onClick={() => setPaused((val) => !val)}
          sx={{ mx: 1 }}
        >
          {paused ? <PlayArrowRounded /> : <PauseRounded />}
        </IconButton>
      </Stack>
    </Stack>
  </Card>
  </div>
  );
}

export default MusicPlayer;
