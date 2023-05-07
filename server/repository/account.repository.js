
const { account, invoice } = require("../models");

const getAllAccounts = async () => {
  return await account.findAll({});
}

const getAccount = async (id) => {
  return await account.findOne({ where: { account_id: id } });
}

const updateOutstanding = async (id) => {
  const data = await account.findOne({ where: { account_id: id } });

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

  let updateOutstanding;

  if (!paidAll) {
    // Set outstanding to true if all invoices are unpaid
    updateOutstanding = {
      ...data.toJSON(),
      outstanding: true
    };
  } else {
    // Set outstanding to false if any invoice is paid
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
}

const createAccount = async (accountData) => {
  return await account.create(accountData);
}

module.exports = { 
  getAllAccounts, 
  getAccount, 
  updateOutstanding, 
  createAccount 
};
