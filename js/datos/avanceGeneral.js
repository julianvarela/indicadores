$(document).ready(function(){

        /*
         * Hace el llamado para obtener los datos de la tabla de Avance General  y los carga en su tabla
         */    
        
        
    var URL="";
    var year=null;
    //$(document).ready(function(){


     var datos = leerGET();

     year=datos['year'];
     if(year)
      {   
   
      $('.my_year').html(year);
      $("#nav").html(construirNav(2012,2015,year));
      
      
      ///cambiar apariencia login
      if(isLocalStorageAvailable()){
          $(".my_usuario").html(localStorage.getItem("correo"));
      }
      
      
   
        
        $.ajax({
                url:'php/datosAvGeneral.php'
                ,type:'POST'
                ,dataType:'json'  
                ,data:{
                    opcion:'avance_objetivos',
                    year:year
                }
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
                    var semaFis = new Array();
                    var semaFin = new Array();
                    var recurPro = new Array();
                    var recurEje = new Array();                    
                    
                    for(var i=0; i<data.length; i++){
                        filas += "<tr  class='datos-tabla'>\n\
                            <td>"+data[i]['codigo']+"</td>\n\
                            <td  class='dato-tabla-nivel'>"+data[i]['nivel']+"</td>\n\
                            <td>"+getHtmlColor(data[i]['semaSeguiFisico'])+"<br>"+nombreRango(data[i]['semaSeguiFisico'])+"</td>\n\
                            <td>"+"$"+formaterNumeros(data[i]['recurProgramados'])+"</td>\n\
                            <td>"+"$"+formaterNumeros(data[i]['recurEjecutados'])+"</td>\n\
                            <td>"+getHtmlColor(data[i]['semaSeguiFinanciero'])+"<br>"+nombreRango(data[i]['semaSeguiFinanciero'])+"</td>\n\
                            <td>"+data[i]['fecha_modificacion']+"</td>\n\
                        </tr>";
                                                
                        var semaforos = [ parseFloat(data[i]['semaSeguiFisico']) , parseFloat(data[i]['semaSeguiFinanciero']) ];
                        var recursos = [ parseFloat(data[i]['recurProgramados']) , parseFloat(data[i]['recurEjecutados']) ];                        

//                        semaFis[i] = [ parseFloat(data[i]['semaSeguiFisico']) ];
//                        semaFin[i] = [ parseFloat(data[i]['semaSeguiFinanciero']) ];
//                        
//                        recurPro[i] = [ parseFloat(data[i]['recurProgramados']) ];
//                        recurEje[i] = [ parseFloat(data[i]['recurEjecutados']) ];                        
                    }
                                      
//                    console.log(semaFis[1]);
//                    console.log(semaFin[1]);
//                    console.log(recurPro[1]);
//                    console.log(recurEje);
                    
                    $("#TablaAvanceGeneral").html(filas);                                        
        

                    var etiquetasS = [ 'Semaforo Seguimiento Fisico '+year , 'Semaforo Seguimiento Financiero '+year ];
                    var etiquetasR = [ 'Recursos Programados '+year , 'Recursos Ejecutados '+year ];
                    
                    $('#graficaGeneral1').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: etiquetasS,
                            labels: {
                                y: 20,
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
                                text: 'Porcentajes',                                
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
                            name: 'Semaforo',
                            data: semaforos,                            
                            colorByPoint: true                            
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
                            categories: etiquetasR,
                            labels: {
                                y: 20,
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
                                text: 'Valores',                                
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
                            name: 'Recursos',
                            data: recursos,
                            colorByPoint: true                            
                        }]
                    });
                    
                }
         });
         
         
    }///fin if validacion
    else{
        
        alert("Direccion Incorrecta");
        
    }     
         
         
});

