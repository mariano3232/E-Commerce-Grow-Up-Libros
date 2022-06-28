const { Router } = require('express')
const router = Router()
const Users = require('../model/Users')
router.post('/addUser', async (req, res) => {
  const { nickname, name, email, picture, phone, address } = req.body

  const isAdmin = false
  if (email === 'guillermobr88@gmail.com') isAdmin = true

  const newUser = new Users({
    nickname,
    name,
    email,
    picture,
    phone,
    address,
    isAdmin,
  })

  await newUser.save()

  res.send('Succes')
})

module.exports = router
