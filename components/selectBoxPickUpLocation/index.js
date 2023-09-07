import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useLocale } from '../../utils/LanguageContext';
import { translateWord } from '../../utils/languageTranslation';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function SelectPickUpLocation({value,setValue,pickUploactions}) {
  const {locale} = useLocale()
  return (
    <Box sx={{ width: "100%",display:"flex",justifyContent:{md:"flex-start",sm:"center",xs:"start"} }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">{translateWord(locale,"Pickup Location")}</InputLabel>
        <Select
          label={translateWord(locale,"Pickup Location")}
          id={"PickupLocation"}
          value={value}
          onChange={setValue}
          sx={{width:{md:"325px",xs:"81vw"},my:{md:0,xs:"0.5rem"},background:"white",boxShadow: "0px 0px 10px 0px #00000026"}}
        >
         {pickUploactions.map((location)=><MenuItem key={location} value={location}>{translateWord(locale,location)}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}