 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
 import { getDatabase, ref, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
 import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
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
 const dataRef = ref(db, "Novos_Convertidos/");
 let username = document.getElementById('userName')

 
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
      }
      else{
      //  window.location.assign("/login/login.html")
      }
  })
}
     const userSignOut = async() =>{
         await signOut(auth)
     }
     checkAuthState();
     console.log(auth)


// ----------------------- GET ALL DATA FROM DATABASE---------------------

const dataTableBody = document.getElementById("tbody1");

 onValue(dataRef, (snapshot)=>{
         const data = snapshot.val();
         tbody1.innerHtml = "";
         snapshot.forEach((childSnapshot)=>{
            const key = childSnapshot.key;
             const childData = childSnapshot.val();
             const row = document.createElement("tr", key, childData);
             row.setAttribute("data-key", key); // Add data-key attribute
             const btns = document.createElement('button')
             row.innerHTML =  `
         <td>${childData.Nome_completo}</td> 
         <td>${childData.Contacto_telefónico}</td>
         <td>${childData.Gênero}</td>
         <td>${childData.Local_de_conversão}</td>
         <td>${childData.Data_de_conversão}</td>
         <td>${childData.Id_Facebook}</td>
         <td>${childData.Morada}</td>
         `;
         console.log(childData)
         dataTableBody.appendChild(row);
         let ctrlDiv = document.createElement("div")
         ctrlDiv.innerHTML = '<button type="button" class="btn btn-danger" id="apagar">Apagar</button>' + ' '
         ctrlDiv.innerHTML += '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="edit">Editar</button>';
         row.appendChild(ctrlDiv);


  // ---------- for edit--------------
  const editBtn = ctrlDiv.querySelector('#edit');
  editBtn.addEventListener('click', (event) => {
  const key = event.target.closest('tr').getAttribute('data-key');
  const childData = snapshot.child(key).val();
  fillEditForm(childData, key);
});


// ------------ end of edit--------------

         ctrlDiv.querySelector('#apagar').addEventListener('click', (event) => {
           const key = event.target.closest('tr').getAttribute('data-key');
           deleteRow(key);
         });
     });
 });


// -------------- END OF FETCH----------------------


 // ---------------DELETE FUNCTION----------------

 function deleteRow(key) {
    const row = document.querySelector(`[data-key="${key}"]`);
    if (row) {
      // Remove the row from the table
      dataTableBody.removeChild(row);
  
      // Remove the corresponding data from the database
      const dataRefForKey = child(dataRef, key);
      remove(dataRefForKey);
    }
  }
  // ------------END OF DELETE FUNCTION--------------



  // ------------------ EDIT ---------------------

    const fillEditForm = (data, key) => {
      const editForm = document.getElementById('form');
      editForm.setAttribute('data-key', key);
      editForm.querySelector('#nome').value = data.Nome_completo;
      editForm.querySelector('#fone').value = data.Contacto_telefónico;
      editForm.querySelector('#sexo').value = data.Gênero
      editForm.querySelector('#local').value = data.Local_de_conversão;
      editForm.querySelector('#fbId').value = data.Id_Facebook;
      editForm.querySelector('#data').value = data.Data_de_conversão;
      editForm.querySelector('#morada').value = data.Morada;
    }


// Function to handle the click event of "modal_salvar" button
function updateUserData() {
const editForm = document.getElementById("form");
const key = editForm.getAttribute("data-key"); // Get the key from the form
let nome = editForm.querySelector('#nome').value;
let fone =editForm.querySelector('#fone').value;
let sexo = editForm.querySelector('#sexo').value;
let local = editForm.querySelector('#local').value;
let facebook = editForm.querySelector('#fbId').value;
let data = editForm.querySelector("#data").value;
let morada = editForm.querySelector("#morada").value;
// const idade = calculateAge(data); // call the calculateAge function to get the age
// Update the user data in the database
updateUserDataInDatabase(key, nome, fone, sexo, local, data, facebook, morada);

// Update the corresponding HTML table row
const row = document.querySelector(`[data-key="${key}"]`);
row.innerHTML = `
  <td>${nome}</td>
  <td>${fone}</td>
  <td>${sexo}</td>
  <td>${local}</td>
  <td>${data}</td>
  <td>${facebook}</td>
  <td>${morada}</td>
  <td>
    <div>
      <button type="button" class="btn btn-danger" id="apagar">Apagar</button>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="edit" data-bs-target="#exampleModal">Editar</button>
    </div>
  </td>
`;

// Add event listeners to the delete and edit buttons in the updated row
row.querySelector("#apagar").addEventListener("click", (event) => {
  const key = event.target.closest("tr").getAttribute("data-key");
  deleteRow(key);
});

row.querySelector("#edit").addEventListener("click", (event) => {
  const key = event.target.closest("tr").getAttribute("data-key");
  const childData = snapshot.child(key).val();
  fillEditForm(childData, key);
});

// Close the modal after saving the changes
const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
modal.hide();
}

// Function to update user data in the database
function updateUserDataInDatabase(key, nome, fone, sexo, local, data, facebook, morada) {
const userRef = ref(db, `Novos_Convertidos/${key}`);
const userData = {
  Nome_completo: nome,
  Contacto_telefónico: fone,
  Gênero: sexo,
  Local_de_conversão : local, 
  Data_de_conversão : data,
  Id_Facebook : facebook,
  Morada: morada,
};

update(userRef, userData)
  .then(() => {
    console.log("Data updated successfully in the database");
  }).catch((error)=>{
      console.log(error)
  })
}
// Add event listener to "modal_salvar" button
document.getElementById("modal_salvar").addEventListener("click", updateUserData);

$(window).on('load',function(){
	setTimeout(function(){ // allowing 3 secs to fade out loader
	$('.page-loader').fadeOut('slow');
	},3500);
});