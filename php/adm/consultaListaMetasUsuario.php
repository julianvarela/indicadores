<?php

include_once '../Config.php';
include_once '../ConectarBD.php';

class consultaListaMetasUsuario{



	/****************************
		* retorn los permisos , el tipo , y id
		* 
		* @param int id del usuario 
		* @return array de listado   codigo ,id de lista los programas en general
		* 
		**/
		public function listaMetas($id_padre, $id_vigencia){
	        $sql="(SELECT pdm.codigo as codigo_nivel_pdm
	         , m.id as id
			, pdm.nivel as nivel_pdm
			, m.metas
			,m.linea_base
			,m.valor_esperado_productos
			, se.nombre as dependencia_responsable
			,CONCAT( se.id,'_secretarias') as id_dependencia_secretaria 


			 ,s.nombre sector
			 ,s.id as id_sector

			, sfis.valor_esperado_meta_producto
			, sfis.valor_logrado_meta_producto
			, sfis.ponderado
			, sfis.avance_ponderado
			, sfis.semaforo_seguimiento
			, sfin.recursos_programados
			, sfin.recursos_ejecutados
			,sfin.semaforo_seguimiento_financiero
			,sfin.fecha_corte
			,DATE_FORMAT(sfin.fecha_corte,'%d / %m / %Y') as fecha_corte
			,tm.id tipos_meta_id
			,tm.nombre nombre_tipo_meta
			,fm.id id_fila_matriz


        
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, secretarias se , pdm, sectores s, tipos_meta tm
            WHERE v.id='{$id_vigencia}'  
            	AND m.id_padre='{$id_padre}'          
                AND fm.id_vigencia = v.id
                AND m.id = fm.id_matriz
                AND sfis.id = fm.id_seguimiento_fisico
                AND sfin.id = fm.id_seguimiento_financiero
				AND m.sectores_id =s.id
                AND m.activo = '1'
                AND sfis.activo = '1'
                AND sfin.activo = '1'
                AND c.nombre = 'MET'
                AND c.id = m.clases_id
                AND mu.departamentos_id = de.id
                AND v.municipios_id = mu.id
                AND m.secretarias_id = se.id
                AND m.pdm_id= pdm.id
				AND m.tipos_meta_id =tm.id
                ) 


UNION (
	SELECT pdm.codigo as codigo_nivel_pdm
			,  m.id as id
			, pdm.nivel as nivel_pdm
			, m.metas
			,m.linea_base
			,m.valor_esperado_productos
			, d.nombre as dependencia_responsable
			,CONCAT( d.id,'_dependencias') as id_dependencia_secretaria 

			,s.nombre sector
        	,s.id as id_sector

			, sfis.valor_esperado_meta_producto
			, sfis.valor_logrado_meta_producto
			, sfis.ponderado
			, sfis.avance_ponderado
			, sfis.semaforo_seguimiento
			, sfin.recursos_programados
			, sfin.recursos_ejecutados
			,sfin.semaforo_seguimiento_financiero
			,sfin.fecha_corte
			,DATE_FORMAT(sfin.fecha_corte,'%d / %m / %Y') as fecha_corte
			,tm.id tipos_meta_id
			,tm.nombre nombre_tipo_meta
			,fm.id id_fila_matriz

        
            FROM matriz m, seguimiento_financiero sfin, seguimiento_fisico sfis, vigencias v, fila_matriz fm, clases c, municipios mu, departamentos de, dependencias d , pdm, sectores s, tipos_meta tm
            WHERE v.id='{$id_vigencia}'  
            	AND m.id_padre='{$id_padre}'          
                AND fm.id_vigencia = v.id
                AND m.id = fm.id_matriz
                AND sfis.id = fm.id_seguimiento_fisico
                AND sfin.id = fm.id_seguimiento_financiero
				AND m.sectores_id =s.id
                AND m.activo = '1'
                AND sfis.activo = '1'
                AND sfin.activo = '1'
                AND c.nombre = 'MET'
                AND c.id = m.clases_id
                AND mu.departamentos_id = de.id
                AND v.municipios_id = mu.id
                AND m.dependencias_id = d.id
                AND m.pdm_id= pdm.id
                AND m.pdm_id= pdm.id
				AND m.tipos_meta_id =tm.id)

			ORDER BY id";



