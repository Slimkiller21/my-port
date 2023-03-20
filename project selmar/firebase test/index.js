let nome = document.getElementById("nome")
let pass = document.getElementById("pass")
let demo = document.getElementById("demo")

butt.onclick = function(){
    demo.innerHTML = nome.value + "   " + pass.value
}

