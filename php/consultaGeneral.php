<?php

include_once 'Config.php';
include_once 'ConectarBD.php';

/**
 * Description of consultaGeneral
 *
 * @author windows
 */
class consultaGeneral {
    
    
    /***
     * 
     * busca el id de l vigencia
     * 
     * @param $year {String} año del tipo YYYY
     * @return id de la vigencia
     */
    function vigencia($year)
    {
        $sql="SELECT id FROM vigencias
                WHERE vigencia='{$year}'
                      --  AND municipios_id='0'";
                
    
                
       $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
       $conexion->consultaSQL($sql);       
         return $conexion->_datosRegistros[0]['id'];           
                
        
    }
    
    


    /***
     * 
     * busca el id de l vigencia
     * 
     * @param $year {String} año del tipo YYYY
     * @return id de la vigencia
     */
    function listaVigencias()
    {
        $sql="SELECT id,vigencia, activo FROM vigencias
               WHERE  periodo='1'
                -- and municipios_id='0'";
                
    
                
       $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
       $conexion->consultaSQL($sql);       
         return $conexion->_datosRegistros;           
                
        
    }
    
    
    
    
    /**
     * se obtine el id de la clase 
     * 
     * @param $clase nombre de la clase
     **
     * @return int id de la calse 
     */

    function getIdClase($clase)
    {
        
        $sql="SELECT id FROM clases
            WHERE activo ='1'
             AND nombre ='{$clase}'";
    
       $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
       $conexion->consultaSQL($sql);       
       $dato=null;
       
       
       if(count($conexion->_datosRegistros)>0 )
           $dato= $conexion->_datosRegistros[0]['id']; 
       
       
         return $dato;           
    
        
    }
    
    
    
    
    
    /***
     * sabe los datos de los estados 
     * @return array  compuesto por filas asociadas  [nombre_estado , color, rango_min, rango_max]
     */
    function rangoEstado(){
    
        $sql="SELECT * FROM estados ";            
    
                
       $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
       $conexion->consultaSQL($sql);       
         return $conexion->_datosRegistros;           
                
    }
    
    
    
}
