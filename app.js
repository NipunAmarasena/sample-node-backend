const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const db = require('./util/database');

const app = express();
const port = 8080;


// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(express.json());

// app.use(bodyParser.json()); // application/json

db.execute('select * from sakila.actor limit 10').then(([data]) => {
    console.log(data);
}).catch();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/user', userRoutes);

app.listen(port);
console.log("App running on port " + port);

