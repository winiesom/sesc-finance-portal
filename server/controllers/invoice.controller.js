const invoiceService = require('../services/invoice.service');

const getAllInvoices = async (req, res) => {
  try {
    const accountId = req.account_id;
    const invoices = await invoiceService.getAllInvoices(accountId);
    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

const getInvoice = async (req, res) => {
  try {
    const {id} = req.params;
    const invoice = await invoiceService.getInvoice(id);

    if(!invoice) {
      res.status(404).json({
        success: false,
        message: `Invoice with reference: ${id} does not exist`
      });
    }

    if(invoice) {
      res.status(200).json({
        success: true,
        data: invoice
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error });
  }
};


const createInvoice = async (req, res) => {
  const { account_id, type, amount, reference, paid, book_id, course_id } = req.body;

  if (account_id === '' || type === '' || amount === '' || reference === "" || paid === '') {
    return res.status(400).send({
      success: false,
      message: 'Fields cannot be empty'
    });
  }

  try {
    const newInvoice = { account_id, type, amount, reference, paid, book_id, course_id };
    const createdInvoice = await invoiceService.createInvoice(newInvoice);

    return res.status(201).json({
      success: true,
      data: createdInvoice
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

const payInvoice = async (req, res) => {
  const { id } = req.params;
  const invoicePayment = req.body;

  try {
    const invoice = await invoiceService.getInvoice(id);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: `Invoice with reference: ${id} does not exist`
      });
    }

    if (req.account_id !== invoice.account_id) {
      return res.status(403).send({
        success: false,
        message: "This invoice belongs to another user"
      });
    }

    if (id !== invoicePayment.reference) {
      return res.status(403).send({
        success: false,
        message: "Reference do not match"
      });
    }

    const findOwner = await invoiceService.getInvoiceByReference(id);

    if (!findOwner) {
      return res.status(403).send({
        success: false,
        message: "This invoice belongs to another user"
      });
    }

    if (findOwner.paid) {
      return res.status(406).send({
        success: false,
        message: "You have already paid this invoice"
      });
    }

    const updatedInvoice = await invoiceService.payInvoice(id, invoicePayment);

    return res.status(200).json(updatedInvoice);
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
};



module.exports = {
  getAllInvoices,
  getInvoice,
  createInvoice,
  payInvoice
};
