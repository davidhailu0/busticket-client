import {Box,Grid,Typography,Divider} from "@mui/material"
import Image from "next/image"
import background from "../../Assets/images/background.png"
import Facebook from "../../Assets/images/facebook.svg"
import Telegram from "../../Assets/images/telegram.svg"
import Instagram from "../../Assets/images/instagram.svg"
import { useLocale } from "../../utils/LanguageContext"
import { translateWord } from "../../utils/languageTranslation"

const Footer = ()=>{
        const {locale} = useLocale()
        return(<Box sx={{background:`linear-gradient(rgba(0, 0, 0, 0.80), rgba(0, 0, 0, 0.80)), url(${background.src})`,backgroundSize:"cover",height:{md:"108vh",xs:"auto"},width:"100vw",alignItems:"center",display:"flex",flexDirection:"column",px:{md:10,xs:4}}}>
            <Grid container sx={{mt:{md:"15rem",xs:"5rem"}}}>
                <Grid item md={3} xs={12}>
                        <Typography fontSize={"48px"} lineHeight={"65.37px"} fontWeight={800} color={"#629460"} sx={{textAlign:{md:"left",xs:"center"}}}>{translateWord(locale,"MyBus")}</Typography>
                        <Typography fontSize={"20px"} lineHeight={"27.24px"} color={"#fff"} my={"1rem"} sx={{textAlign:{md:"left",xs:"center"}}}>{translateWord(locale,"Follow us on Socials")}</Typography>
                        <Box sx={{display:"flex",justifyContent:"space-between",width:"50%",mx:{md:0,xs:"auto"}}}>
                                <Image src={Facebook} width={"31px"} height={"31px"}/>
                                <Image src={Telegram} width={"24px"} height={"24px"}/>
                                <Image src={Instagram} width={"24px"} height={"24px"}/>
                        </Box>
                </Grid>
                <Grid item md={3} xs={12} sx={{my:{md:0,xs:"2rem"}}}>
                        <Typography color={"#A4A4A4"} mt={"0.7rem"} fontSize={"24px"} lineHeight={"32.68px"} textAlign="center">{translateWord(locale,"Company")}</Typography>
                        <Box height={"1px"} sx={{background:"#A4A4A4",width:"30%",margin:"0.5rem auto"}}/>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>{translateWord(locale,"Home")}</Typography>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>{translateWord(locale,"About Us")}</Typography>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>{translateWord(locale,"Contact Us")}</Typography>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>{translateWord(locale,"How To")}</Typography>
                </Grid>
                <Grid item md={3} xs={12} sx={{mb:{md:0,xs:"2rem"}}}>
                        <Typography color={"#A4A4A4"} mt={"0.7rem"} fontSize={"24px"} lineHeight={"32.68px"} textAlign="center">{translateWord(locale,"Carriers")}</Typography>
                        <Box height={"1px"} sx={{background:"#A4A4A4",width:"30%",margin:"0.5rem auto"}}/>
                        <Typography color={"#fff"} ml={{md:"6.2rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}}  my={"0.5rem"}>{translateWord(locale,"Abay Bus")}</Typography>
                        <Typography color={"#fff"} ml={{md:"6.2rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>{translateWord(locale,"Air Bus")}</Typography>
                        <Typography color={"#fff"} ml={{md:"6.2rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>{translateWord(locale,"FM Bus")}</Typography>
                        <Typography color={"#fff"} ml={{md:"6.2rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>{translateWord(locale,"Golden Bus")}</Typography>
                        <Typography color={"#fff"} ml={{md:"6.2rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>{translateWord(locale,"Selam Bus")}</Typography>
                        <Typography color={"#fff"} ml={{md:"6.2rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}}  my={"0.5rem"}>{translateWord(locale,"All Carriers")}</Typography>
                </Grid>
                <Grid item md={3} xs={12}>
                        <Typography color={"#A4A4A4"} mt={"0.7rem"} fontSize={"24px"} lineHeight={"32.68px"} textAlign="center">{translateWord(locale,"Contacts")}</Typography>
                        <Box height={"1px"} sx={{background:"#A4A4A4",width:"30%",margin:"0.5rem auto"}}/>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>Abay Bus</Typography>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>Air Bus</Typography>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>FM Bus</Typography>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>Golden Bus</Typography>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>Selam Bus</Typography>
                        <Typography color={"#fff"} ml={{md:"6rem",sm:"17.5rem",xs:"0"}} textAlign={{md:"inherit",sm:"inherit",xs:"center"}} my={"0.5rem"}>All Carriers</Typography>
                </Grid>
            </Grid>
            <Box sx={{pr:"2rem",width:"100%"}}>
                <Box sx={{background:"#D9D9D9",height:"1px",width:"100%",mt:"10rem"}}/>
            </Box>
            <Box sx={{display:"Grid",gridTemplateColumns:{md:"45% 43% 10%",xs:"auto"},width:"100%",px:{md:"1rem",xs:0},pt:"0.5rem"}}>
                <Typography color={"#fff"} my={"0.5rem"} sx={{fontSize:{md:"16px",xs:"12px"}}}>@{new Date().getFullYear()} - mybus . All rights reserved.</Typography>
                <Typography color={"#fff"} my={"0.5rem"} sx={{fontSize:{md:"16px",xs:"12px"}}}>Terms of Service</Typography>
                <Typography color={"#fff"} my={"0.5rem"} sx={{fontSize:{md:"16px",xs:"12px"}}}>Privacy Policy</Typography>
            </Box>
        </Box>)
}
export default Footer;