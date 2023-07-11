const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:4200" // URL of the frontend
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8080; 

app.get("/", (req, res) => {
    res.json({ message: "Welcome to node api application." });
});

const users = require("./routes/users");
app.use("/api/users/", users);

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}.`);
});