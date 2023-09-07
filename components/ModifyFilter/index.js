import { useEffect, useReducer, useState } from "react";
import {Button,Grid,Box,Typography,SvgIcon,IconButton} from "@mui/material"
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from "next/router";
import { useLocale } from "../../utils/LanguageContext";
import { translateWord } from "../../utils/languageTranslation";
import { usePassengerInfo } from "../../utils/PassengerInfoContext";

const customTheme = createTheme({
    palette:{
        primary:{
            main:"#629460",
        },
    }
})

const reducer = (state,action)=>{
    return {...state,...action.type}
}

const ModifySearch = ()=>{
    const [filterState,filterDispatch] = useReducer(reducer,{
        departure:"",
        destination:"",
        date:{day:"",month:"",year:""}
    })
    const {state,dispatch} = usePassengerInfo()
    const router = useRouter()
    const {locale} = useLocale()
    useEffect(()=>{
        const date = new Date(parseInt(sessionStorage.getItem("Departure Date")))
        filterDispatch({type:{departure:localStorage.getItem("Choose Departure"),
        destination:localStorage.getItem("Choose Destination"),
        date:{day:date.getDate(),month:date.getMonth()+1,year:date.getFullYear()}
        }})
    },[])

    const swapPlaces = async()=>{
        sessionStorage.setItem("Choose Departure",filterState.destination)
        sessionStorage.setItem("Choose Destination",filterState.departure)
        const tempDeparture = filterState.departure;
        filterDispatch({type:{
            departure:filterState.destination,
            destination:tempDeparture
        }})
        dispatch({type:{tabIndex:0,availablePickupLocations:[]}})
        await router.push(`tripResult?departure=${filterState.destination}&destination=${filterState.departure}&departureDate=${sessionStorage.getItem("Departure Date")}`)
    }
    const goToHomePage = ()=>{
        router.replace("/")
    }
    return(
        <ThemeProvider theme={customTheme}>
        <Grid container sx={{display:"flex",width:{md:"870px",xs:"90%"},height:"72px",alignItems:"center",margin:"0 auto",justifyContent:"center",mt:"1rem",border:{md:"solid 1px #629460",xs:"none"},borderRadius:"5px"}}>
            <Grid item md={3} xs={6} sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",width:{md:"75%",xs:"100%"},alignItems:"center",justifyContent:"center",height:{md:"70px",xs:"55px"},border:{md:"none",xs:"1px solid #629460"},borderRadius:{md:"5px",xs:"5px 0 0 5px"},borderLeft:"0.25px solid #000"}}>
                    <SvgIcon>
                        <FmdGoodIcon/>
                    </SvgIcon>
                    <Typography ml={2}>{translateWord(locale,filterState.departure)}</Typography>
                </Box>
                <Box sx={{display:"flex",alignItems:"center"}}>
                    <IconButton sx={{background:"white",border:"1px solid #629460",height:{md:"30px",xs:"20px"},width:{md:"30px",xs:"20px"},position:{md:"relative",xs:"absolute"},left:{md:"1rem",xs:"48vw",sm:"48.5vw"},":hover":{background:"white"}}} onClick={swapPlaces}><CompareArrowsIcon fontSize="small"/></IconButton>
                    <Box sx={{height:"70px",width:"1px",background:"#629460",display:{md:"flex",xs:"none"}}}></Box>
                </Box>
            </Grid>
            <Grid item md={3} xs={6} sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <Box sx={{display:"flex",width:{md:"75%",xs:"100%"},alignItems:"center",borderRadius:{md:"5px",xs:"0 5px 5px 0"},borderLeft:"0.25px solid #629460",justifyContent:"center",height:{md:"70px",xs:"55px"},border:{md:"none",xs:"1px solid #629460"}}}>
                    <SvgIcon>
                        <FmdGoodIcon/>
                    </SvgIcon>
                    <Typography ml={2}>{translateWord(locale,filterState.destination)}</Typography>
                </Box>
                <Box sx={{display:{md:"flex",xs:"none"}}}>
                    <Box sx={{height:"70px",width:"1px",background:"#629460"}}></Box>
                </Box>
            </Grid>
            <Grid item md={6} xs={6} sx={{display:"flex",alignItems:"center",}}>
                <Box sx={{display:{md:"flex",xs:"block"},justifyContent:"space-between",width:"100%",alignItems:"center",height:{md:"70px",xs:"45px"},px:{md:"1rem",xs:0}}}>
                    <Box sx={{display:"flex",alignItems:"center",border:{xs:"1px solid #629460",md:"none"},borderRadius:"5px",height:{md:"70px",xs:"55px"},justifyContent:"center",my:"1rem"}}>
                        <SvgIcon>
                            <CalendarMonthIcon/>
                        </SvgIcon>
                        <Typography sx={{ml:"1rem"}}>{`${filterState.date.day}-${filterState.date.month}-${filterState.date.year}`}</Typography>
                    </Box>
                    <Button variant="outlined" sx={{textTransform:"none",display:{md:"block",xs:"none"}}} onClick={goToHomePage}>{translateWord(locale,"Modify Search")}</Button>
                </Box>
            </Grid>
            <Grid item xs={6} sx={{display:{xs:"flex",md:"none",justifyContent:"center",alignItems:"center"},alignItems:"center",pt:"2rem",pl:"1rem"}}>
                <Button variant="outlined" sx={{textTransform:"none",minWidth:"5rem"}} onClick={goToHomePage}>{translateWord(locale,"Modify Search")}</Button>
            </Grid>
        </Grid>
    </ThemeProvider>
    )
}

export default ModifySearch;