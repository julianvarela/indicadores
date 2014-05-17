<?php
@session_start();

include_once('permisos.php');
include_once('consultaListaMetasUsuario.php');
include_once('../consultaGeneral.php');


$opcion = $_POST['opcion'];
$year=$_POST['year'];

$consulta= new consultaListaMetasUsuario();
$consultaGeneral=new consultaGeneral();
$idVigencia= $consultaGeneral->vigencia($year);


switch ($opcion) {

	case 'lista_metas':
			$datos=array('sesion'=>false);	
			$permisos = new permisos();
			$id_subprograma= $_POST['subprograma'];
			$secretarias_depencias=array();


			if(isset($_SESSION['id']) && $permisos->getTienePermisos($_SESSION['id'],$id_subprograma))
			{
				$secretarias_depencias= $consulta->getListaDependencia_secretarias();

				$dd=$consulta->listaMetas($id_subprograma, $idVigencia);

				$datos= array('lista'=>$dd 
					,'sesion'=>true
					,'secretarias_depencias'=>$secretarias_depencias);

			}

			echo json_encode($datos);

		# code...
		break;
	
	default:
		# code...
		break;
}



?>