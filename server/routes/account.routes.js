const account = require("../controllers/account.controller");
const router = require("express").Router();

router.get('/', account.getAll);
router.post("/", account.createAccount);

module.exports = router;