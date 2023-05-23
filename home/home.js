    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDZZZVZyVf2kBFlsraWzgb-frcL2Im8qxk",
      authDomain: "novo-test-c620e.firebaseapp.com",
      projectId: "novo-test-c620e",
      storageBucket: "novo-test-c620e.appspot.com",
      messagingSenderId: "165155012476",
      appId: "1:165155012476:web:a930b5e2f1053f8585aef9"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // end
    const signout= document.getElementById("signout");
    const user = auth.currentUser;
        // checking auth atate
        const checkAuthState = async() =>{
            onAuthStateChanged(auth, user =>{
                if(user){
                    const displayName = user.displayName;
                    const email = user.email;
                    const photoURL = user.photoURL;
                    const emailVerified = user.emailVerified;
                    console.log(email, displayName,photoURL, emailVerified)
                }
                else{
                 window.location.assign("/login/login.html")
                }
                if(user.email == 'slimkiller2021@gmail.com' || user.email == 'emvca4@gmail.com'){
                    
                }
            })
        }

        const userSignOut = async() =>{
            await signOut(auth)
        }
        checkAuthState();
        signout.addEventListener('click', userSignOut)

       window.onload(
        document.querySelector('.wrapper').style.display='none'
       )


