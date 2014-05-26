


        var URL="";
        var datos = leerGET();

        var year=datos['year'];
        var subprograma=datos['c'];

        //valor para la ediocn 
        var pdm_id=null;
        var id_fila_matriz=-1;
        $(document).data("id_edicion","nuevo");



       

        if(!year)
            {
            year="0";
          }
          else{

             $('.my_year').html(year);   
          }





/************ manejo de evento en edicon************/

$("#edicion_semaforo_seguimiento_fina").change(function(){
  $("#edicion_meta").validationEngine('validate');


});


$("#edicion_recurso_programado").change(function(){

  if( !$("#edicion_recurso_programado").validationEngine('validate'))
  {
    actualizarPonderadoEdicion();
  }
  else{
    $("#edicion_ponderado").val("0");
  }

});


$("#dicion_valor_esperado_meta_producto , #dicion_valor_logrado_meta_producto").change(function(){
  actualizaSemaforoSegFisi();
});

$("#edicion_ponderado, #edicion_avance_semaforo_seg_fis").change(function(){
  actualizaAvancePonderado();

});


$("#edicion_recurso_programado , #edicion_recursos_ejecutados").change(function(){
  actualizaSemaforoSegFinanciero();

})


$("#edicion_bton_guardar").click(function(event) {
  /* Act on the event */
  

  
  //es valido
  if($("#mi_edicion_form").validationEngine('validate'))
  {
    //se pued guardar
    guardarMeta();

  }

});





/************ manejo de evento en edicon*************/
$("#mi_edicion_form").validationEngine();




      $("#nav").html(construirNavUsuarioS1(2012,2015,year));

      //manejo de paginacion
         
      $("#select_my_table").change(function(){
              var particion= parseInt($(this).val());   
                        
              if($("#TablaSecretariasDespacho").length>0)
                   irPaginaTable(1,particion,"#tabla_metas_usuario");
              else 
                   irPaginaTable(1,particion,"#tabla_metas_usuario");
        });


      // MUESTRA INGRESAR ...
      $("#bton_guardar_programa").click(function(){

        $("#edicion_bton_guardar").html("Guardar");
         $(document).data("id_edicion","nuevo");
         clearEdicion();


        if($("#AgregarEditarMeta").css("display")=="none")
        {
            $("#AgregarEditarMeta").fadeIn();

        }
        else{
           $("#AgregarEditarMeta").fadeOut();   
           
        }

         
      });
      
        ///cambiar apariencia login
        if(isLocalStorageAvailable()){
            $(".my_usuario").html(localStorage.getItem("correo"));
        }





$("#edicion_bton_cancelar").click(function(){
        $("#edicion_bton_guardar").html("Guardar");
         $(document).data("id_edicion","nuevo");
         clearEdicion();
         $("#AgregarEditarMeta").fadeOut(); 
});





///carga la lista 
            $.ajax({
                    url:URL+'php/adm/datosListaMetasUsuario.php'
                    ,type:'POST'
                    ,dataType:'json'  
                    ,data:{ 
                            year: year,
                            opcion:'lista_metas',
                            subprograma: subprograma
                            


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
                       
                         $("#tabla_metas_usuario").html(tablaListaMetasUsuarios(data.lista));
                         $("#selectSectorBasico").html( htmlSelectDependenciasSecretarias_sectores(data.sectores));
                         $("#selectDependencias").html( htmlSelectDependenciasSecretarias_sectores(data.secretarias_depencias));
                         $("#selecTipoMeta").html( htmlSelectDependenciasSecretarias_sectores(data.tipo_metas));
                              
                         pdm_id=data.pdm_id;

                         $("#select_my_table").change();
                        }
                        else{

                          alert("Su sesion expiro, inicie de nuevo");
                        }
                            
                    }
                  });                          
      



