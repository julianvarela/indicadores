<?php
session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultasSectoresBasicos.php';

//$ruta="http://localhost:8080/taxionline/";


    $consultas = new consultasSectoresBasicos();
    $datos = $consultas->datosTablaSectoresBasicos($_POST['id_sector']);
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
                "estadoMetaProducto"=> "Alto",
                "recurProgramados"=> $datos[$i]['recursos_programados'],
                "recurEjecutados"=> $datos[$i]['recursos_ejecutados'],
                "semaSeguiFinanciero"=> $datos[$i]['semaforo_seguimiento_financiero'],
                "estadoFinanciero"=> "Alto",
                "fechaCorte"=> $datos[$i]['fecha_corte'],
            );

            array_push($retorno, $fila);
    }

   $retorno = json_encode($retorno);            
            
    
    echo $retorno;


?>
