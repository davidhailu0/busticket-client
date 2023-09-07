import {Box,Typography} from "@mui/material"
import CustomCard from "../CustomCard"
import SearchUndraw from "../../Assets/images/checkTrip.svg"
import BookUndraw from "../../Assets/images/bookTrip.svg"
import PaymentUndraw from "../../Assets/images/payment.svg"
import { translateWord } from "../../utils/languageTranslation"
import { useLocale } from "../../utils/LanguageContext"

const HowToLayout = ()=>{
    const {locale} = useLocale()
    return (<Box sx={{display:"flex",background:"#f8f8f8",height:{md:"110vh",xs:"auto"},flexDirection:"column",justifyContent:{md:"start",xs:"center"},alignItems:"center",pt:"7rem"}}>
        <Typography sx={{mb:"1rem",fontWeight:800,fontSize:"32px",color:"#629460"}}>{translateWord(locale,"How To")}</Typography>
        <Box sx={{display:"flex",flexDirection:{md:"row",xs:"column"},justifyContent:"space-between",alignItems:{md:"flex-start",xs:"center"},width:"100vw",px:{md:10,xs:4}}}>
            <CustomCard svgIcon={SearchUndraw} title={translateWord(locale,"Check Trip")}>
                <Typography color={"rgba(105, 105, 105, 1)"}>
                    {translateWord(locale,"Check the availability of the trip you want from the comfort of your home.")}
                </Typography>
            </CustomCard>
            <CustomCard svgIcon={BookUndraw} title={translateWord(locale,"Book Ticket")}>
                <Typography color={"rgba(105, 105, 105, 1)"}>
                    {translateWord(locale,"Book your ticket with easy steps using my Bus.")}
                </Typography>
            </CustomCard>
            <CustomCard svgIcon={PaymentUndraw} title={translateWord(locale,"Make Payment")}>
                <Typography color={"rgba(105, 105, 105, 1)"}>
                    {translateWord(locale,"Make payment online from where you are.")}
                </Typography>
            </CustomCard>
        </Box>
    </Box>)
}

export default HowToLayout;