import {Box,TextField,InputAdornment} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import {translateWord} from "../../utils/languageTranslation";
import { useLocale } from "../../utils/LanguageContext";

const customTheme = createTheme({
    palette:{
        primary:{
            main:"#174376",
        },
    }
}) 

const PassengerCounter = ({count,setCount,error,setCountError})=>{
    const {locale} = useLocale()
    // const handleIncrement = ()=>{
    //     setCount(prev=>prev+1)
    // }
    // const handleDecrement = ()=>{
    //     if(count>1){
    //         setCount(prev=>prev-1)
    //     }
    // }
    // const handleChange = (newValue)=>{
    //     if(parseInt(newValue)>=1||newValue===""){
    //         setCountError(false)
    //         setCount(newValue)
    //     }
    // }
    return <ThemeProvider theme={customTheme}><TextField value={count} onChange={setCount} InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EventSeatIcon sx={{color:"white"}}/>
            </InputAdornment>
          ),sx: { height:"75px",color:'white',":hover .MuiOutlinedInput-notchedOutline":{borderColor:"#174376"},'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border:"solid 1.5px white"
          }},name:"count" 
        }}
        sx={{height:"75px",width:"230px",background:"#174376","label": {
            mt:"0.9rem",ml:"1.5rem",color:"white"
          },"legend span":{display:"none"},"& label.Mui-focused":{color:"white"},'.MuiOutlinedInput-notchedOutline': {
            borderColor: '#174376',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border:"solid 2px white"
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#174376',
          },border:"solid 1px white",borderRadius:"5px"}} label={translateWord(locale,"Number of Passenger(s)")}/>
          </ThemeProvider>
}

export default PassengerCounter;