function htmlSelectDependenciasSecretarias_sectores(lista)
{
  var html="";
    if(lista)
    {

      for(var i=0; i<lista.length ; i++)
      {
        var opcionObj=lista[i];
        html+="<option value='"+opcionObj.id+"'>"+opcionObj.nombre+"</option>"


      }

    }

  return html;

}



/**********************
* genera la tabla  con los respectivos datos
*/
function tablaListaMetasUsuarios(lista){


  var html ="";
  if(lista)
  {

    for(var i=0; i< lista.length ; i++)
    {

      var datoF=lista[i];

      html+="<tr id='mi_fila_datos_meta"+i+"'"
        +"class='datos-tabla' data-miid='"+datoF.id+"' "
        +" data-idsector='"+datoF.id_sector+"'  "
        +" data-iddependencias_secretarias='"+datoF.id_dependencia_secretaria+"'  "
        +" data-idtipometa='"+datoF.tipos_meta_id+"' "
        +" data-recursos_programados='"+datoF.recursos_programados+"' "
        +" data-recursos_ejecutados='"+datoF.recursos_ejecutados+"' "
         +" data-id_fila_matriz='"+datoF.id_fila_matriz+"' > "
            +"              <td> "
            +"                  <a onclick=\"cargarDatosEdicion('mi_fila_datos_meta"+i+"')\" data-original-title='Editar Meta' class='btn btn-info btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-pencil'></i></a><hr /> "
            +"                  <a onclick=\"eliminarDatos('mi_fila_datos_meta"+i+"')\"   data-original-title='Eliminar Meta' class='btn btn-danger btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-trash-o'></i></a> "
            +"              </td>  "                      
            +"              <td name='  _nivel_pdm'>"+datoF.codigo_nivel_pdm+"</td> "
            +"              <td class='dato-tabla-nivel' name='nivel_pdm'>"+datoF.nivel_pdm+"</td> "
            +"              <td class='dato-tabla-nivel' name='metas'>"+datoF.metas+"</td> "
            +"              <td name='linea_base'>"+datoF.linea_base+"</td> "
            +"              <td name='valor_esperado_productos'>"+datoF.valor_esperado_productos+"</td> "
            +"              <td > "+datoF.dependencia_responsable+"</td> "
            +"              <td >"+datoF.sector+"</td> "
            +"              <td>"+datoF.nombre_tipo_meta+"</td> "
            +"              <td name='valor_esperado_meta_producto'>"+datoF.valor_esperado_meta_producto+"</td> "
            +"              <td name='valor_logrado_meta_producto'>"+datoF.valor_logrado_meta_producto+"</td> "
            +"              <td name='ponderado'>"+datoF.ponderado+"</td> "
            +"              <td name='avance_ponderado'>"+datoF.avance_ponderado+"</td> "
            +"              <td ><label name='semaforo_seguimiento'>"+datoF.semaforo_seguimiento+"</label>%</td> "
            +"              <td>"+formaterNumeros(datoF.recursos_programados)+"</td> "
            +"              <td>"+formaterNumeros(datoF.recursos_ejecutados)+"</td> "
            +"              <td name='semaforo_seguimiento_financiero'>"+datoF.semaforo_seguimiento_financiero+"</td> "
            +"              <td name='fecha_corte'>"+(datoF.fecha_corte==null?"sin definir": datoF.fecha_corte)+"</td> "
            +"        </tr>";

    }

  }

  return html;
}








