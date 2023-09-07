import { useEffect, useState} from 'react';
import { Box,Grid, Typography,Divider } from '@mui/material';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import YellowSeat from "../../Assets/images/yellowSeat.svg"
import GreySeat from "../../Assets/images/greySeat.svg"
import GreenSeat from "../../Assets/images/greenSeat.svg"
import Seat from "../seat"
import {  usePassengerInfo } from '../../utils/PassengerInfoContext';
import ContainedButton from '../Button/containedButton';
import { useLocale } from '../../utils/LanguageContext';
import { translateWord } from '../../utils/languageTranslation';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useMediaQuery} from '@mui/material';
import { useRouter } from 'next/router';

export default function SeatPickerPage({numberOfSeats}) {
  const [open,setOpen] = useState({state:false,message:"The Selected Seat is not available"})
  const [openSnackSeatNotSelected,setOpenSnackSeatNotSelected] = useState(false)
  const {state,dispatch,socket} = usePassengerInfo()
  const router = useRouter()
  const {locale} = useLocale()

  const mq360 = useMediaQuery('(max-width:360px)')
  const mq375 = useMediaQuery('(max-width:375px)')
  const mq393 = useMediaQuery('(max-width:393px)')
  const mq412 = useMediaQuery('(max-width:412px)');
  const mq414 = useMediaQuery('(max-width:414px)');

  useEffect(()=>{
    router.beforePopState(({as})=>{
      if(state.openSeatPicker){
        dispatch({type:{openSeatPicker:false}})
        window.history.pushState("",router.asPath,router.asPath)
        return false
      }
      return true
    })
    return () => {
      router.beforePopState(() => {
        dispatch({type:{openSeatPicker:false}})
        return true});
  };
  },[])

  const returnMargin = ()=>{
    if(mq360){
      return "43.7vw"
    }
    if(mq375){
      return "39vw"
    }
    if(mq393){
      return "34.4vw"
    }
    if(mq412){
      return "30.5vw"
    }
    if(mq414){
      return "31vw"
    }
  }

  const openSnackBar = (message)=>{
    setOpen({state:true,message})
  }

  const handleCloseNav = () => {
    dispatch({type:{openSeatPicker:false}})
  };

  const closeSnackBar = ()=>{
    setOpen({state:false,message:""})
  }

  const closeSnackSeatNotSelected = ()=>{
    setOpenSnackSeatNotSelected(false)
  }

  const goToPassengerInfo = ()=>{
    if(state.reservedSeats.length==state.numberOfPassengers){
      handleCloseNav()
      dispatch({type:{tabIndex:1}})
    }
    else{
      setOpenSnackSeatNotSelected(true)
    }
  }

  const increasePassengersCount = ()=>{
    if(state.numberOfPassengers<numberOfSeats){
      dispatch({type:{numberOfPassengers:state.numberOfPassengers+1}})
    }
  }

  const decreasePassengersCount = ()=>{
    if(state.numberOfPassengers>1){
      if(state.reservedSeats.length===state.numberOfPassengers){
        socket.emit("reservedSeat",JSON.stringify({
          tripId:state.tripId,
          passenger:localStorage.getItem("USERID"),
          seatNumbers:state.reservedSeats.filter(sts=>sts!==state.reservedSeats[state.reservedSeats.length-1])
        }))
        state.passengerInfo.pop()
        const newPassengerInfo = [...state.passengerInfo]
        state.selectedPickUpLocation.pop()
        const newSelectedPickupLocation = state.selectedPickUpLocation
        dispatch({type:{passengerInfo:newPassengerInfo,selectedPickUpLocation:newSelectedPickupLocation}})
      }
      dispatch({type:{numberOfPassengers:state.numberOfPassengers-1}})
    }
  }


  return (
        <Box sx={{position:"absolute",top:"5rem",left:0,right:0,bottom:0,background:"#F8F8F8",height:"auto",overflowX:"hidden",width:"100vw",zIndex:999,pl:{md:10,sm:10,xs:0},pr:{md:15,sm:10,xs:0},pb:"1rem"}}>
          <Grid container columnSpacing={1}>
            <Grid item md={6} sm={12} xs={12} sx={{position:"relative",overflowX:"hidden"}}>
              <Box sx={{display:"flex",flexDirection:"column",width:"100%",justifyContent:"space-between",alignItems:{md:"flex-start",sm:"center"}}}>
                <Typography sx={{display:"flex",justifyContent:{md:"flex-start",xs:"center"},fontWeight:600,fontSize:{md:"24px",sm:"20px",xs:"16px"}}}>{translateWord(locale,"Add Number of Seats")}</Typography>
                <Box sx={{display:"flex",justifyContent:"space-between",width:{md:"15rem",sm:"15rem",xs:"50%"},m:{md:0,sm:"0 auto",xs:"0 auto"}}}>
                      <IconButton sx={{border:"1px solid #eee",background:"#629460",":hover":{background:"#629460"}}} onClick={decreasePassengersCount}><RemoveIcon sx={{color:"#fff",fontSize:{md:32,sm:25,xs:16}}}/></IconButton>
                      <Typography sx={{borderRadius:"50%",background: "#E1E1E1",height:{md:"45px",sm:"40px",xs:"35px"},width:{md:"45px",sm:"40px",xs:"35px"},display:"flex",justifyContent:"center",alignItems:"center"}}>{state.numberOfPassengers}</Typography>
                      <IconButton sx={{border:"1px solid #eee",background:"#629460",":hover":{background:"#629460"}}} onClick={increasePassengersCount}><AddIcon sx={{color:"#fff",fontSize:{md:32,sm:25,xs:16}}} /></IconButton>
                </Box>
                <Box sx={{display:{md:"flex",sm:"none",xs:"none"},justifyContent:"space-between",width:"80%",mt:"3rem",mb:"1rem"}}>
                      <Typography fontWeight={700}>{translateWord(locale,"Passengers")}</Typography>
                      <Typography fontWeight={700}>{translateWord(locale,"Seat Numbers")}</Typography>
                      <Typography fontWeight={700}>{translateWord(locale,"Price")}</Typography>
                </Box>
                {state.reservedSeats.map((stNum,ind)=>{
                      return <Box key={stNum} sx={{display:{md:"flex",sm:"none",xs:"none"},justifyContent:"space-between",width:"80%",mt:"1rem"}}>
                            <Typography>{`${translateWord(locale,"Passenger")} ${ind+1}`}</Typography>
                            <Typography fontWeight={600}>{stNum}</Typography>
                            <Typography fontWeight={600}>{state.price}<span style={{fontWeight:400}}>{translateWord(locale,"(ETB)")}</span></Typography>        
                      </Box>
                })}
                <Divider sx={{mt:"1.5rem",width:"100%",display:{md:"block",sm:"none",xs:"none"}}}/>
                <Box sx={{display:{md:"flex",sm:"none",xs:"none"},justifyContent:"space-between",width:"80%",mt:"1.5rem"}}>
                      <Typography fontWeight={700} width={"92px"}>{translateWord(locale,"Total")}</Typography>
                      <Typography fontWeight={700} width={"110px"} textAlign={"center"}>{state.reservedSeats.length} {translateWord(locale,"Seat(s)")}</Typography>
                      <Typography fontWeight={700}>{parseInt(state.price)*state.reservedSeats.length} {translateWord(locale,"Birr")}</Typography>
                </Box>
                <Box sx={{display:{md:"flex",sm:"none",xs:"none"},justifyContent:"flex-end",width:"100%"}}>
                  {state.reservedSeats.length!==0&&<ContainedButton id={"confirm"} mt={"2rem"} onClick={goToPassengerInfo}>
                    {translateWord(locale,"Confirm")}
                  </ContainedButton>}
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box sx={{display:"flex",alignItems:"center",width:{md:"100%",xs:"100vw"},ml:{md:"7rem",xs:0}}}>
                <Typography display={{md:"none",sm:"block"}} fontWeight={700} mr={"4%"} ml={{sm:0,xs:"1rem"}}>{translateWord(locale,"Symbols")}</Typography>
                <Box sx={{display:"flex",alignItems:"center",width:"100%",my:"0.5rem"}}>
                <Box sx={{display:{md:"block",sm:"block",xs:"none"},height:"30px",width:"30px"}}>
                  <Image src={GreySeat} height={"30px"} width={"30px"} alt={"Grey Seat"}/>
                </Box>
                <Box sx={{display:{md:"none",sm:"none",xs:"block"},height:"25px",width:"25px"}}>
                    <Image src={GreySeat} fill alt={"Grey Seat"}/>
                </Box>
                  <Typography ml={"0.5rem"} fontSize={"12px"}>{translateWord(locale,"Not Available")}</Typography>
                </Box>
                <Box sx={{display:"flex",alignItems:"center",width:"100%",my:"0.5rem"}}>
                  <Box sx={{display:{md:"block",sm:"block",xs:"none"},height:"30px",width:"30px"}}>
                    <Image src={YellowSeat} height={"30px"} width={"30px"} alt={"yellow Seat"}/>
                  </Box>
                  <Box sx={{display:{md:"none",sm:"none",xs:"block"},height:"20px",width:"20px"}}>
                    <Image src={YellowSeat} fill alt={"Yellow Seat"}/>
                  </Box>
                  <Typography ml={"0.5rem"} fontSize={"12px"}>{translateWord(locale,"Reserved")}</Typography>
                </Box>
                <Box sx={{display:"flex",alignItems:"center",width:"100%",my:"0.5rem"}}>
                  <Box sx={{display:{md:"block",sm:"block",xs:"none"},height:"30px",width:"30px"}}>
                    <Image src={GreenSeat} height={"30px"} width={"30px"} alt={"Green Seat"}/>
                  </Box>
                  <Box sx={{display:{md:"none",sm:"none",xs:"block"},height:"20px",width:"20px"}}>
                    <Image src={GreenSeat} fill alt={"Green Seat"}/>
                  </Box>
                  <Typography ml={"0.5rem"} fontSize={"12px"}>{translateWord(locale,"Available")}</Typography>
                </Box>
              </Box>
              <Box className='seatContainer' sx={{display:"flex",boxSizing:"border-box",flexDirection:"column",justifyContent:"space-between",alignItems:"center",border:"1px solid #629460",borderRadius:"15px",px:{md:"5rem",sm:"5.5rem",xs:"9%"},pl:{md:"5rem",sm:"5.5rem",xs:"15%"},py:{md:0,sm:"0.5rem",xs:"0.5rem"},width:{md:"75%",sm:"70%",xs:"88%"},ml:{md:"9rem",sm:"20%",xs:"5%"},mr:{md:0,sm:0,xs:"7%"}}}>
              <Box sx={{display:"flex",justifyContent:"flex-end",height:"50px",width:"auto",ml:{md:"60%",sm:"60%",xs:returnMargin()},position:"relative",top:{md:"0.5rem",sm:"0.6rem",xs:"0.9rem"},left:{md:"0.35rem",sm:0,xs:0}}}>
                  <Seat seatNumber={"3"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"4"} openSnackBar={openSnackBar}/>
              </Box>
              <SeatGrouper>
                    <Seat seatNumber={"1"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"2"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"7"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"8"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"5"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"6"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"12"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"11"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"9"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"10"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"16"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"15"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"13"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"14"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"20"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"19"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"17"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"18"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"24"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"23"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"21"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"22"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"28"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"27"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"25"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"26"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"29"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"30"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"32"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"31"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"33"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"34"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"36"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"35"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"37"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"38"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"40"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"39"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"41"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"42"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"44"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"43"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
              <SeatGrouper>
                    <Seat seatNumber={"45"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"46"} openSnackBar={openSnackBar}/> 
                    <Seat seatNumber={"49"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"48"} openSnackBar={openSnackBar}/>
                    <Seat seatNumber={"47"} openSnackBar={openSnackBar}/> 
              </SeatGrouper>
            </Box>
            <Box sx={{display:{md:"none",sm:"flex",xs:"flex"},justifyContent:"space-between",width:{sm:"95%",xs:"95%"},mt:"3rem",mb:"1rem",px:{sm:"0",xs:"3%"}}}>
                      <Typography fontWeight={700}>{translateWord(locale,"Passengers")}</Typography>
                      <Typography fontWeight={700}>{translateWord(locale,"Seat Numbers")}</Typography>
                      <Typography fontWeight={700}>{translateWord(locale,"Price")}</Typography>
            </Box>
            {state.reservedSeats.map((stNum,ind)=>{
                      return <Box key={stNum} sx={{display:{md:"none",sm:"flex",xs:"flex"},justifyContent:"space-between",width:"95%",mt:"1rem",px:{sm:"0",xs:"3%"}}}>
                            <Typography>{`Passenger ${ind+1}`}</Typography>
                            <Typography fontWeight={600}>{stNum}</Typography>
                            <Typography fontWeight={600}>{state.price}<span style={{fontWeight:400}}>{translateWord(locale,"(ETB)")}</span></Typography>        
                      </Box>
            })}
            <Divider sx={{mt:"1.5rem",width:"100%",display:{md:"none",sm:"block"}}}/>
                <Box sx={{display:{md:"none",sm:"flex",xs:"flex"},justifyContent:"space-between",width:"95%",mt:"1.5rem",px:{sm:"0",xs:"3%"}}}>
                      <Typography fontWeight={700} width={"92px"}>{translateWord(locale,"Total")}</Typography>
                      <Typography fontWeight={700} width={"110px"} textAlign={"center"}>{state.reservedSeats.length} {translateWord(locale,"Seat(s)")}</Typography>
                      <Typography fontWeight={700}>{parseInt(state.price)*state.reservedSeats.length} {translateWord(locale,"Birr")}</Typography>
                </Box>
                <Box sx={{display:{md:"none",sm:"flex",xs:"flex"},justifyContent:"flex-end",width:"100%"}}>
                  {state.reservedSeats.length!==0&&<ContainedButton id={"confirm"} mt={"2rem"} onClick={goToPassengerInfo}>
                    {translateWord(locale,"Confirm")}
                  </ContainedButton>}
            </Box>
          </Grid>
        </Grid>
        <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} open={open['state']} onClose={closeSnackBar} message={translateWord(locale,open['message'])}/>
        <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} open={openSnackSeatNotSelected} onClose={closeSnackSeatNotSelected} message={translateWord(locale,"Please Select Seat(s) According to Number of Passengers")}/>
      </Box>
  );
}

const SeatGrouper = ({children})=>{
  return (
  <Box sx={{display:"flex",justifyContent:'flex-start',height:"40px",width:"100%"}}>
      <Box sx={{display:"flex",height:"60px",width:"auto"}}>
        {children[0]}
        {children[1]}
      </Box>
    <Box sx={{ml:{md:children.length===5?0:"3.2rem",sm:children.length===5?0:"3rem",xs:children.length===5?0:"3rem"},height:"40px",width:"100%"}}>
      <Box sx={{display:"flex",height:"60px",width:"auto"}}>
      {children[2]}
      {children[3]}
      {children[4]}
      </Box>
  </Box>
</Box>)
}