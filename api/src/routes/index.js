const { Router } = require('express')
const router = Router()

const books = require('./books')
const authors = require('./authors')
const genres = require('./genres')
const user = require('./users')

router.use('/books', books)
router.use('/authors', authors)
router.use('/genres', genres)
router.use('/users', user)
module.exports = router
