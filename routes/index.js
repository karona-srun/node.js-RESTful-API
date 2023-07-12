const auth = require("./auth");
const users = require("./users");
const contacts = require("./contacts");

const authenticateUser = require('../middlewares/auth');

module.exports = app => {
    app.use("/api/auth", auth);
    app.use("/api/users", authenticateUser, users);
    app.use("/api/contacts", authenticateUser, contacts); 
};