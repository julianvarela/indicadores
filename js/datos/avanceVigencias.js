 ///carga el menu de navegacion
    $("#nav").html(construirNav(2012,2015,"1"));
        

    ///cambiar apariencia login
    if(isLocalStorageAvailable()){
        $(".my_usuario").html(localStorage.getItem("correo"));
    }

                    var vigencia = '2012 - 2015';


                    var seguiFisi = new Array();
                    var seguiFina = new Array();
                    var recurPro = new Array();
                    var recurPro = new Array();
                                      
                    
                    //$("#TablaAvanceGeneral").html(filas);
                    var etiquetas = ['2012','2013','2014','2015'];
                    
                    seguiFisi = [76, 21.1, 54.3, 16.3];
                    seguiFina = [71.83, 100, 74.53, 80];
                    
                    recurPro = [1555927092.60, 82000004.00, 316027795.00, 1342773295.09];
                    recurEje = [1117664629.63, 82000001.00, 235543506.00, 1075495031.69];
                    
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