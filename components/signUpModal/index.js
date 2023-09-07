import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Box, Typography,TextField,InputAdornment,Tooltip,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {gql,useMutation} from "@apollo/client"
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import Phone from '@mui/icons-material/Phone';
import { ToastContainer,toast } from 'react-toastify';
import {validatePhone,validateName,validatePassword} from "../../utils/validate"
import ContainedButton from "../Button/containedButton"
import { useCookie } from '../../utils/cookies';
import ConfirmationDialog from '../confirmationDialog';
import { usePassengerInfo } from '../../utils/PassengerInfoContext';
import { useLocale } from '../../utils/LanguageContext';
import { translateWord } from '../../utils/languageTranslation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Close } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const MUTATESIGNUP = gql`
  mutation signupUser($input:UserSignupInput!){
   signupUser(user:$input){
     _id
     token
     role
   }
  }
 `;
 
 

export default function SignUpModal({open,setOpen,openSignIn,setToken,location}) {
  const PassengerInfo = usePassengerInfo()
  const [name,setName] = useState("")
  const [nameError,setNameError] = useState(false)
  const [phoneNumber,setPhoneNumber] = useState("")
  const [phoneNumberError,setPhoneNumberError] = useState(false)
  const [password,setPassword] = useState("")
  const [passwordError,setPasswordError] = useState(false)
  const [openConfirmation,setOpenConfirmation] = useState(false)
  const [signupUser] = useMutation(MUTATESIGNUP)
  const {setCookie} = useCookie()
  const {locale} = useLocale()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(()=>{
      if(PassengerInfo&&PassengerInfo.state.passengerInfo[0]&&PassengerInfo.state.passengerInfo[0]["name"]){
        setName(PassengerInfo.state.passengerInfo[0]["name"])
      }
      if(PassengerInfo&&PassengerInfo.state.passengerInfo[0]&&PassengerInfo.state.passengerInfo[0]["phoneNumber"]){
        setPhoneNumber(PassengerInfo.state.passengerInfo[0]["phoneNumber"])
      }
    },[PassengerInfo])

  const handleClose = () => {
    setOpen(false);
  };

  const signUpUser = async()=>{
    if(checkValuesSignUp()){
      try{
        const signUpData = await signupUser({variables:{input:{
          name: name,
          phoneNumber:phoneNumber,
          password
      }}})
      setCookie("token",signUpData["data"]["signupUser"]["token"])
      setToken(signUpData["data"]["signupUser"])
      handleClose()
      if(location!="APPBAR"){
        PassengerInfo.dispatch({type:{tabIndex:2}})
      }
      }
      catch(e){
        toast.error(e.message)
      }
    }
  }

  const handleNameChange = (e)=>{
    setName(e.target.value)
    if(validateName(e.target.value)){
        setNameError(false)
    }
    else{
        setNameError(true)
    }
  }

  const handlePhoneChange = (e)=>{
    setPhoneNumber(e.target.value)
    if(validatePhone(e.target.value)){
      setPhoneNumberError(false)
    }
    else{
      setPhoneNumberError(true)
    }
  }

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value.trim())
    if(validatePassword(e.target.value.trim())){
        setPasswordError(false)
    }
    else{
        setPasswordError(true)
    }
  }

  const checkContinue = ()=>{
    let returnedValue = true
    if(name===""||nameError){
        setNameError(true)
        returnedValue = false
    }
    if(phoneNumber===""||phoneNumberError){
        setPhoneNumberError(true)
        returnedValue = false
    }
    return returnedValue
  }

  const checkValuesSignUp = ()=>{
    let returnedValue = checkContinue()
    if(password===""||passwordError){
        setPasswordError(true)
        returnedValue = false
    }
    return returnedValue
  }


  const continueClicked = ()=>{
    if(checkContinue()){
      setOpen(false)
      setOpenConfirmation(true)
    }
  }

  const registerContactInformation = async()=>{
    setOpenConfirmation(false)
    if(PassengerInfo){
      PassengerInfo.dispatch({type:{tabIndex:2}})
    }
}

  return (<>
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
        maxWidth={"md"}
        fullScreen={fullScreen}
        sx={{my:fullScreen?"20%":0,mx:fullScreen?"1.5%":0}}
      >
        <Box sx={{width:{md:"848px",sm:"80vw",xs:"97vw"},height:{md:"800px",sm:"600px",xs:"auto"},overflowX:"hidden",pt:{md:"16px",sm:"16px",xs:"5%"},px:{md:"16px",sm:"20px",xs:"2%"}}}>
        < Box sx={{display:'flex',justifyContent:"flex-end"}}>
            <IconButton onClick={handleClose}>
              <Close/>
            </IconButton>
          </Box>
          <Box sx={{display:"flex",flexDirection:"column",alignItems:{md:"center",xs:"start"},px:{md:10,sm:0,xs:0},pt:0}}>
          <Box sx={{display:"flex",flexDirection:"column",alignItems:"start",width:"100%",pl:{md:"4rem",xs:"1rem"}}}>
              <Typography fontWeight={700} fontSize={"20px"} color={"#CCCCCC"} textAlign="left">{translateWord(locale,"Sign Up")}</Typography>
              <Box sx={{display:{md:"block",xs:"none"},mt:1,mb:3}}>
                <Typography display={"inline"}>{translateWord(locale,"Signing up allows you to see the full details of the ticket you purchased, as well as edit and cancel bookings.")}</Typography>
                <Typography fontWeight={600} display="inline">{translateWord(locale,"Create Password and Sign Up")}</Typography>
              </Box>
              <Box sx={{display:{xs:"block",md:"none"},mt:1,mb:3}}>
                <Typography>{translateWord(locale,"Create an account to fully access my bus")}</Typography>
              </Box>
          </Box>
          <Tooltip title={nameError?"Please Enter a valide name":""}>
          <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <PersonIcon/>
                            </InputAdornment>
                        )
                    }} label={translateWord(locale,"Name")} name="name" id="name" value={name} onChange={handleNameChange} error={nameError} sx={{width:{md:"522px",sm:"93%",xs:"85vw"},my:"1rem",ml:{xs:"1rem",md:0}}}/>
          </Tooltip>
          <Tooltip title={phoneNumberError?"Please Enter a valide Phone Number":""}>
          <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Phone/>
                            </InputAdornment>
                        )
                    }} label={translateWord(locale,"Phone Number")} name="phone number" id="phone number" value={phoneNumber} sx={{width:{md:"522px",sm:"93%",xs:"85vw"},my:"1rem",ml:{xs:"1rem",md:0}}} onChange={handlePhoneChange} error={phoneNumberError}/>
            </Tooltip>
            <Tooltip title={passwordError?"Please Enter a password with at least 8 characters":""}>
            <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <LockIcon/>
                            </InputAdornment>
                        )
                    }} label={translateWord(locale,"Password")} name="password" id="password" value={password} type={"password"} sx={{width:{md:"522px",sm:"93%",xs:"85vw"},my:"1rem",ml:{xs:"1rem",md:0}}} onChange={handlePasswordChange} error={passwordError}/>
            </Tooltip>
             <Box sx={{display:"flex",justifyContent:"space-between",width:"100%",pt:2,pl:{md:7.8,xs:1},pr:{md:5,xs:0}}}>
                  {location!="APPBAR"&&<Button variant='outlined' id={"continue"} sx={{height:"60px",width:{md:"217px",xs:"217px"},fontSize:"20px",textTransform:"none",fontWeight:700,mr:"0.5rem"}} onClick={continueClicked}>
                      {translateWord(locale,"Continue")}
                  </Button>}
                  <ContainedButton height='60px' id={"signup"} width={{md:location!="APPBAR"?'217px':'110%',sm:location!="APPBAR"?"217px":"110%",xs:location!="APPBAR"?"217px":"85vw"}} fontSize='20px' onClick={signUpUser} mr={{md:"1rem",sm:"1rem"}} ml={location!="APPBAR"?0:{md:'0',sm:0,xs:"0.5rem"}}>
                      {translateWord(locale,"Sign Up")}
                  </ContainedButton>
               </Box>
                <Typography textAlign={"center"} mt={5} width={"100%"}>{translateWord(locale,"Already have an account?")}<Button variant='text' sx={{display:"inline",color:"#768463"}} onClick={openSignIn}>{translateWord(locale,"Sign In")}</Button></Typography>
          </Box>
        </Box>
      </BootstrapDialog>
      <ConfirmationDialog open={openConfirmation} setOpen={setOpenConfirmation} name={name} phone={phoneNumber} registerUser={registerContactInformation}/>
      </>
  );
}