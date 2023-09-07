import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SvgIcon from "@mui/material/SvgIcon";
import {Box,Typography} from "@mui/material"
import EastIcon from '@mui/icons-material/East';
import { translateWord } from '../../utils/languageTranslation';
import { useLocale } from '../../utils/LanguageContext';

const TripInputDetail = ({departure,destination,setUserState,setClassName})=>{
    const {locale} = useLocale()
    return (<Box sx={{display:"flex",alignItems:"center",ml:"2rem"}}>
        <SvgIcon color='black' fontSize="medium">
            <FmdGoodIcon/>
        </SvgIcon>
        <Typography sx={{ml:"0.3rem",mr:"2rem",cursor:setUserState?"pointer":"text",transition:"all 0.3s",":hover":{color:setUserState?"blue":"black"}}} onClick={()=>{
                if(setUserState)
                setUserState(1,(prev,newVal)=>{setClassName("animate__animated animate__fadeInLeft");return newVal;})
            }
        }
            >{translateWord(locale,"From")+" "+translateWord(locale,departure)}</Typography>
        {destination&&<EastIcon fontSize='large' sx={{mr:"2rem"}}/>}
        {destination&&<SvgIcon color='black' fontSize="medium" sx={{mr:"1rem"}}>
            <FmdGoodIcon/>
        </SvgIcon>}
        {destination&&<Typography sx={{cursor:setUserState?"pointer":"text",transition:"all 0.3s",":hover":{color:setUserState?"blue":"black"}}} onClick={()=>{
                if(setUserState)
                setUserState(2,(prev,newVal)=>{setClassName("animate__animated animate__fadeInLeft");return newVal;})
            }
        }   >{translateWord(locale,"To")+" "+translateWord(locale,destination)}</Typography>}
    </Box>)
}
export default TripInputDetail;