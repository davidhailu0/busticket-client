import {Box,Typography} from "@mui/material"
import Appbar from "/components/appbar";
const MessageComponent = ({message})=>{
    return(<Box sx={{height:{md:"100vh",xs:"155vh"},pt:"5rem",background:"#f5f5f5"}}>
    <Appbar/>
    <Typography variant='h3'>{message}</Typography>
</Box>)
}

export default MessageComponent;