const accountService = require('../services/account.service');


/**
* @description Get All Accounts
* @type GET
* @path /accounts
* @param {*} req
* @param {*} res
* @returns JSON
*/
const getAllAccounts = async (req, res) => {
  try {
    let data = await accountService.getAllAccounts();
    return res.status(200).json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error
    });
  }
};

/**
* @description Get Account by ID
* @type GET
* @path /accounts/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
const getAccount = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await accountService.getAccount(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Account not found"
      });
    }

    await accountService.updateOutstanding(id);

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error
    });
  }
};

/**
* @description Create New Account
* @type POST
* @path /accounts
* @param {*} req
* @param {*} res
* @returns JSON
*/
const createAccount = async (req, res) => {
  const { first_name, last_name, username, email, account_id, password, outstanding } = req.body;
  if (!first_name || !last_name || !username || !email || !account_id || !password) {
    return res.status(400).send({
      success: false,
      message: "Fields cannot be empty!"
    });
  }
  try {
    // check if username, email, or account_id already exists
    const existingUsername = await accountService.getAccount(username);
    const existingEmail = await accountService.getAccount(email);
    const existingAccountID = await accountService.getAccount(account_id);

    if (existingUsername) {
      return res.status(406).send({
        success: false,
        message: "Username already exists"
      });
    }
    if (existingEmail) {
      return res.status(406).send({
        success: false,
        message: "Email already exists"
      });
    }
    if (existingAccountID) {
      return res.status(406).send({
        success: false,
        message: "Account ID already exists"
      });
    }

    const accountData = {
      first_name,
      last_name,
      username,
      email,
      account_id,
      password,
      outstanding
    };

    const createdAccount = await accountService.createAccount(accountData);

    return res.status(201).json({
      success: true,
      data: createdAccount
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error
    });
  }
};

module.exports = {
  getAllAccounts,
  getAccount,
  createAccount
};
