<?php
	 	//session_start();
		@include_once ("../Config.php");
		@include_once ("../ConectarBD.php");
		include_once ("permisos.php");
		include_once ("consultaListaMetasUsuario.php");

	 class actualizaPadres{

	 	var $error=false;



	 	public function ActualizaPadresSuma ($id_padre, $id_vigencia){
	        
	        //se hallan todos los metas del mismo nivel
	        //
	        //
	         if($id_padre &&  strcasecmp($id_padre, "null")!=0)
	        {
	        	$permisos = new permisos();
	        	$consulta= new consultaListaMetasUsuario();
	        	$dato_ids = $permisos->getDatosFilaMR_to_idFila($id_padre, $id_vigencia);
	        	

		        $hijos=$permisos->getFilasRegistros($id_padre, $id_vigencia);		        
		        $datos_matriz_padre= $consulta->getMatriz($id_padre);


		        $suma_avace_ponderado=0;
		        $suma_recursos_ejecutados=0;
		        $suma_recursos_programados=0;


		        for($i=0 ; $i<count($hijos); $i++)
		        {
		        	$fila= $hijos[$i];


		        	$suma_avace_ponderado= floatval($fila['avance_ponderado'])+$suma_avace_ponderado;

		        	$suma_recursos_ejecutados= floatval($fila['recursos_ejecutados'])+$suma_recursos_ejecutados;


		        	$suma_recursos_programados= floatval($fila['recursos_programados'])+$suma_recursos_programados;


		        }//fin del for de sumas 



		        $ac1= $consulta->actualizaSemaforoSegFis($dato_ids[0]['id_seguimiento_fisico'],$suma_avace_ponderado);


		        $semaforo_seguimiento_financiero =($suma_recursos_ejecutados/$suma_recursos_programados)*100;


		        $ac2= $consulta->actualizSumaRecursosSeguimientoFinanciero(
							$dato_ids[0]['id_seguimiento_financiero'],
							$suma_recursos_programados , 							
							$suma_recursos_ejecutados , 
							$semaforo_seguimiento_financiero);


		        $ac3= $consulta->actualizarFilaMatriz($dato_ids[0]['id']);	




		        if($ac1!=-1 || 
			        $ac2!=-1 ||
			        $ac3!=-1 )
			        {
			        	$this->error=true;
			        }





		        ///llamarse de forma recursiva
		        $this->ActualizaPadresSuma ( $dato_ids[0]['id_padre'], $id_vigencia);

	        }//fin de la valicion
	        



    	}



    	///actualzia los ponderados de los padres
    	public function actualizaPadresPonderados($id_matriz, $id_vigencia){

    		$consulta=new consultaListaMetasUsuario();


    		$datos_r_matriz=$consulta->getRecursosProgramados($id_matriz,$id_vigencia);
    		$datos_matriz_r_padre = $consulta->getRecursosProgramados($datos_r_matriz[0]['id_padre'], $id_vigencia);


    		$recursos_programados_padre= floatval($datos_matriz_r_padre[0]['recursos_programados'];
    		$recurso_programado = floatval($datos_r_matriz[0]['recursos_programados'];
    		$semaforo_seguimiento_fis= floatval($datos_r_matriz[0]['semaforo_seguimiento_fis'];


    		//operaconines ... 
    		$ponderado_producto= ($recurso_programado*100) /$recursos_programados_padre;
    		$avance_ponderado = $ponderado_producto*$semaforo_seguimiento_fis;



    	}

	 }

?>