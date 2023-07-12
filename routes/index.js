const users = require("./users");
const contacts = require("./contacts");

module.exports = app => {
    app.use("/api/users", users);
    app.use("/api/contacts", contacts); 
};