<?php
session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultasSecretariasDependencias.php';

//$ruta="http://localhost:8080/taxionline/";
            
    switch($_POST['opcion']){
        
        case "consultaDatos":       

            $consultas = new consultasSecretariasDependencias();
            $datos = $consultas->datosTabla_Secretarias_Dependencias($_POST['id_sd']);  
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
                        "estadoFinanciero"=> "Alto"
                    );

                    array_push($retorno, $fila);
            }

           $retorno = json_encode($retorno);            
           
        break;
        
        case "listaSecretarias":

            $consultas = new consultasSecretariasDependencias();
            $datos = $consultas->listaSemaforo(2);
            $retorno = array();

            for($i=0; $i<count($datos); $i++){
                $fila = array(
                        "id"=> $datos[$i]['id'],
                        "nombre"=> $datos[$i]['nombre']
                    );

                    array_push($retorno, $fila);
            }

           $retorno = json_encode($retorno);                        
            
        break;
    
        case "listaDependencias":

            $consultas = new consultasSecretariasDependencias();
            $datos = $consultas->listaSemaforo(3);
            $retorno = array();

            for($i=0; $i<count($datos); $i++){
                $fila = array(
                        "id"=> $datos[$i]['id'],
                        "nombre"=> $datos[$i]['nombre']
                    );

                    array_push($retorno, $fila);
            }

           $retorno = json_encode($retorno);                                    
            
        break;    
    
        default : break;
    }
    
    echo $retorno;


?>
