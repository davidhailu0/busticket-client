import {Box,Typography} from "@mui/material"
import BusCard from "../CustomCard/busCard";
import busCompanies from "../../utils/busCompanies";
import { useLocale } from "../../utils/LanguageContext";
import { translateWord } from "../../utils/languageTranslation";

const CarriersLayout = ()=>{
    const {locale} = useLocale()
    return (<Box sx={{display:"flex",height:"auto",flexDirection:"column",justifyContent:"start",alignItems:"center",py:{md:"4rem",xs:"5rem"}}}>
        <Typography sx={{mb:"5rem",fontWeight:800,fontSize:"32px",color:"#629460"}}>{translateWord(locale,"Carriers")}</Typography>
            <Box sx={{width:"100vw",display:"grid",gridTemplateColumns:{md:"auto auto auto auto auto",xs:"auto auto",sm:"auto auto auto"},rowGap:"2rem",columnGap:{md:"5rem",xs:"3rem"},px:{md:0,xs:4},mb:"2.5rem"}}>
                {busCompanies.map(({name,image})=>{
                    return <BusCard key={name} BusName={translateWord(locale,name)} img={image}/>
                })}
            </Box>
    </Box>)
}

export default CarriersLayout;