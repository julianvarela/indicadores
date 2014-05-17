<?php

include_once '../Config.php';
include_once '../ConectarBD.php';

class consultaListaMetasUsuario{



	/****************************
		* retorn los permisos , el tipo , y id
		* 
		* @param int id del usuario 
		* @return array de listado   codigo ,id de lista los programas en general
		* 
		**/
		public function listaMetas($id_padre, $id_vigencia){
	        $sql="(SELECT pdm.codigo as codigo_nivel_pdm
	         , m.id
			, pdm.nivel as nivel_pdm
			, m.metas
			,m.linea_base
			,m.valor_esperado_productos
			, se.nombre as dependencia_responsable
			,CONCAT( se.id,'_secretarias') as id_dependencia_secretaria 


			 ,s.nombre sector
			 ,s.id as id_sector

			, sfis.valor_esperado_meta_producto
			, sfis.valor_logrado_meta_producto
			, sfis.ponderado
			, sfis.avance_ponderado
			, sfis.semaforo_seguimiento
			, sfin.recursos_programados
			, sfin.recursos_ejecutados
			,sfin.semaforo_seguimiento_financiero
			,sfin.fecha_corte
			,DATE_FORMAT(sfin.fecha_corte,'%d / %m / %Y') as fecha_corte


        
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, secretarias se , pdm, sectores s
            WHERE v.id='{$id_vigencia}'  
            	AND m.id_padre='{$id_padre}'          
                AND fm.id_vigencia = v.id
                AND m.id = fm.id_matriz
                AND sfis.id = fm.id_seguimiento_fisico
                AND sfin.id = fm.id_seguimiento_financiero
				AND m.sectores_id =s.id
                AND m.activo = '1'
                AND sfis.activo = '1'
                AND sfin.activo = '1'
                AND c.nombre = 'MET'
                AND c.id = m.clases_id
                AND mu.departamentos_id = de.id
                AND v.municipios_id = mu.id
                AND m.secretarias_id = se.id
                AND m.pdm_id= pdm.id) 


UNION (
	SELECT pdm.codigo as codigo_nivel_pdm
			,  m.id
			, pdm.nivel as nivel_pdm
			, m.metas
			,m.linea_base
			,m.valor_esperado_productos
			, d.nombre as dependencia_responsable
			,CONCAT( d.id,'_dependecias') as id_dependencia_secretaria 

			,s.nombre sector
        	,s.id as id_sector

			, sfis.valor_esperado_meta_producto
			, sfis.valor_logrado_meta_producto
			, sfis.ponderado
			, sfis.avance_ponderado
			, sfis.semaforo_seguimiento
			, sfin.recursos_programados
			, sfin.recursos_ejecutados
			,sfin.semaforo_seguimiento_financiero
			,sfin.fecha_corte
			,DATE_FORMAT(sfin.fecha_corte,'%d / %m / %Y') as fecha_corte


        
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, dependencias d , pdm, sectores s
            WHERE v.id='{$id_vigencia}'  
            	AND m.id_padre='{$id_padre}'          
                AND fm.id_vigencia = v.id
                AND m.id = fm.id_matriz
                AND sfis.id = fm.id_seguimiento_fisico
                AND sfin.id = fm.id_seguimiento_financiero
				AND m.sectores_id =s.id
                AND m.activo = '1'
                AND sfis.activo = '1'
                AND sfin.activo = '1'
                AND c.nombre = 'MET'
                AND c.id = m.clases_id
                AND mu.departamentos_id = de.id
                AND v.municipios_id = mu.id
                AND m.dependencias_id = d.id
                AND m.pdm_id= pdm.id)";


	        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return $conexion->_datosRegistros;

    }



	/*******************
	* retonr ela lsita del dependencia y las secretarias
	**/
    function getListaDependencia_secretarias(){

		$sql="(select concat(id,'_secretarias') as id, nombre
		FROM secretarias
		WHERE activo ='1') 

		UNION

		 (select concat(id,'__dependecias') as id, nombre
		FROM dependencias
		WHERE activo ='1')

		order by nombre";

		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;

    }


}

?>