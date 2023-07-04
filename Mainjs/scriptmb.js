    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
    import { getDatabase, ref, child, update, remove, onValue,} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
    // import { writeUserData} from "../MB/MembrosBaptizados.js";
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
    const user = auth.currentUser;
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
  let signout = document.getElementById('signout')
  signout.addEventListener('click', userSignOut)  
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
        row.innerHTML =`
        <td>${childData.Nome_completo}</td>
        <td>${childData.Contacto_telefónico}</td>
        <td>${childData.Gênero}</td>
        <td>${childData.Data_de_Nascimento }</td>
        <td>${childData.função}</td>
        <td>${childData.email}</td>
        ` ;
    console.log(data)
    console.log(childData)
    dataTableBody.appendChild(row);
    let ctrlDiv = document.createElement("div")
    ctrlDiv.innerHTML += '<button type="button" class="btn btn-success" id="cartao">Cartão</button>' + ' '
    ctrlDiv.innerHTML += '<button type="button" class="btn btn-danger" id="apagar">Apagar</button>' + ' '
    ctrlDiv.innerHTML += '<button type="button" class="btn btn-primary" data-bs-toggle="modal" id="edit" data-bs-target="#exampleModal">Editar</button>';
    row.appendChild(ctrlDiv);

    // --------------- CARD FILLER -----------------------
    const cartaoBtn = ctrlDiv.querySelector('#cartao');
    cartaoBtn.addEventListener('click', (event) => {
       // Generate membership card with the content from the clicked row
       const membershipCardData = {
        Nome_completo: childData.Nome_completo,
        Contacto_telefónico: childData.Contacto_telefónico,
        Gênero: childData.Gênero,
        Data_de_Nascimento : childData.Data_de_Nascimento ,
        função: childData.função,
        email: childData.email
      };

      generateMembershipCard(membershipCardData);
    });

    function generateMembershipCard(data) {
      const cardElement = document.createElement("div");
      cardElement.className = "card";
      cardElement.innerHTML = `
        <div class="imgs"></div>
        <div class="INTRO">
          <h1>ADP-MACULUSSO</h1>
          <h2>CENTRO DEUS FORTE</h2>
          <h2>CARTÃO DE MEMBRO BAPTIZADO</h2>
        </div>
        <div class="info">
          <div class="name">
            <label for="cardnome">NOME:</label>
            <input id="cardnome" value="${data.Nome_completo}" readonly />
          </div>
          <div class="fone">
            <label for="cardtele">TELEFONE:</label>
            <input id="cardtele" value="${data.Contacto_telefónico}" readonly />
          </div>
          <div class="sexo">
            <label for="cardsexo">GÊNERO:</label>
            <input id="cardsexo" value="${data.Gênero}" readonly />
          </div>
          <div class="date">
            <label for="carddata">DATA DE NASCIMENTO:</label>
            <input id="carddata" value="${data.Data_de_Nascimento }" readonly />
          </div>
          <div class="work">
            <label for="cardfunc">FUNÇÃO:</label>
            <input id="cardfunc" value="${data.função}" readonly />
          </div>
        </div>
      `;
    
      cardElement.style.position = 'absolute';
      cardElement.style.top = '0';
      cardElement.style.width = '800px';
      cardElement.style.height = '450px';
      cardElement.style.border = '1px solid black';
      cardElement.style.backgroundColor = '#292929';
      cardElement.style.color = '#fff';
      cardElement.style.display = 'flex';
      cardElement.style.flexDirection = 'column';
      cardElement.style.alignItems = 'flex-start';
      cardElement.style.justifyContent = 'center';
      cardElement.style.borderRadius = '5px';
      cardElement.style.padding = '35px';
    
      const styleElement = document.createElement("style");
      styleElement.innerHTML = `
        .INTRO {
          position: relative;
          top: -6em;
          left: -1rem;
          align-self: flex-end;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0px;
          letter-spacing: 2px;
        }
        .info {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          height: 500px;
          position: relative;
          bottom: 3em;
        }
        .info>input {
          flex: 0 32%;
          height: 36px;
          margin-bottom: 2%;
        }
        .name {
          gap: 5px;
          display: flex;
          flex-direction: column;
        }
        .name>input {
          height: 36px;
          border-radius: 5px;
          width: 300px;
        }
        .sexo>input {
          height: 36px;
          border-radius: 5px;
          width: 30px;
        }
        .sexo {
          gap: 5px;
          display: flex;
          flex-direction: column;
        }
        .work {
          gap: 5px;
          position: relative;
          right: 5.8em ;
          display: flex;
          flex-direction: column;
        }
        .work>input {
          gap: 5px;
          height: 36px;
          border-radius: 5px;
          width: 300px;
        }
        .date {
          gap: 5px;
          display: flex;
          flex-direction: column;
          bottom: -300px;
        }
        .date>input {
          position: relative;
          height: 36px;
          border-radius: 5px;
          width: 300px;
        }
        .fone {
          gap: 5px;
          display: flex;
          flex-direction: column;
        }
        .fone>input {
          height: 36px;
          border-radius: 5px;
          width: 300px;
        }
        .imgs {
          width: 100px;
          height: 400px;
          background-color: #fff;
        }
      `;
    
      const containerElement = document.createElement("div");
      containerElement.className = "container";
      containerElement.appendChild(styleElement);
      containerElement.appendChild(cardElement);
      document.body.appendChild(containerElement);
    
      html2canvas(cardElement)
        .then(function(canvas) {
          const dataUrl = canvas.toDataURL('image/jpeg');
    
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "membership_card.jpg";
          link.click();
        })
        .finally(function() {
          document.body.removeChild(containerElement);
        });
    }
      
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
// ----------- fim de busca -------------------

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
    editForm.querySelector('#fone').value = data.Contacto_telefónico;
    editForm.querySelector('#sexo').value = data.Gênero
    editForm.querySelector('#data').value = data.Data_de_Nascimento ;
    editForm.querySelector('#email').value = data.email;
    editForm.querySelector('#Funcao').value = data.função;
}
//   calcula a Data_de_Nascimento 
function calculateAge(data_) {
    const dob = new Date(data_); //uma nova data é guarg«dada nessa variável, a data é que foi o input no cadastro
    const ageDiffMs = Date.now() - dob.getTime(); // acha a diferença em meses
    const ageDate = new Date(ageDiffMs); 
    const Data_de_Nascimento  = Math.abs(ageDate.getUTCFullYear() - 1970);
    return Data_de_Nascimento ;
  }
