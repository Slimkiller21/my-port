let nome = document.getElementById("nome");
let pass = document.getElementById("pass");

function validar(){
  
if (nome.value == "Centro Deus Forte" && pass.value == "Senha"){
      window.location.assign("index2.html");
}
    else{
    alert("Acesso negado para" + " " + nome.value )
}

}












    