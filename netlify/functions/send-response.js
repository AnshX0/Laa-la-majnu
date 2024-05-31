const twilio = require('twilio');
require('dotenv').config(); // Load environment variables from .env file

exports.handler = async (event, context) => {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, RECIPIENT_PHONE_NUMBER } = process.env;

  const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
  const { message } = JSON.parse(event.body);

  try {
    await client.messages.create({
      body: `Response: ${message}`,
      from: TWILIO_PHONE_NUMBER,
      to: RECIPIENT_PHONE_NUMBER
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'Message sent successfully' })
    };
  } catch (error) {
    console.error('Error sending message:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: 'Failed to send message', error: error.message })
    };
  }
};
