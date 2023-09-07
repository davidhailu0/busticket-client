import Head from 'next/head'
import { useState,useEffect, useReducer } from 'react'
import { Grid,Box,ThemeProvider,createTheme } from '@mui/material'
import jwt from 'jsonwebtoken'
import {Typography} from '@mui/material'
import ResponsiveAppBar from "../components/appbar"
import PassengerForm from "../components/passengerForm"
import Footer from "../components/footer"
import { LocaleLanguage } from '../utils/LanguageContext'
import { translateWord } from '../utils/languageTranslation'
import { places,popularRoutes} from '../utils/places'
import Layout from '../components/sharedLayout'
import ImageCard from '../components/ImageCard'
import { PassengerTripContext } from '../utils/PassengerTripContext'
import { getClientIpLocation } from '../utils/request-api'
import HowToLayout from '../components/HomepageLayout'
import WhyUsLayout from '../components/WhyUseMyBus'
import CarriersLayout from '../components/CarriersLayout'
import AboutUsLayout from '../components/AboutUsLayout'
import Image from 'next/image'
import BusBackground from "../Assets/images/busBackgroundImage.svg"
import { useCookie } from '../utils/cookies';

const customTheme = createTheme({
  palette:{
      primary:{
          main:"#629460",
      },
  }
})

const ACTIONS = {
  DEPARTURE:"departure",
  DESTINATION:"destionation",
  DEPARTUREDATE:"departureDate"
}

const reducer = (state,action)=>{
  switch(action.type){
    case ACTIONS.DEPARTURE:
      return {...state,departure:action.payload.departure,departureError:action.payload.departureError};
    case ACTIONS.DESTINATION:
      return {...state,destination:action.payload.destination,destinationError:action.payload.destinationError}
    case ACTIONS.DEPARTUREDATE:
      return {...state,departureDateValue:action.payload.departureDateValue,departureDateError:action.payload.departureDateError}
      default:
      return state;
  }
}

