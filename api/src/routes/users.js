const { Router } = require('express')
const router = Router()
const Users = require('../model/Users')

router.get('/', async (req, res) => {
  try {
    const users = await Users.find().populate([
      'comments',
      'readBooks',
      'favouritesBooks',
      'buyBooks',
    ])
    if (users.length === 0) throw new Error('Users is empty')
    res.json(users)
  } catch (error) {
    res.send(error.message)
  }
})

router.post('/addUser', async (req, res) => {
  const { nickname, name, email, picture, phone, address } = req.body

  try {
    const isExistUser = await Users.findOne({ email })
    if (isExistUser) throw new Error('User is ready exists')

    let isSuperAdmin = false
    if (email === 'guillermobr88@gmail.com') isSuperAdmin = true

    const newUser = new Users({
      nickname,
      name,
      email,
      picture,
      phone,
      address,
      isSuperAdmin,
    })

    await newUser.save()

    res.send('Succes create user!')
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.post('/setAdmin/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await Users.findByIdAndUpdate(id, { isAdmin: true })
    if (!user) throw new Error('The user not exists')
    user.save()
    res.send('The user is now admin')
  } catch (error) {
    res.send(error.message)
  }
})

module.exports = router
