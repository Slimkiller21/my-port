// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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
const auth = getAuth(app);

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
        //  window.location.assign("/login/index.html")
        }
        if(user.email == 'slimkiller2021@gmail.com'){
            alert("olá selmar")
        }
    })
}
const userSignOut = async() =>{
            await signOut(auth)
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
    let entradas = 0;

export function writeUserData(nome, fone, sexo, local, facebook, data, funcao, email) {
    entradas++ // incrementa o valor de entradas por um sempre que a função é chamada
    let nomes = document.getElementById('nome').value;
    let fone_ = document.getElementById('fone').value;
    let sexo_ = document.getElementById('sexo').value;
    let email_= document.getElementById('email').value;
    let data_ = document.getElementById("data").value;
    let funcao_ = document.getElementById('Funcao').value;

    
    const idade = calculateAge(data_); // call the calculateAge function to get the age
    // Increment the 'entradas' counter in the database
    set(ref(db, "entradas"), entradas);

    set(ref(db, "Membros_Baptizados/" +" " + nomes), {
            Nome_completo: nomes,
            Contacto_telefónico: fone_,
            Idade : idade,
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


