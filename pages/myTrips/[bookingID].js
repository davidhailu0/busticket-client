import { useState,useEffect} from 'react';
import {Box,Typography} from '@mui/material'
import Appbar from "../../components/appbar"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import jwt from "jsonwebtoken"
import { LocaleLanguage } from '../../utils/LanguageContext';
import Layout from '../../components/sharedLayout'
import client from "../../utils/apolloServer"
import {gql,useMutation} from "@apollo/client"
import ShareModal from '../../components/ShareModal';
import { useRouter } from 'next/router';
import { translateWord } from '../../utils/languageTranslation';
import ConfirmDialog from '../../components/confirmationDialog/ConfirmDialog';
import { ViewTicketDetail } from '../../components/dataTable';

const customTheme = createTheme({
    palette:{
        primary:{
            main:"#629460",
        },
    }
})


const MUTATETICKETINFO = gql`
 mutation updateTicketInfo($referenceID:ID,$ticketId:ID,$ticketInfo:UpdateTicketInput!){
  updateTicketInfo(referenceID:$referenceID,ticketId:$ticketId,ticketInfo:$ticketInfo){
    status
  }
 }`

const ONEANDHALFHOUR = (60*60+60*30)*1000

export default function TicketsPage({locale,data,token}){
    const [openModal,setOpenModal] = useState(false)
    const router = useRouter()
    const URL = `${process.env.NEXT_PUBLIC_HOME_URL}${router.asPath}`
    const [openConfirm,setOpenConfirm] = useState(false)
    const [cancelTicket] = useMutation(MUTATETICKETINFO)

    useEffect(()=>{
        if((ONEANDHALFHOUR-(Date.now()-parseInt(data[0]['reservedAt'])))>0){
            setTimeout(()=>{
                router.reload()
            },ONEANDHALFHOUR-(Date.now()-parseInt(data[0]['reservedAt'])))
        }
    },[])

    const handleConfirmClose = ()=>{
        setOpenConfirm(false)
    }

    const cancelSelectedTicket = async()=>{
        await cancelTicket({variables:{ticketId:selectedTicketId,
            ticketInfo:{status:"TERMINATED",terminatedBy:"TICKET PURCHASER"}}})
    }

    return (<Layout>
        <ThemeProvider theme={customTheme}>
            <Box sx={{background:`#fff`,height:"100vh"}}>
                <LocaleLanguage.Provider value={{locale,token}}>
                <Appbar/>
                <Box sx={{display:"flex",flexDirection:"column",pt:2,pl:10}}>
                    <Typography variant="h5" fontWeight={600} color={"#00000099"} mt={"3rem"} mb={"2rem"}>{translateWord(locale,"Check Your Bookings")}</Typography>
                    <Typography color={"#629460"} mt={"3rem"} mb={"2rem"}>{`${new Date(parseInt(data[0]["date"])).toLocaleString("default",{month:"long"})} ${new Date(parseInt(data[0]["date"])).getDate()} ${new Date(parseInt(data[0]["date"])).getFullYear()}`}</Typography>
                    <ViewTicketDetail rows={data}/>
                </Box>
                <ShareModal open={openModal} setOpen={setOpenModal} url={URL}/>
                <ConfirmDialog openModal={openConfirm} handleClose={handleConfirmClose} onButtonText1Click={cancelSelectedTicket} buttonText1={"Yes"} buttonText2={"No"} content={"Are you sure you want to delete the ticket(s)?"}/>
                </LocaleLanguage.Provider>
            </Box>
        </ThemeProvider>
    </Layout>
    )
}

export const getServerSideProps = async(ctx)=>{
    const {locale,req,params} = ctx;
    const {bookingID} = params
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
                        ticketPurchaser{
                            name
                            phoneNumber
                        }
                        passenger{
                            name
                            phoneNumber
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
                    input:bookingID
                }
            })
            return {props:{locale:nextLocale,
                    data:data["reservedTickets"],token}}
        }
        catch(e){
            return {props:{locale:nextLocale||locale,
                data:[],token}}
        }
}