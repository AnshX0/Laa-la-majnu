require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
function sendTextMessage(response) {
    client.messages
        .create({
            body: `The response is: ${response}`,
            from: '+17744841681',
            to: '+917425856996'
        })
        .then(message => console.log(message.sid))
        .catch(err => console.error(err));
}
module.exports = { sendTextMessage };