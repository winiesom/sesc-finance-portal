let accountRepository;

if (process.env.NODE_ENV === 'test') {
    accountRepository = require('../repository/account.repository.mock');
} else {
    accountRepository = require('../repository/account.repository');
}

const bcrypt = require("bcryptjs");


const getAllAccounts = async () => {
  return await accountRepository.getAllAccounts();
}

const getAccount = async (id) => {
  return await accountRepository.getAccount(id);
}

const createAccount = async (accountData) => {
  const { password } = accountData;
  if (!password) {
    throw new Error("Password is required.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newAccountData = { ...accountData, password: hashedPassword };
  return await accountRepository.createAccount(newAccountData);
}

const updateOutstanding = async (id) => {
  await accountRepository.updateOutstanding(id);
}

module.exports = { 
    getAllAccounts, 
    getAccount, 
    createAccount, 
    updateOutstanding 
};
