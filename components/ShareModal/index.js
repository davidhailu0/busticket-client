import {
    EmailShareButton,
    TelegramShareButton,
    FacebookShareButton,
    EmailIcon,
    TelegramIcon
  } from "react-share";
import { Box } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

export default function ShareModal({open,setOpen,url}) {
    
    const handleClose = ()=>{
        setOpen(false)
    }
  
    return (
          <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogContent sx={{width:"300px",height:"200px",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Box sx={{mx:"1rem"}}>
                <EmailShareButton title="My Bus Reserved Ticket" url={url} subject="Ticket has been Reserved for You"><EmailIcon size={32} round={true}/></EmailShareButton>
            </Box>
            <Box sx={{mx:"1rem"}}>
                <TelegramShareButton url={url}><TelegramIcon  size={32} round={true}/></TelegramShareButton>
            </Box>
          </DialogContent>
        </BootstrapDialog>
    );
  }