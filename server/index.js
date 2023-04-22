const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "*"
// origin: "http://localhost:8082"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
res.json({ message: "Welcome to finance portal microservice." });
});

const PORT = process.env.PORT || 8083;

const accounts = require("./routes/account.routes");
app.use("/accounts", accounts);


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});
