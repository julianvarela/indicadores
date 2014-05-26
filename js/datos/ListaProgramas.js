var URL="";
var year=null;
//$(document).ready(function(){
    
    
 var datos = leerGET();
 var banderaPass=true;
 var year=datos['year'];


  $('.my_year').html(year); 
      
 


   $(document).data("id_programa","no");
    $(document).data("edicion","no");
 
    
      ///cambiar apariencia login
      if(isLocalStorageAvailable()){
          $(".my_usuario").html(localStorage.getItem("correo"));
    	}


   $("#nav").html(getHtmlNavAdmin(2));




// MUESTRA INGRESAR ...
      $("#bton_guardar_programa").click(function(){


        if($("#AgregarEditarMeta").css("display")=="none")
        {
            $("#AgregarEditarMeta").fadeIn();

        }
        else{
           $("#AgregarEditarMeta").fadeOut();   
           
        }

         
      });




       $("#select_my_table").change(function(){
              var particion= parseInt($(this).val());   
                        
                   irPaginaTable(1,particion,"#TablaAvanceProgramas");
              
        });
   


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
	                       generaNoticias(data.lista_noticias);
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