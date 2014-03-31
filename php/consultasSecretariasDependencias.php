<?php
//session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultaGeneral.php';



/*
 * Clase que agrupa las funciones que realizaran las consultas relacionadas a los Sectores Basicos
 */
class consultasSecretariasDependencias {
    
    /*
     * Funcion que consulta los datos relacionados a una Secretaria o Dependencia
     * @param integer ID de la Secretaria o la Dependencia
     * @returns array La funcion retorna un array con los datos a mostrar en la tablas
     */    
    public function datosTabla_Secretarias_Dependencias($id_secretaria_dependencia){
        $sql="SELECT m.codigo_nivel_pdm, m.nivel_pdm, m.metas, sfis.valor_esperado_meta_producto, sfis.valor_logrado_meta_producto, sfis.ponderado, sfis.avance_ponderado, sfis.semaforo_seguimiento, sfin.recursos_programados, sfin.recursos_ejecutados, sfin.semaforo_seguimiento_financiero
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, dependencias d
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
                AND m.dependencias_id = '$id_secretaria_dependencia'
                AND m.dependencias_id = d.id
                ";
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros;         

    }
    

    /*
     * Funcion que consulta la lista de las Secretaria existentes
     * @param integer $id_secretaria_dependencia ID del tipo de semaforo a consultar (2 - Secretaria o 3- Dependencias)
     * @returns array La funcion retorna un array con las secretarias inscritas
     */    
    public function listaSemaforo($id_secretaria_dependencia){
        $sql="SELECT d.id, d.nombre 
            FROM  dependencias d, tipos_semaforo ts, vigencias v, municipios mu, departamentos de
            WHERE d.tipos_semaforo_id = '$id_secretaria_dependencia'
                AND ts.id = d.tipos_semaforo_id
                AND d.activo = '1'
                AND ts.activo = '1'
                AND ts.vigencias_id =  v.id
                AND v.municipios_id = mu.id
                AND mu.departamentos_id = de.id
                ";
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros;         

    }
    
    
}
?>