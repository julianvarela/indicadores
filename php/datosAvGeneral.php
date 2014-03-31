<?php
session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultasAvGeneral.php';

//$ruta="http://localhost:8080/taxionline/";


    $consultas = new consultasAvGeneral();
    $datos = $consultas->datosTablaAvanceGeneral();
    $retorno = array();
    
    for($i=0; $i<count($datos); $i++){        
        
        $fila = array(
                "codigo"=> $datos[$i]['codigo_nivel_pdm'],
                "nivel"=> $datos[$i]['nivel_pdm'],
                "semaSeguiFisico"=> $datos[$i]['semaforo_seguimiento'],
                "estadoMetaProducto"=> "Alto",
                "recurProgramados"=> $datos[$i]['recursos_programados'],
                "recurEjecutados"=> $datos[$i]['recursos_ejecutados'],
                "semaSeguiFinanciero"=> $datos[$i]['semaforo_seguimiento_financiero'],
                "estadoFinanciero"=> "Alto"
            );

            array_push($retorno, $fila);
    }

   $retorno = json_encode($retorno);            
            
    
    echo $retorno;


?>
