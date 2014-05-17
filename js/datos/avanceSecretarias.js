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
                
                
                //la direccion de si es secretaria o es dependencia
                var tipodeBusqueda="avance_general_secretaria";
                //si es dependencia busca la tabla de dependencia si  existe cambia la direcccion
                if($("#TablaAvanceDependencias").length>0){
                    
                    tipodeBusqueda="avance_general_dependencia";
                    
                }
                
                
                
                
                
             /*
             * Hace el llamado para obtener los datos de la tabla de Avance General  y los carga en su tabla
             */    
            $.ajax({
                    url:URL+'php/datosSecretariasDependencias.php'
                    ,type:'POST'
                    ,dataType:'json' 
                    ,data:{ year:year, opcion:tipodeBusqueda }
                    ,beforeSend:function(jqXHR,settings){
                        $(".body-preload").css({display:'inline'});
                    }    
                    ,error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Se presentó un problema con la conexión a Internet");
                    }                                        
                    ,success: function(midata,textStatus,jqXHR){

                     
                            
                            var data=midata.datos;
                            
                            var filas="";     
                            
                             var colores=midata.colores;
                             
                       
                             setColor(colores);//establece los colores por defecto de estado 

                            var metas = new Array();
                            var semaFis = new Array();
                            var semaFin = new Array();

                            for(var i=0; i<data.length; i++){
                                filas += "<tr class='datos-tabla'>\n\
                                    \n\<td class='dato-tabla-nivel'>"+(i+1)+"</td>\n\\n\
                                    <td class='dato-tabla-nivel'>"+data[i]['nombre']+"</td>\n\\n\
                                    <td>"+getHtmlColor(data[i]['semaforo_seguimiento_fisico'])+"</b></td>\n\
                                    <td>"+getHtmlColor(data[i]['semaforo_seguimiento_financiero'])+"</td>\n\ ";
                                 
                                    //if($("#TablaAvanceSecretarias").length>0)
                                    //    filas +=" <td>"+nombreRango(data[i]['semaforo_seguimiento_fisico'])+"</td>\n\ ";


                                filas +=" </tr>";

                                if($("#TablaAvanceSecretarias").length>0){
                                    metas[i]= data[i]['nombre'].trim().split(" ");
                                    metas[i]=  metas[i][metas[i].length-1];

                          
                                }else{//para dependencias 
                                    metas[i]=(i+1);
                                    
                                }
                                
                                
                                semaFis[i] =  parseFloat(data[i]['semaforo_seguimiento_fisico']);
                                semaFin[i] = parseFloat(data[i]['semaforo_seguimiento_financiero']);  

                            }

        //                    console.log(semaFis[1]);
        //                    console.log(semaFin[1]);
        //                    console.log(recurPro[1]);
        //                    console.log(recurEje);

                            if($("#TablaAvanceSecretarias").length>0){
                                $("#TablaAvanceSecretarias").html(filas);                                  
                                dibujarGraficaAvanceSecretaria("graficaGeneral2",semaFis,semaFin,metas,"Secretaria")
                            }
                            else {
                                $("#TablaAvanceDependencias").html(filas);   
                                
                                dibujarGraficaAvanceSecretaria("graficaGeneral2",semaFis,semaFin,metas,"Dependencia")
                            }



                      $(".body-preload").css({display:'none'});
                     
                            
                    }
                });


     }
     
     
     
     
     /***
     
 *dibujar grafica de dependencias y secretarias 
 **/

function dibujarGraficaAvanceSecretaria(mmiId,semaFis,semaFin,metas,labelX)
{
    

                        $('#'+mmiId).highcharts({
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: metas,
                                title: {
                                    text: labelX,  
                                    margin:10,
                                    style: {
                                        fontWeight: 'bold',  
                                        fontSize: '13px'                                    
                                    }                                                                
                                },
                                labels: {                                
                                    y: 20,   
                                   // rotation:10,
                                    style: {
                                        fontWeight: 'bold',  
                                        fontSize: '10px'                                    
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
                                            color: '#656565',
                                            fontSize: '11px',
                                            fontFamily: 'Verdana, sans-serif',
                                            //fontWeight: 'bold'                                                            
                                        }                             
                                    } 
                                }
                            },                        
                             legend: {
                                layout: 'vertical',
                                align: 'low',
                                verticalAlign: 'bottom',
                                enabled: false,
                               x:1,
                               y:20,
                                floating: true,
                                borderWidth: 1,
                                backgroundColor: '#FFFFFF',
                                shadow: true
                            },
                            credits: {
                                enabled: false
                            },
                            series: [{
                                    name: 'Fisico',
                                    data: semaFis,                                                   
                                },
                                {
                                    name: 'Financiero',
                                    data: semaFin,                                
                                }]                        
                           /* series: [{
                                name: 'Avance',
                                data: semaFis,                                                   
                            }]*/
                        });
    
}