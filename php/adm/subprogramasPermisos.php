<?php
session_start();
include_once('permisos.php');

$opcion =$_POST['opcion'];



$permisos= new permisos();

switch ($opcion) {
	case 'listas_subprogramas':
			
			$datos=array('sesion'=>false);	


			if(isset($_SESSION['id']))
			{


			$year= $_POST['year'];
			$lista_subprogramas= $permisos->subprogramas ($_SESSION['id'], $year);
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

				
				}//fin del for la validacio de 
				
				$datos= array('sesion'=>true, 'lista'=>$lista_programa);
              
			}// fin if validacion
			echo json_encode($datos);
		break;
	
	default:
		# code...
		break;
}


?>