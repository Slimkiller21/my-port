// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

  const admin = {
    secretária: 'emvca4@gmail.com',
    pastor: 'deusfortecdf@gmail.com'
   }
  const Evangelização = {
  Líder:'',
  vice_líder_Evangelização:'slimkiller2021@gmail.com',
  secretario:'',
  tesoureiro:''
  } 
  // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const auth = getAuth(app);
      const dataRef = ref(db, "Membros_Baptizados/");
      const signout= document.getElementById("signout");
      const user = auth.currentUser;
      let username = document.getElementById('userName')

    // checking auth atate
    const checkAuthState = async() =>{
        onAuthStateChanged(auth, user =>{
            if(user){
                const displayName = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                const emailVerified = user.emailVerified;
                console.log(email, displayName,photoURL, emailVerified)
                username.innerHTML = displayName
                document.getElementById("userImage").src = user.photoURL;
                // Check if the user's email is in the allowedEmails object
                const admins  = Object.keys(admin).find(key => admin[key] === email);
                const Evangelizaçãos  = Object.keys(Evangelização).find(key => Evangelização[key] === email);
                if (Evangelizaçãos) {
                  const navigationItems = document.querySelectorAll('.nav-item');
                  // Loop through each navigation item and hide based on its text content
                  navigationItems.forEach(item => {
                  const itemName = item.querySelector('span').innerHTML;
                  // Define the navigation items to hide based on access level
                  const itemsToHide = ['MÚSICA', 'JUVENTUDE', 'E.B.D', 'ELIFELETE', 'ELIADA', 'HOMENS','LIGA FEMININA'];
                  if (itemsToHide.includes(itemName)) {
                    item.classList.add('hide')
                  }
            })
          } if(admins){
            alert(admins)
          }
        }else{
              location.assign('/login/login.html')
            }
      }
    )
  }
checkAuthState();
    console.log(auth)
//   calcula a idade
    function calculateAge(data_) {
        const dob = new Date(data_); //uma nova data é guarg«dada nessa variável, a data é que foi o input no cadastro
        const ageDiffMs = Date.now() - dob.getTime(); // acha a diferença em meses
        const ageDate = new Date(ageDiffMs); 
        const idade = Math.abs(ageDate.getUTCFullYear() - 1970);
        return idade;
      }
// fim da função de calcular idade

export function writeUserData(nome, fone, sexo, local, facebook, data, funcao, email) {
    let nomes = document.getElementById('nome').value;
    let fone_ = document.getElementById('fone').value;
    let sexo_ = document.getElementById('sexo').value;
    let email_= document.getElementById('email').value;
    let data_ = document.getElementById("data").value;
    let funcao_ = document.getElementById('Funcao').value;

    
    const idade = calculateAge(data_); // call the calculateAge function to get the age
    // Increment the 'entradas' counter in the database
   

    set(ref(db, "Membros_Baptizados/" +" " + nomes), {
            Nome_completo: nomes,
            Contacto_telefónico: fone_,
            Data_de_Nascimento : data_,
            Gênero : sexo_,
            função : funcao_,
            email : email_,
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
    registrar.addEventListener('click', writeUserData);
    document.getElementById("backbtn").addEventListener('click', ()=>{
        window.history.back();
})


  $(window).on('load',function(){
    setTimeout(function(){ // allowing 3 secs to fade out loader
    $('.page-loader').fadeOut('slow');
    },3500);
  });