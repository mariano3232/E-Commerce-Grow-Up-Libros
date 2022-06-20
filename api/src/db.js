const mongoose = require('mongoose')

const uri = `mongodb+srv://dblibros:skyrim34@proyectodb.dhicigr.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(uri)
.catch(err=>{
console.log('ERROR AL CONECTAR', err)
})

const db = mongoose.connection

db.on('open', _=>{
    console.log('conectado a ', uri)
})
db.on('error',err=>{
    console.log('error en db', err)
})