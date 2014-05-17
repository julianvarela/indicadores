<?php
//session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultaGeneral.php';

/*
* Clase que agrupa las funciones que realizaran las consultas relacionadas al Avance de Vigencias
*/
class consultasAvVigencias {
    
    /*
* Funcion que consulta los datos sobre el Avance General
* @returns array La funcion retorna un array con los datos a mostrar en la tabla
*/
    public function datosTablaAvanceVigencias(){
        $sql="SELECT v.vigencia, pdm.nivel as nivel_pdm
        , sfis.semaforo_seguimiento, sfin.recursos_programados, sfin.semaforo_seguimiento_financiero, sfin.recursos_ejecutados
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, pdm 
            WHERE c.nombre like 'VI'
            AND sfis.activo ='1'
            AND sfin.activo ='1'
            and m.activo='1'
            AND c.id = m.clases_id
            AND m.id = fm.id_matriz
            AND sfis.id = fm.id_seguimiento_fisico
            AND sfin.id = fm.id_seguimiento_financiero
            AND v.id = fm.id_vigencia
            AND m.pdm_id = pdm.id
            ";


        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);
        return $conexion->_datosRegistros;

    }
    
        
    
}
?>