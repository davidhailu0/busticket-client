import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Box,Tooltip } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {translateWord} from '../../utils/languageTranslation';
import { useLocale } from '../../utils/LanguageContext';

const customTheme = createTheme({
    palette:{
        primary:{
            main:"#777",
        },
    }
}) 

export default function DepartureDatePicker({value,changeDate,error,label}){
  const {locale} = useLocale()
  const todayDate = new Date()
    return (<LocalizationProvider dateAdapter={AdapterMoment}>
        <Tooltip title={error?translateWord(locale,"Please Enter Departure Date"):""}>
        <Box sx={{display:{md:"flex",xs:'none'},height:"70px"}}>
        <ThemeProvider theme={customTheme}>
        <DesktopDatePicker
            label={""}
            inputFormat="DD-MM-YYYY"
            value={value}
            disablePast
            minDate={todayDate}
            InputProps={{sx:{":hover .MuiOutlinedInput-notchedOutline":{borderColor:"white"},borderRadius:"5px",height:"70px",width:"260px"},name:"date"}}
            onChange={changeDate}
            renderInput={(params) =>{
            return (<TextField {...params} required error={error} sx={{width:"260px",height:"70px",p:"0",background:"white",position:"relative",bottom:"1rem",margin:"1rem 0rem 2rem",'.MuiOutlinedInput-notchedOutline': {
              border:"solid 1px white",
            },
            '&.MuiOutlinedInput-root':{
              borderColor:"white"
            },
            '&:hover .MuiOutlinedInput-root': {
              borderColor:"white"
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor:"white"
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor:"white"
            },
            '.MuiSvgIcon-root ': {
              fill: "grey !important",
            },
            borderRadius:"5px",
            svg: { color:"grey" },
            input: { color:"grey", height:"70px"},
            label: { color:"grey",mt:"1rem",ml:"0.75rem"}}}/>)}}
          />
          </ThemeProvider>
        </Box>
        </Tooltip>
        <Box sx={{display:{md:"none",xs:'flex'},width:"80vw"}}>
        <ThemeProvider theme={customTheme}>
          <MobileDatePicker
            inputFormat="DD-MM-YYYY"
            value={value}
            disablePast
            InputProps={{sx:{":hover .MuiOutlinedInput-notchedOutline":{borderColor:"white"},borderRadius:"5px",height:"70px",width:"260px"},name:"date"}}
            onChange={changeDate}
            minDate={todayDate}
            renderInput={(params) =>{
              return (<TextField {...params} required error={error} sx={{width:"79vw",height:"70px",p:"0",background:"white",position:"relative",bottom:"1rem",margin:"1.5rem 0rem 2rem",'.MuiOutlinedInput-notchedOutline': {
                border:"solid 1px white",
              },
              '&.MuiOutlinedInput-root':{
                borderColor:"white"
              },
              '&:hover .MuiOutlinedInput-root': {
                borderColor:"white"
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor:"white"
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor:"white"
              },
              '.MuiSvgIcon-root ': {
                fill: "grey !important",
              },
              borderRadius:"5px",
              svg: { color:"grey" },
              input: { color:"grey", height:"70px"},
              label: { color:"grey",mt:"1rem",ml:"0.75rem"}}}/>)}}
          />
          </ThemeProvider>
        </Box>
      </LocalizationProvider>);
}