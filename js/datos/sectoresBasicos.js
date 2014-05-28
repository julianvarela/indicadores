//$(document).ready(function(){

   var URL="";
    var year=null;
    //$(document).ready(function(){


     var datos = leerGET();


    
  

     year=datos['year'];
     
     if(year){   
      
        $('.my_year').html(year);
        $("#nav").html(construirNav(2012,2015,year));
      

                ///cambiar apariencia login
                if(isLocalStorageAvailable()){
                    $(".my_usuario").html(localStorage.getItem("correo"));
                }
                         
                
                $("#select_my_table").change(function(){
                        var particion= parseInt($(this).val());   
                        irPaginaTable(1,particion,"#TablaSectoresBasicos");
                });



      ///carga la lista 
            $.ajax({
                    url:'php/datosSectoresBasicos.php'
                    ,type:'POST'
                     ,dataType:'json'  
                    ,data:{ opcion:'lista_sectores' }
                    ,beforeSend:function(jqXHR,settings){
                        $(".body-preload").css({display:'inline'});
                    }    
                    ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Se presentó un problema con la conexión a Internet")
                    }                                        
                    ,success: function(data,textStatus,jqXHR){

                            $(".body-preload").css({display:'none'});
                        
                        
                        if(data && data.datos )
                        {
                        
                
                            var colores=data.colores;
                            var htmlOpciones="";
                            setColor(colores);//establece los colores por defecto de estado  
                                
                             
                            
                            
                            /// generar opciones
                            htmlOpciones=generarHtmlOpcion(data.datos);
                            $("#selectSectorBasico").html(htmlOpciones);  
                            
                              
                            $("#selectSectorBasico").change();
                            
                            
                        }
                        
                    }
                    
        });
                    



        //manejo de la grafica de avances generales    
        $("#bton_graficas").click(function(e){
            
            $("#bton_graficas").attr("href","AvanceSectores.html?year="+year);
          });


   
        /*
         *  selecciona el Sector Basico
         */
	$("#selectSectorBasico").change(function(){          
                datosSectorBasico();
        });
        
