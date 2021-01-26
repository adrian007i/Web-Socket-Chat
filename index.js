const express = require('express')
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient


const app = express()
const port = 1337;
const dbUrl = 'mongodb://localhost:27017';
const dbname ='simple-chat'
app.use(express.static(__dirname));


//testing express
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//testing port 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//   if (err) return console.log(err)

//   // Storing a reference to the database so you can use it later
//   db = client.db(dbName)
//   console.log(`Connected MongoDB: ${url}`)
//   console.log(`Database: ${dbName}`)
// })
