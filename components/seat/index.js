import { useState,useEffect } from "react"
import { Typography,Box } from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import { useSeatInfoContext } from "../../utils/seatPickerContext";
import { usePassengerInfo } from "../../utils/PassengerInfoContext";
import Image from "next/image";
import YellowSeat from "../../Assets/images/yellowSeat.svg"
import GreenSeat from "../../Assets/images/greenSeat.svg"
import GreySeat from "../../Assets/images/greySeat.svg"

const Seat = ({seatNumber,openSnackBar}) => {
  const [status,setStatus] = useState("green")
  const {bookedSeatState,bookedSeats} = useSeatInfoContext()
  const {state,dispatch,socket} = usePassengerInfo()

  useEffect(()=>{
    checkStatus()
  },[bookedSeatState])


  const updateReservedSeats = async(seatNumbers)=>{
     socket.emit("reservedSeat",JSON.stringify({
      tripId:state.tripId,
      passenger:localStorage.getItem("USERID"),
      seatNumbers
     }))
  }

  const changeStatus = async()=>{
    const allBookedSeats = Object.values(bookedSeatState[state.tripId]).reduce((res,cur)=>{
        return [...res,...cur]
    },[])
    const userReservation = bookedSeatState[state.tripId][localStorage.getItem("USERID")]

    if((userReservation&&!userReservation.includes(seatNumber)&&allBookedSeats.includes(seatNumber))||(!userReservation&&allBookedSeats.includes(seatNumber))){
      openSnackBar("The Selected Seat is not available")
    }
    else if(userReservation&&userReservation.includes(seatNumber)){
      dispatch({type:{indicator:seatNumber}})
      let reservedSeats = bookedSeatState[state.tripId][localStorage.getItem("USERID")].filter(st=>st!==seatNumber)
      await updateReservedSeats(reservedSeats)
    }
    else if(!allBookedSeats.includes(seatNumber)){
      if(state.numberOfPassengers>state.reservedSeats.length){
        dispatch({type:{indicator:seatNumber}})
        updateReservedSeats([...state.reservedSeats,seatNumber])
      }
      else{
        openSnackBar("Please increase the number of Seats")
      }
    }
  }

  const checkStatus = ()=>{
    const allBookedSeats = Object.values(bookedSeatState[state.tripId]).reduce((res,cur)=>{
      return [...res,...cur]
  },[])
    const userReservation = bookedSeatState[state.tripId][localStorage.getItem("USERID")]
    if(userReservation&&userReservation.includes(seatNumber)){
        setStatus("yellow")
    }
    else if(allBookedSeats.includes(seatNumber)||bookedSeats.includes(seatNumber)){
        setStatus("grey")
    }
    else{
        setStatus("green")
    }
  }

  const seatColorChoice = ()=>{
    if(status==="green"){
      return GreenSeat
    }
    else if(status==="yellow"){
      return YellowSeat
    }
    return GreySeat;
  }

  return(<Box sx={{boxSizing:"border-box",height:{md:"50px",sm:"50px"},width:{md:"50px",sm:"50px"},display:"flex",justifyContent:"center",alignItems:"center",margin:"0rem",position:"relative",cursor:"pointer"}} onClick={changeStatus}>
      <Box sx={{ display: state.indicator==seatNumber?'flex':"none",justifyContent:"center",position:"absolute",top:0,background:"rgba(0,0,0,0.2)",zIndex:20,height:"40px",width:"40px"}}>
        <CircularProgress sx={{color:"#fff"}} size={30}/>
      </Box>
      <Box sx={{display:{md:"block",sm:"block",xs:"none"},height:{md:"50px",sm:"60px"},width:{md:"50px",sm:"50px"}}}>
        <Image src={seatColorChoice()} height={"50px"} width={"54.16px"}/>
      </Box>
      <Box sx={{display:{md:"none",sm:"none",xs:"block"},height:"3rem",width:"3rem"}}>
        <Image src={seatColorChoice()} fill alt={"seat"}/>
      </Box>
      <Typography fontWeight={"bold"} color="white" sx={{position:"absolute",top:{md:"0.4rem",sm:"0rem",xs:"0.5rem"},cursor:"pointer",fontSize:{md:"16px",xs:"14px"}}}>{seatNumber}</Typography>
  </Box>)
}

export default Seat
