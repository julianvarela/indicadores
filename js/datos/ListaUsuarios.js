var URL="";
var DEFECTO_PAS="-@@##@@-";
var year=null;
//$(document).ready(function(){
    
    
 var datos = leerGET();
 var banderaPass=true;
 
 
    
      ///cambiar apariencia login
      if(isLocalStorageAvailable()){
          $(".my_usuario").html(localStorage.getItem("correo"));
    	}

 	cargarDatos1();

   $("#tabla_edicion_1").validationEngine( {promptPosition : "bottomLeft"});

   $(document).data("edicion","nuevo");
   $(document).data("id_usuario_edicion","no");



   $("#nav").html(getHtmlNavAdmin(3));



$("#bton_permisos_add").click(function(event) {
  /* Act on the event */
  
    if($("#listaProgramas").css("display")=="none")
        {
          $("#listaProgramas").fadeIn();
        }
        else{
          $("#listaProgramas").fadeOut();
        }

});





	$("#AgregarEditarUsuario").fadeOut();
 	$("#bton_ingresar_usuarios").click(function() {

        clearEdicionUsuario();

 			if($("#AgregarEditarUsuario").css("display")=="none")
	 			{
	 				$("#AgregarEditarUsuario").fadeIn();
	 			}
	 			else{
	 				$("#AgregarEditarUsuario").fadeOut();
	 			}
 	});


  ///bton cancelar
  $("#bton_cancelar_usuario").click(function(){
        clearEdicionUsuario();
        $("#AgregarEditarUsuario").fadeOut();
      });



    $("#select_my_table").change(function(){
              var particion= parseInt($(this).val());   
                        
                   irPaginaTable(1,particion,"#TablaAvanceProgramas");
           });

//
//EDICON 
//

$("#bton_guardado_usuario").click(function(){
    guardarUsuario();
});


$("#edicion_pass1").change(function(){
  $("#edicion_pass2").val("");
});


$("#edicion_pass2").change(function(){
   if($("#edicion_pass1").val()== $("#edicion_pass2").val())
   {
    banderaPass=true;
   }
   else{
    alert("No coincide la contraseña");
    banderaPass= false;

   }
});

