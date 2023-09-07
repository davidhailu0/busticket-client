import { useState, useReducer} from 'react';
import {Box,Typography,Button,TextField} from '@mui/material'
import { gql,useMutation } from '@apollo/client'
import Appbar from "../components/appbar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jwt from "jsonwebtoken"
import { io } from "socket.io-client";
import { useRouter } from 'next/router';
import { LocaleLanguage } from '../utils/LanguageContext';
import Layout from '../components/sharedLayout'
import ModifySearch from '../components/ModifyFilter'
import BusInfo from "../components/BusInfoContainer"
import PassengerInputForm from '../components/PassengerInputComponent';
import PaymentInfo from '../components/PaymentInfo';
import { PassengerInfo } from '../utils/PassengerInfoContext';
import Stepper from "../components/stepper"
import client from "../utils/apolloServer"
import SignUpModal from '../components/signUpModal';
import Login from '../components/loginModal';
import Image from 'next/image';
import noResult from "../Assets/images/noResult.svg"
import { validatePhone } from '../utils/validate';
import { translateWord } from '../utils/languageTranslation';

const customTheme = createTheme({
    palette:{
        primary:{
            main:"#629460",
        },
    }
})

 const MUTATEREGISTERLOOKINGFORTRIP = gql`
 mutation registerUserLookingForTrip($user:UnsuccessfulSearchInput!){
  registerUserLookingForTrip(user:$user){
     phoneNumber
   }
 }
 `

function TabPanel({ children, value, index}) {
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
}

const Steps = ["Select Trip","Passenger Information","Payment Information"]

const reducer = (state,action)=>{
  return {...state,...action.type}
}

