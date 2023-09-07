import * as React from "react"
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { Button, Typography } from "@mui/material";
import { toBlob} from 'html-to-image';
import {saveAs} from "file-saver"
import { visuallyHidden } from '@mui/utils';
import {gql,useMutation} from "@apollo/client"
import { useRouter } from "next/router";
import ConfirmDialog from "../confirmationDialog/ConfirmDialog";
import DialogWithChildren from "../confirmationDialog/DialogWithChildren";
import TicketCard from "../displayedTicket";
import ShareModal from "../ShareModal";
import { translateWord } from "../../utils/languageTranslation";
import { useLocale } from "../../utils/LanguageContext";

const headCells = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'phoneNumber',
    numeric: false,
    label: 'Phone Number',
  },
  {
    id: 'departure',
    numeric: false,
    label: 'Departure',
  },
  {
    id: 'destination',
    numeric: false,
    label: 'Destination',
  },
  {
    id: 'pickupLocation',
    numeric: false,
    label: 'Pickup Location',
  },
  {
    id: '_',
    numeric: false,
    label: 'Action',
  }
];

const MUTATETICKETINFO = gql`
 mutation updateTicketInfo($referenceID:ID,$ticketId:ID,$ticketInfo:UpdateTicketInput!){
  updateTicketInfo(referenceID:$referenceID,ticketId:$ticketId,ticketInfo:$ticketInfo){
    status
  }
 }`

function EnhancedTableHeadViewTicket(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{background: "#62946099"}}>
        {headCells.map((headCell,ind) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{textAlign:"center"}}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {translateWord(props.locale,headCell.label)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export function ViewTicketDetail({rows}) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [confirmModal,setConfirmModal] = React.useState(false)
  const [openTicketView,setOpenTicketView] = React.useState({status:false,data:null})
  const [selectedTicketId,setSelectedTicketId] = React.useState("")
  const [cancelTicket] = useMutation(MUTATETICKETINFO)
  const [openShareModal,setOpenShareModal] = React.useState(false)
  const useRef = React.useRef(null)
  const router = useRouter()
  const [URL] = React.useState(`${process.env.NEXT_PUBLIC_APP_SERVER}${router.asPath}`)
  const {locale,token} = useLocale()

  const onDownloadButtonClicked = ()=>{
    if(useRef){
      toBlob(useRef.current, { cacheBust: true, })
            .then((blob) => {
                saveAs(blob,"Ticket-Requested.png")
            })
            .catch((err) => {
                console.log(err)
            })
    }
  }
  const cancelTicketClicked = (e,ticketId)=>{
    e.stopPropagation()
    setSelectedTicketId(ticketId)
    setConfirmModal(true)
  }

  const handleClose = ()=>{
    setConfirmModal(false)
  }

  const cancelTicketConfirmed = async()=>{
    await cancelTicket({variables:{ticketId:selectedTicketId,
        ticketInfo:{status:"TERMINATED",terminatedBy:"Ticket Purchaser"}}})
    router.reload()
  }

  const handleTicketClose = ()=>{
    setOpenTicketView({status:false,data:null})
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const setDataOfDialog = (data)=>()=>{
    setOpenTicketView({status:true,data})
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '95%',overflowX:"hidden",mt:"2rem"}}>
      <Paper sx={{ width: '100%', mb: 2,overflowX:"hidden" }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHeadViewTicket
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              locale={locale}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={row._id}
                      sx={{":hover":{background:"#ccc",transition:"all 0.3s",cursor:"pointer"}}}
                      onClick={setDataOfDialog(row)}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        sx={{textAlign:"center"}}
                      >
                       <Typography pr={"1.3rem"}>{row['passenger']['name']}</Typography>
                      </TableCell>
                      <TableCell sx={{textAlign:"center"}}>
                        <Typography pr={"1.3rem"}>{row['passenger']['phoneNumber']}</Typography>
                      </TableCell>
                      <TableCell sx={{textAlign:"center"}}>
                          <Typography pr={"1.3rem"}>{translateWord(locale,row['departure'])}</Typography>
                      </TableCell>
                      <TableCell sx={{textAlign:"center"}}>
                        <Typography pr={"1.3rem"}>{translateWord(locale,row['destination'])}</Typography>
                      </TableCell>
                      <TableCell sx={{textAlign:"center"}}>
                          <Typography pr={"1.3rem"}>{translateWord(locale,row['pickupLocation'])}</Typography>
                      </TableCell>
                      <TableCell sx={{textAlign:"center"}}>
                       {(token&&token.phoneNumber===row["ticketPurchaser"]["phoneNumber"]&&(row.status=="RESERVED"||row.status=="BOOKED"))&&<Button variant='outlined' onClick={(e)=>cancelTicketClicked(e,row._id)}>{translateWord(locale,"Cancel Ticket")}</Button>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ConfirmDialog openModal={confirmModal} buttonText1={translateWord(locale,'Cancel Ticket')} onButtonText1Click={cancelTicketConfirmed} onButtonText2Click={handleClose} buttonText2={translateWord(locale,'Keep Ticket')} handleClose={handleClose} content={translateWord(locale,'You’re asking to cancel a reservation. Please confirm the cancellation as this action can not be undone. Are you sure you want to cancel this reservation?')}/>
      {openTicketView.data!==null&&<DialogWithChildren openModal={openTicketView.status} buttonText1={(token&&token.phoneNumber===openTicketView.data["ticketPurchaser"]["phoneNumber"]&&(openTicketView.data['status']==="RESERVED"||openTicketView.data['status']==="BOOKED"))?translateWord(locale,'Download Ticket'):null} onButtonText1Click={(token&&token.phoneNumber===openTicketView.data["ticketPurchaser"]["phoneNumber"])?onDownloadButtonClicked:null} onButtonText2Click={()=>setOpenShareModal(true)} buttonText2={openTicketView.data['status']==="RESERVED"||openTicketView.data['status']==="BOOKED"?translateWord(locale,'Share Ticket'):null} handleClose={handleTicketClose}>
            <TicketCard useRef={useRef} {...openTicketView.data}/>
      </DialogWithChildren>}
      <ShareModal open={openShareModal} setOpen={setOpenShareModal} url={URL}/>
    </Box>
  );
}