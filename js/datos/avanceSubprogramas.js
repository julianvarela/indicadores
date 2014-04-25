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
                        irPaginaTable(1,particion,"#TablaAvanceSubprogramas");
                });

        /*
         * Hace el llamado para obtener los datos de la tabla de Avance General  y los carga en su tabla
         */    
        $.ajax({
                url:'php/datosAvSubprogramas.php'
                ,type:'POST'
                ,dataType:'json'  
                ,data:{ year:year }
                ,beforeSend:function(jqXHR,settings){
                    $(".body-preload").css({display:'inline'});
                }    
                ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Se presentó un problema con la conexión a Internet")
                }                                        
                ,success: function(midata,textStatus,jqXHR){
                    
                        $(".body-preload").css({display:'none'});


                    
                   var data=midata.datos;
                   var colores=midata.colores;

                    ///para los colores
                   setColor(colores);//establece los colores por defecto de estado


                    var filas="";     
                    var data=midata.datos;
                    var programas = new Array();
                    var ponderado = new Array();
                    var semaFin = new Array();
                                
                    for(var i=0; i<data.length; i++){
                        filas += 
                        "<tr class='datos-tabla'>\n\
                            <td><input type='checkbox' class='mis_checkbox' onclick='actulizarGraficaSubprogramas()' name='post[]' checked='true' "
                                +"data-programas='"+data[i]['codigo'] + "' "
                                +"data-ponderado='"+data[i]['semaSeguiFisico']  + "' "
                                +"data-semafin='"+data[i]['semaSeguiFinanciero'] + "' " 
                                +" value="+data[i]['codigo']+"></td>\n\
                            <td>"+data[i]['codigo']+"</td>\n\
                            <td class='dato-tabla-nivel'>"+data[i]['nivel']+"</td>\n\
                            <td>"+data[i]['ponderado']+"</td>\n\
                            <td>"+data[i]['avancePonderado']+"</td>\n\
                            <td>"+getHtmlColor(data[i]['semaSeguiFisico'])+"<br>"+nombreRango(data[i]['semaSeguiFisico'])+"</td>\n\
                            <td>"+"$"+formaterNumeros(data[i]['recurProgramados'])+"</td>\n\
                            <td>"+"$"+formaterNumeros(data[i]['recurEjecutados'])+"</td>\n\
                            <td>"+getHtmlColor(data[i]['semaSeguiFinanciero'])+"<br>"+nombreRango(data[i]['semaSeguiFinanciero'])+"</td>\n\
                            <td>"+data[i]['fecha_modificacion']+"</td>\n\
                            <td>"+data[i]['fechaCorte']+"</td>\n\\n\
                             <td>"+data[i]['fecha_creacion']+"</td>\n\
                        </tr>";
                                     
                        programas[i] = data[i]['codigo'];
                        
                        ponderado[i] =  parseFloat(data[i]['semaSeguiFisico']);
                        semaFin[i] = parseFloat(data[i]['semaSeguiFinanciero']);  

                    }
                                      
//                    console.log(semaFis[1]);
//                    console.log(semaFin[1]);
//                    console.log(recurPro[1]);
//                    console.log(recurEje);
                    
                    $("#TablaAvanceSubprogramas").html(filas);                                        
                    
                    
                     $("#select_my_table").change();
                    
            
                graficarSubprogramas(programas,                         
                        ponderado,
                        semaFin); 
            }
         });
    }//fin del if
    else{
        
        alert("URL Incorrecta");
        
    }
         


/**actulizarGraficaSubprogramas
*/
function actulizarGraficaSubprogramas()
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


  graficarSubprogramas(programas,                         
                        ponderado,
                        semaFin);
}


/***
dibujar las graficas de subprogramas 

*/
function graficarSubprogramas(programas,                         
                        ponderado,
                        semaFin){


            $('#graficaGeneral1').highcharts({
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: programas,
                            title: {
                                text: 'Codigo de Programa',                                
                                style: {
                                    fontWeight: 'bold',  
                                    fontSize: '13px'                                    
                                }                                                                
                            },
                            labels: {                                
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
                            data: ponderado                                               
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
                            categories: programas,
                            title: {
                                text: 'Codigo de Programa',                                
                                style: {
                                    fontWeight: 'bold',  
                                    fontSize: '13px'                                    
                                }                                                                
                            },
                            labels: {
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
                            valueSuffix: ' millones'
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


//});