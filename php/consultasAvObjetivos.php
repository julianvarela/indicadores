<?php
//session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';


class consultasAvObjetivos {

    
    
    
    /****
     * @param String $idClave id de la clase 
     * @param String  $idVigencia id vigencia
     */
    function datos($idClase, $idVigencia){
        
        $sql="SELECT pdm.codigo as codigo_nivel_pdm
        ,pdm.nivel as nivel_pdm
		,s_fis.semaforo_seguimiento
		,s_fis.ponderado
		,s_fin.recursos_programados
		,s_fin.recursos_ejecutados
		,s_fin.semaforo_seguimiento_financiero
        ,  DATE_FORMAT(f_m.fecha_modificacion ,'%d / %m / %Y') as fecha_modificacion 
                FROM matriz m, fila_matriz f_m,seguimiento_financiero s_fin, seguimiento_fisico s_fis , pdm
                WHERE 
                        m.activo='1'
                        AND s_fis.activo='1'
                        AND s_fin.activo='1'


                        AND m.pdm_id = pdm.id
                      
                        AND f_m.id_seguimiento_fisico = s_fis.id
                        AND id_seguimiento_financiero = s_fin.id
                        AND id_matriz= m.id
                        AND m.clases_id='{$idClase}'
                        AND f_m.id_vigencia='{$idVigencia}'";

                        
       $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
       $conexion->consultaSQL($sql);       
         return $conexion->_datosRegistros;                           
              
    }
    
    
}
?>