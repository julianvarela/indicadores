<?php
session_start();
include_once 'Config.php';
include_once 'ConectarBD.php';
include_once 'consultaGeneral.php';
include_once 'consultasAvSubprogramas.php';

//$ruta="http://localhost:8080/taxionline/";








    $year=$_POST['year'];
    $consultaGeneral=new consultaGeneral();
    $idVigencia= $consultaGeneral->vigencia($year);


     $consultaGeneral=new consultaGeneral();
     $colores= $consultaGeneral->rangoEstado();

     

   
    $consultas = new consultasAvSubprogramas();
    $datos = $consultas->datosTablaAvanceSubprogramas($idVigencia);
    $retorno = array();

    for($i=0; $i<count($datos); $i++){
        $fila = array(
                "codigo"=> $datos[$i]['codigo_nivel_pdm'],
                "nivel"=> $datos[$i]['nivel_pdm'],
                "ponderado"=> $datos[$i]['ponderado'],
                "avancePonderado"=> $datos[$i]['avance_ponderado'],
                "semaSeguiFisico"=> $datos[$i]['semaforo_seguimiento'],
              
                "recurProgramados"=> $datos[$i]['recursos_programados'],
                "recurEjecutados"=> $datos[$i]['recursos_ejecutados'],
                "semaSeguiFinanciero"=> $datos[$i]['semaforo_seguimiento_financiero'],
            
                "fechaCorte"=> $datos[$i]['fecha_corte'],
                "fecha_creacion"=> $datos[$i]['fecha_creacion'],
            );

            array_push($retorno, $fila);
    }

   $retorno = json_encode(array('datos'=>$retorno,'colores'=>$colores));            
            
    
    echo $retorno;


?>
