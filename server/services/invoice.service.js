let invoiceRepository;

if (process.env.NODE_ENV === 'test') {
  invoiceRepository = require('../repository/invoice.repository.mock');
} else {
  invoiceRepository = require('../repository/invoice.repository');
}


const getAllInvoices = async (accountId) => {
  return invoiceRepository.getAllInvoices(accountId);
};

const getInvoice = async (id) => {
  return invoiceRepository.getInvoice(id);
};

const createInvoice = async (newInvoice) => {
  try {
    const findExistingInvoice = await invoiceRepository.getInvoiceByReference(newInvoice.reference);
    if (findExistingInvoice) {
      throw new Error(`Invoice with this reference: ${newInvoice.reference} already exists`);
    }

    return invoiceRepository.createInvoice(newInvoice);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getInvoiceByReference = async (reference) => {
  return invoiceRepository.getInvoiceByReference(reference);
};

const payInvoice = async (reference, invoicePayment) => {
  try {
    const invoice = await invoiceRepository.getInvoiceByReference(reference);

    if (!invoice) {
      throw new Error(`Invoice with reference: ${reference} does not exist`);
    }

    if (invoice.account_id !== invoicePayment.account_id) {
      throw new Error("This invoice belongs to another user");
    }

    if (invoice.paid) {
      throw new Error("You have already paid this invoice");
    }

    return invoiceRepository.payInvoice(reference, invoicePayment);
  } catch (error) {
    throw new Error(error.message);
  }
};


module.exports = {
  getAllInvoices,
  getInvoice,
  createInvoice,
  getInvoiceByReference,
  payInvoice
};
