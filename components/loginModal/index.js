import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography,TextField,InputAdornment,Tooltip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {gql,useMutation} from "@apollo/client"
import Dialog from '@mui/material/Dialog';
import LockIcon from '@mui/icons-material/Lock';
import Phone from '@mui/icons-material/Phone';
import { ToastContainer,toast } from 'react-toastify';
import { useRouter } from 'next/router';
import {validatePhone} from "../../utils/validate"
import { useCookie } from '../../utils/cookies';
import ContainedButton from '../Button/containedButton';
import { usePassengerInfo } from '../../utils/PassengerInfoContext';
import { useLocale } from '../../utils/LanguageContext';
import { translateWord } from '../../utils/languageTranslation';
import { Close } from '@mui/icons-material';
import ForgotPasswordModal from '../forgotPassword';
import { TokenAccessContext } from '../../utils/tokenContext';
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

const MUTATELOGIN = gql`
mutation login($credential:CredentialInput!){
      login(credential:$credential){
        token
        role
      }
}`

export default function Login({open,setOpen,openSignUp,setToken}) {
  const [phoneNumber,setPhoneNumber] = useState("")
  const [phoneNumberError,setPhoneNumberError] = useState(false)
  const [password,setPassword] = useState("")
  const [passwordError,setPasswordError] = useState(false)
  const [openForgotPassword,setForgotPassword] = useState(false)
  const {setCookie} = useCookie()
  const [loginUser] = useMutation(MUTATELOGIN)
  const router = useRouter()
  const passengerInfo = usePassengerInfo()
  const {locale} = useLocale()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(()=>{
      if(passengerInfo&&passengerInfo.state.passengerInfo.length>0&&passengerInfo.state.passengerInfo[0]["phoneNumber"])
      setPhoneNumber(passengerInfo.state.passengerInfo[0]["phoneNumber"])
  },[passengerInfo])

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseForgotPassword = () =>{
    setForgotPassword(false)
  }

  const openForgotPasswordClicked = ()=>{
    handleClose();
    setForgotPassword(true)
  }

  const checkValues = ()=>{
    let returnedValue = true
    if(phoneNumber===""||phoneNumberError){
      returnedValue = false
      setPhoneNumberError(true)
    }
    if(password===""){
      returnedValue = false
      setPasswordError(true)
    }
    return returnedValue
  }

  const login = async()=>{
    if(checkValues()){
      try{
        const loginData = await loginUser({variables:{
          credential:{
            phoneNumber,
            password
          }
        }})
        setCookie("token",loginData["data"]["login"]["token"])
        setToken(loginData["data"]["login"])
        handleClose()
        await router.replace(router.asPath)
      }
      catch(e){
        toast.error(translateWord(locale,e.message))
      }
    }
  }

  const openLoginFromForgot = ()=>{
    handleCloseForgotPassword()
    setOpen(true)
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

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value.trim())
  }

  return (
      <>
      <TokenAccessContext.Provider value={{setTokenAccess:setToken}}>
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
        <Box sx={{width:{md:"848px",sm:"600px",xs:"97vw"},height:{md:"600px",xs:"600px"},overflowX:"hidden",pt:{md:"16px",sm:"16px",xs:"5%"},px:{md:"16px",sm:"20px",xs:"2%"}}}>
          <Box sx={{display:'flex',justifyContent:"flex-end"}}>
            <IconButton onClick={handleClose}>
              <Close/>
            </IconButton>
          </Box>
          <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",pt:2,pb:0}}>
          <Box sx={{display:"flex",flexDirection:"column",alignItems:"start",width:"100%",pl:{md:"9rem",xs:0},mb:"2rem",ml:{md:0,xs:"2rem"}}}>
              <Typography fontWeight={700} fontSize={"20px"} color={"#CCCCCC"}>{translateWord(locale,"Log In")}</Typography>
              <Typography mt={1} mb={3}>{translateWord(locale,"Enter Phone Number and Password to LogIn.")} </Typography>
          </Box>
          <Tooltip title={phoneNumberError?translateWord(locale,"Please Enter a Valid Phone Number"):""}>
          <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Phone/>
                            </InputAdornment>
                        )
                    }}  label={translateWord(locale,"Phone Number")} name="phone number" id="phone number" value={phoneNumber} sx={{width:{md:"522px",sm:"68vw",xs:"85vw"},my:"1rem"}} onChange={handlePhoneChange} error={phoneNumberError}/>
          </Tooltip>  
          <Tooltip title={passwordError?translateWord(locale,"Please Enter a Valid Password"):""}>
            <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <LockIcon/>
                            </InputAdornment>
                        )
                    }} label={translateWord(locale,"Password")} name="password" id="password" value={password} type={"password"} sx={{width:{md:"522px",sm:"68vw",xs:"85vw"},my:"1rem"}} onChange={handlePasswordChange} error={passwordError}/>
          </Tooltip>  
          <Box sx={{display:"flex",justifyContent:"flex-end",width:"100%",pt:2,pr:{md:17.2,xs:2}}}>
                  <Button variant='text' sx={{color:"#629460",textTransform:"none",fontWeight:700}} onClick={openForgotPasswordClicked}>
                      {translateWord(locale,"Forgot Password?")}
                  </Button>
               </Box>    
                <Box sx={{display:"flex",justifyContent:"center",width:"100%",pt:2,}}>
                  <ContainedButton id={"login"} width='522px' height='48px' onClick={login} ml={{md:0,xs:'1rem'}}>
                      {translateWord(locale,"Log In")}
                  </ContainedButton>
               </Box>
              <Typography textAlign={"center"} mt={5}>{translateWord(locale,"Don't have an account yet ?")} <Button className={"signupAppbar"} variant='text' sx={{display:"inline",color:"#629460"}} onClick={openSignUp}>{translateWord(locale,"Sign Up")}</Button></Typography>
          </Box>
        </Box>
      </BootstrapDialog>
      <ForgotPasswordModal open={openForgotPassword} handleClose={handleCloseForgotPassword} openLogin={openLoginFromForgot}/>
      </TokenAccessContext.Provider>
      </>
  );
}