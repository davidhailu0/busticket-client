import {Grid,Typography} from "@mui/material"
import Image from "next/image";

const CustomCard = ({children,svgIcon,title})=>{
    return (
        <Grid container sx={{height:{md:"400px",xs:"300px"},my:"1rem",width:"326px",py:"1.5rem",px:"1.5rem",borderRadius:"10px",border:"1px solid #CCCCCC",background:"#fff"}}>
            <Grid item md={12} xs={12} sx={{display:"flex",justifyContent:{md:"flex-start",xs:"center"}}}>
                <Image src={svgIcon} height={"131px"} width={"131px"}/>
            </Grid>
            <Grid item md={12} sx={{display:"flex"}}>
                <Typography fontWeight={700} fontSize={"24px"}>{title}</Typography>
            </Grid>
            <Grid item md={12}>
                {children}
            </Grid>
        </Grid>
    )
}

export default CustomCard;