//});

      }else {
          
          alert("URL Incorrecta");
          
          
      }
      
      
   
      
      


       $("#bton_exportar").click(function(){
            exportarExcel();

        });
      
      
      
      /****
      *** trae la informaciona de los setores basicos elegido
      *
      */
     
     

        /*
         * Hace el llamado para obtener los datos de la tabla de Avance General  y los carga en su tabla
         */    
        function datosSectorBasico(){
            
            $.ajax({
                    url:'php/datosSectoresBasicos.php'
                    ,type:'POST'
                    ,data:{ 
                        year:year,
                        opcion:'seleccion_sector',
                        id_sector: $('#selectSectorBasico').val()
                    }
                    ,dataType:'json'  
                    ,beforeSend:function(jqXHR,settings){
                        $(".body-preload").css({display:'inline'});
                    }    
                    ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Se presentó un problema con la conexión a Internet")
                    }                                        
                    ,success: function(data,textStatus,jqXHR){
                    
                        $(".body-preload").css({display:'none'});

                        var filas="";     

                        var metas = new Array();
                        var semaFis = new Array();
                        var semaFin = new Array();



                         mi_excel=" <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />"
                                +"<style> "
                                +"    tbody > tr.datos-tabla > td.dato-tabla-nivel{ "
                                +"            text-align: justify; "
                                +"        } "
                                +"    .head{background:#13C4A5;}"
                                +"    .badge { "
                                +"        min-width: 10px; " 
                                +"        padding: 3px 7px; "
                                +"        font-size: 12px; "
                                +"        font-weight: bold;  "
                                +"        line-height: 1; "
                                +"        color: #272822; "
                                +"        text-align: center; "
                                +"        vertical-align: baseline; "
                                +"        background-color: #999999; "
                                +"        border-radius: 10px;}"

                                +"   </style>  "

                                +"      <table border='1' class='table table-striped m-b-none' data-ride='datatables' > "
                                +"      <thead> "
                                +"        <tr> "
                                +"           <th class='head' width='4%'>Codigo Nivel PDM</th> "
                                +"          <th  class='head' width='12%'>Nivel PDM</th> "
                                +"          <th  class='head' width='12%'>Metas</th> "
                                +"          <th  class='head' width='6%'>Valor Esperado Meta de Producto </th> "
                                +"          <th  class='head' width='6%'>Valor Logrado Esperado Meta de Producto </th> "
                                +"          <th  class='head' width='6%'>Ponderado Meta de Producto </th> "
                                +"          <th  class='head' width='6%'>Avance Ponderado </th> "
                                +"          <th  class='head' width='6%'>Semaforo Seguimiento Fisico </th> "
                                +"          <th  class='head' width='6%'>Recursos Programados </th> "
                                +"          <th  class='head' width='6%'>Recursos Ejecutados </th> "
                                +"          <th  class='head' width='6%'>Semaforo seguimiento Financiero </th> "
                                +"          <th  class='head' width='6%'>Ultima Modificación</th> "
                                +"          <th  class='head' width='6%'>Fecha de Corte </th> "
                                +"          <th  class='head' width='6%'>Fecha de Registro </th> "
                                +"        </tr> "
                                +"      </thead> "
                                +"      <tbody id='TablaSectoresBasicos'>  " ;



                        for(var i=0; i<data.length; i++){
                            filas += "<tr class='datos-tabla'>\n\
                                <td><input type='checkbox'  class='mis_checkbox' onclick='actulizarGraficaSectoresBasicos()' name='post[]' checked='true' "
                                    +"data-programas='"+data[i]['codigo'] + "' "
                                    +"data-ponderado='"+data[i]['semaSeguiFisico']  + "' "
                                    +"data-semafin='"+data[i]['semaSeguiFinanciero'] + "' " 
                                    +" value="+data[i]['codigo']+"></td>\n\
                                <td>"+data[i]['codigo']+"</td>\n\
                                <td class='dato-tabla-nivel'>"+data[i]['nivel']+"</td>\n\\n\
                                <td class='dato-tabla-nivel'>"+data[i]['metas']+"</td>\n\
                                <td>"+data[i]['valorEsperado']+"</td>\n\
                                <td>"+data[i]['valorLogrado']+"</td>\n\
                                <td>"+data[i]['ponderado']+"</td>\n\
                                <td>"+data[i]['avancePonderado']+"</td>\n\
                                <td>"+getHtmlColor(data[i]['semaSeguiFisico'])+"<br>"+nombreRango(data[i]['semaSeguiFisico'])+"</b></td>\n\
                                <td>"+"$"+formaterNumeros(data[i]['recurProgramados'])+"</td>\n\
                                <td>"+"$"+formaterNumeros(data[i]['recurEjecutados'])+"</td>\n\
                                <td>"+getHtmlColor(data[i]['semaSeguiFinanciero'])+"<br>" +nombreRango(data[i]['semaSeguiFinanciero'])+"</b></td>\n\
                                <td>"+data[i]['fecha_modificacion']+"</td>\n\
                                <td>"+data[i]['fechaCorte']+"</td>\n\\n\
                             <td>"+data[i]['fecha_creacion']+"</td>\n\
                            </tr>";



                            // conversion excel
                           mi_excel+= "<tr class='datos-tabla'> "
                                
                                +"  <td>"+data[i]['codigo']+"</td> "
                                +"  <td class='dato-tabla-nivel'>"+data[i]['nivel']+"</td> "
                                +"  <td class='dato-tabla-nivel'>"+data[i]['metas']+"</td> "
                                +"  <td>"+data[i]['valorEsperado']+"</td> "
                               +"   <td>"+data[i]['valorLogrado']+"</td> "
                               +"   <td>"+data[i]['ponderado']+"</td> "
                               +"   <td>"+data[i]['avancePonderado']+"</td> "
                               +"   <td>"+getHtmlColor(data[i]['semaSeguiFisico'])+"<br>"+nombreRango(data[i]['semaSeguiFisico'])+"</b></td> "
                               +"   <td>"+"$"+formaterNumeros(data[i]['recurProgramados'])+"</td> "
                               +"   <td>"+"$"+formaterNumeros(data[i]['recurEjecutados'])+"</td> "
                               +"   <td>"+getHtmlColor(data[i]['semaSeguiFinanciero'])+"<br>" +nombreRango(data[i]['semaSeguiFinanciero'])+"</b></td> "
                               +"   <td>"+data[i]['fecha_modificacion']+"</td> "
                              +"    <td>"+data[i]['fechaCorte']+"</td> "
                             +"  <td>"+data[i]['fecha_creacion']+"</td> "
                            +"  </tr>";


                            metas[i] = data[i]['codigo'];

                            semaFis[i] =  parseFloat(data[i]['semaSeguiFisico']);
                            semaFin[i] = parseFloat(data[i]['semaSeguiFinanciero']);  


                        }


                         mi_excel+="     </tbody> "
                                    +" </table>"; 

    //                    console.log(semaFis[1]);
    //                    console.log(semaFin[1]);
    //                    console.log(recurPro[1]);
    //                    console.log(recurEje);
    //                    


                        $("#TablaSectoresBasicos").html(filas);                                        
                        $("input[type=checkbox]").attr("checked",true);    

                        $("#select_my_table").change();
                             
                        graficarSectoresBasicos( metas,

                            semaFis,
                            semaFin);
                        
                    }
             });
         }
   

      
      
      /**actulizarGraficaSubprogramas
*/
function actulizarGraficaSectoresBasicos()
{
var $misCheckbox= $(".mis_checkbox");
var con=0;
var  metas=Array();
var semaFis =  Array();
var semaFin = Array();  



  $.each($misCheckbox, function( index, value ) {
           
            
            if(value.checked)
            {
                var datos = value.dataset;
                metas[con]=datos.programas;
                semaFis[con] =parseFloat( datos.ponderado);
                semaFin[con] = parseFloat(datos.semafin);  

                con++;
            }

    });


  graficarSectoresBasicos( metas,

                            semaFis,
                            semaFin)
}
   




