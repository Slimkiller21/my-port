// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getDatabase, ref,get} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const auth = getAuth(app);
    const dataRef = ref(db, "Membros_Baptizados/");

    let count = 0;
    get(dataRef).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        snapshot.forEach((childSnapshot) => {
          count++; // Increment count for each immediate child within "Membros_Baptizados/"
        });
      }
      console.log(`The "Membros_Baptizados/" folder has ${count} children.`);
    }).catch((error) => {
      console.error(error);
    });
// const dataTableBody = document.getElementById("tbody1");
//     onValue(dataRef, (snapshot)=>{
//         const data = snapshot.val();
//         tbody1.innerHtml = "";
//         snapshot.forEach((childSnapshot)=>{
//         const key = childSnapshot.key;
//         const childData = childSnapshot.val();
//         const row = document.createElement("tr", key, childData);
//         row.setAttribute("data-key", key); // Add data-key attribute
//         const btns = document.createElement('button')
//         row.innerHTML =`
//         <td>${childData.Nome_completo}</td>
//         <td>${childData.Idade}</td>
//         <td>${childData.função}</td>
//         ` ;
//     console.log(data)
//     console.log(childData)
//     dataTableBody.appendChild(row);
//     let ctrlDiv = document.createElement("div")
//     ctrlDiv.innerHTML = '<button type="button" class="btn btn-danger" id="apagar">Apagar</button>' + ' '
//     ctrlDiv.innerHTML += '<button type="button" class="btn btn-primary" data-bs-toggle="modal" id="edit" data-bs-target="#exampleModal">Editar</button>';
//     row.appendChild(ctrlDiv);

// // ---------- for edit--------------
//   const editBtn = ctrlDiv.querySelector('#edit');
//   editBtn.addEventListener('click', (event) => {
//   const key = event.target.closest('tr').getAttribute('data-key');
//   const childData = snapshot.child(key).val();
//   fillEditForm(childData, key);
// });

// // ------------ end of edit--------------

//     ctrlDiv.querySelector('#apagar').addEventListener('click', (event) => {
//       const key = event.target.closest('tr').getAttribute('data-key');
//       deleteRow(key);
//     });
// });
// });


//   // ----------- fim de busca -------------------

//   // ---------------DELETE FUNCTION----------------
//   function deleteRow(key) {
//       const row = document.querySelector(`[data-key="${key}"]`);
//       if (row) {
//         // Remove the row from the table
//         dataTableBody.removeChild(row);
    
//         // Remove the corresponding data from the database
//         const dataRefForKey = child(dataRef, key);
//         remove(dataRefForKey);
//       }
//     }
  
// // ------------END OF DELETE FUNCTION--------------


// //   ----------- EDIT FUNCTION ------------------
// const fillEditForm = (data, key) => {
//   const editForm = document.getElementById('form');
//   editForm.setAttribute('data-key', key);
//   editForm.querySelector('#nome').value = data.Nome_completo;
//   editForm.querySelector('#fone').value = data.Contacto_telefónico;
//   editForm.querySelector('#sexo').value = data.Gênero
//   editForm.querySelector('#data').value = data.Idade;
//   editForm.querySelector('#email').value = data.email;
//   editForm.querySelector('#Funcao').value = data.função;

// }
// //   calcula a idade
// function calculateAge(data_) {
//   const dob = new Date(data_); //uma nova data é guarg«dada nessa variável, a data é que foi o input no cadastro
//   const ageDiffMs = Date.now() - dob.getTime(); // acha a diferença em meses
//   const ageDate = new Date(ageDiffMs); 
//   const idade = Math.abs(ageDate.getUTCFullYear() - 1970);
//   return idade;
// }
// // fim da função de calcular idade
// // Add event listener to "modal_salvar" button
// document.getElementById("modal_salvar").addEventListener("click", updateUserData);

// // Function to handle the click event of "modal_salvar" button
// function updateUserData() {

// const editForm = document.getElementById("form");
// const key = editForm.getAttribute("data-key"); // Get the key from the form
// const nome = editForm.querySelector("#nome").value; // Get updated values from form fields
// const fone = editForm.querySelector("#fone").value;
// const sexo = editForm.querySelector("#sexo").value;
// const data = editForm.querySelector("#data").value;
// const funcao = editForm.querySelector("#Funcao").value;
// const email = editForm.querySelector("#email").value;
// const idade = calculateAge(data); // call the calculateAge function to get the age
// // Update the user data in the database
// updateUserDataInDatabase(key, nome, fone, sexo, idade, funcao, email);
// // Update the corresponding HTML table row
// const row = document.querySelector(`[data-key="${key}"]`);
// row.innerHTML = `
//   <td>${nome}</td>
//   <td>${fone}</td>
//   <td>${sexo}</td>
//   <td>${idade}</td>
//   <td>${funcao}</td>
//   <td>${email}</td>
//   <td>
//     <div>
//       <button type="button" class="btn btn-danger" id="apagar">Apagar</button>
//       <button type="button" class="btn btn-primary" data-bs-toggle="modal" id="edit" data-bs-target="#exampleModal">Editar</button>
//     </div>
//   </td>
// `;

// // Add event listeners to the delete and edit buttons in the updated row
// row.querySelector("#apagar").addEventListener("click", (event) => {
//   const key = event.target.closest("tr").getAttribute("data-key");
//   deleteRow(key);
// });

// row.querySelector("#edit").addEventListener("click", (event) => {
//   const key = event.target.closest("tr").getAttribute("data-key");
//   const childData = snapshot.child(key).val();
//   fillEditForm(childData, key);
// });

// // Close the modal after saving the changes
// const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
// modal.hide();
// }

// // Function to update user data in the database
// function updateUserDataInDatabase(key, nome, fone, sexo, data, funcao, email) {
// const userRef = ref(db, `Membros_Baptizados/${key}`);
// const userData = {
//   Nome_completo: nome,
//   Contacto_telefónico: fone,
//   Gênero: sexo,
//   Idade: data,
//   função: funcao,
//   email: email,
// };

// update(userRef, userData)
//   .then(() => {
//     console.log("Data updated successfully in the database");
//   }).catch((error)=>{
//       console.log(error)
//   })
// }
