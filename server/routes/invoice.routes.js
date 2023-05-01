const invoice = require("../controllers/invoice.controller");
const router = require("express").Router();

const authMiddleware = require('../middleware/auth');

router.get("/", authMiddleware, invoice.getAll);
router.post("/",  invoice.createInvoice);

module.exports = router;