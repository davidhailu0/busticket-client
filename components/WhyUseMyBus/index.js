import {Box,Typography} from "@mui/material"
import CustomCard from "../CustomCard"
import TimeUndraw from "../../Assets/images/time.svg"
import CallCenter from "../../Assets/images/callCenter.svg"
import Easy from "../../Assets/images/easyBook.svg"
import ContainedButton from "../Button/containedButton"
import { translateWord } from "../../utils/languageTranslation"
import { useLocale } from "../../utils/LanguageContext"

const WhyUsLayout = ()=>{
    const {locale} = useLocale()
    return (<Box sx={{display:"flex",height:{md:"100vh",xs:"auto"},flexDirection:"column",justifyContent:"start",alignItems:"center",background:"#F8F8F8",pt:"0rem"}}>
        <Typography sx={{mb:"1rem",fontWeight:800,fontSize:"32px",color:"#629460"}}>{translateWord(locale,"Why use MyBus")}</Typography>
        <Box sx={{display:"flex",flexDirection:{md:"row",xs:"column"},justifyContent:"space-between",alignItems:{md:"flex-start",xs:"center"},width:"100vw",px:{md:10,xs:4},mb:"2.5rem"}}>
            <CustomCard svgIcon={TimeUndraw} title={translateWord(locale,"Save Your Time")}>
                <Typography color={"rgba(105, 105, 105, 1)"}>
                    {translateWord(locale,"Book a ticket with a modern option without having to physically go.")}
                </Typography>
            </CustomCard>
            <CustomCard svgIcon={CallCenter} title={translateWord(locale,"Call Center Help 24/7")}>
                <Typography color="rgba(105, 105, 105, 1)">
                    {translateWord(locale,"A professional call center help is available 24/7 if you need help.")}
                </Typography>
            </CustomCard>
            <CustomCard svgIcon={Easy} title={translateWord(locale,"Easy to Book")}>
                <Typography color={"rgba(105, 105, 105, 1)"}>
                    {translateWord(locale,"Make payment online from where you are.")}
                </Typography>
            </CustomCard>
        </Box>
        <Box sx={{display:"flex",justifyContent:{md:"end",xs:"center"},width:"90%"}}>
            <ContainedButton width="243px" height="60px" fontSize="20px">{translateWord(locale,"Search Trip")}</ContainedButton>
        </Box>
    </Box>)
}

export default WhyUsLayout;