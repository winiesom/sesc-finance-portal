const { account, Sequelize } = require("../models");
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

/**
* @description Create New Account
* @type POST
* @path /accounts/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createAccount = async (req, res) => {
        if (!req.body.first_name || !req.body.last_name || !req.body.username || !req.body.email || !req.body.student_id || !req.body.password) {
            return res.status(400).send({
                success: false,
                message: "Fields can not be empty!"
            });
        }
        try {
            const newAccount = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                email: req.body.email,
                student_id: req.body.student_id,
                password: req.body.password,
                outstanding: req.body.outstanding || false
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