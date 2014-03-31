<?php
//session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultaGeneral.php';



/*
 * Clase que agrupa las funciones que realizaran las consultas relacionadas a los Sectores Basicos
 */
class consultasSectoresBasicos {
    
    /*
     * Funcion que consulta los datos relacionados a un Sector Basico especifico
     * @param integer ID del Sector Basico a consultar
     * @returns array La funcion retorna un array con los datos a mostrar en la tabla
     */    
    public function datosTablaSectoresBasicos($id_sector){
        $sql="SELECT m.codigo_nivel_pdm, m.nivel_pdm, m.metas, sfis.valor_esperado_meta_producto, sfis.valor_logrado_meta_producto, sfis.ponderado, sfis.avance_ponderado, sfis.semaforo_seguimiento, sfin.recursos_programados, sfin.recursos_ejecutados, sfin.semaforo_seguimiento_financiero, sfin.fecha_corte
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, sectores s
            WHERE v.id='0'            
                AND fm.id_vigencia = v.id
                AND m.id = fm.id_matriz
                AND sfis.id = fm.id_seguimiento_fisico
                AND sfin.id = fm.id_seguimiento_financiero
                AND m.activo = '1'
                AND sfis.activo = '1'
                AND sfin.activo = '1'
                AND c.nombre = 'MET'
                AND c.id = m.clases_id
                AND mu.departamentos_id = de.id
                AND v.municipios_id = mu.id
                AND m.sectores_id = '$id_sector'
                AND m.sectores_id = s.id
                ";
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros;         

    }
    
        
    
}
?>