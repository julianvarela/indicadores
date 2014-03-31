<?php
//session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';


/*
 * Clase que agrupa las funciones que realizaran las consultas relacionadas al Avance de Objetivos
 */
class consultasAvObjetivos {
    
    /*
     * Funcion que consulta los datos sobre el Avance de los Objetivos
     * @returns array La funcion retorna un array con los datos a mostrar en la tabla
     */    
    public function datosTablaAvanceObjetivos(){
        $sql="SELECT m.codigo_nivel_pdm, m.nivel_pdm, sfis.semaforo_seguimiento, sfin.recursos_programados, sfin.recursos_ejecutados, sfin.semaforo_seguimiento_financiero
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c
            WHERE v.id='0'            
                AND fm.id_vigencia = v.id
                AND m.id = fm.id_matriz
                AND sfis.id = fm.id_seguimiento_fisico
                AND sfin.id = fm.id_seguimiento_financiero
                AND c.nombre = 'OE'
                AND c.id = m.clases_id
                AND m.activo = '1'
                AND sfis.activo = '1'
                AND sfin.activo = '1'                
                ";       
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros;         
    }
       
    
    
}
?>