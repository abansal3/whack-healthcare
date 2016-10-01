var accountSid = 'AC2705780d0aef67e3ae69030ef529ec37'; // Your Account SID from www.twilio.com/console
var authToken = '21728edeb603084b5beda48e38c83db4';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio.RestClient(accountSid, authToken);

/*client.messages.create({
    body: 'Hello from Dorothy',
    to: '+16173566919',  // Text this number
    from: '+16175536021' // From a valid Twilio number
}, function(err, message) {
    console.log(message);
});

client.messages("SM3bcd8e5f1a3074e265cc8d307257dc8d").get(function(err, message) {
    console.log(message);
});*/

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
