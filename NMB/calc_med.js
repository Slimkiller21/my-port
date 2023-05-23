import { getDatabase, ref, get, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import twilio from 'twilio';
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
// ------------- iterates over the database and returns the number of children---------------------
// This code snippet retrieves a snapshot of the entire Firebase Realtime Database using the `get()` method, and then iterates through each top-level node in the database to count the total number of children in the database. Here's what the code does step by step:
// 1. `const rootRef = ref(db);` - This line creates a `rootRef` reference that points to the root of the database.
const rootRef = ref(db);
// 2. `get(rootRef)` - This line fetches a snapshot of the entire database.
// 3. `.then((snapshot) => {` - This line starts a Promise chain that executes when the snapshot is successfully retrieved.
get(rootRef).then((snapshot) => {
// 4. `const data = snapshot.val();` - This line extracts the JavaScript object representation of the database from the snapshot using the `val()` method.
  const data = snapshot.val();
  let count = 0;
// 6. `for (const key in data) {` - This line starts a loop that iterates through each top-level node in the database.
  for (const key in data) {
// 7. `if (Object.prototype.hasOwnProperty.call(data, key)) {` - This line checks if the current node is actually a property of the `data` object to avoid counting any inherited properties.
    if (Object.prototype.hasOwnProperty.call(data, key)) {
// 8. `const element = data[key];` - This line retrieves the value of the current node as an object.
      const element = data[key];
      count = Object.keys(element).length;
    }
  }

  console.log(`The database has ${count} children.`);
}).catch((error) => {
  console.error(error);
});

// Overall, this code is useful for quickly counting the total number of children in a Firebase Realtime Database, which can be helpful for performance tuning and monitoring.
  
 
  export function getmedia(){
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
    console.log(`Number of children added within the last 30 days: ${NodesLast30Days}`);  // After processing all the children, we log the final value of the count variable to the console.
    let media_por_mes = NodesLast30Days / 9
    window.var
    console.log(`O centro Deus forte teve uma média de conversões de ${media_por_mes} membros por culto`);
  });
  }

  
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
