<?php
session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultasAvVigencias.php';


    $consultaGeneral=new consultaGeneral();
    $colores= $consultaGeneral->rangoEstado();
           

    $consultas = new consultasAvVigencias();
    $datos = $consultas->datosTablaAvanceVigencias();
    $retorno = array();
    
    for($i=0; $i<count($datos); $i++){        
        
        $fila = array(
                "vigencia"=> $datos[$i]['vigencia'],
                "nivel"=> $datos[$i]['nivel_pdm'],
                "semaSeguiFisico"=> $datos[$i]['semaforo_seguimiento'],                
                "recurProgramados"=> $datos[$i]['recursos_programados'],
                "semaSeguiFinanciero"=> $datos[$i]['semaforo_seguimiento_financiero'],
                "recurEjecutados"=> $datos[$i]['recursos_ejecutados']
            );

            array_push($retorno, $fila);
    }

    $retorno = json_encode(array('datos'=>$retorno,'colores'=>$colores));       
    
    echo $retorno;


?>
