//Create web server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'
const dbName = 'comments';
const client = new MongoClient(url);
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

//Create route
app.get('/', (req, res) => res.send('Hello World!'));

//Create a route to get all comments
app.get('/comments', (req, res) => {
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('comments');
        collection.find({}).toArray((err, docs) => {
            res.send(docs);
        });
    });
});

//Create a route to add a comment
app.post('/comments', (req, res) => {
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('comments');
        collection.insertOne(req.body, (err, result) => {
            res.send(result);
        });
    });
});

//Create a route to delete a comment
app.delete('/comments/:id', (req, res) => {
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('comments');
        collection.deleteOne({ _id: req.params.id }, (err, result) => {
            res.send(result);
        });
    });
});

//Create a route to update a comment
app.put('/comments/:id', (req, res) => {
    client.connect((err) => {
        const db = client.db(dbName);
        const collection = db.collection('comments');
        collection.updateOne({ _id: req.params.id }, { $set: { author: req.body.author, text: req.body.text } }, (err, result) => {
            res.send(result);
        });
    });
});

//Start web server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));