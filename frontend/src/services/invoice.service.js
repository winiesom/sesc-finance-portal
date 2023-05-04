import api from "../api/api";


const getAllInvoices = () => api.get("invoices");

const getInvoice = (reference) => api.get(`invoices/${reference}`);

const payInvoice = (id, account_id, amount, type, reference, paid, book_id, course_id, createdAt, updatedAt) => api.put(`invoices/${reference}`, {
    id, account_id, amount, type, reference, paid, book_id, course_id, createdAt, updatedAt
});


const invoicesService = {
    getAllInvoices,
    getInvoice,
    payInvoice
};

export default invoicesService;
