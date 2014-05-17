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
            
            //definiendo el tipo 
           $mitipo=$_POST['tipo'];
           if(strcasecmp($mitipo,"secretaria")==0)
           {
            $mitipo= "secretarias";
           }
           else {
             $mitipo= "dependencias";
           }




            $consultas = new consultasSecretariasDependencias();
            $datos = $consultas->datosTabla_Secretarias_Dependencias($idVigencia,$_POST['id_sd'],$mitipo);  
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
                      

                       "fecha_modificacion"=> $datos[$i]['fecha_modificacion'],
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
            $datos = $consultas->listaSemaforo($idVigencia,"Secretarias");
           

           $retorno = json_encode(array('datos'=>$datos,'colores'=>$colores));                        
            
        break;
    
    
    
    /////DATOS QUEMMAS EN LA BASE DE DATOS ............!!!
        case "listaDependencias":
            $consultaGeneral=new consultaGeneral();
            $colores= $consultaGeneral->rangoEstado();   
        
            
            $consultas = new consultasSecretariasDependencias();
            $datos = $consultas->listaSemaforo($idVigencia,"dependencias");
           
           

            $retorno = json_encode(array('datos'=>$datos,'colores'=>$colores));                                      
            
        break;    
        
        
    
    //datso generala para las graficasa ge
        case "avance_general_secretaria":
            
            $consultaGeneral=new consultaGeneral();
            $colores= $consultaGeneral->rangoEstado();   
        
            //secretaria--- POR DEFECTO ESTA QUEMADO
            $consultas = new consultasSecretariasDependencias();
            $datoslistas = $consultas->listaSemaforo($idVigencia,"Secretarias");
            $datos=array();
            
            for($i=0;$i<count($datoslistas); $i++)
            {
                $fila = $consultas->avanceGeneral($idVigencia,$datoslistas[$i]['id'] ,"secretarias");  
                $fila=$fila[0];
                
                $fila['semaforo_seguimiento_financiero']=$fila['semaforo_seguimiento_financiero']==null?"0":$fila['semaforo_seguimiento_financiero'];
                $fila['semaforo_seguimiento_fisico']=$fila['semaforo_seguimiento_fisico']==null?"0":$fila['semaforo_seguimiento_fisico'];                
                $fila['nombre']=$datoslistas[$i]['nombre'];
                
                array_push($datos, $fila);
                
            }
            
                       
              $retorno = json_encode(array('datos'=>$datos,'colores'=>$colores));            
           
            break;
        
            
            
         //obtener los avances generales de la depencias   
        case "avance_general_dependencia":
            
            $consultaGeneral=new consultaGeneral();
            $colores= $consultaGeneral->rangoEstado();   
        
            
            $consultas = new consultasSecretariasDependencias();
            $datoslistas = $consultas->listaSemaforo($idVigencia,"dependencias");
            
            
            $datos=array();
            
            for($i=0;$i<count($datoslistas); $i++)
            {
                $fila = $consultas->avanceGeneral($idVigencia,$datoslistas[$i]['id']);  
                $fila=$fila[0];
                
                $fila['semaforo_seguimiento_financiero']=$fila['semaforo_seguimiento_financiero']==null?"0":$fila['semaforo_seguimiento_financiero'];
                $fila['semaforo_seguimiento_fisico']=$fila['semaforo_seguimiento_fisico']==null?"0":$fila['semaforo_seguimiento_fisico'];                
                $fila['nombre']=$datoslistas[$i]['nombre'];
                
                array_push($datos, $fila);
                
            }
            
                       
              $retorno = json_encode(array('datos'=>$datos,'colores'=>$colores));          
           
            
            
            break;   
            
    
        default : break;
    }
    
    echo $retorno;


?>
