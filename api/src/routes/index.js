const { Router } = require("express");
const books = require("./books");
const router = Router();

router.use("/", books);

module.exports = router;
