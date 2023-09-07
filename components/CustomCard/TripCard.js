import { useEffect,useState } from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { gql, useMutation } from '@apollo/client';
import { Button,Typography,Box, Divider, IconButton,Menu,MenuItem } from '@mui/material';
import { useRouter } from "next/router";
import { translateWord } from '../../utils/languageTranslation';
import { useLocale } from '../../utils/LanguageContext';
import ConfirmDialog from '../confirmationDialog/ConfirmDialog';
import CircularProgressWithLabel from '../circularProgress';

const ONEANDHALFHOUR = 60*60+60*30


const MUTATETICKETINFO = gql`
 mutation updateTicketInfo($referenceID:ID,$ticketId:ID,$ticketInfo:UpdateTicketInput!){
  updateTicketInfo(referenceID:$referenceID,ticketId:$ticketId,ticketInfo:$ticketInfo){
    status
  }
 }`
const TripCard = ({departure,destination,departureDate,bookingID,status,count,reservedAt})=>{
    const [openNav,setOpenNav] = useState(null)
    const {locale} = useLocale()
    const [openConfirm,setOpenConfirm] = useState(false)
    const [cancelTicket] = useMutation(MUTATETICKETINFO)
    const parseDate = (givenDate)=>{
        const amountOfTimeInSeconds = ONEANDHALFHOUR-((Date.now()-parseInt(givenDate))/1000)
        const amountOfTimeLeftInHours = parseInt(amountOfTimeInSeconds/3600)
        const amountOfTimeLeftInMinutes = parseInt((amountOfTimeInSeconds - amountOfTimeLeftInHours*3600)/60)
        const amountOfTimeLeftInSeconds = parseInt((amountOfTimeInSeconds - amountOfTimeLeftInHours*3600)- amountOfTimeLeftInMinutes*60)
        if(amountOfTimeLeftInHours<=0&&amountOfTimeLeftInMinutes<=0){
            return "0:00:00"
        }
        return amountOfTimeLeftInHours+":"+amountOfTimeLeftInMinutes+":"+amountOfTimeLeftInSeconds
    }

    const calculatePercentage = ()=>{
        const amountOfTimeElapsed = ((Date.now()-parseInt(reservedAt))/1000)
        const amountOfTimeLeft = ONEANDHALFHOUR - amountOfTimeElapsed
        return parseInt((amountOfTimeLeft/ONEANDHALFHOUR)*100)
    }

    const subtractOneSecond = (time)=>{
        let timeArr = time.split(":").map(val=>parseInt(val))
        if(timeArr[0]>0&&timeArr[1]===0){
            timeArr[0] = timeArr[0]-1
            timeArr[1] = 59
            if(timeArr[1].toString().length===1){
                timeArr[1] = "0"+timeArr[1]
            }
            timeArr[2] = 59
        }
        else if(timeArr[0]<=0&&timeArr[1]<=0){
            timeArr[0] = "0"
            timeArr[1] = "00"
            timeArr[2] = "00"        }
        else{
            if(timeArr[2]==0){
                timeArr[1] = timeArr[1]-1
                timeArr[2] = 59
            }
            else{
                timeArr[2] = timeArr[2]-1
            }
            if(timeArr[1].toString().length===1){
                timeArr[1] = "0"+timeArr[1]
            }
            if(timeArr[2].toString().length===1){
                timeArr[2] = "0"+timeArr[2]
            }
        }
    
        return timeArr[0]+":"+timeArr[1]+":"+timeArr[2]
    }
    const [timer,setTimer] = useState(parseDate(reservedAt))
    useEffect(()=>{
        setTimer(parseDate(reservedAt))
        setInterval(()=>{
            setTimer(prev=>subtractOneSecond(prev))
        },1000)
    },[])

    const router = useRouter()

    const goToViewTrips = ()=>{
        router.push(`myTrips/${bookingID}`)
        setOpenNav(null)
    }

    const openNavOnClick = (event)=>{
        setOpenNav(event.currentTarget)
      }
    
      const closeNavOnClick = ()=>{
        setOpenNav(null)
      }
    
    const handleClose = ()=>{
        setOpenConfirm(false)
    }

    const cancelAllTickets = async()=>{
        await cancelTicket({variables:{referenceID:ticketPurcahserInfo[0]['referenceID'],
      ticketInfo:{status:"TERMINATED",terminatedBy:"Call Center"}}})
    }

    const openConfirmClicked = ()=>{
        setOpenConfirm(true)
        setOpenNav(null)
    }

    const chooseButton = ()=>{
        if(status==="RESERVED"||status==="BOOKED"){
            return <Button variant="outlined" onClick={goToViewTrips}>{status==="RESERVED"?translateWord(locale,"Unpaid"):translateWord(locale,"Booked")}</Button>
        }
        else if(status==="CANCELLED"||status==="TERMINATED"){
            return <Button variant="contained" sx={{boxShadow:"-10px -10px 30px 0px #FFFFFF,10px 10px 30px 0px #AEAEC066,-10px -10px 10px 0px #AEAEC040 inset,10px 10px 10px 0px #C70102 inset"}}>{translateWord(locale,"Cancelled")}</Button>
        }
    }
    return (<>
    <Box sx={{display:"flex",flexDirection:"column",width:{md:"800px",xs:"100%"},boxShadow:"0px 0px 10px 0px #00000026",background:"#fff",p:"1rem",pb:"2rem",backgroundColor:"#F0F0F3",my:"1rem"}}>
                <CardHeader 
                action={
                <IconButton onClick={openNavOnClick}>
                    <MoreVertIcon />
                </IconButton>
                }
                sx={{py:0}}
                />
                <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={openNav}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(openNav)}
              onClose={closeNavOnClick}
            >
                <MenuItem onClick={goToViewTrips}>
                  <Typography textAlign="center">{translateWord(locale,"View Ticket(s)")}</Typography>
                </MenuItem>
                <MenuItem onClick={openConfirmClicked}>
                  <Typography textAlign="center">{translateWord(locale,"Cancel All Tickets")}</Typography>
                </MenuItem>
            </Menu>
                <Typography>{new Date(parseInt(departureDate)).toDateString()}</Typography>
                <Divider />
                <Box sx={{display:"flex",justifyContent:"space-between",mt:"0.5rem",cursor:"pointer"}} onClick={goToViewTrips}>
                    <Box sx={{display:"flex",flexDirection:"column"}}>
                        <Box sx={{display:"flex",alignItems:"center"}}><MyLocationIcon/> <Typography ml={departure.length<=5?4.5:2}>{translateWord(locale,departure)}</Typography></Box>
                            <span style={{background:"black",borderRadius:"50%",height:"5px",width:"5px",margin:"3px 0",marginLeft:"5rem"}}></span>
                            <span style={{background:"black",borderRadius:"50%",height:"5px",width:"5px",margin:"3px 0",marginLeft:"5rem"}}></span>
                            <span style={{background:"black",borderRadius:"50%",height:"5px",width:"5px",margin:"3px 0",marginLeft:"5rem"}}></span>
                            <span style={{background:"black",borderRadius:"50%",height:"5px",width:"5px",margin:"3px 0",marginLeft:"5rem"}}></span>
                            <span style={{background:"black",borderRadius:"50%",height:"5px",width:"5px",margin:"3px 0",marginLeft:"5rem"}}></span>
                            <span style={{background:"black",borderRadius:"50%",height:"5px",width:"5px",margin:"3px 0",marginLeft:"5rem"}}></span>
                        <Box sx={{display:"flex",alignItems:"center"}}><LocationOnIcon/> <Typography ml={destination.length<=5?4.5:2}>{translateWord(locale,destination)}</Typography></Box>
                    </Box>
                    <Box sx={{display:{md:"none",xs:"flex"},flexDirection:"column"}}>
                        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <Typography>{count} {translateWord(locale,"Ticket(s)")}</Typography>
                            <CircularProgressWithLabel label={timer} value={calculatePercentage()}/>
                        </Box>
                        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                            <Typography mb={"1rem"}>{translateWord(locale,"Booking ID")}: {bookingID}</Typography>
                            {chooseButton()}
                        </Box>
                    </Box>
                    <Box sx={{display:{md:"flex",xs:"none"},flexDirection:"column",justifyContent:"space-between",alignItems:"center",ml:"2rem"}}>
                        <Typography>{translateWord(locale,"Booking ID")}: {bookingID}</Typography>
                        <Typography>{count} {translateWord(locale,"Ticket(s)")}</Typography>
                    </Box>
                    <Box sx={{display:{md:"flex",xs:"none"},alignItems:"center",justifyContent:"space-between",width:"150px"}}>
                        <Typography>{timer}</Typography>
                        {chooseButton()}
                    </Box>
                </Box>
        </Box>
        <ConfirmDialog openModal={openConfirm} buttonText1={translateWord(locale,"Yes")} buttonText2={translateWord(locale,"No")} onButtonText1Click={cancelAllTickets} onButtonText2Click={handleClose} handleClose={handleClose} content={translateWord(locale,"Are you sure you want to delete all the ticket(s)?")}/>
    </>)
} 

export default TripCard