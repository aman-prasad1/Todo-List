const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url);
const dbname = 'TodoApp'

app.use(bodyParser.json())
app.use(cors())
client.connect()

app.listen(port, ()=>{
    console.log(`Example app listening on http://localhost:${port}`)
})

// get todos
app.get('/', async (req,res)=>{
    const db = client.db(dbname);
    const collection = db.collection('todos');
    let arr = await collection.find({}).toArray();
    res.send(arr)
})

// save todo
app.post('/', async (req,res)=>{
    const todo = req.body
    const db = client.db(dbname);
    const collection = db.collection('todos');
    const insertResult = await collection.insertOne(todo)
    res.send({success : true})
})

// delete todo
app.delete('/', async (req,res)=>{
    const db = client.db(dbname);
    const collection = db.collection('todos');
    const todo = req.body
    const deleteResult = await collection.deleteOne(todo)
    res.send({success:true})
})

app.put('/', async (req, res)=>{
    const db = client.db(dbname);
    const collection = db.collection('todos');
    const updateResult = await collection.updateOne(
        {id : req.body.id},
        {$set:{isCompleted : req.body.isCompleted}}
    )
  
    res.send({success:true})
})