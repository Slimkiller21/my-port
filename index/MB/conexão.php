<?php
$hostname = "localhost";
$Bd = "igreja";
$user = "root";
$senha = "";
$nome = $_POST['nome'];
$number = $_POST['number'];
$email = $_POST['email'];
$morada = $_POST['morada'];
$data = $_POST['birth'];
$função = $_POST['função'];
$lugar = $_POST['lugar'];
$gender = $_POST['gender'];

$mysqli = new mysqli($hostname,$user,$senha,$Bd);
if($msqli->connect_errno){
    echo"falha ao conectar:(" . $mysqli->connect_errno.")" .$mysqli->connect_errno;
}
else{
    $stmt = $msqli->prepare("insert into registration(nome,number,email,morada,birth,função,lugar,gender)
    values(?,?,?,?,?,?,?,?)");
    $stmt->bind_param("sissssss", $nome, $number, $email, $morada, $data, $função, $lugar, $gender);
    $stmt->execute();
    echo "registro feito com sucesso";
    $stmt->close();
    $msqli->close();
}
 

?>