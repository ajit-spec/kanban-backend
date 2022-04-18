require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')
const cors = require('cors')

async function connectDb() {
    await mongoose.connect(process.env.DB_URL);
}

connectDb()
.then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
}).catch(e => {
    console.log(e);
})

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    console.log('Hello World!');
    res.send('Hello World!')
  })

  app.use('/api/v1/auth', authRoute)

  app.use((req, res) => {
    res.status(404).send('404')
  })