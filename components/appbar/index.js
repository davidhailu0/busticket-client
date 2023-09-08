import { useState, useEffect } from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import { Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "../loginModal";
import SignUpModal from "../signUpModal";
import { useCookie } from "../../utils/cookies";
import { useLocale } from "../../utils/LanguageContext";
import Link from "next/link";
import {
  languages,
  translateWord,
  changeLanguage,
} from "../../utils/languageTranslation";
import busLogo from "/Assets/images/oliveLogo.png";
import ContainedButton from "../Button/containedButton";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(0,0,0,0)",
    },
  },
});

const customTheme2 = createTheme({
  palette: {
    primary: {
      main: "#629460",
    },
  },
});

const imageWidth = 63;
const imageHeight = 50;

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [language, setLanguage] = useState(null);
  const router = useRouter();
  const { getCookie, setCookie } = useCookie();
  const { locale, token, setNewLocale } = useLocale();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [tokenAccess, setTokenAccess] = useState("");

  useEffect(() => {
    setTokenAccess(token);
  }, [token]);

  const handleOpenUserMenu = (event) => {
    setLanguage(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setLanguage(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const goTo = (url) => {
    setAnchorElNav(null);
    router.push(url, router.basePath, { locale: getCookie("NEXT_LOCALE") });
  };

  const changeSelectedLanguage = (lang) => {
    changeLanguage(lang, setCookie);
    if (setNewLocale) {
      setNewLocale(lang);
    }
    handleCloseUserMenu();
  };

  const chooseStyle = (pathName) => {
    if (router.asPath === "/" && pathName === "/") {
      return {
        fontFamily: "Open Sans",
        textTransform: "none",
        color: "#629460",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "27px",
      };
    } else if (router.asPath.includes(pathName) && pathName !== "/") {
      return {
        fontFamily: "Open Sans",
        textTransform: "none",
        color: "#629460",
        fontSize: "20px",
        fontWeight: 700,
        lineHeight: "27px",
      };
    } else {
      return {
        fontFamily: "Open Sans",
        textTransform: "none",
        color: "#629460",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "21.79px",
      };
    }
  };

  const openLoginModal = () => {
    setOpenLogin(true);
  };

  const openLoginFromSignUp = () => {
    setOpenSignUp(false);
    setOpenLogin(true);
  };

  const openSignUpFromLogin = () => {
    setOpenLogin(false);
    setOpenSignUp(true);
  };
  return (
    <ThemeProvider theme={customTheme}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ width: "100vw", borderBottom: "1px solid #ccc" }}
      >
        <Grid container>
          <Grid
            item
            md={4}
            sx={{ display: { xs: "none", md: "flex" } }}
            pl={10}
            py={1}
            alignItems={"center"}
          >
            <Link href={"/"}>
              <a>
                <Image
                  src={busLogo.src}
                  alt="My Bus Logo"
                  height={imageHeight}
                  width={imageWidth}
                />
              </a>
            </Link>
          </Grid>
          <Grid
            item
            md={5}
            sx={{
              display: { md: "flex", xs: "none" },
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ ml: "3rem" }}>
              {/*style={chooseStyle("/")} style={chooseStyle("/myTrips")}*/}
              <Button
                onClick={() => goTo("/")}
                sx={{
                  fontFamily: "Open Sans",
                  textTransform: "none",
                  color: "#000",
                  fontSize: "18px",
                  ":hover": { color: "#AAA" },
                }}
              >
                {translateWord(locale, "Find Trip")}
              </Button>
              <Button
                onClick={() => goTo("/myTrips")}
                sx={{
                  fontFamily: "Open Sans",
                  textTransform: "none",
                  color: "#000",
                  fontSize: "18px",
                  ":hover": { color: "#AAA" },
                }}
              >
                {translateWord(locale, "Check Trip")}
              </Button>
              {/* <Button onClick={()=>goTo("/other")} style={chooseStyle("/other")}>{translateWord(locale,"Others")}</Button> */}
            </Box>
          </Grid>
          <Grid
            item
            xs={8}
            pl={2}
            py={1}
            sx={{
              display: { md: "none", xs: "flex" },
              alignItems: "center",
              pl: { xs: 0, sm: 4 },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "#629460" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => goTo("/")}>
                <Typography textAlign="center">
                  {translateWord(locale, "Find Trip")}
                </Typography>
              </MenuItem>
              <MenuItem onClick={() => goTo("/myTrips")}>
                <Typography textAlign="center">
                  {translateWord(locale, "Check Trip")}
                </Typography>
              </MenuItem>
              {(!tokenAccess || tokenAccess.role !== "TICKET PURCHASER") && (
                <MenuItem onClick={() => openLoginModal()}>
                  <Typography textAlign="center">
                    {translateWord(locale, "Log In")}
                  </Typography>
                </MenuItem>
              )}
            </Menu>
            <Link href={"/"}>
              <a>
                <Image
                  src={busLogo.src}
                  alt="My Bus Logo"
                  height={30}
                  width={37.8}
                />
              </a>
            </Link>
          </Grid>
          <Grid
            item
            xs={4}
            py={1}
            sx={{
              display: { xs: "flex", md: "none" },
              pl: { xs: "0.7rem", sm: "5.5rem" },
            }}
          >
            <Button
              variant="text"
              sx={{ color: "#629460" }}
              onClick={() => openLoginModal()}
            >
              {translateWord(locale, "Log In")}
            </Button>
            <Tooltip title={translateWord(locale, "Change Language")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <LanguageIcon sx={{ color: "#629460" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={language}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(language)}
              onClose={handleCloseUserMenu}
            >
              {languages.map(({ lang, locale }) => {
                if (getCookie("NEXT_LOCALE") == undefined && locale != "eng") {
                  return (
                    <MenuItem
                      key={locale}
                      onClick={() => changeSelectedLanguage(locale)}
                    >
                      <Link
                        locale={locale}
                        href={router.asPath}
                        as={router.asPath}
                      >
                        <Typography textAlign="center">{lang}</Typography>
                      </Link>
                    </MenuItem>
                  );
                } else if (getCookie("NEXT_LOCALE")&&locale !== getCookie("NEXT_LOCALE"))
                  return (
                    <MenuItem
                      key={locale}
                      onClick={() => changeSelectedLanguage(locale)}
                    >
                      <Link
                        locale={locale}
                        href={router.asPath}
                        as={router.asPath}
                      >
                        <Typography textAlign="center">{lang}</Typography>
                      </Link>
                    </MenuItem>
                  );
              })}
            </Menu>
          </Grid>
          <Grid
            item
            md={3}
            py={1}
            sx={{
              display: { md: "flex", xs: "none" },
              alignItems: "center",
              justifyContent: "end",
              pr: "2.5rem",
            }}
          >
            {(!tokenAccess || tokenAccess.role !== "TICKET PURCHASER") && (
              <ContainedButton id={"loginAppBar"} onClick={openLoginModal}>
                {translateWord(locale, "Log In")}
              </ContainedButton>
            )}
            <Tooltip title={translateWord(locale, "Change Language")}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <LanguageIcon sx={{ color: "#629460" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={language}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(language)}
              onClose={handleCloseUserMenu}
            >
              {languages.map(({ lang, locale }) => {
                if (getCookie("NEXT_LOCALE") == undefined && locale != "eng") {
                  return (
                    <MenuItem
                      key={locale}
                      onClick={() => changeSelectedLanguage(locale)}
                    >
                      <Link
                        locale={locale}
                        href={router.asPath}
                        as={router.asPath}
                      >
                        <Typography textAlign="center">{lang}</Typography>
                      </Link>
                    </MenuItem>
                  );
                }
                else if (getCookie("NEXT_LOCALE")&&locale !== getCookie("NEXT_LOCALE")){
                  return (
                    <MenuItem
                      key={locale}
                      onClick={() => changeSelectedLanguage(locale)}
                    >
                      <Link
                        locale={locale}
                        href={router.asPath}
                        as={router.asPath}
                      >
                        <Typography textAlign="center">{lang}</Typography>
                      </Link>
                    </MenuItem>
                  );
                }
              })}
            </Menu>
          </Grid>
        </Grid>
      </AppBar>
      <ThemeProvider theme={customTheme2}>
        <Login
          open={openLogin}
          setOpen={setOpenLogin}
          openSignUp={openSignUpFromLogin}
          setToken={setTokenAccess}
        />
        <SignUpModal
          open={openSignUp}
          setOpen={setOpenSignUp}
          openSignIn={openLoginFromSignUp}
          setToken={setTokenAccess}
          location={"APPBAR"}
        />
      </ThemeProvider>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