	        $conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	        $conexion->consultaSQL($sql);
	        return $conexion->_datosRegistros;

    }








	/*******************
	* retonr ela lsita del dependencia y las secretarias
	**/
    function getListaDependencia_secretarias(){

		$sql="(select concat(id,'_secretarias') as id, nombre
		FROM secretarias
		WHERE activo ='1') 

		UNION

		 (select concat(id,'_dependencias') as id, nombre
		FROM dependencias
		WHERE activo ='1')

		order by nombre";

		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;

    }




    /*******************
	* lista de los sectore actiovs
    */
   public function getListaSectores(){

   	$sql="select id, nombre
			From sectores 
			WHERE activo='1'
			order by nombre";

		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;

 

   } 




   /*******************
   * retorna los recurso y los datos de la matriz
   **/
   public function getRecursosProgramados($id_matriz, $id_vigencia){
   	$sql="SELECT sfin.recursos_programados ,
   				s_f.semaforo_seguimiento as semaforo_seguimiento_fis,
   				fm.id_seguimiento_fisico as   id_seguimiento_fisico,
				fm.id_seguimiento_financiero as   id_seguimiento_financiero,
				fm.id  as  id_fila_matriz,
   			 m.*
		FROM matriz m, fila_matriz fm , seguimiento_financiero sfin, seguimiento_fisico s_f
			WHERE m.activo='1'
			 and sfin.activo='1'
			 and m.id='{$id_matriz}'
			 and fm.id_vigencia='{$id_vigencia}'
			and fm.id_matriz=m.id
			and fm.id_seguimiento_financiero= sfin.id
			AND fm.id_seguimiento_fisico = s_f.id";

		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	       return $conexion->_datosRegistros;



   }
   	


