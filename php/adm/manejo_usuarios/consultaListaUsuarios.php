<?php 

		
	include_once '../../Config.php';
	include_once '../../ConectarBD.php';

	class consultaListaUsuarios{


		/**************************
		* retornoa lista de todos los usuarios 
 		*/
		public function getUsuarios(){

				$sql="SELECT u.id
							,u.nombre 
							,u.usuario
							,u.activo
							,DATE_FORMAT(u.fecha_creacion,'%d/%m/%Y') as fecha_creacion
							,u.correo
							,u.telefonos
							,u.oficina_principal
							,tu.nombre_tipo
							 ,tu.id id_tipo

						FROM usuarios u, tipos_usuarios tu
						WHERE  u.tipos_usuarios_id= tu.id ";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;				

		}




		/**************************
		*lista de  tipo de usuairos 
		**
		*******************/
		public function getTiposUsuarios(){

				$sql="SELECT id, 
							nombre_tipo nombre 
						FROM tipos_usuarios ";

				

			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;				

		}






		/**************************
		* insertar un nuevo usuario
		* @return 0 si fue exito o -1 si sucedio un errror 
		**
		*******************/
		public function guardarUsuario(
			$nombre,
			$usuario, 
			$pass, 
			$activo, 
			$id_usuario_creador, 
			$correo, 
			$telefonos, 
			$oficina_principal, 
			$tipo_usuarios_id){

				$sql="INSERT INTO usuarios
			(nombre,usuario, pass, activo, fecha_creacion, id_usuario_creador, correo, telefonos, oficina_principal, tipos_usuarios_id)
			
			VALUES
					('{$nombre}','{$usuario}', md5('{$pass}'), '{$activo}', NOW(), '{$id_usuario_creador}', '{$correo}', '{$telefonos}', '{$oficina_principal}', '{$tipo_usuarios_id}') ";

				

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
		public function actualizaUsuario_1(
			$id_usuario,
			$nombre,
			$usuario, 
			$pass, 
			$activo, 
			$id_usuario_creador, 
			$correo, 
			$telefonos, 
			$oficina_principal, 
			$tipo_usuarios_id){

				$sql="UPDATE usuarios
				SET 
					nombre=	'{$nombre}',
					usuario=	'{$usuario}', 
					pass=	md5('{$pass}'), 
					activo=	'{$activo}', 
					id_usuario_creador=	'{$id_usuario_creador}', 
					correo=	'{$correo}', 
					telefonos=	'{$telefonos}', 
					oficina_principal=	'{$oficina_principal}', 
					tipos_usuarios_id=	'{$tipo_usuarios_id}'
				WHERE id='$id_usuario'
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
		public function actualizaUsuario_2(
			$id_usuario,
			$nombre,
			$usuario, 
			
			$activo, 
			$id_usuario_creador, 
			$correo, 
			$telefonos, 
			$oficina_principal, 
			$tipo_usuarios_id){

				$sql="UPDATE usuarios
				SET
					nombre=	'{$nombre}',
					usuario=	'{$usuario}', 
				
					activo=	'{$activo}', 
					id_usuario_creador=	'{$id_usuario_creador}', 
					correo=	'{$correo}', 
					telefonos=	'{$telefonos}', 
					oficina_principal=	'{$oficina_principal}', 
					tipos_usuarios_id=	'{$tipo_usuarios_id}'
				WHERE id='$id_usuario'
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








	public  function guardarNoActualizo($conexion,$sql){
		$conexion->guardarArchivo3(
			      				"\n*****************************************\nfecha: ".date("Y-m-d h:i:s")."\n usuario:".$_SESSION
			      				['id']."\n ".$conexion->Error."\n SQL: $sql \n ","a","log_no_actualizacion_usuarios.txt");

		
	}



	public  function guardarError($conexion,$sql){
		$conexion->guardarArchivo3(
			      				"\n*****************************************\nfecha: ".date("Y-m-d h:i:s")."\n usuario:".$_SESSION
			      				['id']."\n ".$conexion->Error."\n SQL: $sql \n ","a","log_usuarios.txt");

		
	}


	}

?>
