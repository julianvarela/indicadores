<?php
session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultaGeneral.php';
include_once 'consultasSecretariasDependencias.php';

//$ruta="http://localhost:8080/taxionline/";

 $year=$_POST['year'];
 $consultaGeneral=new consultaGeneral();
 $idVigencia= $consultaGeneral->vigencia($year);


            
    switch($_POST['opcion']){
        
        case "consultaDatos":       
            
            
           


            $consultas = new consultasSecretariasDependencias();
            $datos = $consultas->datosTabla_Secretarias_Dependencias($idVigencia,$_POST['id_sd']);  
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
                   
                    );

                    array_push($retorno, $fila);
            }

           $retorno = json_encode($retorno);            
           
        break;
        
        
        
        
           
    /////DATOS QUEMMAS EN LA BASE DE DATOS ............!!!
        case "listaSecretarias":
            $consultaGeneral=new consultaGeneral();
            $colores= $consultaGeneral->rangoEstado();   
        
            
            $consultas = new consultasSecretariasDependencias();
            $datos = $consultas->listaSemaforo($idVigencia,2);
           

           $retorno = json_encode(array('datos'=>$datos,'colores'=>$colores));                        
            
        break;
    
    
    
    /////DATOS QUEMMAS EN LA BASE DE DATOS ............!!!
        case "listaDependencias":
            $consultaGeneral=new consultaGeneral();
            $colores= $consultaGeneral->rangoEstado();   
        
            
            $consultas = new consultasSecretariasDependencias();
            $datos = $consultas->listaSemaforo($idVigencia,3);
           
           

            $retorno = json_encode(array('datos'=>$datos,'colores'=>$colores));                                      
            
        break;    
        
        
        
    
        default : break;
    }
    
    echo $retorno;


?>
