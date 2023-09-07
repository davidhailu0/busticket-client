import { useState } from "react";
import Image from "next/image"
import {CardContent,CardActions,Card,Button,Typography,Box} from "@mui/material"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postRequest } from "../../utils/request-api";
import busCompanies from "../../utils/busCompanies";
import swal from "sweetalert";

const customTheme = createTheme({
    palette:{
        primary:{
            main:"#10c9a7",
        },
    }
}) 

export default function ResultCard({starting_place,destination,date,price,busProvider,busLogo}){
  const [buttonText,setButtonText] = useState("Book Ticket")
  
  const buttonClicked = async()=>{
    const respData = await postRequest("/ticket/buyticket",{starting_place,destination,date,price})
    swal("Purchased!", `Your TicketId is ${respData.data._id}`, "success");
    setButtonText("Booked")
  }
    return (<Card sx={{width:{md:"45vw",xs:"80vw"},m:"0 2rem 0.5rem",mt:"2rem"}} testcomponent="resultcard">
        <CardContent sx={{display:"flex",justifyItems:'flex-start',pl:{md:"3.5rem",xs:"1rem"}}}>
          <Image src={`http://${process.env.NEXT_PUBLIC_APP_SERVER}:9000/${busLogo}`} height="90" width="100" alt={busProvider} />
          <Box sx={{display:"grid",justifyItems:'flex-start',width:"100%",ml:"1rem"}}>
          <Box sx={{display:"flex",justifyContent:"space-between",width:"100%"}}>
                <Typography sx={{ fontWeight:"bold",display:"flex",fontSize:{xs:"1rem"},width:{md:"30%",xs:"33vw"}}}>
              {starting_place}
            </Typography>
            <Box sx={{height:"5px",width:{md:"50%",xs:"20%"},background:"grey",margin:"0.5rem 1rem 0",display:"inline-flex"}}></Box>
            <Typography sx={{ fontWeight:"bold",display:"inline-flex",fontSize:{xs:"1rem"},width:{md:"30%",xs:"33vw"}}}>{destination}</Typography>
            </Box>
            <Typography sx={{ fontWeight:"bold",display:"flex",justifyContent:"flex-start"}}>Date: {new Date(parseInt(date)).toDateString()}</Typography>
            <Typography sx={{ fontWeight:"bold",display:"flex",justifyContent:"flex-start"}}>Price: {price} birr</Typography>
          </Box>
    </CardContent>
    <CardActions sx={{display:"flex",justifyContent:"flex-end"}}>
      <ThemeProvider theme={customTheme}>
        <Button variant="contained" testbutton="bookticket" sx={{color:"white",background:buttonText==="Book Ticket"?"#10c9a7":"black",":hover":{color:"white",background:"black"}}} testcomponent="bookticket" onClick={buttonClicked}>{buttonText}</Button>
        </ThemeProvider>
    </CardActions>
    </Card>)
}