/**************
* retonr -1 si sucedio un error de lo contrario retorna el id del nuevo registro 
*/
   	public function addSeguimientoFisico(
   		$valor_esperado_meta_producto , 
   		$valor_logrado_meta_producto ,
   		$ponderado , 
   		$avance_ponderado , 
   		$semaforo_seguimiento){

   		$sql="insert into seguimiento_fisico
			   (valor_esperado_meta_producto , valor_logrado_meta_producto ,ponderado , avance_ponderado , semaforo_seguimiento ,activo)

		values ('${valor_esperado_meta_producto}' , '{$valor_logrado_meta_producto}' ,'{$ponderado}' , '{$avance_ponderado}' , '{$semaforo_seguimiento}' ,'1')";


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






public function addSeguimientoFinanciero(
	$recursos_programados , 
	$recursos_ejecutados , 
	$semaforo_seguimiento_financiero ,
	$fecha_corte){
	

	$sql="insert into seguimiento_financiero
			   (recursos_programados , recursos_ejecutados , semaforo_seguimiento_financiero ,fecha_corte,activo)
		values ( '{$recursos_programados}' , '{$recursos_ejecutados}' , '{$semaforo_seguimiento_financiero}' ,STR_TO_DATE('{$fecha_corte}','%d/%m/%Y'),'1')";



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





	public function addMatriz(
		$metas,
		$linea_base,
	   	$valor_esperado_productos,	
	   	$usuarios_id,

	   	$clases_id,
	   	$sectores_id,
	   	$dependencias_id,
	   	$id_padre,
	   	$pdm_id,
	   	$tipos_meta_id,
	   	$secretarias_id){

		$sql="insert into matriz
	   (metas,linea_base,
	   	valor_esperado_productos,	activo,
	   	fecha_creacion,usuarios_id,

	   	clases_id,sectores_id,
	   	dependencias_id,id_padre,
	   	pdm_id,tipos_meta_id,
	   	secretarias_id)

values (\"{$metas}\",'{$linea_base}',
	'{$valor_esperado_productos}','1',
	NOW(),	'{$usuarios_id}',

	   	'{$clases_id}','{$sectores_id}',
	   	{$dependencias_id}, '{$id_padre}',
	   	'{$pdm_id}','{$tipos_meta_id}',
	   	{$secretarias_id})";


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





	public function addFilaMatriz(
		$id_matriz, 
		$id_seguimiento_fisico, 
		$id_seguimiento_financiero,
		$id_vigencia){


		$sql="insert into fila_matriz
				(id_matriz, id_seguimiento_fisico, id_seguimiento_financiero,id_vigencia,fecha_modificacion)

				values ('{$id_matriz}', '{$id_seguimiento_fisico}', '{$id_seguimiento_financiero}','{$id_vigencia}',NOW())";


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





public function actualizSeguimientoFinanciero(
	$_id,
	$recursos_programados , 
	$recursos_ejecutados , 
	$semaforo_seguimiento_financiero ,
	$fecha_corte){
	

	$sql="UPDATE  seguimiento_financiero
			   SET recursos_programados = '{$recursos_programados}', 
				   	recursos_ejecutados = '{$recursos_ejecutados}', 
				   	semaforo_seguimiento_financiero = '{$semaforo_seguimiento_financiero}',
				   	fecha_corte= STR_TO_DATE('{$fecha_corte}','%d/%m/%Y')
			WHERE id='{$_id}'";



		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
	      		{

	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }

	}




	/**************
* retonr -1 si sucedio un error de lo contrario retorna el id del nuevo registro 
*/
   	public function actualizaSeguimientoFisico(
   		$_id,
   		$valor_esperado_meta_producto , 
   		$valor_logrado_meta_producto ,
   		$ponderado , 
   		$avance_ponderado , 
   		$semaforo_seguimiento){

   		$sql="UPDATE  seguimiento_fisico	
   				SET valor_esperado_meta_producto= '{$valor_esperado_meta_producto}' 
	   				, valor_logrado_meta_producto = '{$valor_logrado_meta_producto}' 
	   				,ponderado  = '{$ponderado}'
	   				, avance_ponderado = '{$avance_ponderado}'
	   				, semaforo_seguimiento = '{$semaforo_seguimiento}' 
   				WHERE id='{$_id}'";


		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
	      		{
	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }


   	}





public function actualizarMatriz(
		$_id,
		$metas,
		$linea_base,
	   	$valor_esperado_productos,	
	   
	   	$clases_id,
	   	$sectores_id,
	   	$dependencias_id,
	 
	   	$pdm_id,
	   	$tipos_meta_id,
	   	$secretarias_id){

		$sql="UPDATE  matriz
		   SET 
		   		metas = \"{$metas}\"
		   		,linea_base = '{$linea_base}' 
		   		,valor_esperado_productos = '{$valor_esperado_productos}'
		   		
		   		,clases_id = '{$clases_id}'
		   		,sectores_id = '{$sectores_id}'
		   		,dependencias_id = $dependencias_id 
		   		
		   	
		   		,pdm_id = '{$pdm_id}'
		   		,tipos_meta_id = '{$tipos_meta_id}'
		   		,secretarias_id =  $secretarias_id 

			WHERE id='{$_id}'";


		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    
   

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
	      		{
	      			
	      			$this->guardarError($conexion,$sql);
	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }


	}





	public function actualizarFilaMatriz($_id)
	{


		$sql="UPDATE fila_matriz
			SET fecha_modificacion=NOW()
			WHERE id='{$_id}'";

		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    
   

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
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








	/**************
* retonr -1 si sucedio un error de lo contrario retorna el id del nuevo registro 
*/
   	public function actualizaSemaforoSegFis(
   		$_id,
   		$semaforo_seguimiento){

   		$sql="UPDATE  seguimiento_fisico	
   				SET  semaforo_seguimiento = '{$semaforo_seguimiento}' 
   				WHERE id='{$_id}'";


		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
	      		{
	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }


   	}




   	public function actualizSumaRecursosSeguimientoFinanciero(
		$_id,
		$recursos_programados , 
		$recursos_ejecutados , 
		$semaforo_seguimiento_financiero ){
		

		$sql="UPDATE  seguimiento_financiero
				   SET recursos_programados = '{$recursos_programados}', 
					   	recursos_ejecutados = '{$recursos_ejecutados}', 
					   	semaforo_seguimiento_financiero = '{$semaforo_seguimiento_financiero}'
					   	
				WHERE id='{$_id}'";



			$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
		    $conexion->consultaSQL($sql);
		    

		      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
		      		{

		      			
		      			$this->guardarError($conexion,$sql);

		      			return -1;
		      		}
		      else{

		      	return $conexion->_ultimoID;
		      }

	}




	public function getMatriz($_idMatriz){


		$sql="SELECT * 
			FROM matriz
			WHERE id='{$_idMatriz}'
				";
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
	*  SE UTILIA PARA ACTUALIZ DE PADRE PASO 2
	*/
	public function actualizaPoderado_SeguimientoFis($id_s_fis, $ponderado, $avance_ponderado
		)
	{

		$sql="UPDATE seguimiento_fisico
			SET  ponderado='{$ponderado}'
				, avance_ponderado='{$avance_ponderado}'
				WHERE id='{$id_s_fis}' " ;



		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
	      		{

	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }

	}





	public function actualizarActivoSegFis($_id_fisico, $activo)
	{

		$sql="UPDATE seguimiento_fisico
			SET  activo='{$activo}'				
				WHERE id='{$_id_fisico}'";

		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
	      		{

	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }

	}




public function actualizarActivoMatriz($_id_matriz, $activo)
	{

		$sql="UPDATE matriz
			SET activo='{$activo}'				
				WHERE id='{$_id_matriz}' ";

		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	    

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
	      		{

	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }


	}




public function actualizarActivoSeguimientoFinaciero($_id_finaciero, $activo)
	{

		$sql="UPDATE seguimiento_financiero
			SET activo='{$activo}'				
				WHERE id='{$_id_finaciero}' ";

			

		$conexion = new ConectarBD(SERVIDOR, USUARIO, PASS, BD);
	    $conexion->consultaSQL($sql);
	   

	      if($conexion->Error!="" || $conexion->cantidad_alterados<=0)
	      		{

	      			
	      			$this->guardarError($conexion,$sql);

	      			return -1;
	      		}
	      else{

	      	return $conexion->_ultimoID;
	      }


	}



}




?>