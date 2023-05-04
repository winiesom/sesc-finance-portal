
const {invoice, account, Sequelize} = require('../models');
const self = {};

/**
 * @description Get All Invoices
 * @type GET
 * @path /invoices
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */


self.getAllInvoices = async (req, res) => {
  
  try {
    let data = await invoice.findAll({ 
      where : {
        account_id: req.account_id
      }
     });

     if (data) {
       return res.status(200).json({
         success: true,
         count: data.length,
         data: data
       })
     }
  } catch(error) {
    res.status(400).json({
      success: false,
      error: error
  })
  }
};


/**
 * @description Get Invoice
 * @type GET
 * @path /invoices/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */


self.getInvoice = async (req, res) => {

  const { id } = req.params;
  
  try {
    let data = await invoice.findOne({ 
      where : {
        reference: id
      }
     });

     if(!data) {
      return res.status(404).json({
        success: false,
        message: `Invoice with reference: ${id} does not exist`
      });
     }

     if (data) {
       return res.status(200).json({
         success: true,
         data: data
       })
     }
  } catch(error) {
    res.status(400).json({
      success: false,
      error: error
  })
  }
};


/**
 * @description Create New Invoice
 * @type POST
 * @path /invoices
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */

self.createInvoice = async (req, res) => {
  const {account_id, type, amount, reference, paid, book_id, course_id} = req.body

  
  if(account_id === '' || type === '' || amount === '' || reference === "" || paid === ''){
    return res.status(400).send({
      success:false,
      message:'Fields cannot be empty'
    })
  }


  try {

    const find_invoice_for_library = await invoice.findOne({ where: { type: 2, book_id: book_id } });
    if(find_invoice_for_library) {
      return res.status(406).send({
        success: false,
        message: `Invoice with this reference: ${reference} already exists`
      })
    }
    const find_invoice_for_course = await invoice.findOne({ where: { type: 1, course_id: course_id } });
    if(find_invoice_for_course) {
      return res.status(406).send({
        success: false,
        message: `Invoice with this reference: ${reference} already exists`
      })
    }

      const newInvoice = {account_id, type, amount, reference, paid, book_id, course_id }

      let data = await invoice.create(newInvoice)
       
      return  res.status(201).json({
      success: true,
      data: data
     });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
  })
}
}


/**
 * @description Pay Invoice
 * @type PUT
 * @path /invoices/:id
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */

self.payInvoice = async (req, res) => {
  const { id } = req.params;
  const invoicePayment = req.body;

  try {

    let data = await invoice.findOne({ 
      where : {
        reference: id
      }
     });

     if(!data) {
      return res.status(404).json({
        success: false,
        message: `Invoice with reference: ${id} does not exist`
      });
     }

     if(req.account_id !== invoicePayment.account_id) {
      return res.status(403).send({
        success: false,
        message: "This invoice belongs to another user"
    });
     }

    if(id !== invoicePayment.reference) {
      return res.status(403).send({
        success: false,
        message: "Reference do not match"
    });
    }

    const find_owner = await invoice.findOne({
      where: {
        account_id: req.account_id,
        reference: id
      }
    })

    if (!find_owner) {
      return res.status(403).send({
        success: false,
        message: "This invoice belongs to another user"
    });
    }

    const find_paid_reference = await invoice.findOne({
      where: {
        account_id: req.account_id,
        reference: id,
        paid: true
      }
    })

    if (find_paid_reference) {
      return res.status(406).send({
        success: false,
        message: "You have already paid this invoice"
    });
    }

     await invoice.update(invoicePayment, { where: { reference: id } });

     const updatedInvoiceRecord = await invoice.findOne({ where: { reference: id } });
    return res.status(200).json(updatedInvoiceRecord);
  } catch (error) {
    return res.status(400).json({
      error: error
    });
  }
}


module.exports = self;