/*********************
*actualiza el poderado si es edicion
*/
function actualizarPonderadoEdicion(){

            $.ajax({
                    url:'php/adm/datosListaMetasUsuario.php'
                    ,type:'POST'
                    ,dataType:'json'  
                    ,data:{ 
                            year: year,
                            opcion:'lista_recursos_programados',
                            subprograma: subprograma

                        }
                    ,beforeSend:function(jqXHR,settings){
                        
                    }    
                    ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Se presentó un problema con la conexión a Internet");
                        
                    }                                        
                    ,success: function(data,textStatus,jqXHR){

                            if(data && data.sesion)
                            {

                             //se reconoce el id edciion 
                             var id_edicion=$(document).data("id_edicion");
                             var valor_recurso_a_cambiar= parseFloat($("#edicion_recurso_programado").val());


                              var sumarRecurso= sumarEdicionRecursosProgramado(data.lista,id_edicion, valor_recurso_a_cambiar);
                              
                              
                              if(isNaN(valor_recurso_a_cambiar))
                                 $("#edicion_ponderado").val("0");
                              else    
                                {
                                  var nuevoValor=valor_recurso_a_cambiar*100/sumarRecurso
                                  if(isNaN(nuevoValor))
                                    {
                                      $("#edicion_ponderado").val("0");
                                    }
                                    else{
                                      nuevoValor=parseInt(nuevoValor*100);
                                      nuevoValor=parseFloat(nuevoValor)/100;
                                        $("#edicion_ponderado").val(nuevoValor);


                                    }
                                
                                }


                            }
                            else{
                              alert("Su sesion expiro, inicie de nuevo");
                            }


                             $("#edicion_ponderado").change();
  
                    }
                });

}



/************
* da el resultado de la suma del recurso programa
* @param lista .. array json lsita de los datos metas
* @param id_edicion el id de la edicion indica tambien si es un nuevo registor con la palabra nuevo
* @valor_recurso FLoat la nueva cantida a ingresar
**/

function sumarEdicionRecursosProgramado(lista,id_edicion, valor_recurso)
{
  var valor =0;
  console.info(isNaN(valor_recurso)+" "+valor_recurso);
  if(!isNaN(valor_recurso) && lista)
  {
      //si se esta editando un nuevo registro es tiene la palabra nuevo
      if(id_edicion=="nuevo")
      {

          for(var i=0; i< lista.length; i++)
          {
              valor+=parseFloat(lista[i].recurso);
              console.info("valro "+(lista[i].recurso));
              console.info(lista[i]);
          }

          valor+=valor_recurso;

      }
      else{


         for(var i=0; i< lista.length; i++)
          {
           
           console.info("valro 2"+(lista[i].recurso));
              if(id_edicion==lista[i].id)
              {
                valor+=valor_recurso;
              }else{
                valor+=parseFloat(lista[i].recurso);
              }
              

          }



      }
  }

return valor;
}



function actualizaSemaforoSegFisi(){
  var valorEsperado=parseFloat($("#dicion_valor_esperado_meta_producto").val());
  var valorLogrado=parseFloat($("#dicion_valor_logrado_meta_producto").val());

  if(!isNaN( valorEsperado) &&  !isNaN(valorLogrado))
  {

    var nuevoValor=(valorLogrado/valorEsperado)*100;

    nuevoValor= parseInt(nuevoValor*100);
    nuevoValor=parseFloat(nuevoValor)/100;

    $("#edicion_avance_semaforo_seg_fis").val(nuevoValor);
    $("#edicion_avance_semaforo_seg_fis").change();
   
  }
  else{
    $("#edicion_avance_semaforo_seg_fis").val("0");
    $("#edicion_avance_semaforo_seg_fis").change();


  }


}



function actualizaAvancePonderado(){
  var ponderado=parseFloat($("#edicion_ponderado").val());
  var semaforo_seguimiento=parseFloat($("#edicion_semaforo_seguimiento_fina").val());

  if(!isNaN( ponderado) &&  !isNaN(semaforo_seguimiento))
  {

    var nuevoValor=(ponderado*semaforo_seguimiento)/100;

    nuevoValor= parseInt(nuevoValor*100);
    nuevoValor=parseFloat(nuevoValor)/100;

    $("#edicion_avance_ponderado").val(nuevoValor);

  }
  else{
    $("#edicion_avance_ponderado").val("0");
  }
     $("#edicion_avance_ponderado").change();


}





