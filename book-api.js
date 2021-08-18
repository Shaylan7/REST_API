const express = require('express')
const bodyParser = require('body-parser');
// used for parsing the json 
const cors = require('cors');
// request is coming from another domain

const app = express();
const port = 3000;



// Where we will keep books
let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
    const book = req.body;

    console.log(book);
    books.push(book);

    res.send('Book is added to the database');

});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
