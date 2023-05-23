// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure



const accountSid = "AC7349c57359be31939d5b7e4a4c467f19";
const authToken = "09555bd737a14c248519516e711497d8";
function sendSMS(){
  const accountSid = "AC7349c57359be31939d5b7e4a4c467f19";
  const authToken = "09555bd737a14c248519516e711497d8";
  const client = twilio(accountSid, authToken);
  client.messages
    .create({ body: `Paz do SENHOR, este mês o Centro Deus forte teve uma média de ${media_por_mes} conversões por culto`, 
    from: "+19124754426",
     to:"+244997510042" })
      .then(message => console.log(message.sid), console.log("message sent"), console.log("enviada"));
  }
// Calculate the time until the next execution
const calculateNextExecution = () => {
  const currentDate = new Date();
  const nextExecutionDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 30,
    0, // 00:00 hours
    0, // 00 minutes
    0 // 00 seconds
  );
  return nextExecutionDate - currentDate;
};

// Schedule the initial execution
setTimeout(() => {
  sendSMS();

  // Schedule subsequent executions every 30 days
  setInterval(sendSMS, 30 * 24 * 60 * 60 * 1000);
}, calculateNextExecution());

console.log(media_por_mes)