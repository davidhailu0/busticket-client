import {Box,Grid,Typography} from "@mui/material"
import Image from "next/image"
import croppedBus from "../../Assets/images/croppedBus.svg"
import frontBus from "../../Assets/images/frontBus.svg"
import { useLocale } from "../../utils/LanguageContext"
import { translateWord } from "../../utils/languageTranslation"

const AboutUsLayout = ()=>{
    const {locale} = useLocale()
    return (<Box sx={{display:"flex",height:{md:"200vh",xs:"auto"},flexDirection:"column",justifyContent:"start",alignItems:"center",background:"#F8F8F8",pt:"4rem"}}>
        <Typography sx={{mb:"5rem",fontWeight:800,fontSize:"32px",color:"#629460"}}>{translateWord(locale,"About Us")}</Typography>
        <Grid container sx={{display:"flex",justifyContent:"space-between",width:"100vw",px:{md:10,xs:4},mb:"2.5rem"}}>
                <Grid item md={6} sx={{position:"relative"}}>
                    <Box sx={{position:"absolute",left:{md:"-15rem",xs:"0"},height:{md:"534px",xs:"111.71px"},width:{md:"956px",xs:"200px"}}}>
                        <Image src={croppedBus} height={"534px"} width={"956px"}/>
                    </Box>
                </Grid>
                <Grid item md={6}>
                    <Typography fontWeight={600} sx={{fontSize:{md:"20px",xs:"18px"}}}>{translateWord(locale,"MyBus")}</Typography>
                    <Typography mt={"1rem"} color={"#2D343C"} sx={{mr:{md:"15rem",xs:"0rem"}}}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                    </Typography>
                </Grid>
                <Grid item md={6} sx={{mt:{md:"30rem",xs:"0"}}}>
                    <Typography mt={"1rem"} color={"#2D343C"} sx={{ml:{md:"15rem",xs:0}}}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
                    </Typography>
                </Grid>
                <Grid item md={6} sx={{position:"relative",mt:{md:"30rem",xs:0}}}>
                    <Box sx={{position:"absolute",right:{md:"-10rem",sm:"-43rem",xs:"-20rem"},top:{md:"-9rem",xs:"-7rem"},height:{md:"534px",xs:"111.71px"},width:{md:"956px",xs:"200px"}}}>
                        <Image src={frontBus} height={"534px"} width={"956px"}/>
                    </Box>
                </Grid>
        </Grid>
    </Box>)
}

export default AboutUsLayout;