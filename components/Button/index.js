import { Typography,Button } from '@mui/material';
import {translateWord} from '../../utils/languageTranslation';
import { useLocale } from '../../utils/LanguageContext';

export default function CustomButton({dayOfTheWeek,active,day,onClick}){
    const {locale }= useLocale()
    return (
    <Button onClick={onClick} sx={{display:"grid",background:active?"#10c9a7":"white",color:"black",borderColor:"black",margin:"0 3px",":hover":{borderColor:"#10c9a7",background:active?"#10c9a7":"white"}}} variant="outlined">
        <Typography sx={{fontWeight:"bold"}}>{translateWord(locale,dayOfTheWeek)}</Typography>
        <Typography>{day}</Typography>
    </Button>
    );
}