function graficarSectoresBasicos( metas,

                            semaFis,
                            semaFin){


    $('#graficaGeneral1').highcharts({
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: metas,
                                title: {
                                    text: 'Codigo de Programa',                                
                                    style: {
                                        fontWeight: 'bold',  
                                        fontSize: '13px'                                    
                                    }                                                                
                                },
                                labels: {                                
                                    y: 20,                                
                                    style: {
                                        fontWeight: 'bold',  
                                        fontSize: '12px'                                    
                                    }
                                }              
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Avance (%)',                                
                                    style: {
                                        fontWeight: 'bold',  
                                        fontSize: '13px'                                    
                                    }                                                                
                                },
                                labels: {
                                    format: '{value} %'
                                }
                            },
                            colors: [
                                '#24CBE5',
                                '#64E572',
                                '#058DC7',
                                '#50B432',
                                '#ED561B',
                                '#DDDF00',
                                '#24CBE5',
                                '#64E572',
                                '#FF9655',
                                '#FFF263',
                                '#6AF9C4'
                            ],       
                            tooltip: {
                                valueSuffix: ' %'
                            },                        
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        //rotation: -90,
                                        //x: 2,
                                        //y: 25,
                                        enabled: true,
                                        style: {
                                            color: '#000000',
                                            fontSize: '12px',
                                            fontFamily: 'Verdana, sans-serif',
                                            fontWeight: 'bold'                                                            
                                        }                             
                                    } 
                                }
                            },                        
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: -40,
                                y: 100,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: '#FFFFFF',
                                shadow: true,
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
    //                        series: [{
    //                                name: 'Fisico',
    //                                data: semaFis,                                                   
    //                            },
    //                            {
    //                                name: 'Finanaciero',
    //                                data: semaFin,                                
    //                            }]                        
                            series: [{
                                name: 'Avance',
                                data: semaFis                                                
                            }]
                        });



                        /*
                         * Grafica la conparacion entre los recursos ejecutados vs los programados
                         */
                        $('#graficaGeneral2').highcharts({
                            chart: {
                                type: 'bar'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: metas,
                                title: {
                                    text: 'Codigo de Programa',                                
                                    style: {
                                        fontWeight: 'bold',  
                                        fontSize: '13px'                                    
                                    }                                                                
                                },
                                labels: {
                                    y: 20,                                                                    
                                    style: {
                                        fontWeight: 'bold',  
                                        fontSize: '12px'                                    
                                    }
                                }              
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: 'Avance (%)',                                                            
                                    style: {
                                        fontWeight: 'bold',  
                                        fontSize: '13px'                                    
                                    }                                                                
                                },
                                labels: {
                                    format: '{value}'
                                }
                            },

                            colors: [
                                '#FF9655',
                                '#FFF263',
                                '#24CBE5',
                                '#64E572'                           
                            ],                                                        
                            tooltip: {
                                valueSuffix: ' %'
                            },
                            plotOptions: {
                                bar: {
                                    dataLabels: {
                                        //rotation: -90,
                                        //x: 2,
                                        //y: 25,
                                        enabled: true,
                                        style: {
                                            color: '#000000',
                                            fontSize: '12px',
                                            fontFamily: 'Verdana, sans-serif',
                                            fontWeight: 'bold'                                                            
                                        }                             
                                        //rotation: -90
                                    } 
                                }
                            },                        
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: -40,
                                y: 100,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: '#FFFFFF',
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
    //                        series: [{
    //                                name: 'Programados',
    //                                data: recurPro,                                                   
    //                            },
    //                            {
    //                                name: 'Ejecutados',
    //                                data: recurPro,                                
    //                            }]                                                
                            series: [{
                                name: 'Avance',
                                data: semaFin                  
                            }]
                        });

}




