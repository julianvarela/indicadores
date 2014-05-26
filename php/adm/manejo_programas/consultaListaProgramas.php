<?php 

		
	include_once '../../Config.php';
	include_once '../../ConectarBD.php';

	class consultaProgramas{


		/**************************
		*  retorn las clases que se pueden crear por que tiene un comportamiento parecido
 		*/
		public function getListaClases_Crear(){

				$sql="SELECT id, nombre
						FROM clases
						WHERE nombre!="VI" 
							and nombre !="MET"
							and activo='1'";

				

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
