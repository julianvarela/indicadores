<?php



require_once 'consultaNoticias.php';
 
        $mesArray = array( 
            0=>"sin asignar",
                       1 => "Enero",
                       2 => "Febrero",
                       3 => "Marzo",
                       4 => "Abril", 
                       5 => "Mayo",
                       6 => "Junio", 
                       7 => "Julio", 
                       8 => "Agosto",
                       9 => "Septiembre", 
                       10 => "Octubre", 
                       11 => "Noviembre", 
                       12 => "Diciembre" 
                     );
        
        
     $consultas = new consultaNoticias();   
    
    $listaTipoNoticias=$consultas->tipodeNoticias();
    $datos=array(); 
    
    for($i=0; $i< count($listaTipoNoticias);$i++)
    {
        
        $fila =$consultas->datosNoticias( $listaTipoNoticias[$i]['id']);
        
       
           for($f=0;$f < count($fila); $f++)
           {
             if(isset($fila[$f]['mes']))
              $fila[$f]['mes']= $mesArray[((int)$fila[$f]['mes'])]; 
            else{
              $fila[$f]['mes']= "sin asignar";
            }
               
           }
        
        $datos[$listaTipoNoticias[$i]['nombre']]= $fila;
        
    }
        
    
    echo json_encode( array(
        'datos'=>$datos)           
            );