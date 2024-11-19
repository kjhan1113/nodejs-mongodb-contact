const express = require("express");
const dbConnect = require("./config/dbConnect");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");

dbConnect();

app.get("/", (req, res) => {
    res.send("App.js Page");
});

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/contacts", require("./routes/contactRoute"));

app.listen(3000, ()=>{
    console.log("Server is running");
});
