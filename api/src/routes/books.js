const { Router } = require("express");
const Books = require("../model/Libros");
const router = Router();

router.get("/", async function (req, res) {
  const books = await Books.find();
  res.json(books);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (id.length !== 24) throw new Error("The id have 24 characters");
    const book = await Books.findById(id);
    if (book === null) throw new Error("Book not found");
    res.status(200).json(book);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
