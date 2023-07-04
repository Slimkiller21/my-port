import { getDatabase, ref, get, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
// import twilio from 'twilio';
const firebaseConfig = {
    apiKey: "AIzaSyDZZZVZyVf2kBFlsraWzgb-frcL2Im8qxk",
    authDomain: "novo-test-c620e.firebaseapp.com",
    databaseURL: "https://novo-test-c620e-default-rtdb.firebaseio.com",
    projectId: "novo-test-c620e",
    storageBucket: "novo-test-c620e.appspot.com",
    messagingSenderId: "165155012476",
    appId: "1:165155012476:web:94207d8b96cc0f2785aef9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const rootRef = ref(db);

// ---------------------------------- iteration ----------------------------------
    get(rootRef).then((snapshot) => {
      const data = snapshot.val();
      let count = 0;
      if (data !== null) {
        snapshot.forEach((childSnapshot) => {
          count++; // Increment count for each immediate child within "Membros_Baptizados/"
        });
      }
      console.log(`a pasta "Novos_Convertidos/"  tem ${count} filhos.`);
    }).catch((error) => {
      console.error(error);
    });
// ---------------------------------- iteration ----------------------------------
// Overall, this code is useful for quickly counting the total number of children in a Firebase Realtime Database, 
// which can be helpful for performance tuning and monitoring.
  
let media_por_mes = 0; // Move a declaração para o escopo global e atribui um valor inicial
  function getmedia(){
     const nodeRef = ref(db, "Novos_Convertidos");// In this function, we first get a reference to the "Novos_Convertidos" node in the database using the ref function. We then use the onValue method to listen for changes to the data in this node.
     let NodesLast30Days = 0;
  onValue(nodeRef, (snapshot) => {// Inside the onValue callback function, we loop through each child in the node using the forEach method of the snapshot object. For each child, we get the value of the timestamp field and create a new Date object representing 30 days ago.
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();
      const timestamp = childData.timestamp;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      console.log(thirtyDaysAgo)
      if (timestamp && timestamp > thirtyDaysAgo) {// We then check if the timestamp is greater than the thirtyDaysAgo date object, indicating that the child was added within the last 30 days. If it is, we increment the count variable.
        NodesLast30Days++;
      }
    });   
     media_por_mes = NodesLast30Days / 9
    console.log(`Number of children added within the last 30 days: ${NodesLast30Days}`);  // After processing all the children, we log the final value of the count variable to the console.
    console.log(`O centro Deus forte teve uma média de conversões de ${media_por_mes} membros por culto`);
  });
  }
getmedia();
  
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
