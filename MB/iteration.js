// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyArcPHlC5iCokwdwl8Vgwx4Og2edN7T6-c",
    authDomain: "first-firebase-test-31e09.firebaseapp.com",
    databaseURL: "https://first-firebase-test-31e09-default-rtdb.firebaseio.com",
    projectId: "first-firebase-test-31e09",
    storageBucket: "first-firebase-test-31e09.appspot.com",
    messagingSenderId: "114644799892",
    appId: "1:114644799892:web:0cbc816d5858a14c54ff81"
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