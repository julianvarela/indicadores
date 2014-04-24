        
        
      $("#nav").html(construirNav('2012','2015','1'));
      
    ///cambiar apariencia login
    if(isLocalStorageAvailable()){        
        $(".my_usuario").html(localStorage.getItem("correo"));
    }



        $.ajax({
                url:'php/datosAvVigencias.php'
                ,type:'POST'
                ,dataType:'json'  
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
                        var vigencia = '2012 - 2015';
                        var seguiFisi = new Array();
                        var seguiFina = new Array();
                        var recurPro = new Array();
                        var recurEje = new Array();                    
                        var etiquetas = new Array();                    

                        for(var i=0; i<data.length; i++){

                            filas += "<tr  class='datos-tabla'>\n\
                                <td>"+data[i]['vigencia']+"</td>\n\
                                <td>"+getHtmlColor(data[i]['semaSeguiFisico'])+"<br>"+nombreRango(data[i]['semaSeguiFinanciero'])+"</td>\n\
                                <td>"+"$"+formaterNumeros(data[i]['recurProgramados'])+"</td>\n\
                                <td>"+"$"+formaterNumeros(data[i]['recurEjecutados'])+"</td>\n\
                                <td>"+getHtmlColor(data[i]['semaSeguiFinanciero'])+"</br>"+nombreRango(data[i]['semaSeguiFinanciero'])+"</td>\n\
                            </tr>";

                            seguiFisi[i] = [ parseFloat(data[i]['semaSeguiFisico']) ];
                            seguiFina[i] = [ parseFloat(data[i]['semaSeguiFinanciero']) ];
                            recurPro[i] = [ parseFloat(data[i]['recurProgramados']) ];
                            recurEje[i] = [ parseFloat(data[i]['recurEjecutados']) ];   
                            etiquetas[i] = [ data[i]['vigencia'] ];

                        }
                    
                        $("#TablaAvanceVigencia").html(filas);   
                    
                        $('#graficaGeneral1').highcharts({
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: etiquetas,
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
                                '#058DC7',
                                '#50B432',                            
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
                                    } 
                                }
                            },                        
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'top',
                                x: -40,
                                y: 0,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: '#FFFFFF',
                                shadow: true,
                                enabled: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                    name: 'Avance Fisico',
                                    data: seguiFisi
                                },
                                {
                                    name: 'Avance Financiero',
                                    data: seguiFina                              
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
                                categories: etiquetas,
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
                                    format: '{value}'
                                }
                            },

                            colors: [
                                '#FE2E2E',
                                '#FE9A2E'                            
                            ],                                                        
                            tooltip: {
                                valueSuffix: ' millones'
                            },
                            plotOptions: {
                                column: {
                                    dataLabels: {
                                        enabled: false,
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
                                y: 0,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: '#FFFFFF',
                                enabled: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                    name: 'Recursos Programados',
                                    data: recurPro
                                },
                                {
                                    name: 'Recursos Ejecutados',
                                    data: recurEje                           
                                }]                                                
                        });                    

                    
                    
                }
        });                    
