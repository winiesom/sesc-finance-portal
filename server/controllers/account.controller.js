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
    const { first_name, last_name, username, email, student_id, password, outstanding } = req.body;
        if (!first_name || !last_name || !username || !email || !student_id || !password) {
            return res.status(400).send({
                success: false,
                message: "Fields can not be empty!"
            });
        }
        try {
            const find_username = await account.findOne({ where: { username } });
            const find_email = await account.findOne({ where: { email } });
            const find_student_id = await account.findOne({ where: { student_id } });

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
            if(find_student_id) {
                return res.status(406).send({
                    success: false,
                    message: "Student id already exists"
                })
            }


            const newAccount = {
                first_name,
                last_name,
                username,
                email,
                student_id,
                password,
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