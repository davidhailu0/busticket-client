import { useState } from 'react';
import { Box, Typography, TextField, InputAdornment, Tooltip,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import {gql,useMutation} from "@apollo/client"
import { ToastContainer,toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import LockIcon from '@mui/icons-material/Lock';
import ContainedButton from '../Button/containedButton';
import { useLocale } from '../../utils/LanguageContext';
import { translateWord } from '../../utils/languageTranslation';
import { validatePassword } from '../../utils/validate';
import { useCookie } from '../../utils/cookies';
import { useTokenAccessContext } from '../../utils/tokenContext';
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

  const MUTATECHANGEPASSWORD = gql`
  mutation changePasswordUser($userID:ID,$newPassword:String){
    changePasswordUser(userID:$userID,newPassword:$newPassword){
      token
      role
    }
  }`

export default function NewPasswordModal({open,handleClose,userID}) {
    const [newPassword,setNewPassword] = useState("")
    const [newPasswordError,setNewPasswordError] = useState(false)
    const [confirmPassword,setConfirmPassword] = useState("")
    const [confirmPasswordError,setConfirmPasswordError] = useState(false)
    const [changePassword] = useMutation(MUTATECHANGEPASSWORD)
    const {setCookie} = useCookie()
    const {locale} = useLocale()
    const {setTokenAccess} = useTokenAccessContext()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const checkValues = ()=>{
      let returnedValue = true
      if(newPassword.trim()===""){
        setNewPasswordError(true)
        returnedValue = false
      }
      if(confirmPassword.trim()===""){
        setConfirmPasswordError(true)
        returnedValue = false
      }
      if(newPassword!==confirmPassword){
        setConfirmPasswordError(true)
        returnedValue = false
      }
      return returnedValue
    }
  
    const changePasswordClicked = async()=>{
      if(checkValues()){
        try{
          const changePasswordData = await changePassword({variables:{
            userID,newPassword:newPassword
          }})
          setCookie("token",changePasswordData["data"]["changePasswordUser"]["token"])
          setTokenAccess(changePasswordData["data"]["changePasswordUser"])
          toast.success(translateWord(locale,"Password Successfully Changed"))
          handleClose()
        }
        catch(e){
          toast.error(e.message)
        }
      }
    }

    const handleNewPasswordChange = (e)=>{
        setNewPassword(e.target.value)
        if(validatePassword(e.target.value)){
            setNewPasswordError(false)
        }
        else{
            setNewPasswordError(true)
        }
        if(validatePassword(e.target.value)&&e.target.value==confirmPassword){
          setConfirmPasswordError(false)
        }
    }

    const handleConfirmPasswordChange = (e)=>{
        setConfirmPassword(e.target.value)
        if(validatePassword(e.target.value)&&e.target.value==newPassword){
            setConfirmPasswordError(false)
        }
        else{
            setConfirmPasswordError(true)
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
          <Box sx={{width:{md:"848px",sm:"auto",xs:"97vw"},height:"520px",pt:{md:"16px",sm:"16px",xs:"5%"},px:{md:"16px",sm:"30px",xs:"2%"}}}>
          < Box sx={{display:'flex',justifyContent:"flex-end"}}>
              <IconButton onClick={handleClose}>
                <Close/>
              </IconButton>
            </Box>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",p:2}}>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"start",width:"100%",pl:{md:"8.2rem",xs:0},mb:"2rem"}}>
                <Typography fontWeight={700} fontSize={"20px"} color={"#CCCCCC"}>{translateWord(locale,"New Password")}</Typography>
                <Typography mt={1} mb={3}>{translateWord(locale,"Enter New Password")} </Typography>
            </Box>
            <Tooltip title={newPasswordError?translateWord(locale,"Please Enter New Password With Letters greater than 8"):""}>
            <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <LockIcon/>
                            </InputAdornment>
                        )
                    }} label={translateWord(locale,"New Password")} name="password" id="password" value={newPassword} type={"password"} sx={{width:{md:"522px",sm:"67vw",xs:"85vw"}}} onChange={handleNewPasswordChange} error={newPasswordError}/>
            </Tooltip>
            <Tooltip title={confirmPasswordError&&confirmPassword===""?translateWord(locale,"Please Enter The New Password Again"):confirmPassword!==newPassword?translateWord(locale,"The Passwords don't match"):""}>
            <TextField InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <LockIcon/>
                            </InputAdornment>
                        )
                    }} label={translateWord(locale,"Confirm Password")} name="password" id="password" value={confirmPassword} type={"password"} sx={{width:{md:"522px",sm:"67vw",xs:"85vw"},my:"1rem"}} onChange={handleConfirmPasswordChange} error={confirmPasswordError}/>
            </Tooltip>   
                  <Box sx={{display:"flex",justifyContent:"center",width:"100%",pt:2,}}>
                    <ContainedButton width='522px' height='48px' onClick={changePasswordClicked} mr={0}>
                        {translateWord(locale,"Change Password")}
                    </ContainedButton>
                 </Box>
            </Box>
          </Box>
        </BootstrapDialog>
        </>
    );
  }