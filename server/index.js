const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser")


require('dotenv').config();

const app = express();

let corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
res.json({ message: "Welcome to finance portal microservice." });
});

const PORT = process.env.PORT || 8083;

const accounts = require("./routes/account.routes");
app.use("/accounts", accounts);

const login = require("./routes/auth.routes");
app.use("/login", login);

const invoices = require("./routes/invoice.routes");
app.use("/invoices", invoices);


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});
