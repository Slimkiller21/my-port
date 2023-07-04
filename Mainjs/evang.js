     // Import the functions you need from the SDKs you need
     import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getDatabase, ref, child, update,set, remove,get, onValue,} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    // import { writeUserData} from "../MB/MembrosBaptizados.js";

    //  import { count, iterate} from '/Mainjs/iteration.js'

   
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
  let username = document.getElementById('userName')
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);
    const dataRef = ref(db, "Evangelização/");
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
          if (Música_) {
            const navigationItems = document.querySelectorAll('.nav-item');
      // Loop through each navigation item and hide based on its text content
          navigationItems.forEach(item => {
            const itemName = item.querySelector('span').innerHTML;
            // Define the navigation items to hide based on access level
            const itemsToHide = ['Registrar','JUVENTUDE', 'E.B.D', 'ELIFELETE', 'ELIADA', 'HOMENS','LIGA FEMININA', 'EVANGELIZAÇÃO', 'MEMBROS BAPTIZADOS', 'MEMBROS RECÉM CONVERTIDOS', 'TABELAS'];
            if (itemsToHide.includes(itemName)) {
              item.classList.add('hide')
            }
      })
  }
      }else{
        location.assign('/login/login.html')
      }
    }
  )
}

        const userSignOut = async() =>{
            await signOut(auth)
        }
        checkAuthState();

    function writeUserData() {
        let nome_ = document.getElementById('nome').value
        let idade_ = document.getElementById('idade').value
        let funcao_ = document.getElementById('funcao').value
      
        set(ref(db, "Evangelização/" +" " + nome_), {
                Nome_completo: nome_,
                Idade : idade_,
                função : funcao_,
        })
        .then(() => {
            alert("salvo com sucesso")
            location.reload()
        })
        .catch((error) =>{
            alert(error)
            console.log(error)
        })
        }
        registrar.addEventListener('click', writeUserData);
       
// ------------------- PARA ATUALIZAR O NOME DOS LÍDERES

// Create a reference to the "Evangelização" node in the database
const evangelizacaoRef = ref(db, 'Evangelização/');
// Retrieve the data once from the "Evangelização" node
get(evangelizacaoRef)
  .then((snapshot) => {
    // Iterate over each child node of "Evangelização"
    snapshot.forEach((childSnapshot) => {
      // Retrieve the value of the "função" key for each child node
      const funcaoValue = childSnapshot.child('função').val();
       console.log(funcaoValue)
      // Check if the "função" value is equal to 'Líder'
      if (funcaoValue === 'Líder') {
        // Retrieve the nome from the child node
        const nomeValue = childSnapshot.child('Nome_completo').val();
         console.log(nomeValue)
        // Do something with the nome value, such as updating the leadname element
        let leadname = document.getElementById('leadname');
        leadname.innerText = nomeValue;
      }
      else if (funcaoValue === 'Secretário'){
        // Retrieve the nome from the child node
        const nomeValue = childSnapshot.child('Nome_completo').val();
         console.log(nomeValue)
        // Do something with the nome value, such as updating the leadname element
        let secname = document.getElementById('secname');
        secname.innerText = nomeValue;
      }
      else if (funcaoValue === 'Vice-líder'){
        // Retrieve the nome from the child node
        const nomeValue = childSnapshot.child('Nome_completo').val();
         console.log(nomeValue)
        // Do something with the nome value, such as updating the leadname element
        let vicename = document.getElementById('vicname');
        vicename.innerText = nomeValue;
      }   else if (funcaoValue === 'Tesoureiro'){
        // Retrieve the nome from the child node
        const nomeValue = childSnapshot.child('Nome_completo').val();
        // Do something with the nome value, such as updating the leadname element
        let tesname = document.getElementById('tesname');
        tesname.innerText = nomeValue;
      }
    });
  })
  .catch((error) => {
    alert(error);
    console.log(error);
  });
// ---------------------------------------- FIM ------------------
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
        row.innerHTML =`
        <td>${childData.Nome_completo}</td>
        <td>${childData.Idade}</td>
        <td>${childData.função}</td>
        ` ;
    console.log(data)
    console.log(childData)
    dataTableBody.appendChild(row);
    let ctrlDiv = document.createElement("div")
    ctrlDiv.innerHTML = '<button type="button" class="btn btn-danger" id="apagar">Apagar</button>' + ' '
    ctrlDiv.innerHTML += '<button type="button" class="btn btn-primary" data-bs-toggle="modal" id="edit" data-bs-target="#exampleModal">Editar</button>';
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

//   ----------- EDIT FUNCTION ------------------
const fillEditForm = (data, key) => {
  const editForm = document.getElementById('form');
  editForm.setAttribute('data-key', key);
  editForm.querySelector('#nome').value = data.Nome_completo;
  editForm.querySelector('#idade').value = data.Idade;
  editForm.querySelector('#funcao').value = data.função;

}
// Add event listener to "modal_salvar" button
document.getElementById("modal_salvar").addEventListener("click", updateUserData);
// Function to handle the click event of "modal_salvar" button
function updateUserData() {
const editForm = document.getElementById("form");
const key = editForm.getAttribute("data-key"); // Get the key from the form
const nome = editForm.querySelector("#nome").value; // Get updated values from form fields
const idade = editForm.querySelector("#idade").value;
const funcao = editForm.querySelector("#funcao").value;

updateUserDataInDatabase(key, nome, idade, funcao);
// Update the corresponding HTML table row
const row = document.querySelector(`[data-key="${key}"]`);
row.innerHTML = `
  <td>${nome}</td>
  <td>${idade}</td>
  <td>${funcao}</td>
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
function updateUserDataInDatabase(key, nome, data, funcao) {
const userRef = ref(db, `Evangelização/${key}`);
const userData = {
  Nome_completo: nome,
  Idade: data,
  função: funcao,
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