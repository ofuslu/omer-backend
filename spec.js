var pgp = require('pg-promise')(/*options*/);
var cn = {
    host:'localhost',
    port:5432,
    database: 'dvdrental',
    user: 'postgres',
    password:'abc'
};
//Eric's comment on this file
//jhajha
var db = pgp(cn); //;asdl
//asjd

var arr = [];
db.any(`SELECT title
FROM film
WHERE title LIKE 'N%';`)
    .then((result) => {
        arr = result
    }).catch((err) => {
        console.log(err); // printing to error
    }).then(() => {
        console.log(arr);
    });
