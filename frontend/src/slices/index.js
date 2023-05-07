import { combineReducers } from "redux";

import authReducer from "./auth";
import invoiceReducer from "./invoice";
import messageReducer from "./message";


const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  invoices: invoiceReducer
});

export default rootReducer;
