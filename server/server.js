const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.text({extended: true}))

//Details at https://zellwk.com/blog/crud-express-mongodb/
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.post('/login', function (req, res) {
    console.log(req.body);
    res.send(req.body);
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});