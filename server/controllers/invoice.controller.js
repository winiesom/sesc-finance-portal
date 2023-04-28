
const {invoice, Sequelize} = require('../models');
const self = {};

/**
 * @description Get All Books
 * @type GET
 * @path /books
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
  
  try {
    const {account_id, type, amount,  paid} = req.body
    if(account_id === '' || type === '' || amount === '' || paid === ''){
      return res.status(400).send({
        success:false,
        message:'Fields cannot be empty'
      })
    }else{
      console.log('Body in')
      const newInvoice = {account_id, type, amount, paid }

      let data = await invoice.create(newInvoice)
  
      return  res.status(201).json({
      success:true,
      data:data
     });

    }
  } catch (error) {
    console.log('ERROR :',error.message)
    return res.status(500).json({
      success: false,
      error: error
  })
}
}



module.exports = self;

