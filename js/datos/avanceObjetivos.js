/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var URL="";
var year=null;
//$(document).ready(function(){
    
    
 var datos = leerGET();
 
 year=datos['year'];
 
 if(year)
 {   
    ///ajax para los datos
    //ncargar html o configurar visualmente con los datos que llega
    $('.my_year').html(year);
    
    $("#nav").html(construirNav(2012,2015,year));
      
      
      ///cambiar apariencia login
      if(isLocalStorageAvailable())
      {
          $(".my_usuario").html(localStorage.getItem("correo"));
          
          
      }
    ///
    //
    
    //ajax para los datos
    
     $.ajax({
        url:URL+"php/datosAvObjetivos.php",
        dataType:'json',
        type:'POST' ,
        data:{opcion:'avance_objetivos',year:year},
        beforeSend:function(){
            
        },
        
        success:function ( data, textStatus, jqXHR ){
           
           
           
           console.info(data);
           ///verifique que los datos han llegago bien ... .
            if(data &&  data.correcto &&  data.datos)
            {
                
                ///para los colores
                setColor(data.colores);//establece los colores por defecto de estado
                var etiquetas=[];
                var datosFin=[];
                var datosFis=[];
                
                var filas="";
                 for(var i=0; i< data.datos.length; i++){
                        filas += "<tr  class='datos-tabla'>"
                            +" <td>"+data.datos[i]['codigo']+"</td> "
                            +" <td class='dato-tabla-nivel'>"+data.datos[i]['nivel']+"</td> "                    
                            +" <td>"+getHtmlColor(data.datos[i]['semaforoSeguimientoFis'])+"</td> "
                            +" <td>"+data.datos[i]['ponderado']+"</td> "
                     
                            +" <td>"+"$"+formaterNumeros( data.datos[i]['recursosProgramado'])+"</td> "                    
                            +" <td>"+"$"+formaterNumeros( data.datos[i]['recursosEjecutados'])+"</td> "
                    
                            +" <td>"+getHtmlColor(data.datos[i]['semaforoSeguimientoFin'])+"</td> "
                            +" <td>"+nombreRango(data.datos[i]['semaforoSeguimientoFin'])+"</td> "
                       +" </tr>";
               
               
                       //guarda datos para las graficas
                       datosFis.push(parseFloat(data.datos[i]['semaforoSeguimientoFis']));
                       datosFin.push(parseFloat(data.datos[i]['semaforoSeguimientoFin']));
                       etiquetas.push(data.datos[i]['codigo']);
               
               
                 
                    }
                    
                    $("#TablaAvanceObjetivos").html(filas);  
                
                
                //graficas 
                
                //Grafica Fisica
                graficaOE_grafica1(etiquetas,datosFis);
                 graficaOE_grafica2(etiquetas,datosFin);
                
                
                
            }//fin de if --> validacion 
            
        }
    });
    
    
    
//});

}//fin de la validacion de año  
else{
    
    
    alert("Direccion Incorrecta ");
    
}






/***
 * dibujoa la grafica  FIsico 
 * @returns {undefined}
 */
function graficaOE_grafica1(miEtiqueta,misDatos){
    
    
                    $('#graficaGeneral1').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: miEtiqueta,
                            title: {
                                text: 'Código Nivel PDM'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'semaforo seguimiento',
                                //align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        colors: [
                            '#058DC7',
                            '#50B432',
                            '#ED561B',
                            '#DDDF00',
                            '#24CBE5',
                            '#64E572',
                            '#FF9655',
                            '#FFF263',
                            '#6AF9C4'],                                                        
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
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
                        series: [{
                            name: 'Semaforo',
                            data: misDatos,                            
                            colorByPoint: true                            
                        }]
                    });
    
    
}










/***
 * dibujoa la grafica  Financiero 
 * @returns {undefined}
 */
function graficaOE_grafica2(miEtiqueta,misDatos){
    
    
                    $('#graficaGeneral2').highcharts({
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            categories: miEtiqueta,
                            title: {
                                text: 'Código Nivel PDM'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'semaforo seguimiento',
                                //align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        colors: [
                            '#058DC7',
                            '#50B432',
                            '#ED561B',
                            '#DDDF00',
                            '#24CBE5',
                            '#64E572',
                            '#FF9655',
                            '#FFF263',
                            '#6AF9C4'],                                                        
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
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
                        series: [{
                            name: 'Semaforo',
                            data: misDatos,                            
                            colorByPoint: true                            
                        }]
                    });
    
    
}