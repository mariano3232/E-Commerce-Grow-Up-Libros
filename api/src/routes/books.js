const { Router } = require("express");
const Books = require("../model/Books");
const Author = require("../model/Author");
const Genres = require("../model/Genres");
const router = Router();

router.get("/", async function (req, res) {
  const books = await Books.find({}).populate(["authors", "genres"]);
  res.json(books);
});

router.get("/rating", async function (req, res) {
  try {
    const books = await Books.find({}).populate(["authors", "genres"]);
    if (!books) throw new Error("The books not found");
    const auxBooks = [...books];
    const ratingBooks = auxBooks.sort(function (a, b) {
      if (a.LastName > b.LastName) {
        return -1;
      }
      if (a.LastName < b.LastName) {
        return 1;
      }
      return 0;
    });
    res.status(200).json(ratingBooks);
  } catch (err) {
    res.status(404).send(err.message);
  }
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

router.post("/addBook", async function (req, res) {
  const {
    title,
    author,
    year,
    pages,
    editorial,
    cover,
    rating,
    stock,
    price,
    genres,
    review,
  } = req.body;

  const arrayGenres = genres.map(async (genre) => {
    const getGenre = await Genres.findById(genre);
    return getGenre._id;
  });

  try {
    const getAuthor = await Author.findById(author);
    if (getAuthor === null) throw new Error("Author not found");
    const newBook = new Books({
      title,
      authors: getAuthor._id,
      year,
      pages,
      editorial,
      cover,
      rating,
      stock,
      price,
      genres: await Promise.all([...arrayGenres]),
      review,
    });

    const newBookSaved = await newBook.save();
    getAuthor.books.push(newBookSaved._id);
    await getAuthor.save();

    genres.forEach(async (genre) => {
      const getGenre = await Genres.findById(genre);
      getGenre.books.push(newBookSaved._id);
      await getGenre.save();
    });

    res.send(newBookSaved);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
