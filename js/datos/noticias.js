
        var URL="";
        var year=null;

        $("#nav").html(construirNav(2012,2015,"0"));


        ///cambiar apariencia login
        if(isLocalStorageAvailable()){
            $(".my_usuario").html(localStorage.getItem("correo"));
        }


             /*
             * Hace el llamado para obtener los datos de la tabla de Avance General  y los carga en su tabla
             */    
            $.ajax({
                        url:URL+'php/datosNoticias.php'
                        ,type:'POST'
                        ,dataType:'json' 
                        ,data:{  }
                        ,beforeSend:function(jqXHR,settings){
                            $(".body-preload").css({display:'inline'});
                        }    
                        ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            alert("Se presentó un problema con la conexión a Internet");
                        }                                        
                        ,success: function(midata,textStatus,jqXHR){
                            
                            $(".body-preload").css({display:'none'});
                            
                            console.log(midata);
                            var datos=new Array();
                            var equitas=new Array();
                            var conteo=new Array();
                            
                            var contador=0;
                            for(var mi in midata.datos )
                            {
                                
                                var tipoNoticias=midata.datos[mi];
                                
                                datos[contador]="";
                                equitas[contador]=mi;
                                
                                conteo[contador]=tipoNoticias.length;
                                //contador de noticias ...
                                for(var i=0; i<tipoNoticias.length; i++)
                                {
                                   
                                    datos[contador]+= generarHtmlNoticia(tipoNoticias[i].titulo,tipoNoticias[i].contenido,tipoNoticias[i].mes+" "+tipoNoticias[i].dia ,tipoNoticias[i].y,(contador+1));
                                    
                                }
                                
                                
                                
                                contador++;
                            }
                            
                            
                            if(datos.length>0)
                            {
                                
                                $("#contenido_institucional").html(datos[0]);
                                $("#contenido_institucional_eq").html(equitas[0]);
                                $("#contenido_institucional_num").html(conteo[0]);
                            }
                            if(datos.length>1)
                            {
                                
                                $("#contenido_comercial").html(datos[1]);
                                $("#contenido_comercial_eq").html(equitas[1]);
                                 $("#contenido_comercial_num").html(conteo[1]);
                            } 
                            
                            
                            
                            
                            console.log(datos);
                            
                        }
                
                  });
                  
                  
                  
                  
           /***
            * genera el HTML de las noticias            * 
            */
           function generarHtmlNoticia(titulo,contenido,mes,miyear,tipo){
               
               var html=" <div class='line pull-in'></div> "
                   +" <article class='media'> "
                   +"    <div class='pull-left thumb-small'> "
                   +"      <span class='fa-stack fa-lg'> "
                   +"        <i class='fa fa-circle fa-stack-2x "+(tipo%2==0?" text-warning ":" text-success ")+" '></i> "
                   +"        <i class='fa fa-quote-left fa-stack-1x text-white'></i> "
                   +"      </span> "
                   +"    </div> "
                   +"    <div class='media-body'> "
                   +"      <div class='pull-right media-mini text-center text-muted'> "
                   +"        <strong class='h6'>"+mes+"</strong><br> "
                   +"        <small class='label bg-light'>"+miyear+"</small> "
                   +"      </div> "
                   +"      <a href='#' class='h4 text-success'>"+titulo+"</a> "
                   +"      <small class='block'>"+contenido+"</small> "
                   +"    </div> "
                   +"  </article>";               
               
               return html;
               
           }
           
           
           /***
            * genera el HTML de las noticias para ser editadas
            */
           function generarHtmlNoticiaAdmin(titulo,contenido,mes,miyear,tipo){
               
               var html=" <div class='line pull-in'></div> "
                   +" <article class='media'> "
                   +"    <div class='pull-left thumb-small'> "
                   +"      <span class='fa-stack fa-lg'> "
                   +"        <i class='fa fa-circle fa-stack-2x "+(tipo%2==0?" text-warning ":" text-success ")+" '></i> "
                   +"        <i class='fa fa-quote-left fa-stack-1x text-white'></i> "
                   +"      </span> "
                   +"    </div> "
                   +"    <div class='media-body'> "
                   +"      <div class='pull-right media-mini text-center text-muted'> "
                   +"        <strong class='h6'>"+mes+"</strong><br> "
                   +"        <small class='label bg-light'>"+miyear+"</small> "
                   +"      </div> "
                   +"      <a href='#' class='h4 text-success'>"+titulo+"</a> "
                   +"      <small class='block'>"+contenido+"</small> "
                   +"    </div> "
                   +"  </article>";               
               
               return html;
               
           }           