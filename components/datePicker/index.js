import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Box } from '@mui/material';
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

export default function DepartureDatePicker({value,setDateValue,error,setError,label}){
  const {locale} = useLocale()
  const todayDate = new Date()
    return (<LocalizationProvider dateAdapter={AdapterMoment}>
        <Box sx={{display:{md:"flex",xs:'none'},height:"75px"}}>
        <ThemeProvider theme={customTheme}>
        <DesktopDatePicker
            // label={translateWord(locale,label)}
            label={""}
            inputFormat="DD/MM/YYYY"
            value={value}
            disablePast
            minDate={todayDate}
            InputProps={{sx:{":hover .MuiOutlinedInput-notchedOutline":{borderColor:"grey"},borderRadius:"5px"},name:"date"}}
            onChange={(value)=>{
              const date = new Date(value)
              const dateToday = new Date(new Date().toDateString())
              if(date.getTime()>dateToday.getTime()){
                setError(false)
                setDateValue(date.getTime())
              }
              else{
                setError(true)
              }
            }}
            renderInput={(params) =>{
            return (<TextField {...params} required error={error} sx={{width:"250px",height:"75px",p:"0",background:"white",position:"relative",bottom:"1rem",margin:"1rem 0rem 2rem",'.MuiOutlinedInput-notchedOutline': {
              border:"solid 1px grey",
            },
            // "legend span":{display:"none"},
            '&.MuiOutlinedInput-root':{
              border:"solid 1px grey"
            },
            '&:hover .MuiOutlinedInput-root': {
              border:"solid 1px grey"
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border:"solid 1px grey"
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border:"solid 1px grey"
            },
            '.MuiSvgIcon-root ': {
              fill: "grey !important",
            },
            borderRadius:"5px",
            svg: { color:"grey" },
            input: { color:"grey", height:"43px",width:"184px"},
            label: { color:"grey",mt:"1rem",ml:"0.75rem"}}}/>)}}
          />
          </ThemeProvider>
        </Box>
        <Box sx={{display:{md:"none",xs:'flex'},width:"80vw"}}>
        <ThemeProvider theme={customTheme}>
          <MobileDatePicker
            label={translateWord(locale,label)}
            inputFormat="DD/MM/YYYY"
            value={value}
            disablePast
            onChange={setDateValue}
            renderInput={(params) => <TextField {...params} fullWidth sx={{margin:"2rem 0.5rem",color:"white"}}/>}
          />
          </ThemeProvider>
        </Box>
      </LocalizationProvider>);
}