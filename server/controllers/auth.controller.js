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
    const token = jwt.sign({ id: find_email.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error
  })
  }
}

module.exports = self;
