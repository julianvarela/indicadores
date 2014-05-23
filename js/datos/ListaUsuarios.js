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

   $("#tabla_edicion_1").validationEngine();

   $(document).data("edicion","nuevo");
   $(document).data("id_usuario_edicion","no");



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

   

 			if($("#AgregarEditarUsuario").css("display")=="none")
	 			{
	 				$("#AgregarEditarUsuario").fadeIn();
	 			}
	 			else{
	 				$("#AgregarEditarUsuario").fadeOut();
	 			}
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


                        if(data && data.sesion)
                        {
                       		if(data.usuario)
                         		{

                             $("#selectTipoUsuario").html( htmlTipoUsuario(data.permisos));
                         			$("#TablaAvanceProgramas").html(crearTablaUsuarios(data.lista));
                               $("#select_my_table").change();
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
                  +" > "
                    +"      <td> "
                    +"         <a  "
                    +"              onclick=\"cargarMiEdicion('mifila_"+i+"' )\" " 
                    +"            data-original-title='Editar Usuario' class='btn btn-info btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-pencil'></i></a><hr />  "
                    +"         <a data-original-title='Eliminar Usuario' class='btn btn-danger btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-trash-o'></i></a> "
                    +"      </td>                         "
                    +"      <td name='nombre'>"+obj.nombre+"</td> "
                    +"      <td name='usuario'>"+obj.usuario+"</td> "
                    +"     <td  name='correo'>"+obj.correo+"</td> "
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
  

      $fila = $("#"+elemento);
         $(document).data("edicion","edicion");
         $(document).data("id_usuario_edicion", $fila.data("id_usuario_edicion") );
     
      $("#edicion_nombre").val($fila.find("[name='nombre']").html());
      $("#edicion_usuario").val($fila.find("[name='usuario']").html());
      $("#edicon_correo").val($fila.find("[name='correo']").html());
      $("#edicion_telefono").val($fila.find("[name='telefono']").html());
      $("#edicion_oficina").val($fila.find("[name='oficina']").html());
     

      $("#selectTipoUsuario option[value="+ $fila.data("id_tipo") +"]").attr("selected",true);
      $("#edicion_estado option[value="+ $fila.data("activo") +"]").attr("selected",true);
   
      


      $("#ir_edicion").click();
      $("#AgregarEditarUsuario").fadeIn();

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

      $.ajax({
                    url:URL+'php/adm/manejo_usuarios/datosListaUsuarios.php'
                    ,type:'POST'
                    ,dataType:'json'  
                    ,data:{ 
                            opcion:'guardar_usuario',
                            nombre  : nombre ,
                            usuario : usuario ,
                            pass : pass ,
                            activo : activo ,
                            correo : correo ,
                            telefonos : telefonos ,
                            oficina_principal : oficina_principal ,
                            tipo_usuarios_id  :  tipo_usuarios_id 

                        }
                    ,beforeSend:function(jqXHR,settings){
                        
                    }    
                    ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Se presentó un problema con la conexión a Internet");
                        
                    }                                        
                    ,success: function(data,textStatus,jqXHR){

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
                                }
                              
                            }//if valicion de secion
                            else{

                                 alert("Su sesion expiro, inicie de nuevo");
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
      {

      });

    return html;
  }


