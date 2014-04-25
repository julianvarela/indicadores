<?php
session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultaGeneral.php';
include_once 'consultasSectoresBasicos.php';

//$ruta="http://localhost:8080/taxionline/";


$_opcion="";
$retorno=  array();

if(isset($_POST['opcion']))
{
    $_opcion = $_POST['opcion'];
}




//opcions que tiene el archivo para realizar un respuesta
switch ($_opcion) {
    
    //cuando el usuario seleccciona una solo opcion de un sector basico
    case "seleccion_sector":
        
        
        $year=$_POST['year'];
        $consultaGeneral=new consultaGeneral();
        $idVigencia= $consultaGeneral->vigencia($year);
        
        $consultas = new consultasSectoresBasicos();
        $datos = $consultas->datosTablaSectoresBasicos($idVigencia,$_POST['id_sector']);
        $retorno = array();

        for($i=0; $i<count($datos); $i++){
            $fila = array(
                    "codigo"=> $datos[$i]['codigo_nivel_pdm'],
                    "nivel"=> $datos[$i]['nivel_pdm'],
                    "metas"=> $datos[$i]['metas'],
                    "valorEsperado"=> $datos[$i]['valor_esperado_meta_producto'],
                    "valorLogrado"=> $datos[$i]['valor_logrado_meta_producto'],            
                    "ponderado"=> $datos[$i]['ponderado'],
                    "avancePonderado"=> $datos[$i]['avance_ponderado'],
                    "semaSeguiFisico"=> $datos[$i]['semaforo_seguimiento'],
                
                    "recurProgramados"=> $datos[$i]['recursos_programados'],
                    "recurEjecutados"=> $datos[$i]['recursos_ejecutados'],
                    "semaSeguiFinanciero"=> $datos[$i]['semaforo_seguimiento_financiero'],
                    
                    "fecha_modificacion"=> $datos[$i]['fecha_modificacion'],
                    "fechaCorte"=> $datos[$i]['fecha_corte'],
                  "fecha_creacion"=> $datos[$i]['fecha_creacion'],
                );

                array_push($retorno, $fila);
            }

            

        break;

        
        
        
        ///conocer la lista de sector basicos
    case "lista_sectores":
        
        
        $consultaGeneral=new consultaGeneral();
        $colores= $consultaGeneral->rangoEstado();

    
        
        $consultas = new consultasSectoresBasicos();
        $datos = $consultas->listaSectoresBasicos();
        
        
        $retorno= array('datos'=>$datos,'colores'=>$colores);
        
        break;
        
    
    
    ///avance general de sectores basicos
    case "avance_general":
        
        
        
        $year=$_POST['year'];
        $consultaGeneral=new consultaGeneral();
        $idVigencia= $consultaGeneral->vigencia($year);
    
        
        $consultaGeneral=new consultaGeneral();
        $colores= $consultaGeneral->rangoEstado();

    
        
        $consultas = new consultasSectoresBasicos();
        $datoslistas = $consultas->listaSectoresBasicos();
        $datos=array();
        
        for($i=0;$i<count($datoslistas); $i++)
        {
                $fila= $consultas->avanceGeneralPorSector($idVigencia, $datoslistas[$i]['id']);
               
                $fila=$fila[0]; 
            
               
                $fila['semaforo_seguimiento_financiero']=$fila['semaforo_seguimiento_financiero']==null?"0":$fila['semaforo_seguimiento_financiero'];
                $fila['semaforo_seguimiento_fisico']=$fila['semaforo_seguimiento_fisico']==null?"0":$fila['semaforo_seguimiento_fisico'];                
                    $fila['nombre']=$datoslistas[$i]['nombre'];
                
                array_push($datos, $fila);
            
        }
        
        
        
        $retorno= array('datos'=>$datos,'colores'=>$colores);
        
        
        break;
        
    default:
        break;
}






              
            
    $retorno = json_encode($retorno);  
    echo $retorno;


?>
