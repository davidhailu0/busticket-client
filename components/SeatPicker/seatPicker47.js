import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import Seat from "../../Assets/images/seat2"
import { usePassengerInfo } from '../../utils/PassengerInfoContext';
import { useSeatInfoContext } from '../../utils/seatPickerContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs({value,setValue}) {
  const [open,setOpen] = useState(false)
  const [openSnackSeatNotSelected,setOpenSnackSeatNotSelected] = useState(false)
  const {pickupLocations} = useSeatInfoContext()
  const {changeTab} = usePassengerInfo()
  const openSnackBar = ()=>{
    setOpen(true)
  }

  const handleClose = () => {
    setValue(false);
  };

  const closeSnackBar = ()=>{
    setOpen(false)
  }

  const closeSnackSeatNotSelected = ()=>{
    setOpenSnackSeatNotSelected(false)
  }

  const goToPassengerInfo = ()=>{
    if(sessionStorage.getItem("reservedSeats")){
      sessionStorage.removeItem("passengerInfo")
      sessionStorage.setItem("pickUpLocation",JSON.stringify(pickupLocations))
      handleClose()
      changeTab("1")
    }
    else{
      setOpenSnackSeatNotSelected(true)
    }
  }

  return (
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={value}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Select your Seats
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
             <SeatGrouper>
                  <Seat seatNumber={"1"}openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"2"} penSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"3"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"4"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"5"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"6"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"7"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"8"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"9"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"10"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"11"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"12"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"13"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"14"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"15"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"16"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"17"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"18"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"19"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"20"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"21"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"22"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"23"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"24"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"25"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"26"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"27"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"28"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"29"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"30"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"31"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"32"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"33"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"34"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"35"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"36"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"37"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"38"} openSnackBar={openSnackBar}/> 
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"39"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"40"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"41"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"42"} openSnackBar={openSnackBar}/>
             </SeatGrouper>
             <SeatGrouper>
                  <Seat seatNumber={"43"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"44"} openSnackBar={openSnackBar}/> 
                  <Seat seatNumber={"45"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"46"} openSnackBar={openSnackBar}/>
                  <Seat seatNumber={"47"} openSnackBar={openSnackBar}/>
             </SeatGrouper>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={goToPassengerInfo}>
            Confirm Seat
          </Button>
        </DialogActions>
        <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} open={open} onClose={closeSnackBar} message="The Selected Seat is not available"/>
        <Snackbar anchorOrigin={{vertical:"bottom",horizontal:"center"}} open={openSnackSeatNotSelected} onClose={closeSnackSeatNotSelected} message="Please Select at least one Seat"/>
      </BootstrapDialog>
  );
}

const SeatGrouper = ({children})=>{
  return (
  <Box sx={{display:"flex",justifyContent:'space-between'}}>
    <Box sx={{display:"flex"}}>
        {children[0]}
        {children[1]}
    </Box>
  <Box marginLeft={children.length===5?0:"5rem"}>
      <Box sx={{display:"flex"}}>
      {children[2]}
      {children[3]}
      {children[4]}
      </Box>
  </Box>
</Box>)
}