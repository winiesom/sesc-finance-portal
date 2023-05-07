
let data = [
  {
    id: 3,
    first_name: "Judy",
    last_name: "Doe",
    username: "judydoe",
    email: "judydoe@example.com",
    account_id: "c735123909",
    password: "password",
    outstanding: true,
    createdAt: "2023-05-06T12:04:09.859Z",
    updatedAt: "2023-05-06T12:06:22.278Z"
  }
];

const getAllAccounts = async () => {
  return data;
}

const getAccount = async (id) => {
  return data.find((account) => account.account_id === id);
}

const updateOutstanding = async (id) => {
  const account = data.find((account) => account.account_id === id);
  if (account) {
    const checkPaid = data.filter((invoice) => invoice.account_id === id && invoice.paid).length;
    const allInvoices = data.filter((invoice) => invoice.account_id === id).length;

    const paidAll = (checkPaid === allInvoices);

    if (!paidAll) {
      // Set outstanding to true if all invoices are unpaid
      account.outstanding = true;
    } else {
      // Set outstanding to false if any invoice is paid
      account.outstanding = false;
    }

    return account;
  }
  return null;
}

const createAccount = async (accountData) => {
  data.push(accountData);
  return accountData;
}

module.exports = { 
  getAllAccounts, 
  getAccount, 
  updateOutstanding, 
  createAccount 
};
