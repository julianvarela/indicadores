<?php

include_once 'Config.php';
include_once 'ConectarBD.php';
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Login
 *
 * @author windows
 */
class Login {
    //put your code here
    
    
    function mi_login($pass,$correo)
    {  
       $sql=" SELECT id, nombre , usuario, correo FROM usuarios WHERE pass=md5('{$pass}') AND correo='{$correo}'";                     
       $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
       $conexion->consultaSQL($sql);       
         return $conexion->_datosRegistros;                           
    }
}
