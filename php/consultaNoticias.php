<?php

include_once 'Config.php';
include_once 'ConectarBD.php';

/**
 * Description of consultaGeneral
 *
 * @author windows
 */
class consultaNoticias{

    
    
    
    
    
    /**
     * datos del tipo de noticia seleccionaddo
     * @param int $idNoticias
     * @return type
     */
    function datosNoticias($idNoticias){
        
    
        $sql="SELECT 
        id,
        tipos_noticias_id,
        DATE_FORMAT(fecha_creacion,'%d/%m/%Y') as fecha_creacion,
		titulo,
		contenido,
		DATE_FORMAT(fecha_creacion,'%m') mes ,
		DATE_FORMAT(fecha_creacion,'%d') dia ,
 		DATE_FORMAT(fecha_creacion,'%Y')  y
		
                FROM noticias n
                WHERE
                        n.activo='1'
                        AND  n.tipos_noticias_id= {$idNoticias} 
                     ORDER BY   fecha_creacion  DESC 
                    LIMIT 0 , 10 ";        
    
                        
                       
       $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
       $conexion->consultaSQL($sql);       
         return $conexion->_datosRegistros;           
                
    }
    
    
    
    
        /**
     * listado de tipo de noticias 
     * @param int $idNoticias
     * @return type
     */
    function tipodeNoticias(){
        
    
        $sql="SELECT id,
                    nombre

                FROM  tipos_noticias ";
                      
    
                
       $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
       $conexion->consultaSQL($sql);       
         return $conexion->_datosRegistros;           
                
    }

    
}
