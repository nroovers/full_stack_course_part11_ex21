// require('dotenv').config()

// const http = require('http')
const app = require('./app')
const config = require('./utils/config')


const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})