const auth = require("../controllers/auth.controller");
const router = require("express").Router();

router.post("/", auth.login);

module.exports = router;