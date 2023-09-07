import { useCallback,useEffect,useRef,useState } from 'react';
import {Box,Typography,Grid} from '@mui/material'
import Appbar from "../../components/appbar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image';
import { gql } from '@apollo/client';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import jwt from "jsonwebtoken"
import ShareModal from '../../components/ShareModal';
import { LocaleLanguage } from '../../utils/LanguageContext';
import Layout from '../../components/sharedLayout'
import TicketCard from '../../components/displayedTicket';
import rightImage from "../../Assets/images/right.png"
import client from "../../utils/apolloServer"
import { useRouter } from 'next/router';
import ContainedButton from '../../components/Button/containedButton';
import { toBlob} from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import CircularProgressWithLabel from '../../components/circularProgress';
import { translateWord } from '../../utils/languageTranslation';

const customTheme = createTheme({
    palette:{
        primary:{
            main:"#629460",
        },
    }
})

const ONEANDHALFHOUR = 60*60+60*30

export default function TicketsPage({locale,data,token}){
    const parseDate = (givenDate)=>{
        const amountOfTimeInSeconds = ONEANDHALFHOUR-((Date.now()-parseInt(givenDate))/1000)
        const amountOfTimeLeftInHours = parseInt(amountOfTimeInSeconds/3600)
        const amountOfTimeLeftInMinutes = parseInt((amountOfTimeInSeconds - amountOfTimeLeftInHours*3600)/60)
        const amountOfTimeLeftInSeconds = parseInt((amountOfTimeInSeconds - amountOfTimeLeftInHours*3600)- amountOfTimeLeftInMinutes*60)
        if(amountOfTimeLeftInHours<=0&&amountOfTimeLeftInMinutes<=0){
            return "0:00:00"
        }
        return amountOfTimeLeftInHours+":"+amountOfTimeLeftInMinutes+":"+amountOfTimeLeftInSeconds
    }

    const subtractOneSecond = (time)=>{
        let timeArr = time.split(":").map(val=>parseInt(val))
        if(timeArr[0]>0&&timeArr[1]===0){
            timeArr[0] = timeArr[0]-1
            timeArr[1] = 59
            if(timeArr[1].toString().length===1){
                timeArr[1] = "0"+timeArr[1]
            }
            timeArr[2] = 59
        }
        else if(timeArr[0]<=0&&timeArr[1]<=0){
            timeArr[0] = "0"
            timeArr[1] = "00"
            timeArr[2] = "00"        }
        else{
            if(timeArr[2]==0){
                timeArr[1] = timeArr[1]-1
                timeArr[2] = 59
            }
            else{
                timeArr[2] = timeArr[2]-1
            }
            if(timeArr[1].toString().length===1){
                timeArr[1] = "0"+timeArr[1]
            }
            if(timeArr[2].toString().length===1){
                timeArr[2] = "0"+timeArr[2]
            }
        }
    
        return timeArr[0]+":"+timeArr[1]+":"+timeArr[2]
    }

    const calculatePercentage = ()=>{
        const amountOfTimeElapsed = ((Date.now()-parseInt(data[0]["reservedAt"]))/1000)
        const amountOfTimeLeft = ONEANDHALFHOUR - amountOfTimeElapsed
        return parseInt((amountOfTimeLeft/ONEANDHALFHOUR)*100)
    }

    const [openModal,setOpenModal] = useState(false)
    const router = useRouter()
    const URL = `${process.env.NEXT_PUBLIC_HOME_URL}${router.asPath}`
    const useRefArrays = useRef([])
    const [timer,setTimer] = useState("")
    const [ticketList,setTicketList] = useState([])
    useRefArrays.current = []

    const onShareButtonClicked = ()=>{
        setOpenModal(true)
    }

    const addToRef = (el)=>{
        if(el && ! useRefArrays.current.includes(el)){
            useRefArrays.current.push(el)
        }
    }

    useEffect(()=>{
        setTimer(parseDate(data[0]["reservedAt"]))
        setInterval(()=>{
            setTimer(prev=>subtractOneSecond(prev))
        },1000)
        setTicketList(JSON.parse(localStorage.getItem("tickets"))||[])
    },[])

    const getTicketNaming = ()=>{
        if(data[0]["status"]==="RESERVED"){
            return "Unpaid"
        }
        else if(data[0]["status"]==="BOOKED"){
            return "Booked"
        }
        else if(data[0]["status"]==="CANCELLED"){
            return "Cancelled"
        }
        else if(data[0]["status"]==="EXPIRED"){
            return "Expired"
        }
        else{
            return "Travelled"
        }
    }

    const onDownloadButtonClicked = useCallback(async()=>{
        if(useRefArrays.current.length>0){
            if(useRefArrays.current.length===1){
                toBlob(useRefArrays.current[0], { cacheBust: true, })
            .then((blob) => {
                saveAs(blob,"Your-Ticket.png")
            })
            .catch((err) => {
                console.log(err)
            })
            }
            else{
                let zip = new JSZip()
                const imageDataArr = []
                let count = 1;
                for(let ref of useRefArrays.current){
                    const dataURL = await toBlob(ref, { cacheBust: true, })
                    zip.file("ticket "+count+".png",dataURL)
                    count++;
                }
                const content = await zip.generateAsync({type:"blob"})
                saveAs(content,getTicketNaming()+" Tickets")
            }
        }
    },[useRefArrays])
    return (<Layout>
        <ThemeProvider theme={customTheme}>
            <LocaleLanguage.Provider value={{locale,token}}>
            <Box sx={{background:`#fff`,height:"100vh"}}>
                <Appbar/>
                <Box sx={{display:"flex",flexDirection:"column",pt:2,pl:{md:10,xs:4}}}>
                    <Box sx={{display:"flex",justifyContent:"center",alignItems:'center',mb:"1rem"}}>
                        <Image src={rightImage} height={"50px"} width={"50px"}/>
                        <Typography ml={2}>{translateWord(locale,"Your Tickets are Reserved.")}</Typography>
                    </Box>
                    <Typography sx={{fontWeight:600,fontSize:"20px",color:"#CCCCCC",my:2}}>{translateWord(locale,"Payment Information")}</Typography>
                    <Grid container>
                        <Grid item md={4} xs={3} sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",borderRight:"1px solid #629460"}}>
                            <Typography>{translateWord(locale,"Total")}</Typography>
                            <Typography>{data[0]&&data[0]["price"]*data.length} Birr</Typography>
                        </Grid>
                        <Grid item md={4} xs={4} sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",borderRight:"1px solid #629460"}}>
                            <Typography>{translateWord(locale,"Booking ID")}</Typography>
                            <Typography>{data[0]&&data[0]["referenceID"]}</Typography>
                        </Grid>
                        <Grid item md={4} xs={5} sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <Typography>{translateWord(locale,"Account Number")}</Typography>
                            <Typography fontSize={{md:"18px",xs:"14px"}}>{data[0]&&data[0]["bankAccount"]}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{overflow:"auto",display:'flex',width:"100%"}}>
                        <Grid item md={6} sm={12} xs={12} sx={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                            {data.map((obj,ind)=><TicketCard key={ind} index={ind} useRef={addToRef} {...obj}/>)}
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} sx={{display:"flex",flexDirection:"column",py:10,justifyContent:"flex-start",alignItems:"center",position:"relative"}}>
                            <CircularProgressWithLabel label={timer} value={calculatePercentage()}/>
                            <Typography width="70%">{translateWord(locale,"You have to pay for reserved seat in 1:30 hour, else your reservation will be Canceled.")}</Typography>
                            <Typography width="70%" fontSize={12} mt="1rem">{translateWord(locale,"Copy the Booking ID and use it as a  reason when you make the payment.")}</Typography>
                            {data[0]&&ticketList.includes(data[0]["referenceID"])&&<ContainedButton width='220px' height='60px' fontSize='20px' onClick={onShareButtonClicked} mt={"2rem"}>
                                <ShareIcon sx={{color:"#fff",mr:"0.5rem"}}/>
                                {translateWord(locale,"Share")}
                            </ContainedButton>}
                            {data[0]&&ticketList.includes(data[0]["referenceID"])&&<ContainedButton width='220px' height='60px' fontSize='20px' onClick={onDownloadButtonClicked} mt={"2rem"}>
                                <DownloadIcon sx={{color:"#fff",mr:"0.5rem"}}/>
                                {translateWord(locale,"Download")}
                            </ContainedButton>}
                        </Grid>
                    </Grid>
                </Box>
                <ShareModal open={openModal} setOpen={setOpenModal} url={URL}/>
            </Box>
            </LocaleLanguage.Provider>
        </ThemeProvider>
    </Layout>
    )
}

export const getServerSideProps = async(ctx)=>{
    const {locale,req,params} = ctx;
    const {paymentReference} = params
    const nextLocale = req["cookies"]['NEXT_LOCALE']
    let token = null;
    if(req["cookies"]['token']){
        token = req["cookies"]['token']
        token = jwt.verify(token,process.env.TOKEN_KEY)
    }
    try{
            const {data} = await client.query({
                query:gql`
                query reservedTickets($input:String){
                    reservedTickets(referenceID:$input){
                        _id
                        passenger{
                            name
                        }
                        bus{
                            busOwner{
                                logo
                                name
                            }
                            plateNumber
                        }
                        bankName
                        bankAccount
                        pickupLocation
                        departure
                        destination
                        date
                        time
                        status
                        price
                        referenceID
                        reservedSeat
                        reservedAt
                    }
                }
                `,
                variables:{
                    input:paymentReference
                }
            })
            return {props:{locale:nextLocale||locale,
                    data:data["reservedTickets"],token}}
        }
        catch(e){
            console.log(JSON.stringify(e))
            return {props:{locale:nextLocale||locale,
                data:[],token}}
        }
}
