import Image from "next/image";
import { Grid,Typography,Box} from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { translateWord } from "../../utils/languageTranslation";
import { useLocale } from "../../utils/LanguageContext";
import WifiIcon from '@mui/icons-material/Wifi';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import UsbIcon from '@mui/icons-material/Usb';
import TimeFormatter from "../../utils/timeFormatter"
import SeatPicker from "../SeatPicker"
import { SeatInfoContext } from "../../utils/seatPickerContext";
import { useState,useEffect } from "react";
import uuid from "react-uuid";
import { usePassengerInfo } from "../../utils/PassengerInfoContext";
import ContainedButton from "../Button/containedButton";

const BusInfoContainer = (props)=>{
    const {locale} = useLocale()
    const [bookedSeatState,setBookedSeatsState] = useState({[props["_id"]]:{bookedSeats:[...props['bookedSeats'],...props["reservedSeats"]]}})
    const {state,dispatch,socket} = usePassengerInfo()
    const [width,setWidth] = useState(null)
    const [numberOfSeats,setNumberOfSeats] = useState(49)
    

    useEffect(()=>{
            socket.emit("tripId",JSON.stringify({tripId:props["_id"],bookedSeats:[...props['bookedSeats'],...props["reservedSeats"]]}))
            socket.on("UPDATERESERVED",(msg)=>{
            const tripArray = JSON.parse(msg);
            const foundTrip = tripArray.find((obj)=>obj[props["_id"]])
            if(foundTrip){
                setBookedSeatsState({[props["_id"]]:{bookedSeats:[...props['bookedSeats'],...props["reservedSeats"]],...foundTrip[props["_id"]]}})
                dispatch({type:{reservedSeats:!foundTrip[props["_id"]][localStorage.getItem("USERID")]?[]:[...foundTrip[props["_id"]][localStorage.getItem("USERID")]],indicator:"",
                            numberOfPassengers:!foundTrip[props["_id"]][localStorage.getItem("USERID")]?1:state.numberOfPassengers<foundTrip[props["_id"]][localStorage.getItem("USERID")].length?foundTrip[props["_id"]][localStorage.getItem("USERID")].length:state.numberOfPassengers}})
            }
        })
    },[props['_id'],socket])

    useEffect(()=>{
        socket.emit("tripId",JSON.stringify({tripId:props["_id"],bookedSeats:[...props['bookedSeats'],...props["reservedSeats"]]}))
        socket.on("UPDATERESERVED",(msg)=>{
            const tripArray = JSON.parse(msg);
            const foundTrip = tripArray.find((obj)=>obj[props["_id"]])
            if(foundTrip){
                let numberOfUnavailableSeats = 0;
                Object.keys(foundTrip[props["_id"]]).forEach(ky=>{
                    numberOfUnavailableSeats += foundTrip[props["_id"]][ky].length
                })
                setNumberOfSeats(49-numberOfUnavailableSeats)
            }
        })
    },[])

    useEffect(()=>{
        setWidth(window.screen.width)
        window.addEventListener("resize",(ev)=>{
            setWidth(document.body.clientWidth)
        })
    },[])

    const openDialog = ()=>{
        if(!localStorage.getItem("USERID")){
            localStorage.setItem("USERID",uuid())
        }
        dispatch({type:{tripId:props["_id"],price:parseInt(props["route"]["price"]),availablePickupLocations:props["departure"]===props["route"]["departure"]?props["route"]["pickupLocations"]:props["route"]["returnPickupLocations"].length==0?{message:"NO PICKUP LOCATION"}:props["route"]["returnPickupLocations"],
        reservationInfo:{...state.reservationInfo,busId:props["bus"]["_id"],time: props["departureTime"],date:props["departureDate"],departure:props["departure"],destination:props["destination"]},openSeatPicker:true}})
    }
    return (<Grid className="BusInfo" container sx={{display:"flex",width:{md:"1006px",sm:"100vw",xs:"100vw"},height:{md:"164px",sm:"164px",xs:"auto"},background:"white",justifyContent:"space-between",boxShadow: "0px 0px 10px 0px #00000026",my:{md:"1rem",sm:"1rem",xs:0}}}>
        <Grid item md={2} sm={2} xs={6} sx={{display:"flex",alignItems:"center"}}>
            <Box sx={{borderRadius:"50%",height:{md:"149px",sm:"110px",xs:"90.61px"},width:{md:"182px",sm:"110px",xs:"90px"},ml:{md:0,sm:0,xs:"2rem"},mt:{md:0,sm:0,xs:"1rem"}}}>
                {width&&<Image src={`${process.env.NEXT_PUBLIC_APP_SERVER}/${props["bus"]["busOwner"]["logo"]}`} height={width>900?"149px":"114px"} width={width>900?"182px":"140px"} alt="logo"/>}
            </Box>
        </Grid>
        <Grid item xs={6} sx={{display:{md:"none",sm:"none",xs:"flex"},justifyContent:"center",alignItems:"center",py:"1rem"}}>
            <Typography sx={{fontWeight:700}}>{props["route"]["price"]} <span style={{fontWeight:400}}>{translateWord(locale,"(ETB)")}</span></Typography>
        </Grid>
        <Grid item md={2} sm={3} xs={6} sx={{display:"flex",flexDirection:"column",justifyContent:"space-around",pl:"1.5rem"}}>
            <Typography fontWeight={700} fontSize={"20px"} my={{md:"0",sm:0,xs:"0.5rem"}}>{translateWord(locale,props["bus"]["busOwner"]["name"])}</Typography>
            <Typography sx={{color:"#2B2A2A",mb:"0.5rem"}}>{numberOfSeats + translateWord(locale," Seats Available")}</Typography>
            <Box sx={{display:"flex",mb:{md:0,sm:0,xs:"1rem"}}}>
                <Typography fontWeight={600}>{TimeFormatter(locale,props["departureTime"])}</Typography>
                {props["departureTime"].includes("4")?<DarkModeIcon sx={{ml:"1rem"}}/>:<WbSunnyIcon sx={{ml:"1rem",color:"orange"}}/>}
            </Box>
        </Grid>
        <Grid item md={2} sm={3} xs={6}>
            <Grid container rowGap={3} sx={{pt:"1rem",display:"flex",justifyContent:{md:"start",sm:"start",xs:"flex-end"}}}>
                <Grid item md={12} xs={12} sx={{ml:{xs:"2.5rem",sm:0,md:0}}} display={props["bus"]["features"].includes("WI-FI")?"flex":"none"}>{props["bus"]["features"].includes("WI-FI")&&<><WifiIcon/><Typography ml={1}>{translateWord(locale,"WI-FI")}</Typography></>}</Grid>
                <Grid item md={12} xs={12} sx={{ml:{xs:"2.5rem",sm:0,md:0}}} display={props["bus"]["features"].includes("Snack")?"flex":"none"}>{props["bus"]["features"].includes("Snack")&&<><LunchDiningIcon/><Typography ml={1}>{translateWord(locale,"Snack")}</Typography></>}</Grid>
                <Grid item md={12} xs={12} sx={{ml:{xs:"2.5rem",sm:0,md:0}}} display={props["bus"]["features"].includes("USB Charger")?"flex":"none"}>{props["bus"]["features"].includes("USB Charger")&&<><UsbIcon/><Typography ml={1}>{translateWord(locale,"USB Charger")}</Typography></>}</Grid>
            </Grid>
        </Grid>
        <Grid item xs={12} md={4} sm={5} sx={{display:{xs:"flex",sm:"none",md:"none"},flexDirection:"column",justifyContent:"space-between",alignItems:"flex-end",py:"1rem",pr:{md:"1.5rem",xs:0}}}>
            <ContainedButton id={"reserve"} onClick={openDialog} width={"197px"} height={"60px"} fontSize={"24px"} lineHeight={"32px"}>{translateWord(locale,"Reserve")}</ContainedButton>
        </Grid>
        <Grid item className="ButtonContainer" xs={12} sm={3} md={4} sx={{display:{md:"flex",sm:"flex",xs:"none"},flexDirection:"column",justifyContent:"space-between",alignItems:"flex-end",py:"1rem",pr:{md:"1.5rem",sm:0,xs:0}}}>
            <Typography sx={{mr:{md:"6.3rem",sm:"4rem"}}}><span style={{fontWeight:700}}>{props["route"]["price"]}</span> {translateWord(locale,"(ETB)")}</Typography>
            <ContainedButton id={"reserve"} onClick={openDialog} width={{md:"197px",xs:"160px"}} height={"60px"} fontSize={"24px"} lineHeight={"32px"}>{translateWord(locale,"Reserve")}</ContainedButton>
        </Grid>
        <SeatInfoContext.Provider value={{bookedSeatState,bookedSeats:props['bookedSeats']}}>
                {state.openSeatPicker&&<SeatPicker numberOfSeats={numberOfSeats}/>}
        </SeatInfoContext.Provider>
    </Grid>)
}

export default BusInfoContainer;