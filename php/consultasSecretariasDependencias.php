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
    public function datosTabla_Secretarias_Dependencias($id_vigencia,$id_secretaria_dependencia){
        $sql="SELECT m.codigo_nivel_pdm, m.nivel_pdm, m.metas, sfis.valor_esperado_meta_producto, sfis.valor_logrado_meta_producto, sfis.ponderado, sfis.avance_ponderado, sfis.semaforo_seguimiento, sfin.recursos_programados, sfin.recursos_ejecutados, sfin.semaforo_seguimiento_financiero
        ,  DATE_FORMAT(fm.fecha_modificacion ,'%d / %m / %Y') as fecha_modificacion 
        
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, dependencias d
            WHERE v.id='{$id_vigencia}'            
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
     * Funcion que consulta la lista de las Secretarias o Dependencias existentes
     * @param string $tipo cadena de texto que especifica el tipo de semaforo a consultar (2 - Secretaria o 3- Dependencia)
     * @returns array La funcion retorna un array con las secretarias inscritas
     */    
    public function listaDependecias($id_vigencia,$tipo){
        $sql="SELECT d.id as id , d.nombre  as nombre
            FROM  dependencias d, tipos_semaforo ts, vigencias v, municipios mu, departamentos de
            WHERE v.id='{$id_vigencia}'
                AND ts.nombre like '%{$tipo}%'
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
    
    
    /*
     * Funcion que consulta todas las Dependencias existentes
     * @returns array La funcion retorna un array con las dependencias y secretarias inscritas
     */    
    public function listaTodaDependecia(){
        $sql="SELECT id, UPPER(nombre) nombre FROM dependencias d
              WHERE d.activo ='1'
                ";
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros;         

    }    
    
    
    
     /*
     * se obtiene los datos de la secretaria avacnces generalse de todas la secreta y depende se busc por su id y a
     * @param integer ID de la Secretaria o la Dependencia
     * @returns array La funcion retorna un array con los datos a mostrar en la tablas
     */    
    public function avanceGeneral($id_vigencia,$id_secretaria_dependencia){
        $sql="SELECT AVG(sfin.semaforo_seguimiento_financiero) semaforo_seguimiento_financiero,
		AVG(sfis.semaforo_seguimiento) semaforo_seguimiento_fisico
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, dependencias d
            WHERE v.id='{$id_vigencia}'            
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
                AND m.dependencias_id = '{$id_secretaria_dependencia}'
                AND m.dependencias_id = d.id
                ";
        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
        $conexion->consultaSQL($sql);       
        return $conexion->_datosRegistros;         

    }
    
}
?>