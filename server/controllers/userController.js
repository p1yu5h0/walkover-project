const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});


exports.view = (req, res) => {
    

    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Connected as id ' + connection.threadId);

        //user connection
        connection.query('SELECT * FROM user', (err, rows)=>{

            //when done with the connection, release it
            connection.release();
            if(!err){
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from user table: \n', rows)
        });
    });
}

exports.find = (req, res) => {
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
      if (!err) {
        res.render('home', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }