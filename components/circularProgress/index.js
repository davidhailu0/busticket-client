import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CircularProgressWithLabel = ({label,value})=>{
  return (
    <>
    <Box sx={{ position: 'relative', display: {md:'flex',xs:"none"},justifyContent:"center" }}>
      <CircularProgress variant="determinate" value={value} thickness={5} size={100}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div">
          {`${label}`}
        </Typography>
      </Box>
    </Box>
    <Box sx={{ position: 'relative', display: {md:"none",xs:'flex'},justifyContent:"center" }}>
      <CircularProgress variant="determinate" value={value} thickness={3} size={70}/>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div">
          {`${label}`}
        </Typography>
      </Box>
    </Box>
    </>
  );
}

export default CircularProgressWithLabel;