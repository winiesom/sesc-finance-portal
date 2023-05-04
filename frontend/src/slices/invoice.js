import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import InvoicesService from "../services/invoice.service";
import invoicesService from '../services/invoice.service';



export const getAllInvoices = createAsyncThunk(
  "invoices/getallinvoices",
  async (thunkAPI) => {
    try {
      const response = await InvoicesService.getAllInvoices();
      return response.data
    } catch (error) {
      let message = error.response.data.message || error.response.statusText

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getInvoice = createAsyncThunk(
  "invoices/getinvoice",
  async ({reference}, thunkAPI) => {
    try {
      const response = await InvoicesService.getInvoice(reference);
      return response.data
    } catch (error) {
      let message = error.response.data.message || error.response.statusText

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const payInvoice = createAsyncThunk(
  "invoices/payinvoice",
  async ({ id, account_id, amount, type, reference, paid, book_id, course_id, createdAt, updatedAt }, thunkAPI) => {
    try {
      const response = await invoicesService.payInvoice(
        id, account_id, amount, type, reference, paid, book_id, course_id, createdAt, updatedAt
      );
      return response.data
    } catch (error) {
      let message = error.response.data.message || error.response.statusText

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue()
    }
  }
)



const initialState = {
  success: false,
  invoices: null,
  invoice: null,
  invoiceSuccess: false,
  invoicePaid: null,
  paidSuccess: false
};
const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllInvoices.fulfilled, (state, action) => {
      state.success = true;
      state.invoices = action.payload;
    });
    builder.addCase(getAllInvoices.rejected, (state, action) => {
      state.success = false;
    });
    builder.addCase(getInvoice.fulfilled, (state, action) => {
      state.invoiceSuccess = true;
      state.invoice = action.payload;
    });
    builder.addCase(getInvoice.rejected, (state, action) => {
      state.invoiceSuccess = false;
    });
    builder.addCase(payInvoice.fulfilled, (state, action) => {
      state.paidSuccess = true;
      state.invoicePaid = action.payload;
    });
    builder.addCase(payInvoice.rejected, (state, action) => {
      state.paidSuccess = false;
    });
  },
});

const { reducer } = invoicesSlice;
export default reducer;
