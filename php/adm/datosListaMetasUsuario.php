<?php
@session_start();

include_once('permisos.php');
include_once('consultaListaMetasUsuario.php');
include_once('../consultaGeneral.php');
include_once('actualizaPadres.php');


$opcion = $_POST['opcion'];
$year=$_POST['year'];

$consulta= new consultaListaMetasUsuario();
$consultaGeneral=new consultaGeneral();
$actualizacionPadres =new actualizaPadres();

$idVigencia= $consultaGeneral->vigencia($year);


switch ($opcion) {

	case 'lista_metas':
			$datos=array('sesion'=>false);	
			$permisos = new permisos();
			$id_subprograma= $_POST['subprograma'];
			$secretarias_depencias=array();
			$datoMatriz=$permisos->datosMatriz($id_subprograma);



			if(isset($_SESSION['id']) && $permisos->getTienePermisos($_SESSION['id'],$id_subprograma))
			{
				$secretarias_depencias= $consulta->getListaDependencia_secretarias();
				$sectores= $consulta->getListaSectores();
				$tipo_metas=$permisos->getMetas();
				$id_pdm=$datoMatriz[0]['pdm_id'];


				$dd=$consulta->listaMetas($id_subprograma, $idVigencia);

				$datos= array('lista'=>$dd 
					,'sesion'=>true
					,'secretarias_depencias'=>$secretarias_depencias
					,'sectores'=>$sectores
					,'tipo_metas'=>$tipo_metas
					,'pdm_id'=>$id_pdm);

			}

			echo json_encode($datos);

		# code...
		break;
	


		case "lista_recursos_programados":

			$datos=array('sesion'=>false);	
			$permisos = new permisos();
			$id_subprograma= $_POST['subprograma'];
			

			if(isset($_SESSION['id']) && $permisos->getTienePermisos($_SESSION['id'],$id_subprograma))
			{
			

				$dd=$consulta->listaMetas($id_subprograma, $idVigencia);
				$miDatos=array();
				for ($i=0; $i<count($dd) ; $i++)
				{

					$miDatos[$i]=array(
						'id'=>$dd[$i]['id'],
						'recurso'=>$dd[$i]['recursos_programados']

						);

				}
				

				$datos= array('lista'=>$dd 
					,'sesion'=>true
					,'lista'=>$miDatos);

			}

			echo json_encode($datos);



		break;





		case "nuevo_registro":

			$datos=array('sesion'=>false);	
			$permisos = new permisos();
			$id_subprograma= $_POST['subprograma'];
			

			if(isset($_SESSION['id']) && $permisos->getTienePermisos($_SESSION['id'],$id_subprograma))
			{
				//S FIS
					$valor_esperado_meta_producto = $_POST['valor_esperado_meta_producto']; 
				   		$valor_logrado_meta_producto  = $_POST['valor_logrado_meta_producto'];
				   		$ponderado  = $_POST['ponderado'];
				   		$avance_ponderado  = $_POST['avance_ponderado'];
				   		$semaforo_seguimiento_fis = $_POST['semaforo_seg_fis'];


				  //S FIN
				  	$recursos_programados=$_POST['recurso_programado']; 
					$recursos_ejecutados =$_POST['recursos_ejecutados'];
					$semaforo_seguimiento_financiero =$_POST['semaforo_seguimiento_fin'];
					$fecha_corte=$_POST['fecha_corte'];		
 		


					//
					$metas=$_POST['meta'];
					$linea_base =$_POST['linea_base'];
				   	$valor_esperado_productos=$_POST['valor_esperado_productos'];	
				   	$usuarios_id =$_SESSION['id']; 
				   	$clases_id= $permisos->getIdClase("MET");

				   	$selectDependencias_secretarias=$_POST['selectDependencias_secretarias'];


				   	$selectDependencias_secretarias=split("_", $selectDependencias_secretarias);


				   	$dependencias_id ="NULL";
				   	$secretarias_id ="NULL";
					
				   	
				   	//ya que solo puede esta asociado a una pendencia o secretaria
				   	if(strcasecmp($selectDependencias_secretarias[1],"dependencias")==0)
				   	{
				   		$dependencias_id="'".$selectDependencias_secretarias[0]."'";

				   	}//debe ser secretarias
				   	else {
				   			$secretarias_id ="'".$selectDependencias_secretarias[0]."'";
				   	}


				   	$sectores_id =$_POST['selectSectorBasico']; 
				   	$id_padre = $id_subprograma;
				   	$pdm_id =$_POST['pdm_id'];
				   	$tipos_meta_id =$_POST['selecTipoMeta'];
				   

				//MATRIZ
			$id_matriz=$consulta->addMatriz(
					$metas,
					$linea_base,
				   	$valor_esperado_productos,	
				   	$usuarios_id,

				   	$clases_id,
				   	$sectores_id,
				   	$dependencias_id,
				   	$id_padre,
				   	$pdm_id,
				   	$tipos_meta_id,
				   	$secretarias_id);

				$id_seguimiento_financiero=$consulta->addSeguimientoFinanciero(
					$recursos_programados , 
					$recursos_ejecutados , 
					$semaforo_seguimiento_financiero ,
					$fecha_corte); 		

			
				$id_seguimiento_fisico=$consulta->addSeguimientoFisico(
				   		$valor_esperado_meta_producto , 
				   		$valor_logrado_meta_producto ,
				   		$ponderado , 
				   		$avance_ponderado , 
				   		$semaforo_seguimiento_fis);


				//fl matriz
				$idFila = $consulta->addFilaMatriz(
					$id_matriz, 
					$id_seguimiento_fisico, 
					$id_seguimiento_financiero,
					$idVigencia);


				$res=false; //si hubo un error sera false
				$miDatos=array();

				if($id_matriz !=-1 && 
					$id_seguimiento_fisico !=-1 && 
					$id_seguimiento_financiero !=-1 && 
					$idFila!=-1
					)
					{
						$res=true;	

						/// generara los nuevos datos de las tablas
						$miDatos=$consulta->listaMetas($id_subprograma, $idVigencia);
						
						$actualizacionPadres->ActualizaPadresSuma($id_subprograma
						, $idVigencia);//actualiza los padres en suma
					}


				$datos =array(
					'sesion'=>true
					,'res'=>$res//false si hubo un error o true si fue correcto
					,'lista'=>$miDatos);
				
			}

			echo json_encode($datos);


		break;





		case "actualiza_registro":
			
			$datos=array('sesion'=>false);	
			$permisos = new permisos();
			$id_subprograma= $_POST['subprograma'];
			

			if(isset($_SESSION['id']) && $permisos->getTienePermisos($_SESSION['id'],$id_subprograma))
			{
				$dato_ids = $permisos->getFilaMatriz($_POST['id_fila_matriz']);

					//S FIS
					$valor_esperado_meta_producto = $_POST['valor_esperado_meta_producto']; 
				   		$valor_logrado_meta_producto  = $_POST['valor_logrado_meta_producto'];
				   		$ponderado  = $_POST['ponderado'];
				   		$avance_ponderado  = $_POST['avance_ponderado'];
				   		$semaforo_seguimiento_fis = $_POST['semaforo_seg_fis'];


				  //S FIN
				  	$recursos_programados=$_POST['recurso_programado']; 
					$recursos_ejecutados =$_POST['recursos_ejecutados'];
					$semaforo_seguimiento_financiero =$_POST['semaforo_seguimiento_fin'];
					$fecha_corte=$_POST['fecha_corte'];		
 		


					//
					$metas=$_POST['meta'];
					$linea_base =$_POST['linea_base'];
				   	$valor_esperado_productos=$_POST['valor_esperado_productos'];	
				   	$usuarios_id =$_SESSION['id']; 
				   	$clases_id= $permisos->getIdClase("MET");

				   	$selectDependencias_secretarias=$_POST['selectDependencias_secretarias'];


				   	$selectDependencias_secretarias=split("_", $selectDependencias_secretarias);


				   	$dependencias_id ="NULL";
				   	$secretarias_id ="NULL";
					
				   	
				   	//ya que solo puede esta asociado a una pendencia o secretaria
				   	if(strcasecmp($selectDependencias_secretarias[1],"dependencias")==0)
				   	{
				   		$dependencias_id="'".$selectDependencias_secretarias[0]."'";

				   	}//debe ser secretarias
				   	else {
				   			$secretarias_id ="'".$selectDependencias_secretarias[0]."'";
				   	}


				   	$sectores_id =$_POST['selectSectorBasico']; 
				   	$id_padre = $id_subprograma;
				   	$pdm_id =$_POST['pdm_id'];
				   	$tipos_meta_id =$_POST['selecTipoMeta'];


				   	//
				   	//financiero
				   	//
				   	$_sgFin= $consulta->actualizSeguimientoFinanciero(
				   			$dato_ids[0]['id_seguimiento_financiero'],
							$recursos_programados , 
							$recursos_ejecutados , 
							$semaforo_seguimiento_financiero ,
							$fecha_corte); 


				   	//fisico 
				   	//
				   $_SFis=	$consulta->actualizaSeguimientoFisico(
					   		$dato_ids[0]['id_seguimiento_fisico'],
							$valor_esperado_meta_producto , 
					   		$valor_logrado_meta_producto ,
					   		$ponderado , 
					   		$avance_ponderado , 
					   		$semaforo_seguimiento_fis);

				   //matriz
				   //
				   $_Matriz=	$consulta->actualizarMatriz(
						$dato_ids[0]['id_matriz'],
						$metas,
						$linea_base,
					   	$valor_esperado_productos,	
					   
					   	$clases_id,
					   	$sectores_id,
					   	$dependencias_id,
					 
					   	$pdm_id,
					   	$tipos_meta_id,
					   	$secretarias_id);

					   //fila matriz
					   //
					  $mi_fila_matriz= $consulta->actualizarFilaMatriz($_POST['id_fila_matriz']);	

				
				$res=false; //si hubo un error sera false
				$miDatos=array();

				if($_sgFin !=-1 && 
					$_SFis !=-1 && 
					$_Matriz !=-1 && 
					$mi_fila_matriz!=-1
					)
					{
						$res=true;	

						/// generara los nuevos datos de las tablas
						$miDatos=$consulta->listaMetas($id_subprograma, $idVigencia);
						
					}


				$datos =array(
					'sesion'=>true
					,'res'=>$res//false si hubo un error o true si fue correcto
					,'lista'=>$miDatos);	


			}
			echo json_encode($datos);


		break;



	default:
		# code...
		break;
}





?>