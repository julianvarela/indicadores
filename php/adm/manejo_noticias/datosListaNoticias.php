<?php 
@session_start();
		
	
	include_once ("consultaListaNoticias.php");
	include_once '../permisos.php';
	require_once '../../consultaNoticias.php';




$opcion =$_POST['opcion'];



$mesArray = array( 
						    	 0=>"sin asignar",
						           1 => "Enero",
						           2 => "Febrero",
						           3 => "Marzo",
						           4 => "Abril", 
						           5 => "Mayo",
						           6 => "Junio", 
						           7 => "Julio", 
						           8 => "Agosto",
						           9 => "Septiembre", 
						           10 => "Octubre", 
						           11 => "Noviembre", 
						           12 => "Diciembre" 
						                 );




//
$consulta= new consultaListaNoticias();


	switch ($opcion) {


		case "cargar":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
			

				if(isset($_SESSION['id']) )
				{	
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if( strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{

							$lista_tipo= $consulta->getTiposNoticias();

	     					$consultas_Noticias = new consultaNoticias();   


						        
						    
						    $listaTipoNoticias=$consultas_Noticias->tipodeNoticias();
						    $datos=array(); 
						    
						    for($i=0; $i< count($listaTipoNoticias);$i++)
						    {
						        
						        $fila = $consultas_Noticias->datosNoticias( $listaTipoNoticias[$i]['id']);
						        
						       
						           for($f=0;$f < count($fila); $f++)
						           {
						             if(isset($fila[$f]['mes']))
						             {
						             	$fila[$f]['mes']= $mesArray[((int)$fila[$f]['mes'])]; 
						              
						             }
						             else{
						             	$fila[$f]['mes']= "sin asignar";
						             }
						               
						           }
						        
						        $datos[$listaTipoNoticias[$i]['nombre']]= $fila;
						        
						    }




/***************************************/


							

							$datos=array(
								'sesion'=>true
								,'usuario'=>true
								,'tipos'=>$lista_tipo
								,'lista_noticias'=>$datos
								);

						}//fin de validacion del tipo de usuario	

				}

				echo json_encode($datos);


			break;




			///guardar una nueva noticia
			case "guardar_noticia":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
			

				if(isset($_SESSION['id']) )
				{	
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if( strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{

							//valor por post
							$titulo =$_POST['titulo']; 
					        $contenido =$_POST['contenido'];  
					        $fecha_creacion =$_POST['fecha_creacion']; 
					        $tipo_noticias_id =$_POST['tipo_noticias_id']; 
					        $usuarios_id =$_SESSION['id'];


							$res=$consulta->guadarNoticia(
							        $titulo, 
							        $contenido,  
							        $fecha_creacion, 
							        $tipo_noticias_id, 
							        $usuarios_id);

							if($res==-1)
								$res=false;
							else
								$res=true;


							//datos de las noticias 
							
								$lista_tipo= $consulta->getTiposNoticias();
		     					$consultas_Noticias = new consultaNoticias(); 
							    
							    $listaTipoNoticias=$consultas_Noticias->tipodeNoticias();
							    $noticias=array(); 							    
							    for($i=0; $i< count($listaTipoNoticias);$i++)
							    {
							        
							        	$fila = $consultas_Noticias->datosNoticias( $listaTipoNoticias[$i]['id']);							        
							       
							           for($f=0;$f < count($fila); $f++)
							           {

							           	if(isset($fila[$f]['mes']))			             
							              $fila[$f]['mes']= $mesArray[((int)$fila[$f]['mes'])]; 
							          	else{
							          		$fila[$f]['mes']="sin asignar";
							          	}
							               
							           }
							        
							        $noticias[$listaTipoNoticias[$i]['nombre']]= $fila;
							        
							    }


							

							$datos=array(
								'sesion'=>true
								,'usuario'=>true
								,'res'=>$res
								,'lista_noticias'=>$noticias

								);

						}//fin de validacion del tipo de usuario	

				}

				echo json_encode($datos);


			break;



			// editar noticia
			case "edicion_noticia":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
			

				if(isset($_SESSION['id']) )
				{	
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if( strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{

							//valor por post
							$id_noticia=$_POST['id_noticia'];
							$titulo =$_POST['titulo']; 
					        $contenido =$_POST['contenido'];  
					        $fecha_creacion =$_POST['fecha_creacion']; 
					        $tipo_noticias_id =$_POST['tipo_noticias_id']; 
					        $usuarios_id =$_SESSION['id'];


							$res=$consulta->actualizarNoticia(
								        $id_noticia,
								        $titulo, 
								        $contenido,  
								        $fecha_creacion, 
								        $tipo_noticias_id );

							if($res==-1)
								$res=false;
							else
								$res=true;


							//datos de las noticias 
							
								$lista_tipo= $consulta->getTiposNoticias();
		     					$consultas_Noticias = new consultaNoticias(); 
							    
							    $listaTipoNoticias=$consultas_Noticias->tipodeNoticias();
							    $noticias=array(); 							    
							    for($i=0; $i< count($listaTipoNoticias);$i++)
							    {
							        
							        	$fila = $consultas_Noticias->datosNoticias( $listaTipoNoticias[$i]['id']);							        
							       
							           for($f=0;$f < count($fila); $f++)
							           {

							           	if(isset($fila[$f]['mes']))			             
							              $fila[$f]['mes']= $mesArray[((int)$fila[$f]['mes'])]; 
							          	else{
							          		$fila[$f]['mes']="sin asignar";
							          	}
							               
							           }
							        
							        $noticias[$listaTipoNoticias[$i]['nombre']]= $fila;
							        
							    }


							

							$datos=array(
								'sesion'=>true
								,'usuario'=>true
								,'res'=>$res
								,'lista_noticias'=>$noticias

								);

						}//fin de validacion del tipo de usuario	

				}

				echo json_encode($datos);


			break;




			//elimina noticia
						// editar noticia
			case "elimina_noticia":

				$datos=array('sesion'=>false, 'usuario'=>false);	
				$permisos = new permisos();
			

				if(isset($_SESSION['id']) )
				{	
					$mi_tipo_permiso =  $permisos->getTipoPermiso($_SESSION['id']);
					$datos=array('sesion'=>true, 'usuario'=>false);	
				

					if( strcasecmp($mi_tipo_permiso[0]['tipo'],"Admin" )==0)
						{

							//valor por post
							$id_noticia=$_POST['id_noticia'];
							

							$res=$consulta->eliminaNoticia(
								        $id_noticia );

							if($res==-1)
								$res=false;
							else
								$res=true;


							//datos de las noticias 
							
								$lista_tipo= $consulta->getTiposNoticias();
		     					$consultas_Noticias = new consultaNoticias(); 
							    
							    $listaTipoNoticias=$consultas_Noticias->tipodeNoticias();
							    $noticias=array(); 							    
							    for($i=0; $i< count($listaTipoNoticias);$i++)
							    {
							        
							        	$fila = $consultas_Noticias->datosNoticias( $listaTipoNoticias[$i]['id']);							        
							       
							           for($f=0;$f < count($fila); $f++)
							           {

							           	if(isset($fila[$f]['mes']))			             
							              $fila[$f]['mes']= $mesArray[((int)$fila[$f]['mes'])]; 
							          	else{
							          		$fila[$f]['mes']="sin asignar";
							          	}
							               
							           }
							        
							        $noticias[$listaTipoNoticias[$i]['nombre']]= $fila;
							        
							    }


							

							$datos=array(
								'sesion'=>true
								,'usuario'=>true
								,'res'=>$res
								,'lista_noticias'=>$noticias

								);

						}//fin de validacion del tipo de usuario	

				}

				echo json_encode($datos);


			break;

		
		}


?>