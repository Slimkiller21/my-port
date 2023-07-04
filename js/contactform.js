// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
  import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDaVp9WPpbXMEJWngFxdprAI03Xuz5x1eE",
    authDomain: "tj-project-2023.firebaseapp.com",
    projectId: "tj-project-2023",
    storageBucket: "tj-project-2023.appspot.com",
    messagingSenderId: "1065242865634",
    appId: "1:1065242865634:web:37e66d18704c312280d3bb",
    measurementId: "G-PBQGL7GBDP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 
 // Save user's info from contact form | Salvar itens do formulário
async function saveContact() {
    let contactname = document.getElementById('contactname').value;
    let contactemail = document.getElementById('contactemail').value;
    let contactsubject = document.getElementById('contactsubject').value;
    let contactmessage = document.getElementById('contactmessage').value;
  
    try {
      await addDoc(collection(getFirestore(), 'usuários_contactos'), {
        nome: contactname,
        email: contactemail,
        assunto: contactsubject,
        mensagem: contactmessage
      })
      .then(()=>{
        alert('sucesso')
      })
    //   alert('Obrigado por nos contactar, iremos responê-lo assim que poder!');
    } catch (error) {
      console.error('Infelizmente ocorreu um erro ao enviar seus dados. Queira por favor voltar a tentar.', error);
    }
  }
  
  document.getElementById('insertContact').addEventListener('click', saveContact);
//  //Save Emails To Database Newsletter index.html
//  async function saveEmail(){
//      let useremail = document.getElementById('newsemail').value
     
//      try {
//          await addDoc(collection(getFirestore(), 'emails'), {
//              email: useremail
//          });
//          alert('Obrigado por subscrever!')
//      }
//      catch(error){
//          console.error('Infelizmente ocorreu um erro ao salvar seu email. Queira por favor voltar a tentar.', error);
//      }
//  }
 
//  document.getElementById('insert').addEventListener('click', saveEmail)
 
 
 
 
 





















 //   // Create a new item
 // var newItemData = {
 //     name: "New Item",
 //     description: "This is a new item"
 //   };
   
 //   db.collection("items").add(newItemData)
 //     .then(function(docRef) {
 //       // Item created successfully
 //     })
 //     .catch(function(error) {
 //       // Handle error while creating item
 //     });
 
   // Update an existing item
 // var itemRef = db.collection("items").doc("ITEM_ID"); // Replace with the actual item ID
 
 // var updatedItemData = {
 //   name: "Updated Item",
 //   description: "This item has been updated"
 // };
 
 // itemRef.update(updatedItemData)
 //   .then(function() {
 //     // Item updated successfully
 //   })
 //   .catch(function(error) {
 //     // Handle error while updating item
 //   });
 
 // // Delete an existing item
 // var itemRef = db.collection("items").doc("ITEM_ID"); // Replace with the actual item ID
 
 // itemRef.delete()
 //   .then(function() {
 //     // Item deleted successfully
 //   })
 //   .catch(function(error) {
 //     // Handle error while deleting item
 //   });
 