export default function Home({locale,token}) {
    const tomorrowDate = new Date(new Date().toLocaleDateString()+" UTC");
    tomorrowDate.setDate(tomorrowDate.getDate()+1)
    const [state,dispatch] = useReducer(reducer,{departure:"",departureError:false,
                                                destination:"",destinationError:false,
                                                departureDateValue:tomorrowDate.getTime(),
                                                departureDateError:false
                                              })
    const {getCookie,setCookie} = useCookie()
    const [offSet,setOffset] = useState(0)
    const [newLocale,setNewLocale] = useState(locale)

    const filterSearchResult = (destination)=>{
      const englishVal = places[locale].find(opt=>opt["name"]===destination||opt[opt["name"]]===destination)
      if(englishVal){
        localStorage.setItem("Choose Departure",englishVal["name"])
      }
      dispatch({type:ACTIONS.DESTINATION,payload:{destination,destinationError:state.destinationError}})
      if(state.departure===""||state.departureDateValue===""){
          state.departure===""?dispatch({type:ACTIONS.DEPARTURE,payload:{departure:state.departure,departureError:true}}):dispatch({type:ACTIONS.DEPARTURE,payload:{departure:state.departure,departureError:false}})
          !state.departureDateValue?dispatch({type:ACTIONS.DEPARTUREDATE,payload:{departureDateValue:state.departureDateValue,departureDateError:true}}):dispatch({type:ACTIONS.DEPARTUREDATE,payload:{departureDateValue:state.departureDateValue,departureDateError:false}})
          return
      }
      else if(state.departureError||state.departureDateError){
          return
      }
  }

    useEffect(()=>{
      async function fetchCity(){
            const cityData = await getClientIpLocation()
            if(cityData&&cityData["city"]){
                if(!getCookie("NEXT_LOCALE")){
                  setCookie("NEXT_LOCALE", cityData['lang'])
                  setNewLocale(cityData['lang'])
                }
                const thereIs = places[locale].find(plc=>plc.name===cityData["city"])
                if(thereIs){
                    localStorage.setItem("Choose Departure",cityData["city"])
                    dispatch({type:ACTIONS.DEPARTURE,payload:{departure:translateWord(newLocale,cityData["city"]),departureError:false}})
                }
            }
    }
    fetchCity()
    dispatch({type:ACTIONS.DEPARTUREDATE,payload:{departureDateValue:parseInt(sessionStorage.getItem("Departure Date"))||tomorrowDate.getTime(),departureDateError:false}})
  },[])

  useEffect(()=>{
    if(state.departure){
      const englishVal = places[newLocale].find(opt=>{
        return opt["name"]===localStorage.getItem("Choose Departure")||opt[opt["name"]]===localStorage.getItem("Choose Departure")})
      dispatch({type:ACTIONS.DEPARTURE,payload:{departure:translateWord(newLocale,englishVal["name"]),departureError:false}})
    }
    if(state.destination){
      const englishVal = places[newLocale].find(opt=>opt["name"]===localStorage.getItem("Choose Destination")||opt[opt["name"]]===localStorage.getItem("Choose Destination"))
      dispatch({type:ACTIONS.DESTINATION,payload:{destination:translateWord(newLocale,englishVal["name"]),destinationError:false}})
    }
  },[newLocale])
  
 
  return (<Layout>
    <ThemeProvider theme={customTheme}>
    <Box sx={{background: "#fff",height:{md:"120vh",xs:"auto"},width:"100vw"}}>
      <Head>
        <title>My Bus</title>
        <meta name="description" content="My Bus is an online bus ticketing app" />
        <meta name="keywords" content='Online Bus Ticketing, Bus Booking'/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <LocaleLanguage.Provider value={{locale:newLocale,token,setNewLocale}}>
        <ResponsiveAppBar/>
        <Grid container sx={{position:"relative"}}>
          <Grid item display={"flex"} mt={5} sx={{pl:{md:10,xs:4,sm:6}}}>
            <Typography fontFamily={"Open Sans"} fontWeight="600" color={"black"} sx={{fontSize:{md:"36px",xs:"16px"},lineHeight:{md:"49px",xs:"20px"}}}>{translateWord(newLocale,"MyBus, easiest way to")}</Typography>
            <Typography fontFamily={"Open Sans"} fontWeight="800" color={"#629460"} sx={{ml:"1rem",fontSize:{md:"36px",xs:"16px"},lineHeight:{md:"49px",xs:"20px"}}}>{translateWord(newLocale,"book your Trip.")}</Typography>
          </Grid>
          <Box sx={{position:"absolute",textAlign:"right",width:"100vw",ml:{md:"4rem",xs:0}}}>
            <Image src={BusBackground} height={"424px"} width={"758px"}/>
          </Box>
          <Grid item md={12} sm={12} xs={12} sx={{pl:{md:0,xs:0,sm:4}}}>
            <PassengerTripContext.Provider value={{state,dispatch,ACTIONS}}>
              <PassengerForm />
            </PassengerTripContext.Provider>
          </Grid>
          <Grid item md={12} mt={"3rem"} sx={{px:{md:10,xs:4,sm:6}}}>
            <Typography sx={{fontWeight:700,fontSize:"20px",color:"#ccc"}}>{translateWord(newLocale,"Popular Destinations")}</Typography>
            <Box onMouseMove={(e)=>{
                    const btnContainer = document.querySelector(`.btnContainer`)
                    const deviceWidth = document.body.clientWidth
                    if(deviceWidth/2>e.pageX&&offSet>0){
                        setOffset(prev=>{
                          btnContainer.scroll({left:prev-10,behavior:"smooth"})
                          return prev-10})
                    }
                    else if(deviceWidth/2<e.pageX&&offSet<btnContainer.scrollWidth){
                        setOffset(prev=>{
                          btnContainer.scroll({left:prev+10,behavior:"smooth"})
                          return prev+10})
                    }
                }} className={`btnContainer`} sx={{overflow:"hidden",overflowX:{md:"hidden",xs:"scroll"},display:'flex',flexShrink:0,mt:"2rem",py:"1rem",width:"83vw"}}>
                {popularRoutes[newLocale].map((plc,ind)=>{
                    if(state.departure!==plc["name"]&&state.departure!==plc[plc["name"]]){
                        return <ImageCard key={ind} label={plc[plc["name"]]} onClick={()=>filterSearchResult(plc[plc["name"]])} img={plc["img"]&&plc["img"].src}/>
                    }
                })}
                </Box>
          </Grid>
          <Grid item md={12}>
                <HowToLayout/>
          </Grid>
          <Grid item md={12}>
                <WhyUsLayout/>
          </Grid>
          <Grid item md={12}>
                <CarriersLayout/>
          </Grid>
          <Grid item md={12}>
                <AboutUsLayout/>
          </Grid>
        <Grid item md={12}>
                <Footer/>
          </Grid>
        </Grid>
        </LocaleLanguage.Provider>
    </Box>
    </ThemeProvider>
  </Layout>
  )
}
export const getServerSideProps = (ctx)=>{
  const {locale,req} = ctx;
  const nextLocale = req["cookies"]['NEXT_LOCALE']
  let token = null;
  if(req["cookies"]['token']){
    token = req["cookies"]['token']
    token = jwt.verify(token,process.env.TOKEN_KEY)
  }
  return {props:{locale:nextLocale||locale,token}}
}