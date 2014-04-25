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
                        
                        if($("#TablaSecretariasDespacho").length>0)
                            irPaginaTable(1,particion,"#TablaSecretariasDespacho");
                        else 
                             irPaginaTable(1,particion,"#TablaDependenciasAdmin");
                });
   
  
             //para ver graficas  al darle click de secretaria
             $("#ver_graficas").click(function(e){
                $("#ver_graficas").attr("href","AvanceSecretarias.html?year="+year); 
             });
             
             ///ver graficas avance general de dependencias
             $("#bton_avance_dependencias").click(function(e){
                 $("#bton_avance_dependencias").attr("href","AvanceDependencias.html?year="+year);
             });
        
    
    
    
            //solo para selectre cretarias
            //carga la lista de secretarias 
            if( $("#selectSecretarias").length>0 ){

                 /*
                  *  carga el listado de Secretarias
                  */
                 $.ajax({
                        url:'php/datosSecretariasDependencias.php'
                        ,type:'POST'
                        ,data:{ 
                            opcion: 'listaSecretarias',
                            year:year 
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
                             
                                if(data && data.colores)
                                {
                             
                                     var select = generarHtmlOpcion(data.datos);

                                        var colores=data.colores;
                                        var htmlOpciones="";
                                        setColor(colores);//establece los colores por defecto de estado  


                                     $("#selectSecretarias").html(select);  
                                     $("#selectSecretarias").change();
                                 }
                             
                             
                            }
                     });  

            }// fin de if
           else{
               if( $("#selectDependencias").length ){
         
                /*
                 *  carga el listado de Dependencias
                 */        
                $.ajax({
                        url:'php/datosSecretariasDependencias.php'
                        ,type:'POST'
                        ,data:{ 
                            opcion: 'listaDependencias',
                            year:year 
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

                             var select = generarHtmlOpcion(data.datos);

                             var colores=data.colores;
                             var htmlOpciones="";
                             setColor(colores);//establece los colores por defecto de estado  


                             $("#selectDependencias").html(select);  
                             $("#selectDependencias").change();
                                     
                            
                            
                             
                            }
                    });        

             }
   
               
           }// fin del if .. .
           
           
           
           
        /*
         *  selecciona la Secretaria
         */
	$("#selectSecretarias").change(function(){          
                datosSecretariasDependencias('secretaria');
        });
        
        /*
         *  selecciona la Dependencias
         */
	$("#selectDependencias").change(function(){          
                datosSecretariasDependencias('dependencia');
        });
           
       


    }// fin del if ... Year
    
    
    
    
      




/*
         * Hace el llamado para obtener los datos de la tabla de Avance General  y los carga en su tabla
         */    
        function datosSecretariasDependencias(tipo){
            
            $.ajax({
                    url:'php/datosSecretariasDependencias.php'
                    ,type:'POST'
                    ,data:{
                        opcion: 'consultaDatos',
                        year:year,
                        id_sd:tipo=='dependencia'? $("#selectDependencias").val() : $('#selectSecretarias').val()
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

                        for(var i=0; i<data.length; i++){
                            filas += "<tr class='datos-tabla'>\n\
                                <td><input type='checkbox'  class='mis_checkbox' onclick='actulizarGraficarSecretaria()' name='post[]' checked='true' "
                                    +"data-programas='"+data[i]['codigo'] + "' "
                                    +"data-ponderado='"+data[i]['semaSeguiFisico']  + "' "
                                    +"data-semafin='"+data[i]['semaSeguiFinanciero'] + "' " 
                                    +" value="+data[i]['codigo']+"></td>\n\
                                value="+data[i]['codigo']+"></td>\n\
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
                                <td>"+getHtmlColor(data[i]['semaSeguiFinanciero'])+"<br>"+nombreRango(data[i]['semaSeguiFinanciero'])+"</td>\n\
                                <td>"+data[i]['fecha_modificacion']+"</td>\n\
                            </tr>";

                            metas[i] = data[i]['codigo'];

                            semaFis[i] =  parseFloat(data[i]['semaSeguiFisico']);
                            semaFin[i] = parseFloat(data[i]['semaSeguiFinanciero']);  

                        }

    //                    console.log(semaFis[1]);
    //                    console.log(semaFin[1]);
    //                    console.log(recurPro[1]);
    //                    console.log(recurEje);

                        if(tipo == 'secretaria'){
                            $("#TablaSecretariasDespacho").html(filas);                                            
                        }
                        else if(tipo == 'dependencia'){
                            $("#TablaDependenciasAdmin").html(filas);                                            
                        }
                        
                        
                        $("#select_my_table").change();
                        
                        $("input[type=checkbox]").attr("checked",true);

                        graficarSecretaria( metas,

                            semaFis,
                            semaFin)
                       

                    }
             });
         }
   



   /**actulizarGraficaSubprogramas
*/
function actulizarGraficarSecretaria()
{
var $misCheckbox= $(".mis_checkbox");
var con=0;
var  programas=Array();
var ponderado =  Array();
var semaFin = Array();  



  $.each($misCheckbox, function( index, value ) {
            console.log(value);
            
            if(value.checked)
            {
                var datos = value.dataset;
                programas[con]=datos.programas;
                ponderado[con] =parseFloat( datos.ponderado);
                semaFin[con] = parseFloat(datos.semafin);  

                con++;
            }

    });


  graficarSecretaria(programas,                         
                        ponderado,
                        semaFin);
}
     
     




             
        function graficarSecretaria( metas,

                            semaFis,
                            semaFin){

             $('#graficaGeneral1').highcharts({
                            chart: {
                                type: 'column'
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
                                column: {
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
                                data: semaFis,                                                   
                            }]
                        });



                        /*
                         * Grafica la conparacion entre los recursos ejecutados vs los programados
                         */
                        $('#graficaGeneral2').highcharts({
                            chart: {
                                type: 'column'
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
                                    format: '{value}',
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
                                column: {
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
                                data: semaFin,                        
                            }]
                        });
        }
//});