const {invoice } = require('../models');

const getAllInvoices = async (accountId) => {
  return await invoice.findAll({ where: { account_id: accountId } });
};

const getInvoice = async (id) => {
  return await invoice.findOne({ where: { reference: id } });
};

const createInvoice = async (newInvoice) => {
  return await invoice.create(newInvoice);
};

const getInvoiceByReference = async (reference) => {
  return await invoice.findOne({ where: { reference: reference } });
};

const payInvoice = async (reference, invoicePayment) => {
  await invoice.update(invoicePayment, { where: { reference: reference } });
  return await invoice.findOne({ where: { reference: reference } });
};

  
module.exports = {
  getAllInvoices,
  getInvoice,
  createInvoice,
  getInvoiceByReference,
  payInvoice
};
  