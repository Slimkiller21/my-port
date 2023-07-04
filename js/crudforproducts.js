  // Import the functions you need from the SDKs you need ! Livrarias do firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
  import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
  import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDaVp9WPpbXMEJWngFxdprAI03Xuz5x1eE",
    authDomain: "tj-project-2023.firebaseapp.com",
    projectId: "tj-project-2023",
    storageBucket: "tj-project-2023.appspot.com",
    messagingSenderId: "1065242865634",
    appId: "1:1065242865634:web:37e66d18704c312280d3bb",
    measurementId: "G-PBQGL7GBDP",
  };

  // Initialize Firebase | Inicializar Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)
  const firestore = getFirestore(app)


//   -------------------- COLOCAR PRODUTOS NA BASE DE DADOS------------------------
function writeItemInfo(userId, name, email, imageUrl) {
let nome_do_produto = document.getElementById('nome_do_produto').value
let preco = document.getElementById('preco').value
let peso = document.getElementById('peso').value
let origem = document.getElementById('origem').value
let data_ex = document.getElementById('data_ex').value
    set(ref(db, 'users/' + userId), {
      Nome: nome_do_produto,
      Preço: preco,
      Peso: peso,
      Origem : origem,
      Data_de_expiração: data_ex,
      imagem: image
    });
  }
document.getElementById('validar').addEventListener('click', writeItemInfo);
// --------------- salvamnos produtos ----------------





// -------- get all data from database --------------
const tab2 = document.getElementById("tab-2");

onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  tab2.innerHTML = ""; // Clear the previous content inside the container

  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;
    const childData = childSnapshot.val();

    // Create a new card based on the template card
    const templateCard = document.getElementById("template-card"); // Replace "template-card" with the ID of your template card element
    const newCard = templateCard.cloneNode(true); // Clone the template card

    // Customize the new card with the data from childData
    const image = newCard.querySelector(".img-fluid");
    image.src = childData.image; // Replace ".img-fluid" with the appropriate selector for the image element in your card

    const title = newCard.querySelector(".h5");
    title.textContent = childData.nome; // Replace ".h5" with the appropriate selector for the title element in your card

    const price = newCard.querySelector(".text-primary");
    preço.textContent = childData.preco; // Replace ".text-primary" with the appropriate selector for the price element in your card

    // Append the new card to the desired container in your HTML
    tab2.appendChild(newCard);
  });
});

// ----------- get all data from database ----------------------