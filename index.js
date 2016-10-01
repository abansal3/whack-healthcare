// Twilio
var accountSid = 'AC2705780d0aef67e3ae69030ef529ec37'; // Your Account SID from www.twilio.com/console
var authToken = '21728edeb603084b5beda48e38c83db4';   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

// Database connection
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'build2',
  password : 'noidea',
  database : 'medrelay'
});

connection.connect();

connection.query('SELECT * from vendor', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
});

connection.end();

/*client.messages.create({
    body: 'Hello from Dorothy',
    to: '+16173566919',  // Text this number
    from: '+16175536021' // From a valid Twilio number
}, function(err, message) {
    console.log(message);
});
*/

function parse_message(message) {
    var medicines = message.body.split(',');
    medicines.forEach(function(medicine) {
        medicine = medicine.trim();
    });
    return medicines;
}

function list_messages() {
    client.messages.list(function(err, data) {
        data.messages.forEach(function(message) {
            if (message.direction == 'inbound') {
                console.log(parse_message(message));
            }
        });
    });
}

list_messages();
