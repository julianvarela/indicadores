<?php
	 	//session_start();
		@include_once ("../Config.php");
		@include_once ("../ConectarBD.php");
	

	 class permisos{


	



		/****************************
		* retorna lista de subprogramas activos 
		* de los cuales el usuario tiene permiso
		* @param int id del usuario 
		* @return array de listado nombre , codigo ,id de lso subprgrama a los que tieen permis
		**/
		public function subprogramas ($id_usuario, $year){
	      
	        $sql="SELECT  m.id ,pdm.codigo , pdm.nivel  as nombre , m.id_padre 
					FROM  matriz m, permisos p , pdm ,fila_matriz fm, vigencias v
					WHERE p.id_subprograma = m.id
						 AND m.pdm_id = pdm.id
						 AND fm.id_matriz=m.id
						 AND fm.id_vigencia =v.id
						 AND v.vigencia='$year'
						 AND m.activo='1'
						 AND p.usuarios_id='$id_usuario'
						order by pdm.codigo";




	        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return $conexion->_datosRegistros;

    }





		/****************************
		* la matriz selecciona con nombre , codigo
		* 
		* @param int id del usuario 
		* @return array de listado   codigo ,id de lista los programas en general
		* 
		**/
		public function subprogramas_lista3($id_matriz){
	        $sql="SELECT  m.id ,pdm.codigo , pdm.nivel  as nombre, m.id_padre
						FROM  matriz m , pdm
						WHERE  
								m.id='$id_matriz'
							 AND m.pdm_id = pdm.id
							 AND m.activo='1'
						order by pdm.codigo";


	        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return $conexion->_datosRegistros;

    }







		/****************************
		* retorn los permisos , el tipo , y id
		* 
		* @param int id del usuario 
		* @return array de listado   codigo ,id de lista los programas en general
		* 
		**/
		public function getTipoPermiso($id_usuario){
	        $sql="SELECT tu.nombre_tipo  tipo , tu.id 
					FROM tipos_usuarios tu ,usuarios u
					WHERE u.tipos_usuarios_id= tu.id
							AND u.id='$id_usuario'";


	        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return $conexion->_datosRegistros;

    }


		/****************************
		* retorn uin boolean si tiene permiso sopre el subprograma
		* @param int id del usuario 
		* @return array de listado   codigo ,id de lista los programas en general
		* 
		**/
		public function getTienePermisos($id_usuario,$id_matriz){
	        $sql="SELECT count(*) as cantidad
						FROM permisos 
						where id_subprograma='{$id_matriz}'
								AND usuarios_id='{$id_usuario}'";

		
	        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	          if($conexion->_datosRegistros[0]['cantidad']==0)
	          	return false;
	          else
	          	return true;

    }


    /***************************
    * numero de subprgramas
    * retorn el numero de subprogramas
    **/
    public function contadorSubprogramas($idVigencia, $idUsuario)
    {
    	$sql="SELECT DISTINCT m.id 
					FROM  matriz m, permisos p , clases c ,fila_matriz  fm
					WHERE p.id_subprograma = m.id
						AND c.nombre like 'SPR'
						AND fm.id_vigencia='$idVigencia'
						AND m.activo='1'
						AND fm.id_matriz = m.id
						AND m.clases_id= c.id
						AND p.usuarios_id='$idUsuario' ";

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return  count($conexion->_datosRegistros);


    }




    public function getIdClase($nombre){

    	$sql="SELECT id
			FROM clases c
			WHERE c.nombre like '$nombre'";

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return  $conexion->_datosRegistros[0]['id'];
    }





    public function getMetas(){

    	$sql="SELECT id , nombre
			FROM tipos_meta";
			
			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return  $conexion->_datosRegistros;
    }





    public function datosMatriz($id_matriz){


	    	$sql="SELECT * FROM matriz
					WHERE id='{$id_matriz}'
					and activo='1'";

				$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		        $conexion->consultaSQL($sql);
		        
		        return  $conexion->_datosRegistros;
    }






    public function getFilaMatriz($id_fila_matriz){
    	
	    	$sql="SELECT *
					FROM  fila_matriz fm 
					WHERE  fm.id='{$id_fila_matriz}'
					       ";

		

				$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		        $conexion->consultaSQL($sql);
		        
		        return  $conexion->_datosRegistros;
    }





	    public function getFilasRegistros($id_padre, $id_vigencia){
	    	
	    	$sql="SELECT  fm.* , 
					sfin.recursos_ejecutados , 
					sfin.recursos_programados ,
				    sfis.avance_ponderado,
				    sfis.ponderado

				FROM fila_matriz fm, seguimiento_financiero sfin, seguimiento_fisico sfis, matriz m
				WHERE
							fm.id_matriz = m.id
					AND		fm.id_seguimiento_financiero = sfin.id
					AND 	fm.id_seguimiento_fisico = sfis.id
					AND 	m.id_padre='{$id_padre}'
					AND 	fm.id_vigencia='{$id_vigencia}'";


				$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		        $conexion->consultaSQL($sql);
		        
		        return  $conexion->_datosRegistros;

	    }




  public function getDatosFilaMR_to_idFila($id_matriz, $id_vigencia){
	    	
	    	$sql="SELECT  fm.* ,
	    			m.id_padre, 
					sfin.recursos_ejecutados , 
					sfin.recursos_programados ,
				    sfis.avance_ponderado

				FROM fila_matriz fm, seguimiento_financiero sfin, seguimiento_fisico sfis, matriz m
				WHERE
							fm.id_matriz = m.id
					AND		fm.id_seguimiento_financiero = sfin.id
					AND 	fm.id_seguimiento_fisico = sfis.id
					AND 	m.id='{$id_matriz}'
					AND 	fm.id_vigencia='{$id_vigencia}'";


				$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		        $conexion->consultaSQL($sql);
		        
		        return  $conexion->_datosRegistros;


	    }


	}

?>
