import { useState,useEffect } from "react";
import { Box,Typography,Button,Grid } from "@mui/material";
import Image from "next/image";
import { useMutation,gql } from "@apollo/client";
import { useRouter } from "next/router";
import PaymentBankCard from "../PaymentBankCard"
import { io } from "socket.io-client";
import { ToastContainer,toast } from "react-toastify";
import { usePassengerInfo } from "../../utils/PassengerInfoContext";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Snackbar from '@mui/material/Snackbar';
import { translateWord } from "../../utils/languageTranslation";
import { useLocale } from "../../utils/LanguageContext";
import { customAlphabet } from "nanoid";

const MUTATE = gql`
    mutation RegisterUsers($input:[UserCreateInput!]!){
        registerUsers(users:$input){
            _id
            name
            phoneNumber
            active
        }
        }
    `;

const MUTATERESERVE = gql`
 mutation reserveTicket($input:CreateTicketInput!){
   reserveTicket(ticket:$input){
     _id
   passenger{
     name
   }
   pickupLocation
   date
   time
   status
   referenceID
   reservedSeat
   reservedAt
   bookedAt
   expiredAt
   completedAt
   cancelledAt
   }
 }
 `

const PaymentInfo = ({banks})=>{
    const router = useRouter()
    const {state,dispatch,tokenAccess} = usePassengerInfo()
    const [socket] = useState(io(process.env.NEXT_PUBLIC_APP_SERVER,{transports:['polling','websocket']}))
    const [snackBarOpen,setSnackBarOpen] = useState(false)
    const {locale} = useLocale()
    const [RegisterUsers] = useMutation(MUTATE);
    const [reserveTicket] = useMutation(MUTATERESERVE)
    const nanoId = customAlphabet('0123456789',7)
    const [generatedNanoId] = useState(nanoId())


    useEffect(()=>{
        router.beforePopState(({as})=>{
            dispatch({type:{tabIndex:1}})
            window.history.pushState(router.asPath,router.asPath,router.asPath)
            return false
        })
        return () => {
          router.beforePopState(() => true);
      };
      },[])

    const goToTicketsPage = async()=>{
        const passengerData = await RegisterUsers({variables:{input:[...state.passengerInfo]}})
        const passengerIds = passengerData["data"]["registerUsers"].map(({_id})=>_id)
        let dataRSERVED;
            try{
              dataRSERVED = await reserveTicket({variables:{
                input:{
                    ticketPurchaser:tokenAccess['_id']||passengerIds[0],
                    ...state.reservationInfo,
                    passengerId:passengerIds,
                    bankName:state.chosenBank["name"],
                    bankAccount:state.chosenBank["accountNumber"],
                    reservedSeats: state.reservedSeats,
                    pickupLocations:state.selectedPickUpLocation.length!==0?state.selectedPickUpLocation:null,
                    bookedBy:"Customer",
                    referenceID:generatedNanoId,
                    language:locale
                }
                }})
            }
            catch(e){
              toast.error(e.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                return
            }
        socket.emit("REMOVE SEAT",JSON.stringify({userID:localStorage.getItem("USERID"),tripID:state.tripId,ticketInfo:state.reservedSeats}))
        const ticketList = JSON.parse(localStorage.getItem("tickets"))||[]
        ticketList.push(dataRSERVED['data']['reserveTicket'][0]['referenceID'])
        localStorage.setItem("tickets",JSON.stringify(ticketList))
        await router.replace(`ticketPage/${dataRSERVED['data']['reserveTicket'][0]['referenceID']}`)
    }

    const chosenBankBTNClicked = (name,accountNumber)=>{
        sessionStorage.setItem("name",name)
        sessionStorage.setItem("accountNumber",accountNumber)
        dispatch({type:{chosenBank:{name,accountNumber}}})
    }

    const copyContent = async(content)=>{
        await navigator.clipboard.writeText(content)
        setSnackBarOpen(true)
    }

    const handleClose = ()=>{
        setSnackBarOpen(false)
    }

    return (
        <Box sx={{fontFamily:"Open Sans",display:"flex",flexDirection:"column",height:"80vh",px:{md:7,xs:3.5}}}>
            <ToastContainer position="top-center"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
            <Typography sx={{fontWeight:600,my:2}}>{translateWord(locale,"Pay with a convenient payment option for you")}</Typography>
            <Typography sx={{fontWeight:600,mt:3,color:"#ccc"}}>{translateWord(locale,"Choose Bank to Pay with")}</Typography>
            <Box sx={{display:"grid",gridTemplateColumns:{md:"auto auto auto",sm:"auto auto",xs:"auto"},justifyContent:"space-between",mt:"1rem"}}>
                {banks.map(({name,logo,accountNumber},ind)=>(
                    <PaymentBankCard key={name} id={`bankCard${ind}`} bankName={name} accountNumber={accountNumber} chosenBank={state.chosenBank} chooseBank={()=>chosenBankBTNClicked(name,accountNumber)}>
                        <Image src={`${process.env.NEXT_PUBLIC_APP_SERVER}/${logo}`} height={"58px"} width={"58px"}/>
                     </PaymentBankCard>
                )
                )}
                <Box sx={{display:state.chosenBank?"flex":"none",flexDirection:"column",width:{md:"444px",xs:"300px"},p:"1rem",ml:{md:"35vw",xs:0}}}>
                    <Typography sx={{fontWeight:600,color:"#CCCCCC",mb:"1rem"}}>{translateWord(locale,"Summary")}</Typography>
                    <Grid container>
                        <Grid md={6} xs={6} item>
                            <Typography mb={1}>{translateWord(locale,"Tickets")}</Typography>    
                        </Grid>
                        <Grid md={6} xs={6} item>
                            <Typography mb={1}>{state.reservedSeats.length} </Typography>    
                        </Grid>
                        <Grid md={6} xs={6} item>
                            <Typography mb={1}>{translateWord(locale,"Seat No")}</Typography>    
                        </Grid>
                        <Grid md={6} xs={6} item>
                            <Typography mb={1}>{state.reservedSeats.join(", ")}</Typography>    
                        </Grid>
                        <Grid md={6} xs={6} item>
                            <Typography mb={1}>{translateWord(locale,"Total")}</Typography>    
                        </Grid>
                        <Grid md={6} xs={6} item>
                            <Typography mb={1}>{state.price*state.reservedSeats.length}{translateWord(locale,"(ETB)")}</Typography>    
                        </Grid>
                        <Grid md={6} xs={6} item>
                            <Typography>{translateWord(locale,"Booking ID")}</Typography>    
                        </Grid>
                        <Grid md={6} xs={6} item>
                            <Box sx={{display:"flex",justifyContent:{md:"space-between"},alignItems:"center",width:{md:"200px",xs:"150px"},background:"#fff"}}>
                                <Typography mb={1}>{generatedNanoId}</Typography>
                                <ContentCopyIcon sx={{color:"#629460",cursor:"pointer"}} onClick={()=>copyContent(generatedNanoId)}/>
                            </Box>   
                        </Grid>
                        <Grid md={6} xs={6} item sx={{display:"flex",alignItems:"center"}}>
                            <Typography>{state.chosenBank&&translateWord(locale,state.chosenBank.name)} </Typography>
                        </Grid>
                        <Grid md={6} xs={6} item sx={{display:"flex",alignItems:"center"}}>
                            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"200px",background:"#fff"}}>
                                <Typography fontWeight={700} fontSize={{md:"25px",xs:"20"}}>{state.chosenBank&&state.chosenBank.accountNumber}</Typography>  
                                {state.chosenBank&&state.chosenBank.accountNumber&&<ContentCopyIcon sx={{color:"#629460",cursor:"pointer"}} onClick={()=>copyContent(state.chosenBank.accountNumber)}/>}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{display:state.chosenBank?"flex":"none",justifyContent:"flex-end",width:"100%"}}>
                <div>
                    <Box>
                        <Typography fontSize={12}>{translateWord(locale,"Copy the Booking ID and use it as a  reason when you make the payment.")}</Typography>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"flex-end",mt:"2rem"}}>
                        <Button variant="contained" id={"finish"} sx={{width:"197px",height:"60px",textTransform:"none",fontWeight:700,fontSize:"20px"}} onClick={goToTicketsPage}>{translateWord(locale,"Finish")}</Button>
                    </Box>
                </div>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical:"bottom", horizontal:"center" }}
                open={snackBarOpen}
                onClose={handleClose}
                message={translateWord(locale,"The Text Have been Copied")}
            />
        </Box>
    )
}

export default PaymentInfo;