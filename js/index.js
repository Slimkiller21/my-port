     // Import the functions you need from the SDKs you need
     import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
     import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
     import { getDatabase, ref,get,onValue} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";

    //  import { count, iterate} from '/Mainjs/iteration.js'
 const admin = {
       secretária: 'emvca4@gmail.com',
       pastor:'selmarantonio21@gmail.com'

}
 const Evangelização = {
  Líder:'',
  vice_líder_Evangelização:'slimkiller2021@gmail.com',
  secretario:'',
  tesoureiro:''
} 
const Protocolo = {
 Líder:'',
  vice_líder:'',
  secretario:'',
  tesoureiro:''
}
 const Música = {
 Líder:'titantechnologies00@gmail.com',
  vice_líder:'',
  secretario:'',
  tesoureiro:''
} 
const EBD = {
 Líder:'',
  vice_líder:'',
  secretario:'',
  tesoureiro:''
}
 const Elifelete = {
 Líder:'',
  vice_líder:'',
  secretario:'',
  tesoureiro:''
}
const ELIADA = {
 Líder:'',
  vice_líder:'',
  secretario:'',
  tesoureiro:''
}
const LIGAFEMININA = {
 Líder:'',
  vice_líder:'',
  secretario:'',
  tesoureiro:''
}
const HOMENS = {
 Líder:'',
  vice_líder:'',
  secretario:'',
  tesoureiro:''
}  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDZZZVZyVf2kBFlsraWzgb-frcL2Im8qxk",
    authDomain: "novo-test-c620e.firebaseapp.com",
    projectId: "novo-test-c620e",
    storageBucket: "novo-test-c620e.appspot.com",
    messagingSenderId: "165155012476",
    appId: "1:165155012476:web:94207d8b96cc0f2785aef9"
  };
  let username = document.getElementById('userName')
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);

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
                    document.getElementById('great').innerHTML = displayName
                    if(user.displayName == null){
                      document.getElementById('great').innerHTML = email
                      username.innerHTML = email
                    }
                    // Check if the user's email is in the allowedEmails object
                    const admins  = Object.keys(admin).find(key => admin[key] === email);
                    const Evangelizaçãos  = Object.keys(Evangelização).find(key => Evangelização[key] === email);
                    const HOMENS_ = Object.keys(HOMENS).find(key => HOMENS[key] === email);
                    const LIGAFEMININA_  = Object.keys(LIGAFEMININA).find(key => LIGAFEMININA[key] === email);
                    const EBD_  = Object.keys(EBD).find(key => EBD[key] === email);
                    const Música_  = Object.keys(Música).find(key => Música[key] === email);
                    const Protocolo_  = Object.keys(Protocolo).find(key => Protocolo[key] === email);

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
        signout.addEventListener('click', userSignOut)

        
        let media_por_mes = 0;
        let monthly_averages = [];
        
        export function getmedia() {
          const nodeRef = ref(db, "Novos_Convertidos");
          let NodesLast30Days = 0;
        
          // Obter o mês atual
          const currentMonth = new Date().getMonth();
        
          onValue(nodeRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              const childData = childSnapshot.val();
              const timestamp = childData.timestamp;
              const thirtyDaysAgo = new Date();
              thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
              if (timestamp && timestamp > thirtyDaysAgo) {
                NodesLast30Days++;
              }
            });
        
            media_por_mes = Math.ceil(NodesLast30Days / 9);
            console.log(`Número de crianças adicionadas nos últimos 30 dias: ${NodesLast30Days}`);
            console.log(`O centro Deus forte teve uma média de conversões de ${media_por_mes} membros por culto`);
            document.getElementById('medConv').innerHTML = media_por_mes;
        
            // Criar um objeto que associe o mês atual à média
            const monthlyData = {
              month: currentMonth,
              average: media_por_mes
            };
        
            // Armazenar o objeto no array monthly_averages
            monthly_averages.push(monthlyData);
        
            // Renderizar o gráfico
            renderChart();
          });
        }
        
        function renderChart() {
          // Extrair os meses e médias em arrays separados
          const months = monthly_averages.map(data => getMonthName(data.month));
          const averages = monthly_averages.map(data => data.average);
        
          // Criar um elemento canvas no seu HTML para renderizar o gráfico
          const chartCanvas = document.createElement('canvas');
          chartCanvas.id = 'chart';
          document.body.appendChild(chartCanvas);
        
          // Criar o gráfico usando o Chart.js
          new Chart('chart', {
            type: 'line',
            data: {
              labels: months,
              datasets: [{
                label: 'Média de Conversões por Mês',
                data: averages,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        }
        
        function getMonthName(month) {
          const monthNames = [
            'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
            'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
          ];
          return monthNames[month];
        }
        
        // Uncomment the following code to simulate data for 10 months
        
        for (let i = 0; i < 10; i++) {
          const randomAverage = Math.floor(Math.random() * 10) + 1;
          monthly_averages.push({ month: i, average: randomAverage });
        }
        
        
        // Example starting from the current month
        getmedia();
        

        
            // ---------------------------- ITERATION FOR MEMBROS BAPTIZADOS -----------------------------
            const dataRef = ref(db, "Membros_Baptizados/");
              let countMemb = 0;
              get(dataRef).then((snapshot) => {
                const data = snapshot.val();
                if (data !== null) {
                  snapshot.forEach((childSnapshot) => {
                    countMemb++; // Increment count for each immediate child within "Membros_Baptizados/"
                  });
                }
                console.log(`The "Membros_Baptizados/" folder has ${countMemb} children.`);
                document.getElementById('mbCount').innerHTML = countMemb
              }).catch((error) => {
                console.error(error);
              });
    // ---------------------------- ITERATION FOR MEMBROS BAPTIZADOS -----------------------------

    // ---------------------------- ITERATION FOR EVANGELIZAÇÃO -----------------------------

    const dataRefEvan = ref(db, "Evangelização/");
    let countEv = 4;
    get(dataRefEvan).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        snapshot.forEach((childSnapshot) => {
          countEv++; // Increment count for each immediate child within "Membros_Baptizados/"
        });
      }
      console.log(`The "Evangelização" folder has ${countEv} children.`);
      document.getElementById('evCount').innerHTML = countEv
    }).catch((error) => {
      console.error(error);
    });
    // ---------------------------- ITERATION FOR EVANGELIZAÇÃO -----------------------------


    // ---------------------------- ITERATION FOR EBD -----------------------------
    const dataRefEbd = ref(db, "EBD/");
    let countEBD = 4;
    get(dataRefEbd).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        snapshot.forEach((childSnapshot) => {
          countEBD++; // Increment count for each immediate child within "Membros_Baptizados/"
        });
      }
      console.log(`The "Evangelização" folder has ${countEBD} children.`);
      document.getElementById('EBDcount').innerHTML = countEBD
    }).catch((error) => {
      console.error(error);
    });

    // ---------------------------- ITERATION FOR EBD -----------------------------

      // ---------------------------- ITERATION FOR ELIADA -----------------------------
      const dataRefELIADA = ref(db, "ELIADA/");
      let countELIADA = 4;
      get(dataRefELIADA).then((snapshot) => {
        const data = snapshot.val();
        if (data !== null) {
          snapshot.forEach((childSnapshot) => {
            countELIADA++; // Increment count for each immediate child within "Membros_Baptizados/"
          });
        }
        console.log(`The "Evangelização" folder has ${countELIADA} children.`);
        document.getElementById('ELIADAcount').innerHTML = countELIADA
      }).catch((error) => {
        console.error(error);
      });
  
      // ---------------------------- ITERATION FOR EBD -----------------------------
  

        // ---------------------------- ITERATION FOR Juventude -----------------------------
    const dataRefJuventude = ref(db, "Juventude/");
    let countJuventude = 4;
    get(dataRefJuventude).then((snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        snapshot.forEach((childSnapshot) => {
          countJuventude++; // Increment count for each immediate child within "Membros_Baptizados/"
        });
      }
      console.log(`The "Evangelização" folder has ${countJuventude} children.`);
      document.getElementById('Juventudecount').innerHTML = countJuventude
    }).catch((error) => {
      console.error(error);
    });

    // ---------------------------- ITERATION FOR Juventude -----------------------------


        // ---------------------------- ITERATION FOR Homens -----------------------------
        const dataRefHomens = ref(db, "Homens/");
        let countHomens = 4;
        get(dataRefHomens).then((snapshot) => {
          const data = snapshot.val();
          if (data !== null) {
            snapshot.forEach((childSnapshot) => {
              countHomens++; // Increment count for each immediate child within "Membros_Baptizados/"
            });
          }
          console.log(`The "Evangelização" folder has ${countHomens} children.`);
          document.getElementById('Homenscount').innerHTML = countHomens
        }).catch((error) => {
          console.error(error);
        });
    
        // ---------------------------- ITERATION FOR Homens -----------------------------
    
    
         // ---------------------------- ITERATION FOR Mamas -----------------------------
         const dataRefMamas = ref(db, "Mamas/");
         let countMamas = 4;
         get(dataRefMamas).then((snapshot) => {
           const data = snapshot.val();
           if (data !== null) {
             snapshot.forEach((childSnapshot) => {
               countMamas++; // Increment count for each immediate child within "Membros_Baptizados/"
             });
           }
           console.log(`The "Evangelização" folder has ${countMamas} children.`);
           document.getElementById('Mamascount').innerHTML = countMamas
         }).catch((error) => {
           console.error(error);
         });
     
         // ---------------------------- ITERATION FOR Mamas -----------------------------
     
     
         $(window).on('load',function(){
          setTimeout(function(){ // allowing 3 secs to fade out loader
          $('.page-loader').fadeOut('slow');
          },3500);
        });

