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
var session = require('client-sessions');

var port = process.env.PORT || 8080;

// Express server serving static files

app.use(express.static(__dirname));

app.use(session({
  cookieName: 'session',
  secret: Math.random().toString(36).substring(7),
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

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

    var authenticationQuery = "SELECT Vendor_id, password FROM vendor WHERE Vendor = '" + vendor_name + "';";

    connection.query(authenticationQuery, function(err, rows, fields) {
        if (err) throw err;
        if (password == rows[0].password) {
            var Vendor_id = rows[0].Vendor_id;
            var User = {
                Vendor_id: Vendor_id
            }
            req.session.user = User;
            res.sendStatus(200);
        }
    });
});

app.get('/dashboard', function (req,res) {
    res.sendFile(path.join(__dirname, "/Dashboard.html"));
});

app.get('/vendors/orders/', function(req,res) {

    var ordersQuery = "SELECT orders.*, Vendor.Vendor_id, Vendor, Name FROM orders left join medicine_vendor ON orders.SKU = medicine_vendor.SKU left join vendor ON medicine_vendor.Vendor_id = vendor.Vendor_id left join doctor ON orders.doctor_id = doctor.doctor_id WHERE Vendor.Vendor_id = " + req.session.user.Vendor_id + " order by order_status DESC,date";

    connection.query(ordersQuery, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/vendors/analytics/total', function(req,res) {
    var totalMedicineQuery = "select orders.SKU, sum(orders.quantity) as total, orders.date, vendor.Vendor_id FROM orders left join medicine_vendor on orders.SKU = medicine_vendor.SKU left join vendor on medicine_vendor.Vendor_id = vendor.Vendor_id where vendor.Vendor_id =" + req.session.user.Vendor_id + " group by orders.SKU, orders.date";

    connection.query(totalMedicineQuery, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/vendors/analytics/doctor', function(req,res) {
    var doctorQuery = "select orders.order_id, orders.doctor_id, doctor.Name, sum(orders.quantity) as total, vendor.Vendor_id FROM orders left join medicine_vendor on orders.SKU = medicine_vendor.SKU left join vendor on medicine_vendor.Vendor_id = vendor.Vendor_id left join doctor on orders.doctor_id = doctor.doctor_id where vendor.Vendor_id = " + req.session.user.Vendor_id + " group by orders.doctor_id";

    connection.query(doctorQuery, function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
});

app.post('/vendors/data/update', function (req,res) {
    if (req.body.update == 1) {
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

                        var checkQuery = "SELECT * FROM orders WHERE message_id = '" + message.sid + "';";

                        connection.query(doctorQuery, function(err, rows, fields) {
                            if (err) throw err;
                            var doctor_id = rows[0].doctor_id;

                            var insertQuery = "INSERT INTO orders (message_id,quantity,doctor_id, date,order_status,SKU) VALUES ('" + message.sid + "','" + quantity + "','" + doctor_id + "','" + timestamp +  "','Pending','" + sku + "');";

                            connection.query(checkQuery, function(err, rows, fields) {
                                if (rows.length == 0) {
                                    connection.query(insertQuery, function(err, rows, fields) {
                                        if (err) throw err;
                                        console.log(rows);
                                    });
                                }
                            });
                        });
                    });
                }
            });
        });
    }
});

/*client.messages.create({
    body: 'Hello from Dorothy',
    to: '+16173566919',  // Text this number
    from: '+16175536021' // From a valid Twilio number
}, function(err, message) {
    console.log(message);
});
*/

// bind the app to listen for connections on a specified port
app.listen(port, function () {
    console.log("Server started on port " + port);
});

//connection.end();
