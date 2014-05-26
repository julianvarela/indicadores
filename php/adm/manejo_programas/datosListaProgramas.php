<?php 
@session_start();

	include_once ("consultaListaProgramas.php");
	include_once '../permisos.php';




$opcion =$_POST['opcion'];



//
$consulta= new consultaListaProgramas();


	switch ($opcion) {


		case "cargar":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
				
				if(isset($_SESSION['id']) )
				{		
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if(  strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{
							
						$lista=$consulta->getListaClases_Crear();



							$datos=array(
								'sesion'=>true
								,'lista'=>$lista
								,'usuario'=>true
								,'lista'=>$datos
								);
				

						}//fin de validacion del tipo de usuario	

					}

				echo json_encode($datos);


			break;
		



		default:
			# code...
			break;
	}




?>