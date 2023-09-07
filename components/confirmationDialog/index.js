import Button from '@mui/material/Button';
import { Box,Grid,Typography,IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Phone from '@mui/icons-material/Phone';
import Person from '@mui/icons-material/Person';
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

export default function ConfirmationDialog({open,setOpen,name,phone,registerUser}) {
  const {locale} = useLocale()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const handleClose = () => {
    setOpen(false);
  };

  return (
        <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={'md'}
        fullScreen={fullScreen}
        sx={{my:fullScreen?"20%":0,mx:fullScreen?"1.5%":0}}
      >
        <DialogContent sx={{width:{md:"650px",sm:"auto",xs:"97vw"},height:"400px",overflowX:"hidden",pt:{md:"16px",sm:"16px",xs:"5%"},px:{md:"16px",sm:"20px",xs:"2%"}}}>
          < Box sx={{display:'flex',justifyContent:"flex-end"}}>
            <IconButton onClick={handleClose}>
              <Close/>
            </IconButton>
          </Box>
          <Box sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",p:"2rem 1rem 2rem 2rem"}}>
          <Typography fontWeight={700} fontSize={"20px"} sx={{color:"#CCCCCC"}}>{translateWord(locale,"Contact Information")}</Typography>
          <Typography sx={{my:"1rem"}}>{translateWord(locale,"Contact Information will be used for communication regarding payment of the trip.")}</Typography>
          <Grid container my={3}>
            <Grid item md={6} sm={6} xs={12} sx={{display:"flex",alignItems:"center",my:{md:0,xs:"1rem"}}}>
              <Person/>
              <Typography ml={2} fontWeight={600} fontSize={"20px"}>{name}</Typography>
            </Grid>
            <Grid item md={6} sm={6} xs={12} sx={{display:"flex",alignItems:"center",justifyContent:{sm:"end",xs:"flex-start"},pr:"3rem"}}>
              <Phone/>
              <Typography ml={2} fontWeight={600} fontSize={"20px"}>{phone}</Typography>
            </Grid>
          </Grid>
          <Box sx={{display:"flex",justifyContent:"flex-end",width:"100%",pt:2,pr:"2rem"}}>
                  <Button variant='text' id={"cancel"} sx={{textTransform:"none"}} onClick={handleClose}>
                        {translateWord(locale,"Cancel")}
                    </Button>
                    <Button variant='text' id={"ok"} sx={{textTransform:"none",ml:"1.5rem",color:"black",fontWeight:700}} onClick={registerUser}>
                        {translateWord(locale,"Ok")}
                    </Button>
               </Box>     
          </Box>
        </DialogContent>
      </BootstrapDialog>
  );
}