export default function TripResultPage({locale,data,departure,destination,departureDate,banks,user}){
    const [tokenAccess,setTokenAccess] = useState(user?user:"")
    const [allFieldsEmpty,setAllFieldsEmpty] = useState(false)
    const [openSignUpModal,setOpenSignUpModal] = useState(false)
    const [openSignInModal,setOpenSignInModal] = useState(false)
    const [socket] = useState(io(process.env.NEXT_PUBLIC_APP_SERVER,{transports:['polling','websocket']}))
    const [phoneNumber,setPhoneNumber] = useState("")
    const [phoneNumberError,setPhoneNumberError] = useState(false)
    const [state,dispatch] = useReducer(reducer,{
      tabIndex:0,
      availablePickupLocations:[],
      selectedPickUpLocation:[],
      reservedSeats:[],
      reservationInfo:{
          passengerId: [],
          busId:"",
          date: "",
          time: ""
      },
      tripId:null,
      passengerInfo:[],
      numberOfPassengers:1,
      passengerNameErrors:[],
      passengerPhoneErrors:[],
      price:[],
      chosenBank:null,
      openSeatPicker:false,
      indicator:""
    })
    const [registerUser] = useMutation(MUTATEREGISTERLOOKINGFORTRIP)
    const router = useRouter()

    const openSignUp = ()=>{
      setOpenSignInModal(false)
      setOpenSignUpModal(true)
    }

    const openSignIn = ()=>{
      setOpenSignUpModal(false)
      setOpenSignInModal(true)
    }

    const checkError = ()=>{
      let returnedValue = true
      for(let ind in state.passengerNameErrors){
          if(state.passengerNameErrors[ind]){
            returnedValue = false
          }
          if(state.passengerPhoneErrors[ind]!==undefined&&state.passengerPhoneErrors[ind]){
            returnedValue = false
          }
      }
      if(state.passengerInfo.length!==state.reservedSeats.length){
          setAllFieldsEmpty(true)
          returnedValue = false
      }
      for(let obj of state.passengerInfo){
            if(!Boolean(obj["name"])||!Boolean(obj["phoneNumber"])){
              setAllFieldsEmpty(true)
              returnedValue = false
            }
      }
      return returnedValue
    }

    const registerUsersClick = async()=>{
      if(checkError()){
        if(user){
            dispatch({type:{tabIndex:2}})
        }
        else{
            setOpenSignUpModal(true)
        }
      }
    }

    const changePhoneNumber = (e)=>{
      setPhoneNumber(e.target.value)
      if(validatePhone(e.target.value.trim())){
        setPhoneNumberError(false)
      }
      else{
        setPhoneNumberError(true)
      }
    }

    const registerPhoneNumber = async()=>{
     if(Boolean(phoneNumber)&&!phoneNumberError){
      await registerUser({variables:{user:{
        phoneNumber,
        departure,
        destination,
        tripDate:departureDate
      }}})
      await router.replace("/")
     }
     else{
        setPhoneNumberError(true)
     }
    }

    const modifyNumberOfSeats = ()=>{
      dispatch({type:{numberOfPassengers:state.numberOfPassengers+1,tabIndex:0}})
      setOpenSeatPicker(true)
    }

    return (<Layout>
        <PassengerInfo.Provider value={{
        state,dispatch,
        tokenAccess,setTokenAccess,
        socket
        }}>
        <ThemeProvider theme={customTheme}>
            <LocaleLanguage.Provider value={{locale,token:tokenAccess}}>
            <Box sx={{background:`#F8F8F8`,height:"auto",width:"100vw"}}>
                <Appbar/>
                <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    {state.tabIndex!=2&&<ModifySearch departure={departure} destination={destination} departureDate={departureDate}/>}
                </Box>
              <Stepper index={state.tabIndex} steps={Steps}/>
            <TabPanel value={state.tabIndex} index={0}>
                <Box sx={{display:"flex",flexDirection:"column",alignItems:{md:"center"}}}>
                    {data&&data.map((bs,ind)=>
                    {
                    return <BusInfo 
                    key={bs["_id"]}
                    {...bs}
                    />
                    })}
                {(!data||data.length==0)&&<Box sx={{pl:{md:30,xs:0},display:"flex",flexDirection:{md:"row",xs:"column"},mb:{xs:"5rem",md:"0"},width:"100%",alignItems:"center"}}>
                    <Image src={noResult} height={90} width={90}/>
                    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"start"}}>
                        <Typography sx={{fontFamily:"Open Sans",fontSize:"24px",color:"rgba(0, 0, 0, 0.6)",ml:{md:"5rem",xs:"3rem"},pr:{md:0,xs:"0.5rem"}}}>{translateWord(locale,"No available trip of your search on specified day!")} </Typography>
                        <Box sx={{mt:"3rem"}}>
                            <Typography sx={{alignSelf:"center",fontFamily:"Open Sans",fontSize:"24px",color:"rgba(0, 0, 0, 0.6)",ml:{md:"5rem",xs:"3rem"},mr:{md:"15rem",xs:"5rem"}}}>{translateWord(locale,"Leave us your number to contact you when your searched trip is available.")}</Typography>
                            <Box sx={{display:"flex",flexDirection:{md:"row",xs:"column"},alignItems:{md:"center",xs:"start"},justifyContent:"space-between",width:{md:"700px",xs:"100%"},height:"60px"}}>
                                  <TextField label={translateWord(locale,"Phone Number")} value={phoneNumber} onChange={changePhoneNumber} error={phoneNumberError} sx={{width:{md:"370px",xs:"280px"},height:"24px",ml:"3rem",mt:"0.7rem",mb:{md:"0",xs:"3rem"}}}/>
                                  <Button variant='contained' sx={{width:"200px",height:"48px",alignSelf:"end",position:"relative",top:"0.5rem",left:{md:"0",xs:"-2rem"}}} onClick={registerPhoneNumber}>{translateWord(locale,"Enter")}</Button>
                            </Box>
                        </Box>
                    </Box>
                  </Box>}
                </Box>

            </TabPanel>
            <TabPanel value={state.tabIndex} index={1}>
              <Box sx={{display:"flex",flexDirection:"column",pl:{md:10,xs:4},py:2}}>
                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",pr:{md:15,sm:5},my:"1.5rem"}}>
                    <Typography sx={{fontWeight:700,fontSize:"20px",color:"#CCCCCC",mb:"1rem"}}>{translateWord(locale,"Enter Passenger's Information.")}</Typography>
                    <Button variant='text' sx={{fontWeight:700,textTransform:"none",fontSize:"20px",color:"#629460",minWidth:"200px"}} onClick={modifyNumberOfSeats}>{translateWord(locale,"Add Passenger")}</Button>
                </Box>
                {state.reservedSeats.map((seatId,ind)=><PassengerInputForm key={ind} seatId={seatId} index={ind} empty={allFieldsEmpty}/>)}
                <Box sx={{display:"flex",justifyContent:{md:"flex-start",sm:"center",xs:"start"}}}>
                    <Button variant='contained' id={"next"} onClick={registerUsersClick} sx={{fontFamily:"Open Sans",fontWeight:"700",width:"197px",height:"60px",textTransform:"none",fontSize:"24px",my:5}}>{translateWord(locale,"Next")}</Button>
                </Box>
              </Box>   
            </TabPanel>
            <TabPanel value={state.tabIndex} index={2}>
                <PaymentInfo banks={banks}/>
            </TabPanel>
            </Box>
            <SignUpModal open={openSignUpModal} setOpen={setOpenSignUpModal} openSignIn={openSignIn} setToken={setTokenAccess} location={"TRIPPAGE"}/>
            <Login open={openSignInModal} setOpen={setOpenSignInModal} openSignUp={openSignUp} setToken={setTokenAccess}/>
            </LocaleLanguage.Provider>
        </ThemeProvider>
        </PassengerInfo.Provider>
    </Layout>
    )
}

export const getServerSideProps = async(ctx)=>{
    const {locale,req,query} = ctx;
    const {departure,destination,departureDate} = query
    const nextLocale = req["cookies"]['NEXT_LOCALE']
    const token = req["cookies"]['token']
    let user = null;
    if(token){
        let tokenDecoded = jwt.verify(token,process.env.TOKEN_KEY)
        if(tokenDecoded.role==="TICKET PURCHASER"){
            user = tokenDecoded
        }
    }     
    const {data} = await client.query({
        query:gql`
        query trips($input:TripSearchInput!){
            trips(trip:$input){
                departureDate
                _id
                bus{
                _id
                plateNumber
                features
                busOwner{
                    _id
                    name
                    logo
                }
                }
                route{
                _id
                departure
                destination
                pickupLocations
                returnPickupLocations
                price
                }
                departure
                destination
                departureDate
                departureTime
                reservedSeats
                bookedSeats
                numberOfAvailableSeats
            }
        }
        `,
        variables:{
            input:query
        }
    })
    const allBanks = await client.query({
              query:gql`
              query banks{
                  banks{
                    name
                    accountNumber
                    logo
                  }
              }`
    })
            return {props:{locale:nextLocale||locale,
                    data:data["trips"],departure,destination,departureDate,banks:allBanks["data"]["banks"],user}}
}