
const {invoice, Sequelize} = require('../models');
const self = {};

/**
 * @description Get All Invoices
 * @type GET
 * @path /invoices
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */


self.getAll = async (req, res) => {
  try {
    const result = await invoice.findAll({})
    return res.status(200).json({
      success: true,
      data: result
  })
    
  } catch (error) {
    console.log('ERROR :',error.message)

    return res.status(500).json({
      success: false,
      error: error
  })
  }
};



self.createInvoice = async (req, res) => {
  const {account_id, type, amount, reference, paid, book_id, course_id} = req.body

  console.log(req.body)
  
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
    console.log(error, 'eerrrrrrorororor')
    return res.status(500).json({
      success: false,
      error: error
  })
}
}



module.exports = self;

