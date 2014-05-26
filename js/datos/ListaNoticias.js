var URL="";
var DEFECTO_PAS="-@@##@@-";
var year=null;
//$(document).ready(function(){
    
    
 var datos = leerGET();
 var banderaPass=true;
 


   $(document).data("id_noticia","no");
    $(document).data("edicion","no");
 
    

    $("#nav").html(getHtmlNavAdmin(1));


      ///cambiar apariencia login
      if(isLocalStorageAvailable()){
          $(".my_usuario").html(localStorage.getItem("correo"));
    	}

 $("#AgregarEditarNoticias").fadeIn();

$("#mi_form_edicion_noticias").validationEngine();
$("#bton_ingresar_nueva_noticia").click(function(event) {
	/* Act on the event */

	
    if($("#AgregarEditarNoticias").css("display")=="none")
        {
          $("#AgregarEditarNoticias").fadeIn();
        }
        else{
          $("#AgregarEditarNoticias").fadeOut();
        }

        return false;

});


$("#bton_ingresar_nueva_noticia").click(function(){
  limpiarEdicion();

    return false
})



$("#bton_cancelar").click(function(){
  limpiarEdicion();
  $("#AgregarEditarNoticias").fadeOut();
    return false
});

$("#bton_aceptar").click(function(){
  gudardarNoticias();
    return false
});

cargarDatos();
//***************** FUNCIONES ****************/


