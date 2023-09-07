import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography,TextField,InputAdornment,Tooltip,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {gql,useMutation} from "@apollo/client"
import DialogContent from '@mui/material/DialogContent';
import Phone from '@mui/icons-material/Phone';
import { ToastContainer,toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import {validatePhone} from "../../utils/validate"
import ContainedButton from '../Button/containedButton';
import { useLocale } from '../../utils/LanguageContext';
import { translateWord } from '../../utils/languageTranslation';
import { Close } from '@mui/icons-material';
import OTPInputModal from '../OTPInputModal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  const MUTATESENDOTP = gql`
  mutation forgotPasswordUser($phoneNumber:String){
    forgotPasswordUser(phoneNumber:$phoneNumber){
      _id
      OTP
    }
  }`

export default function ForgotPasswordModal({open,handleClose,openLogin}) {
    const [phoneNumber,setPhoneNumber] = useState("")
    const [phoneNumberError,setPhoneNumberError] = useState(false)
    const [sendOTP] = useMutation(MUTATESENDOTP)
    const [userID,setUserID] = useState("")
    const [openOTPModal,setOpenOTPModal] = useState(false)
    const {locale} = useLocale()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(()=>{
      if(userID!==""){
        setOpenOTPModal(true)
      }
    },[userID])
  
    const checkValues = ()=>{
      let returnedValue = true
      if(phoneNumber.trim()===""||phoneNumberError){
        returnedValue = false
        setPhoneNumberError(true)
      }
      return returnedValue
    }

    const handleCloseOTPModal = ()=>{
      setOpenOTPModal(false)
      setUserID("")
      handleClose()
    }
  
    const sendOTPClicked = async()=>{
      if(checkValues()){
        try{
          const sendOTPData = await sendOTP({variables:{
            phoneNumber:phoneNumber
          }})
          toast.success(translateWord(locale,"Check your phone, OTP has been sent"))
          setUserID(sendOTPData['data']['forgotPasswordUser']['_id'])
        }
        catch(e){
          toast.error(translateWord(locale,e.message))
        }
      }
    }
  
    const handlePhoneChange = (e)=>{
      setPhoneNumber(e.target.value.trim())
      if(validatePhone(e.target.value.trim())){
        setPhoneNumberError(false)
      }
      else{
        setPhoneNumberError(true)
      }
    }
  
    return (
        <>
        <ToastContainer position="top-center"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"/>
          <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="md"
          fullScreen={fullScreen}
          sx={{my:fullScreen?"20%":0,mx:fullScreen?"1.5%":0}}
        >
          <Box sx={{width:{md:"848px",sm:"auto",xs:"97vw"},height:"520px",overflowX:"hidden",overflowX:"hidden",pt:{md:"16px",sm:"16px",xs:"5%"},px:{md:"16px",sm:"20px",xs:"2%"}}}>
          < Box sx={{display:'flex',justifyContent:"flex-end"}}>
            <IconButton onClick={handleClose}>
              <Close/>
            </IconButton>
          </Box>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",pt:2,px:0}}>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"start",width:"100%",pl:{md:"9rem",xs:0},mb:"2rem",ml:{md:0,xs:"2.5rem"}}}>
                <Typography fontWeight={700} fontSize={"20px"} color={"#CCCCCC"}>{translateWord(locale,"Forgot Password")}</Typography>
                <Typography mt={1} mb={3}>{translateWord(locale,"Enter Phone Number")} </Typography>
            </Box>
            <Tooltip title={phoneNumberError?translateWord(locale,"Please Enter a Valid Phone Number"):""}>
            <TextField InputProps={{
                          startAdornment: (
                              <InputAdornment position="start">
                              <Phone/>
                              </InputAdornment>
                          )
                      }}  label={translateWord(locale,"Phone Number")} name="phone number" id="phone number" value={phoneNumber} sx={{width:{md:"522px",sm:"67vw",xs:"85vw"},my:"1rem"}} onChange={handlePhoneChange} error={phoneNumberError}/>
            </Tooltip>    
            <Box sx={{display:"flex",justifyContent:"flex-end",width:"100%",pt:2,pr:{md:17.2,xs:2}}}>
                    <Button variant='text' sx={{color:"#768463",textTransform:"none",fontWeight:700}} onClick={openLogin}>
                        {translateWord(locale,"Go Back")}
                    </Button>
                 </Box>    
                  <Box sx={{display:"flex",justifyContent:"center",width:"100%",pt:2,}}>
                    <ContainedButton width='522px' height='48px' onClick={sendOTPClicked} ml={{md:0,xs:"1rem"}}>
                        {translateWord(locale,"Send OTP")}
                    </ContainedButton>
                 </Box>
            </Box>
          </Box>
        </BootstrapDialog>
        <OTPInputModal open={openOTPModal} handleClose={handleCloseOTPModal} resendOTP={sendOTPClicked} userID={userID}/>
        </>
    );
  }