import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

export default function DialogWithChildren({openModal,handleClose,children,buttonText1,buttonText2,onButtonText1Click,onButtonText2Click}) {
  return (
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={openModal}
        onClose={handleClose}
      >
        <DialogTitle sx={{display:"flex",justifyContent:"flex-end"}}>
            <IconButton onClick={handleClose}>
                <CloseIcon/>
            </IconButton>
        </DialogTitle>
        <DialogContent sx={{display:"flex",justifyContent:"center"}}>
          {children}
        </DialogContent>
        <DialogActions sx={{display:"flex",justifyContent:"space-between",px:"3rem",height:"100px"}}>
          {buttonText1&&<Button variant='contained' onClick={onButtonText1Click}>{buttonText1}</Button>}
          {buttonText2&&<Button variant='outlined' onClick={onButtonText2Click}>{buttonText2}</Button>}
        </DialogActions>
      </Dialog>
  );
}
