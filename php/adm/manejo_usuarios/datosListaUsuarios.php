<?php 
@session_start();

	include_once ("consultaListaUsuarios.php");
	include_once '../permisos.php';




$opcion =$_POST['opcion'];



//
$consulta= new consultaListaUsuarios();


	switch ($opcion) {


		case "lista_usuarios":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
				

				//
				//
				
				if(isset($_SESSION['id']) )
				{		
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if(  strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{
							

							//
							//lista de subrpogramas
							//

							$lista_subprogramas= $permisos->getListaProgramas_Subprogramas ('SPR');
								
								$lista_programa=array();
							

								for($i=0 ; $i< count($lista_subprogramas); $i++)
									{

										$id_padre= $lista_subprogramas[$i]['id_padre'] ;
										///ya existe 
										if(isset( $lista_programa[$id_padre]))
										{

											$lista_programa[$id_padre]['lista'][]=
											array('codigo'=>$lista_subprogramas[$i]['codigo'] ,'nombre'=>$lista_subprogramas[$i]['nombre']
													,'id'=>$lista_subprogramas[$i]['id']);

										}
										else{//nno existe
											$datosPrograma= $permisos->subprogramas_lista3($id_padre);
											$datosPrograma=$datosPrograma[0];

											$lista_programa[$id_padre]=$datosPrograma;//tiene los datos general como id, nombre ,codigo 
											$lista_programa[$id_padre]['lista']=array();

											$lista_programa[$id_padre]['lista'][]=
												array('codigo'=>$lista_subprogramas[$i]['codigo'] ,'nombre'=>$lista_subprogramas[$i]['nombre']
												,'id'=>$lista_subprogramas[$i]['id']);
										}
									}


							$tipo_permisos = $consulta->getTiposUsuarios();

							$lista = $consulta->getUsuarios();					
							//añadir los permisos ne forma de [2,32,1,2]
							for($i=0 ; $i < count($lista); $i++)
							{

								$__permisos= $permisos->getPermisos_to_usuario($lista[$i]['id']);

								$mi_permiso="";
								for($c=0; $c <count($__permisos); $c++)
									{
										$mi_permiso=$mi_permiso.",".$__permisos[$c]['id_subprograma'];
									}


								//add permiso
								$lista[$i]['mis_permisos']=$mi_permiso;


							}						




							$datos=array(
								'sesion'=>true
								,'lista'=>$lista
								,'usuario'=>true
								,'permisos'=>$tipo_permisos
								,'lista_programas'=>$lista_programa
								);


						}//fin de validacion del tipo de usuario	

					}

				echo json_encode($datos);


			break;
		




		case "guardar_usuario":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
				
				if(isset($_SESSION['id']) )
				{		
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if( strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{
						


								$nombre= $_POST['nombre'];
								$usuario= $_POST['usuario']; 
								$pass= $_POST['pass']; 
								$activo= $_POST['activo']; 
								$id_usuario_creador= $_SESSION['id']; 
								$correo= $_POST['correo']; 
								$telefonos= $_POST['telefonos']; 
								$oficina_principal= $_POST['oficina_principal']; 
								$tipo_usuarios_id= $_POST['tipo_usuarios_id'];

						$res=$consulta->guardarUsuario(
								$nombre,
								$usuario, 
								$pass, 
								$activo, 
								$id_usuario_creador, 
								$correo, 
								$telefonos, 
								$oficina_principal, 
								$tipo_usuarios_id);

						if($res==-1)
							$res=false;
						else
							$res= true;


							$tipo_permisos = $consulta->getTiposUsuarios();

							$lista = $consulta->getUsuarios();					
							//añadir los permisos ne forma de [2,32,1,2]
							for($i=0 ; $i < count($lista); $i++)
							{

								$__permisos= $permisos->getPermisos_to_usuario($lista[$i]['id']);

								$mi_permiso="";
								for($c=0; $c <count($__permisos); $c++)
									{
										$mi_permiso=$mi_permiso.",".$__permisos[$c]['id_subprograma'];
									}


								//add permiso
								$lista[$i]['mis_permisos']=$mi_permiso;


							}						

						$datos=array(
								'sesion'=>true
								,'lista'=>$lista
								,'usuario'=>true
								,'res'=>$res
								);

						}//fin de validacion del tipo de usuario	

					}

				echo json_encode($datos);


			break;




			case "editar_usuario":
			
				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
				
				if(isset($_SESSION['id']) )
				{		
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if( strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{
						
						$_id_usuario = $_POST['id_usuario'];
						$res=null;

								$nombre= $_POST['nombre'];
								$usuario= $_POST['usuario']; 
								$pass= $_POST['pass']; 
								$activo= $_POST['activo']; 
								$id_usuario_creador= $_SESSION['id']; 
								$correo= $_POST['correo']; 
								$telefonos= $_POST['telefonos']; 
								$oficina_principal= $_POST['oficina_principal']; 
								$tipo_usuarios_id= $_POST['tipo_usuarios_id'];

					

						if(strcasecmp($pass,"-@@##@@-")==0)
						{

							$res= $consulta->actualizaUsuario_2(
								$_id_usuario,
								$nombre,
								$usuario, 
								
								$activo, 
								$id_usuario_creador, 
								$correo, 
								$telefonos, 
								$oficina_principal, 
								$tipo_usuarios_id);
						}
						else{

							$res=$consulta->actualizaUsuario_1(
								$_id_usuario,
								$nombre,
								$usuario, 
								$pass, 
								$activo, 
								$id_usuario_creador, 
								$correo, 
								$telefonos, 
								$oficina_principal, 
								$tipo_usuarios_id);
						}


						if($res==-1)
							$res=false;
						else
							$res= true;



						//cambio de permisos
						if($res){

							$permisos->borrarPermisosAll_by_usuario($_id_usuario);
							$mis_permisos_array =explode(",", $_POST['mis_permisos']);

							for($r=0 ; $r <count($mis_permisos_array); $r++)
								{
									$mi_id_supragrama = $mis_permisos_array[$r];

									$permisos->addPermiso($mi_id_supragrama, $_id_usuario);
								}
						}


						///datos a mostrar

							$tipo_permisos = $consulta->getTiposUsuarios();

							$lista = $consulta->getUsuarios();					
							//añadir los permisos ne forma de [2,32,1,2]
							for($i=0 ; $i < count($lista); $i++)
							{

								$__permisos= $permisos->getPermisos_to_usuario($lista[$i]['id']);

								$mi_permiso="";
								for($c=0; $c <count($__permisos); $c++)
									{
										$mi_permiso=$mi_permiso.",".$__permisos[$c]['id_subprograma'];
									}


								//add permiso
								$lista[$i]['mis_permisos']=$mi_permiso;


							}						


						$datos=array(
								'sesion'=>true
								,'lista'=>$lista
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