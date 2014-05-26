<?php 

		
	include_once '../../Config.php';
	include_once '../../ConectarBD.php';

	class consultaListaNoticias{



	/**************************
	** datos de tipo de noticias
	**/	
	public function getTiposNoticias()
	{


		$sql="SELECT id, nombre 
				FROM tipos_noticias";

		 $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return $conexion->_datosRegistros;
	      


	}









    /***************
    * guarda una nueva noticia
    **/
    public function guadarNoticia(
        $titulo, 
        $contenido,  
        $fecha_creacion, 
        $tipos_noticias_id, 
        $usuarios_id){


        $sql="INSERT INTO noticias
                (titulo, contenido, activo , fecha_creacion, tipos_noticias_id, usuarios_id)

                VALUES 
                ('{$titulo}', '{$contenido}', '1' ,  STR_TO_DATE('{$fecha_creacion}','%d/%m/%Y'),'{$tipos_noticias_id}', '{$usuarios_id}')";



            $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
            $conexion->consultaSQL($sql);
            
          if($conexion->Error!="")
                {
                    
                    $this->guardarError($conexion,$sql);

                    return -1;
                }
          else{

            return $conexion->_ultimoID;
          }
    }





    /***************
    * actualiza una nueva noticia
    **/
    public function actualizarNoticia(
        $id,
        $titulo, 
        $contenido,  
        $fecha_creacion, 
        $tipos_noticias_id 
        ){


        $sql="UPDATE noticias
              SET   
                   titulo=  '{$titulo}',
                   contenido= '{$contenido}',
                   activo=  '1' , 
                   fecha_creacion=  STR_TO_DATE('{$fecha_creacion}','%d/%m/%Y'),
                   tipos_noticias_id=  '{$tipos_noticias_id}'
                  

                WHERE 
                   id='{$id}' " ;


            $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
            $conexion->consultaSQL($sql);
            
          if($conexion->Error!="")
                {
                    
                    $this->guardarError($conexion,$sql);

                    return -1;
                }
          else{

            return $conexion->_ultimoID;
          }
    }





/***************
    * actualiza una nueva noticia
    **/
    public function eliminaNoticia(
        $id){


        $sql="UPDATE noticias
              SET   
                   
                   activo=  '0'                   

                WHERE 
                   id='{$id}' " ;


            $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
            $conexion->consultaSQL($sql);
            
          if($conexion->Error!="")
                {
                    
                    $this->guardarError($conexion,$sql);

                    return -1;
                }
          else{

            return $conexion->_ultimoID;
          }
    }






		
	public  function guardarError($conexion,$sql){
				$conexion->guardarArchivo3(
					      				"\n*****************************************\nfecha: ".date("Y-m-d h:i:s")."\n usuario:".$_SESSION
					      				['id']."\n ".$conexion->Error."\n SQL: $sql \n ","a","log_registros.txt");



				
			}





	public  function guardarNoActualizo($conexion,$sql){
		$conexion->guardarArchivo3(
			      				"\n*****************************************\nfecha: ".date("Y-m-d h:i:s")."\n usuario:".$_SESSION
			      				['id']."\n ".$conexion->Error."\n SQL: $sql \n ","a","log_no_actualizacion.txt");



		
	}







	}



?>