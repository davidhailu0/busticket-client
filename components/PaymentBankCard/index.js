import {Box,Typography} from "@mui/material"
import { translateWord } from "../../utils/languageTranslation"
import { useLocale } from "../../utils/LanguageContext"

const PaymentBankCard = ({bankName,accountNumber,children,chooseBank,chosenBank,id})=>{
    const {locale} = useLocale()
    const displayCard = ()=>{
        if(!chosenBank){
            return "flex"
        }
        else if(chosenBank["name"]===bankName){
            return "flex"
        }
        return "none"
    }

    return (<Box sx={{display:displayCard(),flexDirection:"column"}}>
        <Box className={id} sx={{display:"flex",alignItems:"center",width:"300px",height:"133px",cursor:"pointer",fontFamily:"Open Sans",boxShadow: "0px 4px 4px 0px #00000040",background:chosenBank&&chosenBank["name"]===bankName?"#D8DBD3":"#fff",p:1}} onClick={chooseBank}>
                {children}
                <div style={{marginLeft:"2rem"}}>{translateWord(locale,bankName)}</div>
        </Box>
        <Box sx={{display:"flex",mt:"1.5rem"}}>
            <Typography sx={{color:"#000"}}>{translateWord(locale,"Account Number")}</Typography>
            <Typography sx={{color:"#000"}} ml={2}>{accountNumber}</Typography>
        </Box>
    </Box>
    )
}

export default PaymentBankCard;