function actualizaSemaforoSegFinanciero(){

  var recursoProgramado=parseFloat($("#edicion_recurso_programado").val());
  var recursoEjecutados=parseFloat($("#edicion_recursos_ejecutados").val());

  if(!isNaN( recursoProgramado) &&  !isNaN(recursoEjecutados))
  {

    var nuevoValor=(recursoEjecutados/recursoProgramado)*100;

    nuevoValor= parseInt(nuevoValor*100);
    nuevoValor=parseFloat(nuevoValor)/100;

    $("#edicion_semaforo_seguimiento_fina").val(nuevoValor);
  }
  else{
    $("#edicion_semaforo_seguimiento_fina").val("0");
  }


}




/*******************
* guadra la meta 
**/
function guardarMeta(){


//s fisico
  var valor_esperado_meta_producto= $("#dicion_valor_esperado_meta_producto").val();
  var valor_logrado_meta_producto=$("#dicion_valor_logrado_meta_producto").val();
  var ponderado= $("#edicion_ponderado").val();
  var avance_ponderado =$("#edicion_avance_ponderado").val();
  var semaforo_seg_fis = $("#edicion_avance_semaforo_seg_fis").val();

  var recurso_programado= $("#edicion_recurso_programado").val();
  var recursos_ejecutados = $("#edicion_recursos_ejecutados").val();
  var semaforo_seguimiento_fin = $("#edicion_semaforo_seguimiento_fina").val();
  var fecha_corte  = $("#editor_fecha").val();


  //mmm
  var meta=$("#edicion_meta").val();
  var linea_base=$("#edicion_linea_base").val();
  var valor_esperado_productos =$("#edicion_valor_esperado_productos").val();
  var selectDependencias =$("#selectDependencias").val();
  var selectSectorBasico=$("#selectSectorBasico").val();
  var selecTipoMeta= $("#selecTipoMeta").val();
  var opcion='';


  if($(document).data("id_edicion")=="nuevo")
  {
    opcion='nuevo_registro';
  }
  else{
    opcion='actualiza_registro';
  }

    $.ajax({
                    url:'php/adm/datosListaMetasUsuario.php'
                    ,type:'POST'
                    ,dataType:'json'  
                    ,data:{ 
                            year: year
                            ,opcion: opcion
                            ,subprograma: subprograma

                            ,valor_esperado_meta_producto: valor_esperado_meta_producto
                            ,valor_logrado_meta_producto: valor_logrado_meta_producto
                            ,ponderado: ponderado
                            ,avance_ponderado: avance_ponderado
                            ,semaforo_seg_fis : semaforo_seg_fis

                            ,recurso_programado : recurso_programado
                            ,recursos_ejecutados : recursos_ejecutados
                            ,semaforo_seguimiento_fin : semaforo_seguimiento_fin
                            ,fecha_corte : fecha_corte

                            ,meta : meta
                            ,linea_base : linea_base
                            ,valor_esperado_productos : valor_esperado_productos 
                            ,selectDependencias_secretarias :  selectDependencias
                            ,selectSectorBasico : selectSectorBasico
                            ,selecTipoMeta:selecTipoMeta
                            ,pdm_id:pdm_id

                            ,id_fila_matriz: id_fila_matriz


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
                        console.log(data);
                        if(data && data.sesion)
                        {


                          try{
                              $("#tabla_metas_usuario").html(tablaListaMetasUsuarios(data.lista));
                              $("#select_my_table").change();
                         }
                         catch(e){}


                          if(data.res)
                            {
                              //recostruir con los nuevos datos
                              //
                             }
                            else{
                               alert("Error No se guardo los datos");
                            }
                        }
                        else{

                           alert("Su sesion expiro, inicie de nuevo");
                        }
                  }
                });

}






