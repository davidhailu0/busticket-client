import { useState } from 'react';
import {Box,Tooltip} from '@mui/material'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {translateWord} from '../../utils/languageTranslation';
import { useLocale } from "../../utils/LanguageContext";

export default function SelectComponent({label,value,changeValue,options,error,differentFrom}){
  const [inputVal,setInputVal] = useState("")
  const {locale} = useLocale()
    return(<Tooltip title={error?translateWord(locale,`Please Select ${label} Location`):""}>
        <Box sx={{display:{md:"inline-block",xs:"block"},width:{md:"260px",xs:"79vw"},mr:{md:"2.5rem",xs:"0"},my:{xs:"0.5rem",md:"0"},borderColor:"white"}}>
            <Autocomplete
            id={label}
            value={value}
            onChange={changeValue}
            inputValue={inputVal}
            getOptionLabel={(option)=>option}
            onInputChange={(event, newInputValue) => {
            setInputVal(newInputValue);
            }}
            options={options.map((plc)=>{
              if(plc["name"]!==differentFrom)
                  return plc[plc["name"]]
              }).filter(opt=>opt!==null&&opt!==undefined)}
            renderOption={(props, option) => {
              if(option===differentFrom){
                return
              }
              return (<Box component="li" key={option+label} {...props}>
                {option}
              </Box>)
            }}
            renderInput={(params) => <TextField {...params} error={error} sx={{
                width: {md:"260px",xs:"100%"},
                height:"70px",
                color: "grey",
                justifyContent:"center",
                alignItems:"center",
                background:"white",
                '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 1)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 1)',
              }}}/>}
            />
        {/* </FormControl> */}
        </Box>
        </Tooltip>);
}

//<MenuItem key={plc["name"]} value={plc["name"]}></MenuItem>