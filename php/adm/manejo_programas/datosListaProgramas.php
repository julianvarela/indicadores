<?php 
@session_start();



include_once ("consultaListaProgramas.php");
	include_once '../permisos.php';
	include_once('../../consultaGeneral.php');
	include_once('../consultaListaMetasUsuario.php');



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
								
								);
				

						}//fin de validacion del tipo de usuario	

					}

				echo json_encode($datos);


			break;
		



		case "datos_edicion":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
				
				if(isset($_SESSION['id']) )
				{		
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if(  strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{
						$id_clase= $_POST['id_clase'];
						$nombre_clase= $_POST['nombre_clase'];
						$nombre_clase_padre="";

						switch ($nombre_clase) {
							case 'EJE':
								$nombre_clase_padre="VI";
								break;

								case 'PR':
								$nombre_clase_padre="EJE";
								break;


								case 'SPR':
								$nombre_clase_padre="PR";
								break;
							
							default:
								# code...
								break;
						}


							
						$lista_datos=$consulta->getLista_by_idclase($id_clase);
						$lista_clase_padre=$consulta->getLista_by_nombreclase($nombre_clase_padre);
						



							$datos=array(
								'sesion'=>true
								,'lista_datos'=>$lista_datos
								,'usuario'=>true
								,'lista_clase_padre'=>$lista_clase_padre
								
								);
				

						}//fin de validacion del tipo de usuario	

					}

				echo json_encode($datos);


			break;




			case "guardar_registro":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
				$consultaGeneral=new consultaGeneral();
				$consultaListaMetasUsuarios= new consultaListaMetasUsuario();
				$consulta = new consultaListaProgramas();

				
				if(isset($_SESSION['id']) )
				{		
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
					$res=true;

					///
					///POst
					///
					///
				
					$id_clase = $_POST['id_clase'];
					$id_padre = $_POST['id_padre'];
					
					$codigo= $_POST['codigo'];
					$nivel =$_POST['nivel'];
					$usuarios_id= $_SESSION['id'];


					if(  strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{

						$pdm_id= $consulta->guardarPdm(
							$codigo, 
							$nivel);

						 $id_matriz=$consulta->guardarMatriz_with_codigo(
								$usuarios_id,
								$id_clase,
								$id_padre,
								$pdm_id

								);


							///luego de generado el registor principal se crearano los registros de las demas Vigencias para esa meta
						    $mis_vigencias = $consultaGeneral->getMisVigencia();

							for($i=0; $i < count($mis_vigencias) ; $i++)
								{

									
									$id_seguimiento_financiero=  $consultaListaMetasUsuarios->addSeguimientoFinanciero(
										"0" , 
										"0", 
										"0" ,
										"NULL"); 


										$id_seguimiento_fisico= $consultaListaMetasUsuarios->addSeguimientoFisico(
									   		"0", 
									   		"0" ,
									   		"0" , 
									   		"0" , 
									   		"0");	

										$idFila = $consultaListaMetasUsuarios->addFilaMatriz(
												$id_matriz, 
												$id_seguimiento_fisico, 
												$id_seguimiento_financiero,
												$mis_vigencias[$i]['id']);
							

										//valida si hay error
										if($id_matriz ==-1 || 
											$id_seguimiento_fisico ==-1 ||
											$id_seguimiento_financiero ==-1 || 
											$idFila==-1
											){

											$res=false;	

										}

										
								}//fin del for de vigencias
							
					

							
							$lista_datos=$consulta->getLista_by_idclase($id_clase);
							$datos=array(
								'sesion'=>true
								,'lista_datos'=>$lista_datos
								,'usuario'=>true
								,'res'=>$res
								
								);
				

						}//fin de validacion del tipo de usuario	

					}

				echo json_encode($datos);


			break;






			case "editar_registro":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
				$consultaGeneral=new consultaGeneral();
				$consultaListaMetasUsuarios= new consultaListaMetasUsuario();
				$consulta = new consultaListaProgramas();

				
				if(isset($_SESSION['id']) )
				{		
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
					$res=true;

					///
					///POst
					///
					///
				
					$id_clase = $_POST['id_clase'];
					$id_padre = $_POST['id_padre'];
					$id_matriz = $_POST['id_matriz'];
					
					$codigo= $_POST['codigo'];
					$nivel =$_POST['nivel'];
					$usuarios_id= $_SESSION['id'];
					$id_pdm = $_POST['id_pdm'];

					if(  strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{

						$pdm_id= $consulta-> actualizaAllPdm(
								$id_pdm,
								$codigo, 
								$nivel);

						$id__matriz=$consulta->actualizadarMatriz_with_codigo(
								$id_matriz,
								$id_padre);


						if($pdm_id==-1 || $id__matriz==-1)
							$res=false;
							
							$lista_datos=$consulta->getLista_by_idclase($id_clase);
							$datos=array(
								'sesion'=>true
								,'lista_datos'=>$lista_datos
								,'usuario'=>true
								,'res'=>$res
								
								);
				

						}//fin de validacion del tipo de usuario	

					}

				echo json_encode($datos);


			break;



			case "eliminar_registro":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
				$consultaGeneral=new consultaGeneral();
				$consultaListaMetasUsuarios= new consultaListaMetasUsuario();
				$consulta = new consultaListaProgramas();

				
				if(isset($_SESSION['id']) )
				{		
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
					$res=true;
					///
					///POST
					///
					
					
					$id_pdm = $_POST['id_pdm'];
					$usuarios_id= $_SESSION['id'];
					$id_matriz = $_POST['id_matriz'];
					$id_clase= $_POST['id_clase'];




					if(  strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{

								$consulta->actualizaActivoPdm(
									$id_pdm,
									'0');


								$id_datos = $permisos->getFilaMatriz_by_idMatriz($id_matriz);/// guarda los ide de contendide en fila matriz de todas las filas y
			

								$_matriz = $consultaListaMetasUsuarios->actualizarActivoMatriz($id_matriz , '0');


								for($m=0 ; $m <count($id_datos) ; $m++)
									{

										//actualizacion ....
										$_fin = $consultaListaMetasUsuarios->actualizarActivoSeguimientoFinaciero($id_datos[$m]['id_seguimiento_financiero'],'0');
										
										$_fis = $consultaListaMetasUsuarios->actualizarActivoSegFis($id_datos[$m]['id_seguimiento_fisico'],'0');


										if( $_fin == -1 ||
											$_fis == -1 ||
											$_matriz == -1)
											{

												$res = false;
											}	

									}







							
							$lista_datos=$consulta->getLista_by_idclase($id_clase);
							$datos=array(
								'sesion'=>true
								,'lista_datos'=>$lista_datos
								,'usuario'=>true
								,'res'=>$res
								
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