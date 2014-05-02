<?php
session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultaGeneral.php';
include_once 'consultasSectoresBasicos.php';
include_once 'consultasSecretariasDependencias.php';


$year=$_POST['year'];
$consultaGeneral=new consultaGeneral();
$idVigencia= $consultaGeneral->vigencia($year);


$_opcion="";
$retorno=  array();


if(isset($_POST['opcion'])){
    $_opcion = $_POST['opcion'];
}
//opcions que tiene el archivo para realizar un respuesta
switch ($_opcion) {
    
//    //cuando el usuario seleccciona una solo opcion de un sector basico
//    case "seleccion_sector":
//        
//        
//        $year=$_POST['year'];
//        $consultaGeneral=new consultaGeneral();
//        $idVigencia= $consultaGeneral->vigencia($year);
//        
//        $consultas = new consultasSectoresBasicos();
//        $datos = $consultas->datosTablaSectoresBasicos($idVigencia,$_POST['id_sector']);
//        $retorno = array();
//
//        for($i=0; $i<count($datos); $i++){
//            $fila = array(
//                    "codigo"=> $datos[$i]['codigo_nivel_pdm'],
//                    "nivel"=> $datos[$i]['nivel_pdm'],
//                    "metas"=> $datos[$i]['metas'],
//                    "valorEsperado"=> $datos[$i]['valor_esperado_meta_producto'],
//                    "valorLogrado"=> $datos[$i]['valor_logrado_meta_producto'],            
//                    "ponderado"=> $datos[$i]['ponderado'],
//                    "avancePonderado"=> $datos[$i]['avance_ponderado'],
//                    "semaSeguiFisico"=> $datos[$i]['semaforo_seguimiento'],
//                
//                    "recurProgramados"=> $datos[$i]['recursos_programados'],
//                    "recurEjecutados"=> $datos[$i]['recursos_ejecutados'],
//                    "semaSeguiFinanciero"=> $datos[$i]['semaforo_seguimiento_financiero'],
//                    
//                    "fecha_modificacion"=> $datos[$i]['fecha_modificacion'],
//                    "fechaCorte"=> $datos[$i]['fecha_corte'],
//                  "fecha_creacion"=> $datos[$i]['fecha_creacion'],
//                );
//
//                array_push($retorno, $fila);
//            }
//
//            
//
//        break;

        
        ///carga la lista de datos de los sectores basicos y las dependencias
    case "datos_creacion":
                
        $consulta1 = new consultasSectoresBasicos();
        $sectores = $consulta1->listaSectoresBasicos();
        
        $consulta2 = new consultasSecretariasDependencias();
        $dependencias = $consulta2->listaTodaDependecia();        
        
        $retorno= array('sectores'=>$sectores,'dependencias'=>$dependencias);
        
        break;
    
       
    default:
    break;
}
              
            
    $retorno = json_encode($retorno);  
    echo $retorno;


?>
