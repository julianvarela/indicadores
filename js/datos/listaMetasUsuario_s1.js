


        var URL="";
        var datos = leerGET();

        var year=datos['year'];
        var subprograma=datos['c'];

        if(!year)
            {
            year="0";
          }
          else{

             $('.my_year').html(year);   
          }





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
      $("#bton_ingresar_meta").click(function(){

          $("#AgregarEditarMeta").slideToggle();
      });
        ///cambiar apariencia login
        if(isLocalStorageAvailable()){
            $(".my_usuario").html(localStorage.getItem("correo"));
        }




///carga la lista 
            $.ajax({
                    url:'php/adm/datosListaMetasUsuario.php'
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
                          
                           $("#select_my_table").change();
                        }
                        else{

                          alert("Su sesion expiro, inicie de nuevo");
                        }
                            
                    }
                  });                          
      





function tablaListaMetasUsuarios(lista){


  var html ="";
  if(lista)
  {

    for(var i=0; i< lista.length ; i++)
    {

      var datoF=lista[i];

      html+="<tr class='datos-tabla'> "
            +"              <td> "
            +"                  <a data-original-title='Editar Meta' class='btn btn-info btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-pencil'></i></a><hr /> "
            +"                  <a data-original-title='Eliminar Meta' class='btn btn-danger btn-sm' data-toggle='tooltip' data-placement='right' title=''><i class='fa fa-trash-o'></i></a> "
            +"              </td>  "                      
            +"              <td>"+datoF.codigo_nivel_pdm+"</td> "
            +"              <td class='dato-tabla-nivel'>"+datoF.nivel_pdm+"</td> "
            +"              <td class='dato-tabla-nivel'>"+datoF.metas+"</td> "
            +"              <td>"+datoF.linea_base+"</td> "
            +"              <td>"+datoF.valor_esperado_productos+"</td> "
            +"              <td>"+datoF.dependencia_responsable+"</td> "
            +"              <td>"+datoF.sector+"</td> "
            +"              <td>"+datoF.valor_esperado_meta_producto+"</td> "
            +"              <td>"+datoF.valor_logrado_meta_producto+"</td> "
            +"              <td>"+datoF.ponderado+"</td> "
            +"              <td>"+datoF.avance_ponderado+"</td> "
            +"              <td>"+datoF.semaforo_seguimiento+"%</td> "
            +"              <td>"+formaterNumeros(datoF.recursos_programados)+"</td> "
            +"              <td>"+formaterNumeros(datoF.recursos_ejecutados)+"</td> "
            +"              <td>"+datoF.semaforo_seguimiento_financiero+"</td> "
            +"              <td>"+datoF.fecha_corte+"</td> "
            +"        </tr>";

    }

  }

  return html;
}













