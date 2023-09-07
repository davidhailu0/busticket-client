import { Button } from "@mui/material";
import { createTheme,ThemeProvider } from "@mui/material";

const customThemeBtn = createTheme({
    palette:{
        primary:{
            main:"#629460"
        }
    }
})

const ContainedButton = ({children,id,onClick,width="150px",height="40px",fontSize="16px",lineHeight="27.24px",mr="1.3rem",mt=0,ml=0})=>{
    return <ThemeProvider theme={customThemeBtn}>
        <Button
        id={id}
        variant='contained'
        onClick={onClick}
        sx={{width,textTransform:"none",height,fontWeight:700,fontFamily:"poppins",ml:"0.5rem",mr,mt,ml,
        fontSize,
        lineHeight   
    }}
    >
        {children}
    </Button>
  </ThemeProvider>
}

export default ContainedButton;