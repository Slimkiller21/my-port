  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
  import { linkWithPopup, getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDZZZVZyVf2kBFlsraWzgb-frcL2Im8qxk",
    authDomain: "novo-test-c620e.firebaseapp.com",
    projectId: "novo-test-c620e",
    storageBucket: "novo-test-c620e.appspot.com",
    messagingSenderId: "165155012476",
    appId: "1:165155012476:web:94207d8b96cc0f2785aef9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const userEmail = document.getElementById("userEmail");
  const userPassword = document.getElementById("userPassword");
  const signin= document.getElementById("signin");
  const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const provider = new GoogleAuthProvider();

  
  // sign in

  const userSignin = async() => {
      const signinEmail = userEmail.value 
      const signinPassword = userPassword.value

     signInWithEmailAndPassword(auth, signinEmail, signinPassword )
      .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          window.location.assign("/login/login.html");
      })
      .catch((error)=> {
          const errorCode = error.code
          const errorMesage = error.message 
          console.log(errorCode + errorMesage)
          alert(error);

      })
  };
  
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    location.assign("/deufort-site/index.html")
    // ...
  } else {
    // User is signed out
    // ...
  }
});

  userPassword.addEventListener('keypress', function(event) {
      if(event.key === 'Enter'){
          userSignin();
      }
  })
  signin.addEventListener('click', userSignin)

  // Add a click event listener to the button
  document.getElementById("googlelog").addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  });
  
  