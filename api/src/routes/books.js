const { Router } = require("express");
const Books = require("../model/Libros");
const router = Router();

router.get("/", async function (req, res) {
  const books = await Books.find();
  console.log(books);
  res.json(books);
});

module.exports = router;
