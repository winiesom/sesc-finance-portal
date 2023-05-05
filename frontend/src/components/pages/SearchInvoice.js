import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Grid, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PaymentIcon from '@mui/icons-material/Payment';

import { ThreeDots } from "react-loader-spinner";


import Snackbars from "../../assets/snackbar";
import { CustomButton } from "../../assets/button";
import {PuffSpinner} from '../../assets/spinner';
import { Colors } from "../../assets/themes/colors"

import Layout from  '../layout/Layout'

import { clearMessage } from "../../slices/message";
import { getInvoice, payInvoice } from "../../slices/invoice";


import '../../styles/invoice.styles.css'
import '../../styles/common.styles.css'


const SearchInvoice = () => {
  const [referenceData, setReferenceData] = useState({
    reference: ""
  });
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { invoice, invoiceSuccess } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();

  const handleCloseSnack = () => setServerError(false);
  const handleSuccessClose = () => setSuccess(false);



  const handleFindInvoice = () => {
    const reference = referenceData.reference
    if(reference) {
      setLoading(true);
      setError(false)
  
      dispatch(getInvoice({reference}))
      .then((data) => {
        setLoading(false);
        if(data.payload !== undefined) {
          setSuccess(true)
          setServerError(false)
        }
      })
      .catch((error) => {
        setLoading(false);
        setSuccess(false);
        setServerError(true)
      })
    } else {
      setError(true)
      
    }
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  }

  const handlePayInvoice = () => {
    const { id, account_id, amount, type, reference, book_id, course_id, createdAt, updatedAt } = invoice.data;

    setPaymentLoading(true);

    dispatch(payInvoice({ id, account_id, amount, type, reference, paid:true, book_id, course_id, createdAt, updatedAt }))
    .then((data) => {
      setPaymentLoading(false);
      if(data.payload !== undefined) {
        setSuccess(true);
        setReferenceData({ reference: "" })
        dispatch(getInvoice({reference}))
      }
    })
    .catch((error) => {
      setPaymentLoading(false);
      setServerError(true)
      
    })
    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
    return false
  }


  return (
    <div>
      <Layout />
      <div className="invoice-container">

      <Paper elevation={3} className="search-invoice-container">
      <Grid container spacing={0}>

      <Snackbars
        variant="success"
        handleClose={handleSuccessClose}
        message="Successful"
        isOpen={success}
      />
      <Snackbars
        variant="error"
        handleClose={handleCloseSnack}
        message={message}
        isOpen={serverError || message}
      />
      <Grid item xs={12} className="textfield-custom-label">
        Enter Reference
      </Grid>
      <Grid item xs={12}>
        <input 
        id="reference"
        type="text" 
        name="reference"
        required
        value={referenceData.reference}
        className="reference-textfield"
        onChange={(e) => setReferenceData({ ...referenceData, reference: e.target.value })}
        />
        {error && <div className="reference-error">Reference is required</div>}
      </Grid>
      <Grid item xs={12}>
      <CustomButton
        variant="contained"
        sx={{ background: Colors.primary}}
        className="customBtn"
        endIcon={ <SearchIcon />} 
        type="submit"
        onClick={handleFindInvoice} 
        disabled={loading}
      >
        {loading ? (
          <ThreeDots color="#2e3192" height={15} width={30} />
        ) : 
        "Find invoice"
        }
      </CustomButton>
      </Grid>
      </Grid>

      {loading ? 
      <Grid item xs={12} className="reference-puff-spinner">
      <PuffSpinner 
      height={50} 
      width={50} 
      color={Colors.primary}
      label='Loading...'
      />
    </Grid> : 
    invoice && invoice.data && invoiceSuccess && (
    <div style={{marginTop: "20px"}}>
      <Grid item xs={12}>
      <div className="sub-title">Reference</div>
      <div className="sub-title-text">{invoice.data.reference}</div>
      </Grid>
      <Grid item xs={12}>
      <div className="sub-title">Amount</div>
      <div className="sub-title-text">{invoice.data.amount && "£" + invoice.data.amount}</div>
      </Grid>
      <Grid item xs={12}>
      <div className="sub-title">Type</div>
      <div className="sub-title-text">{invoice.data.type === 1 ? "Course enrolment fee" : "Library fine"}</div>
      </Grid>
      <Grid item xs={12}>
      <div className="sub-title">Paid</div>
      <div className="sub-title-text">{invoice.data.paid === false ? "No" : "Yes"}</div>
      </Grid>
      {
        !invoice.data.paid && (
      <Grid item xs={12}>
      <CustomButton
        variant="contained"
        sx={{ background: Colors.primary}}
        className="customBtn"
        endIcon={ <PaymentIcon />} 
        type="submit"
        onClick={handlePayInvoice} 
        disabled={paymentLoading}
      >
        {loading ? (
          <ThreeDots color="#2e3192" height={15} width={30} />
        ) : 
        "Pay invoice"
        }
      </CustomButton>
      </Grid>
        )
      }
    </div>

    )
      }
      </Paper>
      </div>
    </div>
  )
}

export default SearchInvoice
