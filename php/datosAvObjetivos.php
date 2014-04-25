<?php
@session_start();  




require_once 'consultaGeneral.php';
require_once 'consultasAvObjetivos.php';

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$opcion="";
$salida=array('correcto'=>false);

if($_POST['opcion'])
    $opcion = $_POST['opcion'];


//CUERPO DE OPCIONES 
switch ($opcion) {
    
    //CASO DE OPCION1 ... CAMBIO DEL AÑO
    case 'avance_objetivos':        
               
      //  if(isset($_SESSION['vigencia']))
        {
            
       
            
            $consultaGeneral=new consultaGeneral();
            $colores= $consultaGeneral->rangoEstado();
            $idVigencia= $consultaGeneral->vigencia($_POST['year']);
            
            $idClase =$consultaGeneral->getIdClase('OE');
            


            $consultasAvObjetivos=new consultasAvObjetivos();
            $datos=$consultasAvObjetivos->datos($idClase , $idVigencia);
            $datosFinales=array();
            
            //formatea el json 
            for($i =0 ; $i<count($datos); $i++)
            {
                
                    $fila=array(
                        
                        'codigo'=> $datos[$i]['codigo_nivel_pdm']
                        ,'nivel'=> $datos[$i]['nivel_pdm']
                        ,'semaforoSeguimientoFis'=> $datos[$i]['semaforo_seguimiento']
                        ,'ponderado'    => $datos[$i]['ponderado']
                        ,'recursosProgramado'=> $datos[$i]['recursos_programados']
                        ,'recursosEjecutados'=> $datos[$i]['recursos_ejecutados']
                        ,'semaforoSeguimientoFin'=> $datos[$i]['semaforo_seguimiento_financiero'] ,
                        'fecha_modificacion'=> $datos[$i]['fecha_modificacion']
                        
                    );
                $datosFinales[]=$fila;
                
                
                
                
            }
            
            
            $salida=array('correcto'=>true, 'datos'=>$datosFinales,'colores'=>$colores);
            
        } 
        
        
        break;

        
        
        
    
    default:
        break;
}
//FIN de OPCIONES 

echo json_encode($salida);
?>