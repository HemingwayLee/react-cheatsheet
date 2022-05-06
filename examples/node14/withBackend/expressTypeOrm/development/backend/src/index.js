const task = require('./db/tasks/categoryTasks')
var express = require('express')
var app = express()

app.get('/insert/:name', async (req, res) => {
  const result = await task.insertData(req.params.name);
  res.status(200).send(result);
})

app.get('/all/', async (req, res) => {
  const result = await task.getAll();
  res.status(200).send(result);
})

app.get('/', function(req, res) {
  res.status(200).send("Hello world!")
})

app.get('/api/', function(req, res) {
  res.status(200).send(JSON.stringify({ result: 5566 }))
})

app.get('/api/path/', function(req, res) {
  res.status(200).send(JSON.stringify({ result: 183 }))
})

app.listen(3000)
