import { Box,Typography } from "@mui/material";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SvgIcon from "@mui/material/SvgIcon";
import Image from "next/image";

const ImageCard = ({label,img,onClick})=>{
    return (
            <Box onClick={onClick} onMouseMove={(e)=>{
                e.stopPropagation()
            }} sx={{display:"flex",flexShrink:0,flexDirection:"column",alignItems:"center",cursor:"pointer",mx:"1rem",background:"#fff",boxShadow: "0px 0px 10px 0px #00000026",width:"183.3px",height:"165.46px",pb:"0.5rem"}}>
                <Image src={img} alt={label} height={"150px"} width={"150px"}/>
                <Box sx={{display:"flex",width:"100%",justifyContent:"flex-start",px:"0.5rem",py:"0.5rem"}}>
                    <SvgIcon>
                         <FmdGoodIcon/>
                     </SvgIcon>
                    <Typography ml={"18%"}>{label}</Typography>
                </Box>
            </Box>
    )
}

export default ImageCard;