/********************************************************************/
 	/**************
 	*/
 	function  cargarDatos1(){

 		       $.ajax({
                    url:URL+'php/adm/manejo_usuarios/datosListaUsuarios.php'
                    ,type:'POST'
                    ,dataType:'json'  
                    ,data:{ 
                            opcion:'lista_usuarios',
                            
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
                                    $("#listaProgramas").html(generarHtmlSubProgramasAll(data.lista_programas)) ;                                  
                                
                             $("#selectTipoUsuario").html( htmlTipoUsuario(data.permisos));
                         			$("#TablaAvanceProgramas").html(crearTablaUsuarios(data.lista));
                               $("#select_my_table").change();
                               $("#selectTipoUsuario").change();
                         		}
                         
                         		else{
  								              alert("Verifique el tipo de usuario ");

                         		}


                        
                        }
                        else{

                          alert("Su sesión expiro, inicie de nuevo");
                        }

                         $(".body-preload").css({display:'none'});
                      
                            
                    }
                  });                          
      




 	}




 	/************
 	*construye la tabla
 	**/
 	function crearTablaUsuarios(lista){
 		var html="";

 			for(var i=0; i< lista.length ; i++)
 			{
 				var obj=lista[i];


 				html+="<tr class='datos-tabla' data-tipo='"+obj.id_tipo+"' id='mifila_"+i+"' "
                  +"  data-idactivo='"+obj.activo+"' "
                  +"  data-id_usuario_edicion='"+obj.id+"' "
                  +"  data-mis_permisos='"+obj.mis_permisos+"' "
                  +" > "
                    +"      <td> "
                    +"         <a  "
                    +"              onclick=\"cargarMiEdicion('mifila_"+i+"' )\" " 
                    +"            data-original-title='Editar Usuario' class='btn btn-info btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-pencil'></i></a><hr />  "
                  //  +"         <a data-original-title='Eliminar Usuario' class='btn btn-danger btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-trash-o'></i></a> "
                    +"      </td>                         "
                    +"      <td name='nombre'>"+(obj.nombre==null?"":obj.nombre)+"</td> "
                    +"      <td name='usuario'>"+(obj.usuario==null?"": obj.usuario)+"</td> "
                    +"     <td  name='correo'>"+(obj.correo==null? "": obj.correo)+"</td> "
                    +"      <td >"+(obj.activo==1? "Activo":"Inactivo")+"</td> "
                    +"      <td name='telefono'>"+(obj.telefonos==null? "":obj.telefonos)+"</td>  "
                    +"      <td name='oficina'>"+(obj.oficina_principal==null? "":obj.oficina_principal)+"</td> "
                    +"      <td >"+(obj.nombre_tipo==null? "":obj.nombre_tipo)+"</td> "
                    +"      <td >"+(obj.fecha_creacion==null? "":obj.fecha_creacion)+"</td> "
                    +"  </tr> ";

 			}

 		return html;
 	}





  /********************
  * generar el html de select tipo de usuario
  ***************/
  function htmlTipoUsuario(lista){
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





  function cargarMiEdicion(elemento){
  

      $("#listaProgramas [type='checkbox']").attr("checked",false);

      $fila = $("#"+elemento);
         $(document).data("edicion","edicion");
         $(document).data("id_usuario_edicion", $fila.data("id_usuario_edicion") );
         $(document).data("mis_permisos",$fila.data("mis_permisos")); 


 
         //permisos
         var mis_permisos=$fila.data("mis_permisos");
         mis_permisos= mis_permisos.split(",");


         for(var i=0;i< mis_permisos.length ; i++)
         {
          try{
            $("[data-mi_subprograma='"+mis_permisos[i]+"'] [name='checkbox']")[0].checked=true;
              }catch(e){}

 
         }



      $("#edicion_nombre").val($fila.find("[name='nombre']").html());
      $("#edicion_usuario").val($fila.find("[name='usuario']").html());
      $("#edicon_correo").val($fila.find("[name='correo']").html());
      $("#edicion_telefono").val($fila.find("[name='telefono']").html());
      $("#edicion_oficina").val($fila.find("[name='oficina']").html());
     

      $("#selectTipoUsuario option[value="+ $fila.data("id_tipo") +"]").attr("selected",true);
      $("#edicion_estado option[value="+ $fila.data("activo") +"]").attr("selected",true);
      
      $("#ir_edicion").click();
      $("#AgregarEditarUsuario").fadeIn();

      $("#selectTipoUsuario").change();


    return false;

  }




  /**********************
  **
  ** validacion en la eidicon  
  **
  *****************************/
  function validacionEdicion(){

    //validciona de las basicas ediciones
    if( $("#tabla_edicion_1").validationEngine())
    {

      if($("#edicion_pass1").val() == $("#edicion_pass2").val())
      {
          if($(document).data("edicion")=="nuevo" && 
              ( $("#edicion_pass1").val()==DEFECTO_PAS
                || $("#edicion_pass1").val()=="")
            )
          {
            alert("Ingrese una contraseña ");
           return false;
          }


          return true;


      }
      else{

        alert("No coinciden las contraseñas");
        return false;
      }

    }

    return false;
  } 




  /********************
  * guardar el nuevo usuairo
  */
 
  function guardarUsuario(){

    if(validacionEdicion())
    {

      var nombre =$("#edicion_nombre").val();
      var usuario=$("#edicion_usuario").val();
      var pass =$("#edicion_pass2").val();
      var activo =$("#edicion_estado").val();
     
      var correo =$("#edicon_correo").val();
      var telefonos =$("#edicion_telefono").val();
      var oficina_principal =$("#edicion_oficina").val();
      var tipo_usuarios_id =$("#selectTipoUsuario").val();
      var id_usuario = $(document).data("id_usuario_edicion");
      var opcion='guardar_usuario';

        if(id_usuario=="no")
        {
          opcion='guardar_usuario';
        }
        else{
          opcion='editar_usuario';
        }

      $.ajax({
                    url:URL+'php/adm/manejo_usuarios/datosListaUsuarios.php'
                    ,type:'POST'
                    ,dataType:'json'  
                    ,data:{ 
                            opcion:  opcion,
                            nombre  : nombre ,
                            usuario : usuario ,
                            pass : pass ,
                            activo : activo ,
                            correo : correo ,
                            telefonos : telefonos ,
                            oficina_principal : oficina_principal ,
                            tipo_usuarios_id  :  tipo_usuarios_id ,

                            mis_permisos : getStringPermisos(),
                            id_usuario : id_usuario

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

                                      $("#TablaAvanceProgramas").html(crearTablaUsuarios(data.lista));
                                      $("#select_my_table").change();
                                      alert("Guardado Usuario");

                                   }//valicion de guardado
                                  else{
                                     alert("Error No se guardo los datos");
                                   }    

                                 }//valicon de tipo usuairo
                                else{

                                  alert("No tiene acceso su usuario");
                                  location.href="index.html";
                                }
                              
                            }//if valicion de secion
                            else{

                                 alert("Su sesion expiro, inicie de nuevo");
                                 location.href="index.html";
                              }
                 }
          });
  
    }


    
  }



