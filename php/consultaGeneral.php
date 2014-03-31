<?php

//session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';

/**
 * Description of consultaGeneral
 *
 * @author windows
 */
class consultaGeneral {
    
    
    /***
     * @param $vigencia {String} año del tipo YYYY
     * @return id de la vigencia
     */
    function vigencia($vigencia){
        
        $sql="SELECT id FROM vigencias
                WHERE id='{$vigencia}'
                      --  AND municipios_id='0'";
                
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros[0]['id'];           
    }
       
    
    
    /***
     * sabe los datos de los estados 
     * @return array  compuesto por filas asociadas  [nombre_estado , color, rango_min, rango_max]
     */
    function rangoEstado(){
    
        $sql="SELECT * FROM estados";            
        
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros;           
                
    }
    
    
    
}
