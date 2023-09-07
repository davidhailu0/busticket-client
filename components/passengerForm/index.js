import { useEffect } from "react"
import {useRouter} from "next/router"
import { Button,Grid,Typography} from "@mui/material"
import SelectComponent from "../selectBox2"
import { places } from "../../utils/places"
import DatePicker from "../datePicker2"
import {translateWord }from "../../utils/languageTranslation"
import { useLocale } from "../../utils/LanguageContext"
import { usePassengerContext } from "../../utils/PassengerTripContext"

export default function PassengerForm(){
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate()+1)
    const dayAfterTomorrow = new Date()
    dayAfterTomorrow.setDate(tomorrowDate.getDate()+1)
    const router = useRouter()
    const {locale} = useLocale()
    const {state,dispatch,ACTIONS} = usePassengerContext()
    
    useEffect(()=>{
        if(localStorage.getItem("Choose Departure")){
            dispatch({type:ACTIONS.DEPARTURE,payload:{departure:translateWord(locale,localStorage.getItem("Choose Departure")),departureError:false}})
        }
        if(localStorage.getItem("Choose Destination")){
            dispatch({type:ACTIONS.DESTINATION,payload:{destination:translateWord(locale,localStorage.getItem("Choose Destination")),destinationError:false}})
        }
    },[])

    const filterSearchResult = (e)=>{
        e.preventDefault()
        if(!state.departure||!state.destination||!state.departureDateValue){
            !state.departure?dispatch({type:ACTIONS.DEPARTURE,payload:{departure:state.departure,departureError:true}}):dispatch({type:ACTIONS.DEPARTURE,payload:{departure:state.departure,departureError:false}})
            !state.destination?dispatch({type:ACTIONS.DESTINATION,payload:{destination:state.destination,destinationError:true}}):dispatch({type:ACTIONS.DESTINATION,payload:{destination:state.destination,destinationError:true}})
            !state.departureDateValue?dispatch({type:ACTIONS.DEPARTUREDATE,payload:{departureDateValue:state.departureDateValue,departureDateError:true}}):dispatch({type:ACTIONS.DEPARTUREDATE,payload:{departureDateValue:state.departureDateValue,departureDateError:false}})
            return
        }
        else if(state.departureError||state.destinationError||state.departureDateError){
            return
        }
        sessionStorage.setItem("Departure Date",state.departureDateValue)
        router.push(`tripResult?departure=${localStorage.getItem("Choose Departure")}&destination=${localStorage.getItem("Choose Destination")}&departureDate=${state.departureDateValue}`)
    }

    const handleDepartureChange = (ev,newVal)=>{
        const englishVal = places[locale].find(opt=>opt["name"]===newVal||opt[opt["name"]]===newVal)
        dispatch({type:ACTIONS.DEPARTURE,payload:{departure:newVal,departureError:false}})
        if(englishVal){
            localStorage.setItem("Choose Departure",englishVal["name"])
        }
    }

    const handleDestinationChange = (ev,newVal)=>{
        const englishVal = places[locale].find(opt=>opt["name"]===newVal||opt[opt["name"]]===newVal)
        dispatch({type:ACTIONS.DESTINATION,payload:{destination:newVal,destinationError:false}})
        if(englishVal){
            localStorage.setItem("Choose Destination",englishVal["name"])
        }
    }

    const handleDateChange = (value)=>{
        let date = new Date(value)
        date = new Date(date.toLocaleDateString()+" UTC")
        const dateToday = new Date(new Date().toDateString())
        if(date.getTime()>dateToday.getTime()){
            sessionStorage.setItem("Departure Date",date.getTime())
            dispatch({type:ACTIONS.DEPARTUREDATE,payload:{departureDateValue:date.getTime(),departureDateError:false}})
        }
        else{
            dispatch({type:ACTIONS.DEPARTUREDATE,payload:{departureDateValue:state.departureDateValue,departureDateError:true}})
        }
      }
    
    return <Grid container mt={10} sx={{mt:{md:"5rem",xs:"1rem"},px:{md:10,xs:4,sm:2},pr:{md:10,xs:0}}}>
        <Grid item md={12} sx={{display:{md:"flex",xs:"none"}}}>
            <Grid container>
                <Grid item md={3}>
                    <Typography>{translateWord(locale,"Departure")}</Typography>
                </Grid>
                <Grid item md={3}>
                    <Typography>{translateWord(locale,"Destination")}</Typography>
                </Grid>
                <Grid item md={6}>
                    <Typography>{translateWord(locale,"Departure Date")}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item pt={2} md={12}>
            <Grid container p={1} sx={{background:"rgba(240, 240, 243, 1)",borderRadius:"5px",boxShadow: "-10px -10px 10px 0px rgba(255, 255, 255, 1)",boxShadow: "-10px -10px 10px 0px rgba(174, 174, 192, 0.2)"
,border:"1px solid #DCDBDB",width:{xs:"83vw",sm:"85vw"}}}>
                <Grid item md={3}>
                        <Typography sx={{display:{xs:"block",md:"none"}}}>{translateWord(locale,"Departure")}</Typography>
                        <SelectComponent label={"Departure"} value={state.departure} changeValue={handleDepartureChange} options={places[locale]} error={state.departureError} fullwidth={false} differentFrom={state.destination}/>
                </Grid>
                <Grid item md={3}>
                        <Typography sx={{display:{xs:"block",md:'none'}}}>{translateWord(locale,"Destination")}</Typography>
                        <SelectComponent label={"Destination"} value={state.destination} changeValue={handleDestinationChange} options={places[locale]} error={state.destinationError} fullwidth={false} differentFrom={state.departure}/>  
                </Grid>
                <Grid item md={3}>
                    <Typography sx={{display:{xs:"block",md:'none'}}}>{translateWord(locale,"Departure Date")}</Typography>
                    <DatePicker value={state.departureDateValue} changeDate={handleDateChange} error={state.departureDateError} label={translateWord(locale,"Departure Date")}/>
                </Grid>
                <Grid item md={3} sx={{display:"flex",width:"100%",justifyContent:{md:"center",xs:'end'},alignItems:"center"}}>
                    <Button variant="contained" id={"search"} sx={{textTransform:"none",width:"197px",height:"50px",fontWeight:700,fontSize:"20px"}} onClick={filterSearchResult}>{translateWord(locale,"Search")}</Button>
                </Grid>
            </Grid>
        </Grid>
     </Grid>
}