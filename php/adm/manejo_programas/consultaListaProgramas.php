<?php 

		
	@include_once '../../Config.php';
	@include_once '../../ConectarBD.php';

	class consultaListaProgramas{


		/**************************
		*  retorn las clases que se pueden crear por que tiene un comportamiento parecido
 		*/
		public function getListaClases_Crear(){

				$sql="SELECT id, nombre
						FROM clases
						WHERE nombre!='VI' 
							and nombre !='MET'
							and activo='1'";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;				

		}


	/**************************
		* retorna los datos progarma , sub ,eje por id clase
 		*/
		public function getLista_by_idclase($id_clase){

				$sql="SELECT pdm.id as id 
							,concat(pdm.codigo,' ',pdm.nivel ) as nombre
							,pdm.codigo
							,pdm.nivel
							,m.id as id_matriz
							,c.nombre as nombre_clase
							,c.id as id_clase
							,m.id_padre  as id_padre
						
							FROM  pdm , matriz m, clases c
							WHERE m.pdm_id = pdm.id
								
								AND m.clases_id='{$id_clase}'
								AND m.clases_id=c.id
								AND m.activo='1'
								AND pdm.activo='1'"	;


				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;				

		}




/**************************
		*  retorn roton los sub, progra, eje por nombre de la clase
 		*/
		public function getLista_by_nombreclase($nombre_clase){

				$sql="SELECT	
							pdm.id as id 
							,concat(pdm.codigo,' ',pdm.nivel ) as nombre
							,pdm.codigo
							,pdm.nivel
							,m.id as id_matriz
							,c.nombre as nombre_clase
							,c.id as id_clase
							,m.id_padre  as id_padre
						
							FROM  pdm , matriz m , clases c
							WHERE m.pdm_id = pdm.id
								AND m.clases_id=c.id
								AND m.activo='1'
								AND pdm.activo='1'
								AND c.nombre like '$nombre_clase'
					";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;				

		}



		/**************************
		* insertar un nuevo usuario
		* @return 0 si fue exito o -1 si sucedio un errror 
		**
		*******************/
		public function guardarPdm(
			$codigo, 
			$nivel){

				$sql="INSERT INTO pdm 
					(codigo, nivel,activo)
					VALUES  
						('{$codigo}', '{$nivel}', '1')";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    	
	      if($conexion->Error!="")
	      		{
	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }

	     			

		}







		/**************************
		* insertar un nuevo usuario
		* @return 0 si fue exito o -1 si sucedio un errror 
		**
		*******************/
		public function actualizaAllPdm(
			$_id,
			$codigo, 
			$nivel){

				$sql="UPDATE pdm 
					SET codigo='{$codigo}' ,
						nivel='{$nivel}'
				     WHERE
				     	id='{$_id}' ";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    	
	      if($conexion->Error!="")
	      		{
	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }

	     			

		}

		/**************************
		* insertar un nuevo usuario
		* @return 0 si fue exito o -1 si sucedio un errror 
		**
		*******************/
		public function actualizaActivoPdm(
			$_id,
			$activo
			){

				$sql="UPDATE pdm 
					SET activo='{$activo}'
					WHERE
					 id ='{$_id}'
					";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    	
	      if($conexion->Error!="")
	      		{
	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }
		}

		/**************************
		* insertar un nuevo usuario
		* @return 0 si fue exito o -1 si sucedio un errror 
		**
		*******************/
		 function guardarMatriz_with_codigo(
			$usuarios_id,
			$clases_id,
			$id_padre,
			$pdm_id

			){

				$sql="INSERT INTO matriz
					   (metas,linea_base,
					   	valor_esperado_productos,	activo,
					   	fecha_creacion,usuarios_id,

					   	clases_id,sectores_id,
					   	dependencias_id,id_padre,
					   	pdm_id,tipos_meta_id,
					   	secretarias_id)

				VALUES ('','0',
					'0','1',
					NOW(),	'{$usuarios_id}',

					   	'{$clases_id}',NULL,
					   	NULL, '{$id_padre}',
					   	'{$pdm_id}',NULL,
					   	NULL)";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    	
	      if($conexion->Error!="")
	      		{
	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }

	     			

		}








		/**************************
		* insertar un nuevo usuario
		* @return 0 si fue exito o -1 si sucedio un errror 
		**
		*******************/
		 function actualizadarMatriz_with_codigo(
			$_id,
			$id_padre
		

			){

				$sql="UPDATE matriz
					    SET id_padre='{$id_padre}'
					  WHERE 
					  	 id='{$_id}' ";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    	
	      if($conexion->Error!="")
	      		{
	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }

	     			

		}


	 function guardarNoActualizo($conexion,$sql){
		$conexion->guardarArchivo3(
			      				"\n*****************************************\nfecha: ".date("Y-m-d h:i:s")."\n usuario:".$_SESSION
			      				['id']."\n ".$conexion->Error."\n SQL: $sql \n ","a","log_no_actualizacion_usuarios.txt");

		
	}



	 function guardarError($conexion,$sql){
		$conexion->guardarArchivo3(
			      				"\n*****************************************\nfecha: ".date("Y-m-d h:i:s")."\n usuario:".$_SESSION
			      				['id']."\n ".$conexion->Error."\n SQL: $sql \n ","a","log_usuarios.txt");

		
	}


	}

?>
