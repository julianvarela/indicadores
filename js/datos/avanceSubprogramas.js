$(document).ready(function(){

        /*
         * Hace el llamado para obtener los datos de la tabla de Avance General  y los carga en su tabla
         */    
        $.ajax({
                url:'php/datosAvSubprogramas.php'
                ,type:'POST'
                ,dataType:'json'  
                ,success: function(data,textStatus,jqXHR){

                    var filas="";     
                    
                    var programas = new Array();
                    var ponderado = new Array();
                    var semaFin = new Array();
                                
                    for(var i=0; i<data.length; i++){
                        filas += "<tr class='datos-tabla'>\n\
                            <td><input type='checkbox' name='post[]' value="+data[i]['codigo']+"></td>\n\
                            <td>"+data[i]['codigo']+"</td>\n\
                            <td class='dato-tabla-nivel'>"+data[i]['nivel']+"</td>\n\
                            <td>"+data[i]['ponderado']+"</td>\n\
                            <td>"+data[i]['avancePonderado']+"</td>\n\
                            <td><b class='badge bg-success'>"+data[i]['semaSeguiFisico']+"</b></td>\n\
                            <td>"+data[i]['estadoMetaProducto']+"</td>\n\
                            <td>"+data[i]['recurProgramados']+"</td>\n\
                            <td>"+data[i]['recurEjecutados']+"</td>\n\
                            <td><b class='badge bg-success'>"+data[i]['semaSeguiFinanciero']+"</b></td>\n\
                            <td>"+data[i]['estadoFinanciero']+"</td>\n\
                            <td>"+data[i]['fechaCorte']+"</td>\n\
                        </tr>";
                                     
                        programas[i] = data[i]['codigo'];
                        
                        ponderado[i] =  parseFloat(data[i]['ponderado']);
                        semaFin[i] = parseFloat(data[i]['semaSeguiFinanciero']);  

                    }
                                      
//                    console.log(semaFis[1]);
//                    console.log(semaFin[1]);
//                    console.log(recurPro[1]);
//                    console.log(recurEje);
                    
                    $("#TablaAvanceSubprogramas").html(filas);                                        
                    
                    
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
                                //rotation: -45,                                
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
                            data: ponderado,                                                   
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
                            data: semaFin,                        
                        }]
                    });
                    
                }
         });
         
});