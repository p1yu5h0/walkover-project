const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5010;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static('public'));

const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', 'hbs');


const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
    connection.release();
});

const routes = require('./server/routes/user.js');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));