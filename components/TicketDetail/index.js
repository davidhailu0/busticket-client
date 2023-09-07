import {Box,Typography} from "@mui/material"

const TicketDetail = ({_id,starting_place,destination,date,price})=>{

    return (<Box sx={{padding:{md:"2rem 20%",xs:"2rem 12%"},textAlign:{md:"center",xs:"start"},width:"80%",margin:"0 auto",borderRadius:"25px",background:"white"}}>
        <Typography variant="h3" sx={{fontSize:{md:"3rem",xs:"2rem"},textAlign:"center"}}>Your Ticket detail</Typography>
        <Box sx={{display:{md:"flex",xs:"grid"},justifyContent:{md:"left",xs:"flex-start"},my:"2rem"}}>
            <Typography variant="h3">ID:</Typography>
            <Typography variant="h3" sx={{marginLeft:{md:"6rem",xs:"0"},fontSize:{xs:"1.5rem"}}}>{_id}</Typography>
        </Box>
        <Box sx={{display:{md:"flex",xs:"grid"},justifyContent:"left",my:"2rem"}}>
            <Typography variant="h3">From:</Typography>
            <Typography variant="h3" sx={{marginLeft:{md:"2rem",xs:"0"},fontSize:{xs:"1.5rem"}}}>{starting_place}</Typography>
        </Box>
        <Box sx={{display:{md:"flex",xs:"grid"},justifyContent:"left",my:"2rem"}}>
            <Typography variant="h3">To:</Typography>
            <Typography variant="h3" sx={{marginLeft:{md:"5.3rem",xs:"0"},fontSize:{xs:"1.5rem"}}}>{destination}</Typography>
        </Box>
        <Box sx={{display:{md:"flex",xs:"grid"},justifyContent:"left",my:"2rem"}}>
            <Typography variant="h3">Date:</Typography>
            <Typography variant="h3" sx={{marginLeft:{md:"2.8rem",xs:"0"},fontSize:{xs:"1.5rem"}}}>{new Date(date).toDateString()}</Typography>
        </Box>
        <Box sx={{display:{md:"flex",xs:"grid"},justifyContent:"left",my:"2rem"}}>
            <Typography variant="h3">Price:</Typography>
            <Typography variant="h3" sx={{marginLeft:{md:"2rem",xs:"0"},fontSize:{xs:"1.5rem"}}}>{price} Birr</Typography>
        </Box>
    </Box>)
}
export default TicketDetail;