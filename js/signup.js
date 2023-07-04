     // Import the functions you need from the SDKs you need
     import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
     import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

   
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDZZZVZyVf2kBFlsraWzgb-frcL2Im8qxk",
    authDomain: "novo-test-c620e.firebaseapp.com",
    projectId: "novo-test-c620e",
    storageBucket: "novo-test-c620e.appspot.com",
    messagingSenderId: "165155012476",
    appId: "1:165155012476:web:94207d8b96cc0f2785aef9"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const email = document.getElementById('Email').value
  const password = document.getElementById('Password').value

function signup(e){
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
   alert('secesso')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage, errorCode)
    // ..
  });
}
  
document.getElementById('regbtn').addEventListener('click', signup)