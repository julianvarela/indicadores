
    var URL="";
    var year=null;

    var datos = leerGET();

    year=datos['year'];
     
    if(year){   
      
        $('.my_year').html(year);
        $("#nav").html(construirNavUsuario(2012,2015,year));
      

                ///cambiar apariencia login
                if(isLocalStorageAvailable()){
                    $(".my_usuario").html(localStorage.getItem("correo"));
                }
                         


      ///carga la lista 
            $.ajax({
                    url:'php/datosSectoresBasicos.php'
                    ,type:'POST'
                    ,dataType:'json'  
                    ,data:{ 
                            year: year,
                            opcion:'datos_creacion' 
                        }
                    ,beforeSend:function(jqXHR,settings){
                        $(".body-preload").css({display:'inline'});
                    }    
                    ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Se presentó un problema con la conexión a Internet")
                    }                                        
                    ,success: function(data,textStatus,jqXHR){

                            $(".body-preload").css({display:'none'});
                        
                        
                            if(data && data.datos ){
                                
                                var htmlOpciones="";
                                
                                /// genera opciones select sectores basicos
                                htmlOpciones=generarHtmlOpcion(data.sectores);
                                $("#selectSectores").html(htmlOpciones);

                                $("#selectSectores").change();
                            }
                            
                            
                            if(data && data.datos ){
                                
                                var htmlOpciones="";
                                
                                /// genera opciones select dependencias
                                htmlOpciones=generarHtmlOpcion(data.dependencias);
                                $("#selectDependencias").html(htmlOpciones);

                                $("#selectSectores").change();
                            }                            
                        
                    }
                    
        });
                    
   
        /*
         *  selecciona el Sector Basico
         */
	$("#selectSectorBasico").change(function(){          
                datosSectorBasico();
        });
        
//});

      }else{          
          alert("URL Incorrecta");    
      }
      