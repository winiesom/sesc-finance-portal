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
    const invoices = "All invoices";
    res.json(invoices);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
  })
  }
};


self.createInvoice = async (req, res) => {
  try {
    const invoice = "Add invoice";
    res.json(invoice);
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
  })
}
}



module.exports = self;

