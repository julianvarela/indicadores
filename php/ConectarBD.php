<?php
	
	class ConectarBD{
		
		var $_servidor;
		var $_usuario;
		var $_pass;
		var $_bd;

		var $Error;
		var $Errno;

		var $Conexion_ID;
		var $Consulta_ID;

		var $_registros;
		var $_datosRegistros;
		var $_ultimoID;
		var $cantidad_alterados=-1;//cantidad de afectados

		function conectarBD($servidor, $usuario, $pass, $bd){
			$this->_servidor = $servidor;
			$this->_usuario = $usuario;
			$this->_pass = $pass;
			$this->_bd = $bd;

			$this->conectar($servidor, $usuario, $pass, $bd);
			$this->Error = "";
		}

		function conectar($servidor, $usuario, $pass, $bd){
			if ($bd != "")
				$this->_bd = $bd;
			if ($servidor != "")
				$this->_servidor = $servidor;
			if ($usuario != "")
				$this->_usuario = $usuario;
			if ($pass != "")
				$this->_pass = $pass;
			
			@$this->Conexion_ID = mysql_connect($this->_servidor, $this->_usuario, $this->_pass);
			if (!$this->Conexion_ID){
				$this->Error = "Ha fallado la conexión.";
				return 0;
			}

			if (!@mysql_select_db($this->_bd, $this->Conexion_ID)) {
				$this->Error = "Imposible abrir ".$this->_bd;
				return 0;
			}

			return $this->Conexion_ID;
		}

                
                
		function consultaSQL($sql){
			mysql_query('SET NAMES utf8');
			if($sql == ""){
				$this->Error = "No hay una cadena de consulta actualmente";
				return 0;
			}
			
			$this->Error = "";
			$this->Errno = "";
			$this->Consulta_ID = mysql_query($sql, $this->Conexion_ID);
			
			if(!$this->Consulta_ID){
				$this->Errno = mysql_errno();
				$this->Error = mysql_error();
				return;
			}
			
			$this->calcularRegistros();
			$this->_ultimoID = @mysql_insert_id();
			$this->cantidad_alterados= @mysql_affected_rows();
			
			return $this->Consulta_ID;
		}

		
		function calcularRegistros(){
			$this->_registros = @mysql_num_rows($this->Consulta_ID);
			if($this->_registros > 0){
				$x = 0;
				$num_fields = mysql_num_fields($this->Consulta_ID);
				$this->_datosRegistros = array();
				while($row = mysql_fetch_array($this->Consulta_ID)){
				  for($j = 0; $j < $num_fields; $j ++){
				   $name = mysql_field_name($this->Consulta_ID, $j);
				   $this->_datosRegistros[$x][$name] = $row[$name];
				  }
				  $x++;
				}
			}
		}


		function guardarArchivo3($cadena, $tipo, $nombre){
			$f = fopen($nombre, $tipo);
			fwrite($f, $cadena);
			fclose($f);
		}
	}
?>
