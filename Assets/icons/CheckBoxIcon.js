import {styled} from '@mui/material/styles';

export const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 22,
  height: 22,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: "#768463",
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(rgba(255,255,255,1),rgba(255,255,255,1))'
      : 'linear-gradient(rgba(255,255,255,1),rgba(255,255,255,1))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: "#fff",
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

export const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#768463',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 22,
    height: 22,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#768463',
  },
});