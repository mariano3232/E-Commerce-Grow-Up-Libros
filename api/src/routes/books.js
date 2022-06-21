const { Router } = require("express");
const Books = require("../model/Libros");
const Auhtor = require("../model/Auhtor");
const router = Router();

router.get("/books", async function (req, res) {
  
  const {filter}= req.query
  try {
    if(filter){
      const booksGenres = await  Books.find({genres: filter});      
      res.json(booksGenres)
    } 
    
    const books = await Books.find({}).populate('author',{
      name:1
    });
    
    res.json(books);
  } catch (error) {
    console.log('FALLO BUSQUEDA', error)
  }
  
});





module.exports = router;
