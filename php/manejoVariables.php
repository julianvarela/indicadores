<?php
@session_start();  




require_once 'consultaGeneral.php';
require_once 'Login.php';
require_once 'adm/permisos.php';

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$opcion="";
$salida=array('correcto'=>false);

if($_POST['opcion'])
    $opcion = $_POST['opcion'];


//CUERPO DE OPCIONES 
switch ($opcion) {
    
    //CASO DE OPCION1 ... CAMBIO DEL AÑO
    case 'year':
        
            $year= $_POST['year'];

            $consultaGeneral=new consultaGeneral();
            $miIdYear=$consultaGeneral->vigencia($year);
            
            
            if($miIdYear!=null){
                
                $_SESSION["vigencia"]=$miIdYear;
                $_SESSION["year"]=$year;
                $salida=array('correcto'=>true);
            }       

        break;


      //LOGIN
    case "login":
        
        $pass=$_POST['pass'];
        $correo=$_POST['correo'];
        $login=new Login();
        $consultaGeneral= new consultaGeneral();

        $vigencias=  $consultaGeneral->listaVigencias();


        $datos=$login->mi_login($pass,$correo);
        
        if(count($datos)>0)
        {

            $permisos= new permisos();
            
            $_SESSION['correo']=$correo;
            $_SESSION['id']=$datos[0]['id'];


            $contador_sub= Array();

            for($i=0 ;$i<count( $vigencias); $i++)
            {

                $contador_sub[$i]= $permisos->contadorSubprogramas($vigencias[$i]['id'], $datos[0]['id']);
            }

            $salida=array('correcto'=>true,'datos'=>$datos, 'year'=>$vigencias, 'per'=>$contador_sub);
        }
            
        break;
        
    
    default:
        break;
}
//FIN de OPCIONES 

echo json_encode($salida);
?>