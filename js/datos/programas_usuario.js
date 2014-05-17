


        var URL="";
        var datos = leerGET();

        var year=datos['year'];

        if(!year)
        	{
            year="0";
          }
          else{

             $('.my_year').html(year);   
          }


        $("#nav").html(construirNavUsuarioS1(2012,2015,year));


        ///cambiar apariencia login
        if(isLocalStorageAvailable()){
            $(".my_usuario").html(localStorage.getItem("correo"));
        }





        /*
             * Hace el llamado para obtener los datos de la tabla de Avance General  y los carga en su tabla
             */    
            $.ajax({
                        url:URL+'php/adm/subprogramasPermisos.php'
                        ,type:'POST'
                        ,dataType:'json' 
                        ,data:{ opcion:'listas_subprogramas'
                            ,year:year 
                        }
                        ,beforeSend:function(jqXHR,settings){
                            $(".body-preload").css({display:'inline'});
                        }    
                        ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            alert("Se presentó un problema con la conexión a Internet");
                            $(".body-preload").css({display:'none'});
                        }                                        
                        ,success: function(midata,textStatus,jqXHR){
                            
                            console.log(midata);
                              $(".body-preload").css({display:'none'});


                               if(midata && midata.sesion)
                               {
                                $("#listaProgramas").html(construirListasSub(midata.lista,year));
                               } 
                               else{
                                alert("Vuelva a iniciar sesion");
                               }
                              
                          
                          }

                    } );