const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
app.use(bodyParser.json());
app.use(cors());

// Database Name
const dbName = 'PassMan';

console.log('Connected successfully to server');
client.connect();
//get all the passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// save a password in the database
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({success : true, result: findResult})
})

// delete a password from the database
app.delete('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({success : true, result: findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})