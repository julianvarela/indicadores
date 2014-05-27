var URL="";
var year=null;
//$(document).ready(function(){
    
    
 var datos = leerGET();
 var banderaPass=true;
 var year=datos['year'];


var id_clase=null;
var nombre_clase=null;

  $('.my_year').html(year); 
      
 


   $(document).data("id_programa","no");
    $(document).data("edicion","no");
    $(document).data("id_matriz","no");
    $(document).data("id_pdm","no");
 
    
      ///cambiar apariencia login
      if(isLocalStorageAvailable()){
          $(".my_usuario").html(localStorage.getItem("correo"));
    	}


   $("#nav").html(getHtmlNavAdmin(2));




// MUESTRA INGRESAR ...
      $("#bton_guardar_programa").click(function(){

		clear_edicion();
        
        if($("#AgregarEditarMeta").css("display")=="none")
        {
            $("#AgregarEditarMeta").fadeIn();

        }
        else{
           $("#AgregarEditarMeta").fadeOut();   
           
        }

         
      });



      $("#bton_cancelar").click(function(){
      	clear_edicion();
      })

       $("#select_my_table").change(function(){
              var particion= parseInt($(this).val());   
                        
                   irPaginaTable(1,particion,"#TablaAvanceProgramas");


              
        });
   





cargarListaProgramas();

$("#select_clases").change(function(){

	 id_clase= $(this).val();
	 nombre_clase= $("#select_clases option[value='"+id_clase+"']:selected").text();

	 cargaDatos();

});


$("#bton_guardar").click(function(){
	guardarEditarProg();
});


