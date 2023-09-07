import { useState,useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {Box,OutlinedInput,FormControl,InputLabel} from '@mui/material'
import {translateWord} from '../../utils/languageTranslation';
import { useLocale } from "../../utils/LanguageContext";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
    palette:{
        primary:{
            main:"#000",
        },
    }
}) 

export default function SelectComponent({label,value,setValue,options,setError,error,differentFrom}){
  const [img,setImage] = useState("")
  useEffect(()=>{
    const imgFound = options.find((plc)=>plc["name"]===value)
    if(imgFound&&imgFound['img']){
      setImage(imgFound['img'].src)
    }
  },[value])
  const {locale} = useLocale()
    const changeValue = (val)=>{
        setValue(val)
        setError(false)
    }
    return(<ThemeProvider theme={customTheme}>
        <Box sx={{display:"inline-block",width:{md:"230px",xs:"100%"},mr:"2.5rem",borderColor:"white"}}>
            {/* <FormControl> */}
            {/* <InputLabel sx={{color:"white",position:"absolute",top:value?"1rem":"0.75rem",left:"2rem"}}>{translateWord(locale,label)}</InputLabel> */}
            <Select
            id={`${label}_id`}
            name={label}
            value={translateWord(locale,value)}
            displayEmpty
            onChange={changeValue}
            error={error}
            renderValue={(value) => {
                return (<Box sx={{ display: "flex",gap:"1rem",alignItems:"center" }}>
                    <img src={img} width="85px" />
                    {value}
                </Box>
                );
            }}
            sx={{
                width: {md:"300px",xs:"100%"},
                height:"100px",
                color: "grey",
                background:"white",
                '.MuiOutlinedInput-notchedOutline': {
                  border:"solid 1px grey",
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border:"solid 1px grey",
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  border:"solid 1px grey",
                },
                '.MuiSvgIcon-root ': {
                  fill: "grey !important",
                }
              }}
            >
            {//eslint-disable-next-line
            options.map((plc)=>{
                if(plc["name"]!==differentFrom)
            return <MenuItem key={plc["name"]} value={plc["name"]}>
                    <Box>
                      <img src={plc["img"]&&plc["img"].src} alt={plc["name"]} width="52px"/>
                      <Box sx={{ml:"2rem",display:"inline-flex",verticalAlign:"middle"}}>{plc[plc["name"]]}</Box>
                    </Box>
                </MenuItem>})}
            </Select>
        {/* </FormControl> */}
        </Box>
      </ThemeProvider>);
}