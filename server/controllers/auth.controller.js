const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const { account, Sequelize } = require("../models");
require('dotenv').config();

let self = {};

/**
 * @description login
 * @type POST
 * @path /login/
 * @param {*} req
 * @param {*} res
 * @returns JSON
 */
self.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if email exists
    const find_email = await account.findOne({ where: {email} });

    // If email doesn't exist, return a 403 status
    if(!find_email) {
      return res.status(403).send({
        success: false,
        message: "Invalid credentials"
      })
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, find_email.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // If all credentials are correct, sign jwt and return a response with successful and jwt token

    // Generate token
    const token = jwt.sign({ id: find_email.id, account_id: find_email.account_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const data = { id: find_email.id, account_id: find_email.account_id, first_name:find_email.first_name, last_name: find_email.last_name }

    res.json({ token, data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error
  })
  }
}

module.exports = self;
