//$(document).ready(function(){

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
                if(isLocalStorageAvailable())
                {
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
                    ,data:{opcion:'lista_sectores'}
                    ,success: function(data,textStatus,jqXHR){
                        
                        
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
                    ,data:{year:year,opcion:'seleccion_sector',id_sector: $('#selectSectorBasico').val()}
                    ,dataType:'json'  
                    ,success: function(data,textStatus,jqXHR){

                        var filas="";     

                        var metas = new Array();
                        var semaFis = new Array();
                        var semaFin = new Array();

                        for(var i=0; i<data.length; i++){
                            filas += "<tr class='datos-tabla'>\n\
                                <td><input type='checkbox' name='post[]' value="+data[i]['codigo']+"></td>\n\
                                <td>"+data[i]['codigo']+"</td>\n\
                                <td class='dato-tabla-nivel'>"+data[i]['nivel']+"</td>\n\\n\
                                <td class='dato-tabla-nivel'>"+data[i]['metas']+"</td>\n\
                                <td>"+data[i]['valorEsperado']+"</td>\n\
                                <td>"+data[i]['valorLogrado']+"</td>\n\
                                <td>"+data[i]['ponderado']+"</td>\n\
                                <td>"+data[i]['avancePonderado']+"</td>\n\
                                <td>"+getHtmlColor(data[i]['semaSeguiFisico'])+"</b></td>\n\
                                <td>"+nombreRango(data[i]['semaSeguiFisico'])+"</td>\n\
                                <td>"+"$"+formaterNumeros(data[i]['recurProgramados'])+"</td>\n\
                                <td>"+"$"+formaterNumeros(data[i]['recurEjecutados'])+"</td>\n\
                                <td>"+getHtmlColor(data[i]['semaSeguiFinanciero'])+"</b></td>\n\
                                <td>"+nombreRango(data[i]['semaSeguiFinanciero'])+"</td>\n\
                                <td>"+data[i]['fechaCorte']+"</td>\n\\n\
                             <td>"+data[i]['fecha_creacion']+"</td>\n\
                            </tr>";

                            metas[i] = data[i]['codigo'];

                            semaFis[i] =  parseFloat(data[i]['semaSeguiFisico']);
                            semaFin[i] = parseFloat(data[i]['semaSeguiFinanciero']);  

                        }

    //                    console.log(semaFis[1]);
    //                    console.log(semaFin[1]);
    //                    console.log(recurPro[1]);
    //                    console.log(recurEje);

                        $("#TablaSectoresBasicos").html(filas);                                        

                        $("#select_my_table").change();
                             

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
             });
         }
   

