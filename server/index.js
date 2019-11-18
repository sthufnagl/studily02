//Details at https://medium.com/@etiennerouzeaud/how-create-an-api-restfull-in-express-node-js-without-database-b030c687e2ea
// Import packages
const express = require('express')
const morgan = require('morgan')
// App
const app = express()
// Morgan
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))
// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})
// Starting server
app.listen('1337', function () {
    console.log('Example app listening on port 1337!');
  });