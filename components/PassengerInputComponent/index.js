import { useState,useEffect } from "react";
import { TextField,InputAdornment,Grid,Tooltip} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import SelectPickUpLocation from "../selectBoxPickUpLocation";
import useStateWithCallback from '../../utils/useStateWithCallBack'
import { validateName,validatePhone } from "../../utils/validate";
import { usePassengerInfo } from "../../utils/PassengerInfoContext";
import { translateWord } from "../../utils/languageTranslation";
import { useLocale } from "../../utils/LanguageContext";
import { useRouter } from "next/router";

const PassengerInputForm = ({index,empty})=>{
    const {state,dispatch} = usePassengerInfo()
    const [passengerName,setPassengerName] = useStateWithCallback("")
    const [passengerNameError,setPassengerNameError] = useState(false)
    const [passengerPhone,setPassengerPhone] = useStateWithCallback("");
    const [passengerPhoneError,setPassengerPhoneError] = useState(false)
    const [pickUpLocation, setPickUpLocation] = useStateWithCallback(state.availablePickupLocations["message"]==="NO PICKUP LOCATION"?"":state.availablePickupLocations[0]);
    const {locale} = useLocale()
    const router = useRouter()

    useEffect(()=>{
        router.beforePopState(({as})=>{
            dispatch({type:{tabIndex:0,openSeatPicker:true}})
            window.history.pushState(router.asPath,router.asPath,router.asPath)
            return false
        })
        return () => {
          router.beforePopState(() => true);
      };
      },[])

    useEffect(()=>{
        let newSelectedPickupLocation = []
        let newPassengerInfoInput = []
        if(!state.availablePickupLocations["message"]&&state.availablePickupLocations["message"]!=="NO PICKUP LOCATION"){
                let parsedPickuplocation = JSON.parse(localStorage.getItem("passenger_pickuplocation"))
                if(parsedPickuplocation){
                    newSelectedPickupLocation = parsedPickuplocation
                    if(!newSelectedPickupLocation[index]){
                        newSelectedPickupLocation[index] = state.availablePickupLocations[0]
                        localStorage.setItem("passenger_pickuplocation",JSON.stringify(newSelectedPickupLocation))
                    }
                }
                else{
                    newSelectedPickupLocation[index] = state.availablePickupLocations[0]
                    localStorage.setItem("passenger_pickuplocation",JSON.stringify(newSelectedPickupLocation))
                }
                newSelectedPickupLocation = newSelectedPickupLocation.slice(0,state.numberOfPassengers)
                setPickUpLocation(newSelectedPickupLocation[index])
        }
        if(localStorage.getItem("passenger_name")){
            const parsedName = JSON.parse(localStorage.getItem("passenger_name"))
            const parsedPhone = JSON.parse(localStorage.getItem("passenger_phoneNumber"))
            newPassengerInfoInput = parsedName.map((val,ind)=>{
                if(parsedPhone[ind]&&parsedPhone[ind]['phoneNumber']){
                    return {name:val['name'],phoneNumber:parsedPhone[ind]['phoneNumber']}
                }
                return {name:val['name'],phoneNumber:''}
            })
            newPassengerInfoInput = newPassengerInfoInput.slice(0,state.numberOfPassengers)
            if(parsedName[index]){
                setPassengerName(parsedName[index]["name"]) 
            }
            if(parsedPhone[index]){
                setPassengerPhone(parsedPhone[index]["phoneNumber"])
            }
        }
        dispatch({type:{passengerInfo:newPassengerInfoInput,selectedPickUpLocation:newSelectedPickupLocation}})
    },[])

    const parseAndStorePassengerInfo = (attr,value)=>{
        let newPrev = [...state.passengerInfo]
        if(newPrev[index]){
            newPrev[index][attr] = value
        }
        else{
            newPrev[index] = {[attr]:value}
        }
        localStorage.setItem("passenger_"+attr,JSON.stringify(newPrev))
        dispatch({type:{passengerInfo:newPrev}})
    }

    const handleNameChange = (e)=>{
        setPassengerName(e.target.value)
        if(validateName(e.target.value)){
            parseAndStorePassengerInfo("name",e.target.value)
            setPassengerNameError(false)
            let newPrev = [...state.passengerNameErrors]
            newPrev[index] = false
            dispatch({type:{passengerNameErrors:newPrev}})
        }
        else{
            setPassengerNameError(true)
            let newPrev = [...state.passengerNameErrors]
            newPrev[index] = true
            dispatch({type:{passengerNameErrors:newPrev}})
        }
    }

    const handlePhoneChange = (e)=>{
        setPassengerPhone(e.target.value)
        if(validatePhone(e.target.value)){
            parseAndStorePassengerInfo("phoneNumber",e.target.value)
            setPassengerPhoneError(false)
            let newPrev = [...state.passengerPhoneErrors]
            newPrev[index] = false
            dispatch({type:{passengerPhoneErrors:newPrev}})
        }
        else{
            setPassengerPhoneError(true)
            let newPrev = [...state.passengerPhoneErrors]
            newPrev[index] = true
            dispatch({type:{passengerPhoneErrors:newPrev}})
        }
    }

    const handleChange = (event) => {
    setPickUpLocation(event.target.value);
    let newPrev = [...state.selectedPickUpLocation]
    newPrev[index] = event.target.value;
    localStorage.setItem("passenger_pickuplocation",JSON.stringify(newPrev))
    dispatch({type:{selectedPickUpLocation:newPrev}})
    };

    return (<Grid container sx={{mb:"2rem"}}>
                <Grid md={4} xs={12} sx={{display:"flex",justifyContent:{md:"flex-start",sm:"center",xs:"start"}}} item >
                    <Tooltip title={passengerNameError?translateWord(locale,"Please Enter a Valid Name"):""}>
                        <TextField InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        <PersonIcon/>
                                        </InputAdornment>
                                    ),sx:{background:"white",boxShadow: "0px 0px 10px 0px #00000026",width:{md:"325px",xs:"81vw"},my:{md:0,xs:"0.5rem"}}
                                }} label={translateWord(locale,"Name")} name="name" id={"name"+index} value={passengerName} onChange={handleNameChange} sx={{display:"block"}} error={(empty&&passengerName==="")||passengerNameError}/>
                    </Tooltip>
                </Grid>
                <Grid item md={4} xs={12} sx={{mt:{md:0,xs:"1rem"},display:"flex",justifyContent:{md:"flex-start",sm:"center",xs:"start"}}}>
                    <Tooltip title={passengerPhoneError?translateWord(locale,"Please Enter a Valid Phone Number"):""}>
                    <TextField InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <PhoneIcon/>
                                </InputAdornment>
                            ),
                            sx:{background:"white",boxShadow: "0px 0px 10px 0px #00000026",width:{md:"325px",xs:"81vw"},my:{md:0,xs:"0.5rem"}}
                        }} label={translateWord(locale,"Phone Number")} name="phone number" id={"phone number"+index} value={passengerPhone} onChange={handlePhoneChange} sx={{display:"block"}} error={(empty&&passengerPhone==="")||passengerPhoneError}/>
                    </Tooltip>
                </Grid>
        <Grid item md={4} xs={12} sx={{display:state.availablePickupLocations["message"]!=="NO PICKUP LOCATION"?"block":"none",mt:{md:0,xs:"1rem"},display:"flex",justifyContent:{md:"flex-start",sm:"center",xs:"start"}}}>
            {state.availablePickupLocations["message"]!=="NO PICKUP LOCATION"&&<SelectPickUpLocation value={pickUpLocation} setValue={handleChange} pickUploactions={state.availablePickupLocations}/>}
        </Grid>
    </Grid>)
}

export default PassengerInputForm;