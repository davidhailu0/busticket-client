import { Button } from "@mui/material";
import { createTheme,ThemeProvider } from "@mui/material";

const customThemeBtn = createTheme({
    palette:{
        primary:{
            main:"#768463"
        }
    }
})

const OutlinedButton = ({children,onClick,width="150px",height="40px",fontSize="16px",lineHeight="27.24px"})=>{
    return <ThemeProvider theme={customThemeBtn}>
        <Button
        variant="outlined"
        onClick={onClick}
        sx={{width,textTransform:"none",height,fontWeight:700,fontFamily:"poppins",ml:"0.5rem",mr:"1.3rem",
        fontSize,
        lineHeight   
    }}
    >
        {children}
    </Button>
  </ThemeProvider>
}

export default OutlinedButton;