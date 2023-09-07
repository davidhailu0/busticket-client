import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {gql,useMutation} from "@apollo/client"
import DialogContent from '@mui/material/DialogContent';
import { ToastContainer,toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import ContainedButton from '../Button/containedButton';
import { useLocale } from '../../utils/LanguageContext';
import { translateWord } from '../../utils/languageTranslation';
import OtpInput from 'react18-input-otp';
import style from '../../styles/otp.module.css'
import NewPasswordModal from '../newPasswordModal';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Close } from '@mui/icons-material';
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
  mutation checkOTPUser($userID:ID,$OTP:String){
    checkOTPUser(userID:$userID,OTP:$OTP)
  }`

export default function OTPInputModal({open,handleClose,resendOTP,userID}) {
    const [otpValue,setOTPValue] = useState("")
    const [verifyOTP] = useMutation(MUTATESENDOTP)
    const [openNewPassword,setOpenNewPasswordModal] = useState(false)
    const {locale} = useLocale()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const checkValues = ()=>{
      let returnedValue = true
      if(otpValue.trim()===""||otpValue.length!=6){
        returnedValue = false
      }
      return returnedValue
    }
  
    const verifyOTPClicked = async()=>{
      if(checkValues()){
        try{
          await verifyOTP({variables:{
            userID,OTP:otpValue
          }})
         setOpenNewPasswordModal(true)
        }
        catch(e){
          toast.error(translateWord(locale,e.message))
        }
      }
    }
  
    const handleOTPChange = (otp)=>{
      setOTPValue(otp)
    }

    const handleCloseNewPassword = ()=>{
        handleClose()
        setOpenNewPasswordModal(false)
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
          <Box sx={{width:{md:"848px",sm:"auto",xs:"97vw"},height:"520px",pt:{md:"16px",sm:"16px",xs:"5%"},px:{md:"16px",sm:"20px",xs:"2%"}}}>
            < Box sx={{display:'flex',justifyContent:"flex-end"}}>
              <IconButton onClick={handleClose}>
                <Close/>
              </IconButton>
            </Box>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",p:2,px:0}}>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"start",width:"100%",pl:{md:"9rem",xs:0},mb:"2rem",ml:{md:0,xs:"2.5rem"}}}>
                <Typography fontWeight={700} fontSize={"20px"} color={"#CCCCCC"}>{translateWord(locale,"OTP")}</Typography>
                <Typography mt={1} mb={3}>{translateWord(locale,"Enter OTP")} </Typography>
            </Box>
            <OtpInput value={otpValue} onChange={handleOTPChange} numInputs={6} separator={<span>-</span>} inputStyle={style.otpStyle}/> 
            <Box sx={{display:"flex",justifyContent:"flex-end",width:"100%",pt:2,pr:{md:18,xs:2}}}>
                    <Button variant='text' sx={{color:"#629460",textTransform:"none",fontWeight:700}} onClick={resendOTP}>
                        {translateWord(locale,"Resend OTP")}
                    </Button>
                 </Box>    
                  <Box sx={{display:"flex",justifyContent:"center",width:"100%",pt:2}}>
                    <ContainedButton width='522px' height='48px' onClick={verifyOTPClicked} ml={{md:0,xs:"1rem"}}>
                        {translateWord(locale,"Submit")}
                    </ContainedButton>
                 </Box>
            </Box>
          </Box>
        </BootstrapDialog>
        <NewPasswordModal open={openNewPassword} handleClose={handleCloseNewPassword} userID={userID}/>
        </>
    );
  }