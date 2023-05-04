const bcrypt = require("bcryptjs");
const { account, invoice, Sequelize } = require("../models");

let self = {};

/**
* @description Get All Accounts
* @type GET
* @path /accounts
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => {
    try {
        let data = await account.findAll({});
        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}

self.getAccount = async (req, res) => {
  const {id} = req.params;
  try {
      let data = await account.findOne({ where : { account_id: id } });

      const checkPaid = await invoice.count({
        where: {
          account_id: id,
          paid: true
        }
      });
  
      const allInvoices = await invoice.count({
        where: {
          account_id: id
        }
      });

      const paidAll = (checkPaid === allInvoices);
      console.log(paidAll, 'PAAAAAAIIIIIIIDDDD')

      let updateOutstanding;

      if (!paidAll) {
        // Set outstanding to true if all invoices is unpaid
        updateOutstanding = {
          ...data.toJSON(),
          outstanding: true
        };
      } else {
        // Set outstanding to false if any invoice are paid
        updateOutstanding = {
          ...data.toJSON(),
          outstanding: false
        };
      }

      await account.update(updateOutstanding, {
        where: {
          account_id: id
        }
      });

      return res.status(200).json({
        success: true,
        data: data
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          error: error
      })
  }
}


/**
* @description Get All Accounts
* @type GET
* @path /accounts
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.outstanding = async (req, res) => {
    try {
      const checkPaid = await invoice.count({
        where: {
          account_id: req.account_id,
          paid: true
        }
      });
  
      const allInvoices = await invoice.count({
        where: {
          account_id: req.account_id
        }
      });
  
      const paidAll = (checkPaid === allInvoices);
  
      const findAccount = await account.findOne({
        where: {
          account_id: req.account_id
        }
      });
  
      let updateOutstanding;
  
      if (paidAll) {
        // Set outstanding to false if all invoices are paid
        updateOutstanding = {
          ...findAccount.toJSON(),
          outstanding: false
        };
      } else {
        // Set outstanding to true if any invoice is unpaid
        updateOutstanding = {
          ...findAccount.toJSON(),
          outstanding: true
        };
      }
  
      await account.update(updateOutstanding, {
        where: {
          account_id: req.account_id
        }
      });
  
      return res.status(200).json({
        success: true
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error
      });
    }
  };
  

/**
* @description Create New Account
* @type POST
* @path /accounts/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createAccount = async (req, res) => {
    const { first_name, last_name, username, email, account_id, password, outstanding } = req.body;
        if (!first_name || !last_name || !username || !email || !account_id || !password) {
            return res.status(400).send({
                success: false,
                message: "Fields can not be empty!"
            });
        }
        try {
            // check if username, email, or account_id already exists
            const find_username = await account.findOne({ where: { username } });
            const find_email = await account.findOne({ where: { email } });
            const find_account_id = await account.findOne({ where: { account_id } });
       
            // if username, email, or account_id already exists return a 406 status code
            if(find_username) {
                return res.status(406).send({
                    success: false,
                    message: "Username already exists"
                })
            }
            if(find_email) {
                return res.status(406).send({
                    success: false,
                    message: "Email already exists"
                })
            }
            if(find_account_id) {
                return res.status(406).send({
                    success: false,
                    message: "Account id already exists"
                })
            }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        


            const newAccount = {
                first_name,
                last_name,
                username,
                email,
                account_id,
                password: hashedPassword,
                outstanding
            };
            let data = await account.create(newAccount);
            return res.status(201).json({
                success: true,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error
            })
        }
    }

module.exports = self;