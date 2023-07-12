const contact = require("../controllers/contacts");
const router = require("express").Router();
router.get("/", contact.getAll);
router.get("/:id", contact.get);
router.post("/", contact.createContacts);
router.put("/:id", contact.updateContacts);
router.delete("/:id", contact.delete);
router.delete("/", contact.deleteAll);
module.exports = router;