import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Divider, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import FolderOffIcon from '@mui/icons-material/FolderOff';


import {PuffSpinner} from '../../assets/spinner';
import {Colors} from '../../assets/themes/colors';
import Snackbars from "../../assets/snackbar";

import "../../styles/invoice.styles.css"
import "../../styles/common.styles.css"

import {useSelector, useDispatch} from 'react-redux';

import { getAllInvoices } from '../../slices/invoice';
import { clearMessage } from  "../../slices/message";

import Layout from '../layout/Layout';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#cccccc",
    color: theme.palette.common.white,
    fontWeight: 600,
    
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 10,
    textAlign: "left"
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const columns = [
  { id: 'sn', label: 'SN', align: 'left' },
  { id: 'reference', label: 'Reference', align: 'left' },
  { id: 'amount', label: 'Amount', align: 'left' },
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'paid', label: 'Paid', align: 'left' },
];


function createData(sn, reference, amount, type, paid) {
  return { sn, reference, amount, type, paid };
}


const AllInvoices = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [serverSuccess, setServerSuccess] = useState(false);
  
  const { message } = useSelector((state) => state.message);
  const { invoices } = useSelector((state) => state.invoices);

  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(clearMessage());
    setLoading(true);
    dispatch(getAllInvoices())
      .unwrap()
      .then(() => {
        setLoading(false);
        setServerSuccess(true);
      })
      .catch(() => {
        setLoading(false);
        setServerSuccess(false);
        setServerError(true);
      });
  }, [dispatch]);


  const handleCloseSnack = () => {
    setServerError(false);
    setServerSuccess(false);
  };
  

  const rows = invoices ? invoices.data.map((row, i) => {
    return createData (
      i + 1,
      row.reference,
      row.amount && "£" + row.amount,
      row.type === 1 ? "Course Enrolment fee" : "Library fine",
      row.paid === false ? "No" : "Yes"
    )
  }) : [];


  return (
    <div>
       <Layout />
       <div className="invoices-container">

      <Snackbars
          variant="error"
          handleClose={handleCloseSnack}
          message={message || "Network error"}
          isOpen={serverError}
      />

      <Snackbars
          variant="success"
          handleClose={handleCloseSnack}
          message="Successful"
          isOpen={serverSuccess}
      />
      
      <Grid container spacing={0}>
        
        { loading ? 
        <Grid item xs={12} className="table-tools-container-tab">
          <PuffSpinner 
          height={50} 
          width={50} 
          color={Colors.primary}
          label='Loading...'
          />
        </Grid> : rows.length === 0 ? 
        <Paper elevation={3} className={`${"table-tools-container"} ${"table-title"}`}>
        {/* <Grid item xs={12}> */}
          <div>
            <FolderOffIcon className="table-no-record-icon" />
          </div>
          <div className="table-no-record-text">No record found</div>
        {/* </Grid>  */}
        </Paper>
        : 
        
        <Paper elevation={3} className="table-paper">
        <Grid item xs={12}>
          {/* <Paper className="table-paper"> */}
          <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
          <TableHead>
          <StyledTableRow>
            {columns.map((column) => (
              <StyledTableCell
              key={column.id}
              align={column.align}
              style={{ minWidth: column.minWidth }}
            >
              {column.label}
            </StyledTableCell>
          ))}
          </StyledTableRow>
          </TableHead>

          <TableBody>
          {rows.map((row, index) => {
            return (
              <StyledTableRow hover key={index + 1}>
                {columns.map((column) => {
                  const value = row[column.id];
                   return (
                     <StyledTableCell
                      key={column.id}
                      align={column.align}
                      >
                      {value}
                     </StyledTableCell>
                     );
               })}
              </StyledTableRow>
                );
          })}
          </TableBody>
          </Table>
          </TableContainer>
          <Divider />
        </Grid>
        </Paper>
      }
</Grid>
       </div>
    </div>
  );
}

export default AllInvoices;