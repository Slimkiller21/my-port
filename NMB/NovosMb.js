 // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
   import { getDatabase, ref, set, child, update, remove, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
   import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
   // TODO: Add SDKs for Firebase products that you want to use
   // https://firebase.google.com/docs/web/setup#available-libraries
 
   // Your web app's Firebase configuration
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
   const auth = getAuth(app);
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
                 window.location.assign("/login/index.html")
                }
                if(user.email == 'slimkiller2021@gmail.com'){
                    alert("olá selmar")

                }
            })
        }
        checkAuthState();
        console.log(auth)

export function writeUserData(nome, fone, sexo, local, facebook, data) {
       const db = getDatabase(app); 
       let registrar = document.getElementById('registrar');
       let nomes = document.getElementById('nome-el').value;
       let fone_ = document.getElementById('fone-el').value;
       let sexo_ = document.getElementById('sexo').value;
       let local_ = document.getElementById('local').value;
       let facebook_= document.getElementById('fbId').value;
       let data_ = document.getElementById("data-el").value;
       let morada = document.getElementById("morada").value;

        set(ref(db, "Novos_Convertidos/" + nomes), {
               Contacto_telefónico: fone_,
               Data_de_conversão : data_,
               Gênero : sexo_, 
               Id_Facebook : facebook_,
               Morada: morada,
               Local_de_conversão : local_,
               Nome_completo: nomes,
               timestamp: serverTimestamp()
       })
       .then(() => {
           alert("salvo com sucesso")
           location.reload();
       })
       .catch((error) =>{
           alert(error)
           console.log(error)
       })
       }

const registrar = document.getElementById("registrar")
registrar.addEventListener('click', writeUserData);

document.getElementById("backbtn").addEventListener('click', ()=>{
        window.history.back();
})
