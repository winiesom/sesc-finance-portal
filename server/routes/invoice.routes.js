const invoice = require("../controllers/invoice.controller");
const router = require("express").Router();

const authMiddleware = require('../middleware/auth');

router.get("/", authMiddleware, invoice.getAllInvoices);
router.get("/:id", authMiddleware, invoice.getInvoice);
router.put("/:id", authMiddleware, invoice.payInvoice);
router.post("/",  invoice.createInvoice);

module.exports = router;