$("#edicon_form1_prg").validationEngine();


   /************* funciones *********/



   function cargarListaProgramas(){

 	$.ajax({
            url:URL+'php/adm/manejo_programas/datosListaProgramas.php'
            ,type:'POST'
            ,dataType:'json'  
            ,data:{ 
                    opcion:'cargar',
                    

                }
            ,beforeSend:function(jqXHR,settings){
                $(".body-preload").css({display:'inline'});
            }    
            ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Se presentó un problema con la conexión a Internet");
                 $(".body-preload").css({display:'none'});
            }                                        
            ,success: function(data,textStatus,jqXHR){

                $(".body-preload").css({display:'none'});
                 if(data && data.sesion)
	              {
	                if(data.usuario)
	                  {
	                    /*if(data.res)
	                    {*/
	                      //recostruir con los nuevos datos
	                      //
	                      //
	                       $("#select_clases").html(getHtmlOption(data.lista));
	                       $("#select_clases").change();
	                    /*    alert("Se almaceno la noticia");
	                     }//valicion de guardado
	                     else{
	                       alert("Error No se guardo los datos");
	                     }*/    

	                   }//valicon de tipo usuairo
	                  else{

	                    alert("No tiene acceso su usuario");
	                    }
	                
	              }//if valicion de secion
	              else{

	                   alert("Su sesion expiro, inicie de nuevo");
	                }
	    
            }
          });                          
      


   }




  /********
  *** generar opcion sele
  ****/
  function getHtmlOption(lista){

	var html="";
  	
  	if(lista)
  		{

  			for(var i=0; i< lista.length ; i++)
  			{
  				html+="<option value='"+lista[i].id+"'>"+lista[i].nombre+"</option>"

  			}
  		}
 return html;
  }




  function cargaDatos(){

  	$("#edicion_pertenece").html("");
	clear_edicion();

  	 	$.ajax({
            url:URL+'php/adm/manejo_programas/datosListaProgramas.php'
            ,type:'POST'
            ,dataType:'json'  
            ,data:{ 
                    opcion:'datos_edicion',
                    id_clase:id_clase,
                    nombre_clase : nombre_clase,
                }
            ,beforeSend:function(jqXHR,settings){
                $(".body-preload").css({display:'inline'});
            }    
            ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Se presentó un problema con la conexión a Internet");
                 $(".body-preload").css({display:'none'});
            }                                        
            ,success: function(data,textStatus,jqXHR){

                $(".body-preload").css({display:'none'});
                 if(data && data.sesion)
	              {
	                if(data.usuario)
	                  {
	                    /*if(data.res)
	                    {*/
	                      


	                      $("#edicion_pertenece").html(getHtmlOption(data.lista_clase_padre));
	                    
	                      $("#TablaAvanceProgramas").html(getHtmlTableListaP(data.lista_datos));

	                      $("#select_my_table").change();
	                    /*    alert("Se almaceno la noticia");
	                     }//valicion de guardado
	                     else{
	                       alert("Error No se guardo los datos");
	                     }*/    

	                   }//valicon de tipo usuairo
	                  else{

	                    alert("No tiene acceso su usuario");
	                    }
	                
	              }//if valicion de secion
	              else{

	                   alert("Su sesion expiro, inicie de nuevo");
	                }
	    
            }
          });                          

  }




  /************** genera  html de la tabal ****************/
  function getHtmlTableListaP(lista){
var html="";

	if(lista)
	{
		for(var i=0 ; i< lista.length ; i++)
			{

				var obj= lista[i];

				html+="<tr class='datos-tabla'  data-id='"+obj.id+"' id='prog_edit_"+obj.id+"_"+obj.id_matriz+"' "
					+"  data-id_matriz='"+obj.id_matriz+"' "
					+"  data-id_clase='"+obj.id_clase+"' "
					+"  data-id_padre='"+obj.id_padre+"' "
					+"> "
                     +"     <td> "
                     +"         <a   "
                     +"					onclick=\"editar_programa(\'prog_edit_"+obj.id+"_"+obj.id_matriz+"\')\" "
                     +"					data-original-title='Editar Meta' class='btn btn-info btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-pencil'></i></a><hr /> "
                     +"         <a    "
                     +" 				onclick='eliminarProgram("+obj.id+","+obj.id_matriz+","+obj.id_clase+")' "
                     +"				data-original-title='Eliminar Meta' class='btn btn-danger btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-trash-o'></i></a> "
                     +"     </td> "

                     +"     <td name='clase' >"+obj.nombre_clase+"</td> "

                     +"     <td name='codigo'>"+(obj.codigo==null? "":obj.codigo)+"</td> "

                     +"      <td name='nivel'>"+(obj.nivel==null?"":obj.nivel)+"</td>  "                         
                     +" </tr>";

  
			}

	}
   return html;


  }


  /*** carga los datos para la edcion***/
  function editar_programa(miid)
  {


  	$fila = $("#"+miid);

    $(document).data("edicion","si");
    $(document).data("id_matriz", $fila.data("id_matriz"));
    $(document).data("id_pdm", $fila.data("id"));
 

    $("#edicion_pertenece option[value='"+ $fila.data("id_padre")+"']").attr("selected",true);

    $("#edicion_codigo").val($fila.find("[name='codigo']").html());
    $("#edicion_nivel").val($fila.find("[name='nivel']").html());

      $("#AgregarEditarMeta").fadeIn();
      $("#saltar_1").click();
  }



  function clear_edicion(){

    $(document).data("edicion","no");
    $(document).data("id_matriz", "$.now();");
    $(document).data("id_pdm", "no");
 

  
    $("#edicion_codigo").val("");
    $("#edicion_nivel").val("");
  }




  function guardarEditarProg(){

 if($("#edicon_form1_prg").validationEngine('validate'))
	{
	  	var id_padre= $("#edicion_pertenece").val();
	  	var codigo =  $("#edicion_codigo").val();
	  	var nivel =  $("#edicion_nivel").val();
		var opcion ='guardar_registro';
		var id_matriz = $(document).data("id_matriz");
		var id_pdm = $(document).data("id_pdm");

		if($(document).data("id_matriz")=='no')
		{
			opcion ='guardar_registro';
		}
		else{
			
			opcion="editar_registro";

		}

	  	$.ajax({
	            url:URL+'php/adm/manejo_programas/datosListaProgramas.php'
	            ,type:'POST'
	            ,dataType:'json'  
	            ,data:{ 
	                    opcion: opcion,
	                    id_padre: id_padre,
						codigo: codigo ,
						nivel: nivel ,
						opcion: opcion ,
						id_matriz: id_matriz,
						id_pdm: id_pdm,
						id_clase : id_clase

	                    

	                }
	            ,beforeSend:function(jqXHR,settings){
	                $(".body-preload").css({display:'inline'});
	            }    
	            ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                alert("Se presentó un problema con la conexión a Internet");
	                 $(".body-preload").css({display:'none'});
	            }                                        
	            ,success: function(data,textStatus,jqXHR){

	                $(".body-preload").css({display:'none'});
	                 if(data && data.sesion)
		              {
		                if(data.usuario)
		                  {
		                    if(data.res)
		                    {
		                      
		                      //
		                      //recostruir con los nuevos datos
		                      //
		                      
		                      $("#TablaAvanceProgramas").html(getHtmlTableListaP(data.lista_datos));

		                      $("#select_my_table").change();
		                       alert("Se almaceno el registro");

		                     }//valicion de guardado
		                     else{
		                       alert("Error No se guardo los datos");
		                     }   

		                   }//valicon de tipo usuairo
		                  else{

		                    alert("No tiene acceso su usuario");
		                    }
		                
		              }//if valicion de secion
		              else{

		                   alert("Su sesion expiro, inicie de nuevo");
		                }
		    
	            }
	          });                          
	      
	}//fin de valicion

  }




  function eliminarProgram(id_pdm,
			id_matriz,
			id_clase){

	  	$.ajax({
            url:URL+'php/adm/manejo_programas/datosListaProgramas.php'
            ,type:'POST'
            ,dataType:'json'  
            ,data:{ 
                    opcion: 'eliminar_registro',
                   id_pdm: id_pdm,
                   id_matriz : id_matriz,
                   id_clase : id_clase 


                    

                }
            ,beforeSend:function(jqXHR,settings){
                $(".body-preload").css({display:'inline'});
            }    
            ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Se presentó un problema con la conexión a Internet");
                 $(".body-preload").css({display:'none'});
            }                                        
            ,success: function(data,textStatus,jqXHR){

                $(".body-preload").css({display:'none'});
                 if(data && data.sesion)
	              {
	                if(data.usuario)
	                  {
	                    if(data.res)
	                    {
	                      
	                      //
	                      //recostruir con los nuevos datos
	                      //
	                      
	                      $("#TablaAvanceProgramas").html(getHtmlTableListaP(data.lista_datos));

	                      $("#select_my_table").change();
	                       alert("Se elimino el registro");

	                     }//valicion de guardado
	                     else{
	                       alert("Error No se guardo los datos");
	                     }   

	                   }//valicon de tipo usuairo
	                  else{

	                    alert("No tiene acceso su usuario");
	                    }
	                
	              }//if valicion de secion
	              else{

	                   alert("Su sesion expiro, inicie de nuevo");
	                }
	    
            }
          });                          
      


  }