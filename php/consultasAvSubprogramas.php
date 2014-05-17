<?php
//session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultaGeneral.php';



/*
 * Clase que agrupa las funciones que realizaran las consultas relacionadas al Avance de Subprogramas
 */
class consultasAvSubprogramas {
    
    /*
     * Funcion que consulta los datos sobre el Avance de Subprogramas
     * @returns array La funcion retorna un array con los datos a mostrar en la tabla
     */    
    public function datosTablaAvanceSubprogramas($id_vigencia){
        $sql="SELECT pdm.codigo  as codigo_nivel_pdm
            , pdm.nivel as nivel_pdm
            , sfis.ponderado, sfis.avance_ponderado, sfis.semaforo_seguimiento, sfis.semaforo_seguimiento, sfin.recursos_programados, sfin.recursos_ejecutados, sfin.semaforo_seguimiento_financiero
             ,DATE_FORMAT(m.fecha_creacion,'%d / %m / %Y') as fecha_creacion , DATE_FORMAT(sfin.fecha_corte,'%d / %m / %Y') as fecha_corte
             ,  DATE_FORMAT(fm.fecha_modificacion ,'%d / %m / %Y') as fecha_modificacion 
            
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, pdm
            WHERE v.id='{$id_vigencia}'            
                AND fm.id_vigencia = v.id
                AND m.id = fm.id_matriz
                AND sfis.id = fm.id_seguimiento_fisico
                AND sfin.id = fm.id_seguimiento_financiero
                AND m.activo = '1'
                AND sfis.activo = '1'
                AND sfin.activo = '1'
                AND c.nombre = 'SPR'
                AND c.id = m.clases_id
                AND mu.departamentos_id = de.id
                AND v.municipios_id = mu.id
                AND m.pdm_id = pdm.id
                ";
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros;         

    }
    
        
    
}
?>