import { Box,Typography } from "@mui/material";
import Image from "next/image";

const BusCard = ({img,BusName})=>{
    return (<Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",width:{md:"176px",xs:"130px"},height:"193px",borderRadius:"5px",boxShadow:"-10px -10px 30px 0px rgba(255, 255, 255, 1),10px 10px 30px 0px rgba(174, 174, 192, 0.4)"}}>
        <Image src={img} height={"106px"} width={"106px"} style={{borderRadius:"50%"}}/>
        <Typography fontWeight={600}>{BusName}</Typography>
    </Box>)
}

export default BusCard;