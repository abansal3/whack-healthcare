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

// Index page routing

app.get('/', function (req,res) {
    res.sendFile(path.join(__dirname, "/MedRelay.html"));
});

app.post('/login', function(req,res) {

    var vendor_name = req.body.vendor_name;
    var password = req.body.password;

    var authenticationQuery = "SELECT password FROM vendor WHERE Vendor = '" + vendor_name + "';";

    connection.query(authenticationQuery, function(err, rows, fields) {
        if (err) throw err;
        if (password == rows[0].password) {
            res.status(200).send("Authenticated");
        }
    });
});

app.get('/dashboard', function (req,res) {
    res.sendFile(path.join(__dirname, "/Dashboard.html"));
});

app.get('/vendors/orders/', function(req,res) {

    var ordersQuery = "SELECT orders.*, Vendor.Vendor_id, Vendor, Name FROM orders left join medicine_vendor ON orders.SKU = medicine_vendor.SKU left join vendor ON medicine_vendor.Vendor_id = vendor.Vendor_id left join doctor ON orders.doctor_id = doctor.doctor_id WHERE Vendor.Vendor_id = 1 group by orders.SKU order by order_status DESC,date";

    connection.query(ordersQuery, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
})

app.get('/data', function (req,res) {
    res.json({
        "name": "hello"
    });
});

// SELECT orders.*, Vendor_id FROM orders left join medicine_vendor ON orders.SKU = medicine_vendor.SKU group by orders.SKU

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
                var medicines = body.splice(1,body.length);
                medicines.forEach(function(medicine) {
                    medicine = medicine.split(' ');
                    var sku = medicine[0];
                    var quantity = medicine[1];
                    var timestamp = message.date_sent;

                    var phone = message.from;
                    var phone_parsed = phone.slice(2,phone.length);

                    var doctorQuery = "SELECT doctor_id FROM doctor WHERE Phone = '" + phone_parsed + "';";

                    connection.query(doctorQuery, function(err, rows, fields) {
                        if (err) throw err;
                        var doctor_id = rows[0].doctor_id;

                        var insertQuery = "INSERT INTO orders (SKU,quantity,doctor_id, date,order_status) VALUES ('" + sku + "','" + quantity + "','" + doctor_id + "','" + timestamp +  "','Pending');";

                        connection.query(insertQuery, function(err, rows, fields) {
                            if (err) throw err;
                            console.log(rows);
                        });
                    });
                });
            }
        });
    });
}

//list_messages();

// bind the app to listen for connections on a specified port
app.listen(port, function () {
    console.log("Server started on port " + port);
});

//connection.end();