// fim da função de calcular Data_de_Nascimento 
// Add event listener to "modal_salvar" button
document.getElementById("modal_salvar").addEventListener("click", updateUserData);

// Function to handle the click event of "modal_salvar" button
function updateUserData() {

  const editForm = document.getElementById("form");
  const key = editForm.getAttribute("data-key"); // Get the key from the form
  const nome = editForm.querySelector("#nome").value; // Get updated values from form fields
  const fone = editForm.querySelector("#fone").value;
  const sexo = editForm.querySelector("#sexo").value;
  const data = editForm.querySelector("#data").value;
  const funcao = editForm.querySelector("#Funcao").value;
  const email = editForm.querySelector("#email").value;
  const Data_de_Nascimento  = calculateAge(data); // call the calculateAge function to get the age
  // Update the user data in the database
  updateUserDataInDatabase(key, nome, fone, sexo, Data_de_Nascimento , funcao, email);
  // Update the corresponding HTML table row
  const row = document.querySelector(`[data-key="${key}"]`);
  row.innerHTML = `
    <td>${nome}</td>
    <td>${fone}</td>
    <td>${sexo}</td>
    <td>${Data_de_Nascimento }</td>
    <td>${funcao}</td>
    <td>${email}</td>
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
function updateUserDataInDatabase(key, nome, fone, sexo, data, funcao, email) {
  const userRef = ref(db, `Membros_Baptizados/${key}`);
  const userData = {
    Nome_completo: nome,
    Contacto_telefónico: fone,
    Gênero: sexo,
    Data_de_Nascimento : data,
    função: funcao,
    email: email,
  };

  update(userRef, userData)
    .then(() => {
      console.log("Data updated successfully in the database");
    }).catch((error)=>{
        console.log(error)
    })
}
$(window).on('load',function(){
	setTimeout(function(){ // allowing 3 secs to fade out loader
	$('.page-loader').fadeOut('slow');
	},1000);
});

