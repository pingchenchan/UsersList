import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingIndicator() {
    return  <Box sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}><CircularProgress /></Box>;
  }
  
  export default LoadingIndicator;