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
                    res.json('successfully added flavor');
                }
            // });
        });
    });
//route handler
app.post('/getFlavor1', (req, res) => {  //request, response
    // console.log(req.body)
        client.query(`select flavorname from flavors where flavornumber = '1';`, (err, result) => {
            if (err) {
                res.json(err);
                console.error('error finding flavors', err);
            } else {
                processedFlavor1 = result.rows.map((flavor)=>{
                    console.log(flavor);
                    return (flavor.flavorname);
                });
                // console.log(processedFlavor1[0]);
                res.json(processedFlavor1);
            }
        })
})

app.post('/getFlavor2', (req, res) => {
    console.log(req.body)
        client.query(`select flavorname from flavors where flavornumber = '2';`, (err, result) => {
            if (err) {
                res.json(err);
                console.error('error finding flavors', err);
            } else {
                processedFlavor2 = result.rows.map((flavor)=>{
                    return (flavor.flavorname);
                });
                res.json(processedFlavor2);
                // res.json(result.rows);
                // console.log(result.rows);
            }
        })
})