function cargarDatos(){


  $.ajax({
                        url:URL+'php/adm/manejo_noticias/datosListaNoticias.php'
                        ,type:'POST'
                        ,dataType:'json' 
                        ,data:{  
                            opcion:'cargar'
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
                                 /* if(data.res)
                                  {*/
                                    //recostruir con los nuevos datos
                                    //
                                    //
                                    $("#select_tipo_noticia").html( generarHtmlTipoNoticias(data.tipos) );
                                    generaNoticias(data.lista_noticias);
                           
                                   /*}//valicion de guardado
                                  else{
                                     alert("Error No se guardo los datos");
                                   }  */  

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



/*********************
*  generar las noticias
*  @param midata lista de noticias
******************/
function generaNoticias(lista_noticias){
    
    if(lista_noticias==null)
      return false;

        var datos=new Array();
        var equitas=new Array();
        var conteo=new Array();
        
        var contador=0;
        for(var mi in lista_noticias )
        {
            
            var tipoNoticias=lista_noticias[mi];
             if(tipoNoticias)   
             {   datos[contador]="";
                equitas[contador]=mi;
                
                conteo[contador]=tipoNoticias.length;
                //contador de noticias ...
                for(var i=0; i<tipoNoticias.length; i++)
                {
                   
                    datos[contador]+= generarHtmlNoticia(
                          tipoNoticias[i].titulo,
                          tipoNoticias[i].contenido,
                          tipoNoticias[i].mes+" "+tipoNoticias[i].dia ,
                          tipoNoticias[i].y,
                          (contador+1),

                          tipoNoticias[i].id,
                          tipoNoticias[i].tipos_noticias_id,
                          tipoNoticias[i].fecha_creacion


                      );
                    
                }
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
}



 /***
            * 
            * generar un noticias con html
            * 
            */
           function generarHtmlNoticia(titulo,contenido,mes,miyear,tipo,
            id,
              tipos_noticias_id,
              fecha_creacion
            ){
               
                var html="<article class='media' id='mi_noticia_"+id+"' "
                    +"  data-tipo_noticia='"+tipos_noticias_id+"'"
                    +"  data-tipo_fecha='"+fecha_creacion+"'"
                    +"> "
                    +"    <div class='pull-left thumb-small' style='height: 68px;'> "
                    +"      <span class='fa-stack fa-lg'> "
                    +"        <a  "
                    +"              onclick=cargarEdicionNoticia('"+id+"')" 
                    +"              href='#mi_form_edicion_noticias' "  
                    +"          data-original-title='Editar Noticia' class='btn btn-info btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-pencil'></i></a> "
                    +"        <a  onclick='eliminaNoticia("+id+")'data-original-title='Eliminar Noticia' class='btn btn-danger btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-trash-o'></i></a>     "            
                    +"      </span>  "
                    +"    </div>  "
                    +"    <div class='media-body'>  "
                    +"      <div class='pull-right media-mini text-center text-muted'> "
                    +"        <strong class='h6'>"+mes+"</strong><br>  "
                    +"        <small class='label bg-light'>"+miyear+"</small>  "
                    +"      </div>  "
                    +"      <a href='#'  name='titulo' onclick='return false;' class='h4 text-success'>"+titulo+"</a> "
                    +"      <small name='contenido' class='block'>"+contenido+"</small> "
                    +"    </div>  "
                    +"  </article> "          
                    +"</section>";
               
               
               return html;
               
           }



           /**  genera el html de opcion es *************/
 function generarHtmlTipoNoticias(lista){
  var html="";
  
    if(lista)
    {
      for(var i=0 ; i< lista.length ; i++)
      {

        html+="<option value='"+lista[i].id+"'>"+lista[i].nombre+"</option>";
      }


    }

    return html;

 }



 /********************
 **
 * carga la noticia
 **/
 function cargarEdicionNoticia(miid){

    $fila = $("#mi_noticia_"+miid);

    $(document).data("id_noticia",miid);
    $(document).data("edicion","si");


    $("#edicion_titulo").val($fila.find("[name='titulo']").html());
    $("#edicion_contenido").val( $fila.find("[name='contenido']").html() );
    $("#editor_fecha").val($fila.data('tipo_fecha'));

    $("#select_tipo_noticia option[value='"+$fila.data('tipo_noticia')+"']").attr("selected",true);

  $("#salto_1").click();
  $("#AgregarEditarNoticias").fadeIn();
return false;
 }



 function limpiarEdicion(){
  
    $(document).data("id_noticia","no");
    $(document).data("edicion","no");


    $("#edicion_titulo").val("");
    $("#edicion_contenido").val( "");
    $("#editor_fecha").val("");

 return false;


 }




 function gudardarNoticias(){

  if($("#mi_form_edicion_noticias").validationEngine('validate'))
  {

      var titulo =$("#edicion_titulo").val(); 
      var contenido =$("#edicion_contenido").val();  
      var fecha_creacion =$("#editor_fecha").val(); 
      var tipo_noticias_id =$("#select_tipo_noticia").val(); 
      var opcion='guardar_noticia' ;

      var idNoticia=$(document).data("id_noticia");
      
      if(idNoticia=="no")
      {
       opcion='guardar_noticia' ; 
      }
      else{
        opcion='edicion_noticia' ;
      }



      $.ajax({
                          url:URL+'php/adm/manejo_noticias/datosListaNoticias.php'
                          ,type:'POST'
                          ,dataType:'json' 
                          ,data:{  
                              opcion: opcion,
                              titulo  :       titulo,
                              contenido  :    contenido,
                              fecha_creacion  :  fecha_creacion,
                              tipo_noticias_id  :  tipo_noticias_id,
                              id_noticia : idNoticia

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
                                      //recostruir con los nuevos datos
                                      //
                                      //
                                       generaNoticias(data.lista_noticias);
                                        alert("Se almaceno la noticia");
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
    
  }//fin de la validacion

  return false; 

 }





 function eliminaNoticia(id){

      $.ajax({
                          url:URL+'php/adm/manejo_noticias/datosListaNoticias.php'
                          ,type:'POST'
                          ,dataType:'json' 
                          ,data:{  
                              opcion: "elimina_noticia",                         
                              id_noticia : id

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
                                      //recostruir con los nuevos datos
                                      //
                                      //
                                       generaNoticias(data.lista_noticias);
                                        alert("Se elimino la noticia");
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

return false;

 }