var express = require("express");
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
var pg = require('pg');
var moment = require('moment');

require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

var conString = process.env.ELEPHANTSQL_URL || "postgres://postgres:5432@localhost/postgres";

var client = new pg.Client(conString);
client.connect((err) => {
    if (err) {
        return console.error(err);
    } else {
        console.log('successfully connected to postgres');
        app.listen(5000, function () {
            console.log("Listening on 5000");
        });
    }
});

app.post('/submitData', (req, res) => {
    console.log(req.body)
    // client.query(`insert into flavors (flavornumber, flavorname) values ('${req.body.flavornumber}', '${req.body.flavorname}') returning *`, (err, result) => {
    //     if (err) {
    //         res.json(err);
    //         console.error(err);
    //     }
    //     console.log(result)
    //     var flav = result.rows[0];
            client.query(`insert into flavors (flavornumber, flavorname) values ('${req.body.flavornumber}', '${req.body.flavorname}')`, (err, result) => {
                if (err) {
                    res.json(err);
                    console.error('error running query', err);
                } else {
                    res.json('successfullly added flavor');
                }
            // });
        });
    });