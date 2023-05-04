const account = require("../controllers/account.controller");
const router = require("express").Router();

router.get('/', account.getAll);
router.get('/:id', account.getAccount);
router.post("/", account.createAccount);

module.exports = router;