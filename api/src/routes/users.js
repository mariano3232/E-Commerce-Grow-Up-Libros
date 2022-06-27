const { Router } = require('express')
const router = Router()

router.post('/addUser', (req, res) => {
  console.log(req.body)
})

module.exports = router
