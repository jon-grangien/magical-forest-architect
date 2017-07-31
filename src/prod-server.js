const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, '..')))

app.get('/', function(req, res) {
  console.log(path.join(__dirname, '../index.html'))
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(8080, function (port, err) {
  if (err) return console.error(err);
  console.log(`Server running on port ${port}`);
})