function cargarDatosEdicion(id_fila){



$("#bton_ingresar_meta").click();

$fila=$("#"+id_fila);

$(document).data("id_edicion",$fila.data('miid'));
id_fila_matriz=$fila.data("id_fila_matriz");

console.error($fila.data('miid'));
console.log(id_fila_matriz);




  $("#edicion_meta").val($fila.find("td[name='metas']").html());
  $("#edicion_linea_base").val($fila.find("td[name='linea_base']").html());
  $("#edicion_valor_esperado_productos").val($fila.find("td[name='valor_esperado_productos']").html());
  

  $("#selectDependencias option[value="+ $fila.data("iddependencias_secretarias") +"]").attr("selected",true);
  $("#selectSectorBasico option[value="+ $fila.data("idsector") +"]").attr("selected",true);
  $("#selecTipoMeta option[value="+ $fila.data("idtipometa") +"]").attr("selected",true);
 

  $("#dicion_valor_esperado_meta_producto").val($fila.find("td[name='valor_esperado_meta_producto']").html());
  $("#dicion_valor_logrado_meta_producto").val($fila.find("td[name='valor_logrado_meta_producto']").html());
  $("#edicion_ponderado").val($fila.find("td[name='ponderado']").html());
 
  $("#edicion_avance_ponderado").val($fila.find("td[name='avance_ponderado']").html());
  $("#edicion_avance_semaforo_seg_fis").val($fila.find("[name='semaforo_seguimiento']").html());
  $("#edicion_recurso_programado").val($fila.data("recursos_programados"));
  $("#edicion_recursos_ejecutados").val($fila.data("recursos_ejecutados"));
  $("#edicion_semaforo_seguimiento_fina").val($fila.find("td[name='semaforo_seguimiento_financiero']").html());
  

  $("#editor_fecha").val($fila.find("td[name='fecha_corte']").html());



//muestra los dattos
$("#edicion_bton_guardar").html("Actualizar");

 $("#AgregarEditarMeta").fadeIn(500);
  return false;
  
}








function eliminarDatos(id_fila){

$fila=$("#"+id_fila);
id_fila_matriz=$fila.data("id_fila_matriz");

     $.ajax({
                    url:'php/adm/datosListaMetasUsuario.php'
                    ,type:'POST'
                    ,dataType:'json'  
                    ,data:{ 
                            year: year,
                            opcion:'elimina',
                            id_fila_matriz : id_fila_matriz,
                            subprograma : subprograma


                        }
                    ,beforeSend:function(jqXHR,settings){
                        
                    }    
                    ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Se presentó un problema con la conexión a Internet");
                        
                    }                                        
                    ,success: function(data,textStatus,jqXHR){

                            if(data && data.sesion)
                            {



                              if(data.res==false)
                              {
                                alert("Erro al guardar el registro");
                              }else{
                                 alert("Se elimino");
                              }


                              if(data.lista )
                              {
                                  $("#tabla_metas_usuario").html(tablaListaMetasUsuarios(data.lista));
                           
                                  $("#select_my_table").change();
                              }


                            }
                            else{
                              alert("Su sesion expiro, inicie de nuevo");
                            }


                             $("#edicion_ponderado").change();
  
                    }
                });




  return false;
  
}





/*****************
* restaura los espacion de edicon 
*/
function clearEdicion(){

    id_fila_matriz=-1;

   $("#edicion_meta").val("");
    $("#edicion_linea_base").val("");
    $("#edicion_valor_esperado_productos").val("");
    

    

    $("#dicion_valor_esperado_meta_producto").val("");
    $("#dicion_valor_logrado_meta_producto").val("");
    $("#edicion_ponderado").val("");
   
    $("#edicion_avance_ponderado").val("");
    $("#edicion_avance_semaforo_seg_fis").val("");
    $("#edicion_recurso_programado").val("");
    $("#edicion_recursos_ejecutados").val("");
    $("#edicion_semaforo_seguimiento_fina").val("");
    

   




}

