// Twilio
var accountSid = 'AC2705780d0aef67e3ae69030ef529ec37'; // Your Account SID from www.twilio.com/console
var authToken = '21728edeb603084b5beda48e38c83db4';   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

// Server
var express = require('express');            // call express
var app = express();                         // define our app using express
var bodyParser = require('body-parser');     // call body parser
var fs = require('fs');                      // call file system
var path = require('path');                  // call path (directory navigation)
//var Sha256 = require('./hash.js');           // call hash.js file

var port = process.env.PORT || 8080;

// Express server serving static files

app.use(express.static(__dirname));

// Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index page routing

app.get('/', function (req,res) {
    res.send("Hello");
});

app.get('/data', function (req,res) {
    res.json({
        "name": "hello"
    });
});

// Database connection
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'build2',
  password : 'noidea',
  database : 'medrelay'
});

// Database example
connection.connect();

/*connection.query('SELECT * from vendor', function(err, rows, fields) {
    if (err) throw err;
    //console.log(rows);
});*/

/*client.messages.create({
    body: 'Hello from Dorothy',
    to: '+16173566919',  // Text this number
    from: '+16175536021' // From a valid Twilio number
}, function(err, message) {
    console.log(message);
});
*/

function list_messages() {
    client.messages.list(function(err, data) {
        data.messages.forEach(function(message) {
            var body = message.body.split(',');
            if (message.direction == 'inbound' && body[0] == 'Medrelay') {
                //console.log(body);
                var medicines = body.splice(1,body.length);
                medicines.forEach(function(medicine) {
                    medicine = medicine.split(' ');
                    var sku = medicine[0];
                    var quantity = medicine[1];
                    var timestamp = message.date_sent;

                    var phone = message.from;
                    console.log(phone);

                    var insertQuery = "INSERT INTO orders (SKU,quantity) VALUES ('" + sku + "','" + quantity + "');";

                    /*connection.query(insertQuery, function(err, rows, fields) {
                        if (err) throw err;
                        console.log(rows);
                    });*/
                });
            }
        });
    });
}

list_messages();

// bind the app to listen for connections on a specified port
app.listen(port, function () {
    console.log("Server started on port " + port);
});

//connection.end();
