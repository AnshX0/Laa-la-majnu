require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
function sendTextMessage(response) {
    client.messages
        .create({
            body: `The response is: ${response}`,
            from: 'your_twilio_num',
            to: 'your_num'
        })
        .then(message => console.log(message.sid))
        .catch(err => console.error(err));
}
module.exports = { sendTextMessage };