/**************************
* 
*  general el html de subprgoramas 
**********************/
  function generarHtmlSubProgramasAll(lista)
  {
    var html="";

    $.each(lista,function(index, obj){

        html+="<a class='list-group-item accordion-toggle bg bg-light' data-toggle='collapse' href='#subprogramas_mi_lista"+obj.id+"'> "
            +"                <i class='fa fa-chevron-right'></i> "
            +"                <span class='badge bg-info'>"+((obj.lista && obj.lista.length)? obj.lista.length:"0" )+"</span> "
            +"                <i class='fa fa-fw fa-star'></i>"+obj.codigo+" "+obj.nombre
            +"              </a> ";

            html+="<div id='subprogramas_mi_lista"+obj.id+"' class='panel-collapse in mis_subprogramas'>   "                  
                +"    <div class='table-responsive' style='overflow-x:auto'> "
                +"                     <table class='table table-striped m-b-none' data-ride='datatables'> "
                +"                      <thead> "
                +"      <th width='5%'><input type='checkbox'  onclick=''></th>    "
                +"                          <th>Subprograma</th> "
                +"                        </tr> "
                +"                      </thead> "
                +"                        <tbody> "
                +" ";

            if(obj.lista)
            {

              $.each(obj.lista, function(mi_index, mi_obj){
                  html+="<tr  data-mi_subprograma='"+mi_obj.id+"'  >"
                        +"                    <td> "
                        +"                        <input type='checkbox' data-id_subprograma='"+mi_obj.id+"'   name='checkbox'  onclick=''> "
                        +"                    </td>     " 
                        +"                    <td name='nombre' > "
                        +"                         "+mi_obj.codigo +" " + mi_obj.nombre
                        +"                    </td> "
                        +"                  </tr>";

                });
            }

            html+="                     </tbody> "
                  +"                  </table>  "
                  +"              </div> "
                  +"            </div>"

      });

    return html;
  }




/****************
** genera la la cadena de permisos 
**/
function getStringPermisos(){

  var lista=$("[data-mi_subprograma] [name='checkbox']:checked");
  var salida="";

  for(var i=0 ; i< lista.length ; i++)
  {

    salida+= $(lista[i]).data("id_subprograma")+",";    
  }

  if(salida.length>0)
  {
    salida= salida.substring(0, salida.length-1);
  }

  return salida;

}



/********************
* limipia la edicon para un nuevo usuario
**/

function clearEdicionUsuario(){

      var lista=$("#listaProgramas [type='checkbox']").attr("checked",false);
      for(var i=0; i< lista.length ; i++)
        {
          try{
            lista[i].checked=false;
          }catch(e){}
        }

         $(document).data("edicion","nuevo");
         $(document).data("id_usuario_edicion", "no" );
         $(document).data("mis_permisos",""); 

      $("#edicion_nombre").val("");
      $("#edicion_usuario").val("");
      $("#edicon_correo").val("");
      $("#edicion_telefono").val("");
      $("#edicion_oficina").val("");
     
    

}