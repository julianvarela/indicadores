
/***
 * @param {year} año en formato YYYY
 * @param {String} incialse de de la clase puede ser .OG ,OE ,PR ,SPR
 * @param {int} pagina
 * @returns {boolean} false
 */
var URL="";

var _colores=null;
var idTable=null;/// id de tabla donde se muestra los resultados

function cargar_opcion1 (year,clase,pagina){    
    
    location.href=pagina+"?year="+year;
    
    return false;
}


/**
 * descompone los datos recibido por get 
 * @returns {Array} con los datos asociados
 */
function leerGET(){ 
    
  var datosURL = location.search.substr(1,location.search.length); 
  var claveValor = datosURL.split("&"); 
  var datos = new Array(); 
  var variable = ""; 
  var valor = ""; 
  
  for(i=0;i<claveValor.length;i++){ 
    var aux = claveValor[i].split("="); 
    variable = aux[0]; 
    valor = aux[1]; 
    datos[variable+""] = valor; 
  } 
  
  return datos; 
} 



/*
function cargarOpcion1 (year,clase,pagina)
{
    $.ajax({
        url:URL+"php/manejoVariables.php",
        dataType:'json',
        type:'POST' ,
        data:{opcion:'year',year:year},
        beforeSend:function(){
            
        },
        
        success:function ( data, textStatus, jqXHR ){
           
            if(data &&  data.correcto)
            {
                
                location.href=pagina;
                
            }
            
        }
    });
    
  
    
    return false;
}


*/





/***
 * guarda el json de la base de datos para genrea lso estados 
 * maneja colores y la palabra de los estados 
 * @param {JSON} miColor colores de Json de la base de datos
 * 
 */
function setColor(miColor){
    
    if(miColor){
        
        _colores=[];
        for(var i=0; i<miColor.length ; i++){
            var fila={
               nombre: miColor[i].nombre_estado
               ,color: miColor[i].color
               ,rango_min: parseFloat(miColor[i].rango_min)
               ,rango_max: parseFloat(miColor[i].rango_max)
            };
           
            _colores[i]=fila;
        }        
        
    }
    
    //sera el jso de la generado de la base de datos
    
}



/**
 * retorna el nombre que le corresponde segun la ubicaion del rango
 * @param {Number} valor valor del numero
 * @returns {String} nombre del rango 
 */
function nombreRango(valor){
    
    var nombre="-";
    valor = parseFloat(valor);
    
    if(_colores){
        
        for(var i=0;i<_colores.length; i++){
            
            if(valor>=_colores[i].rango_min && valor<=_colores[i].rango_max){
                
                nombre=_colores[i].nombre;
                break;   
            }
        }
    }
    
    return nombre;
}


/**
 * gener el html <b> para reslata el color del estado
 * @param {Number} valor puede ser int o float
 * @returns {String} el html <b class="badge" style='{miColor}'>{valor}</b>
 */
function getHtmlColor(valor){
        
   var html="<b class='badge' ";
   var estilo=" style='background-color:white' "
    valor = parseFloat(valor);
        
    if(_colores){
        
        for(var i=0;i<_colores.length; i++){
		
            if(valor>=_colores[i].rango_min && valor<=_colores[i].rango_max){
                estilo=" style='background-color:"+_colores[i].color+"' ";
                break;   
            }
        }
    }
    
    return html+estilo+" >"+valor+"</b>";
}



/***
 * formate los numeros de la forma 232,113.32
 * @returns {undefined}
 */

function formaterNumeros(numero)
{
     
    numero=numero+"";
    
    var salida="";
    var datosNumeros = numero.split(".");
    
    var numerosParte1= datosNumeros[0];
    
    for(var i =0 ; i< numerosParte1.length ; i++){
        
        if((i+1)%3==0){
           salida=","+numerosParte1[numerosParte1.length-1-i]+salida;        
        }
        else{
            salida=numerosParte1[numerosParte1.length-1-i]+salida;
        }        
        
    }//fin del for
    
    
    
    if(salida.length>0 && salida[0]==","){        
        salida=salida.substring(1,salida.length);
    }
    
    
    //reunir
    if(datosNumeros.length>=2){        
        salida=salida+"."+datosNumeros[1];
    }
    
    return salida;
}


/***
 * si soportea localstorange
 * @returns {window|Boolean|String}
 */
function isLocalStorageAvailable() {
    
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
    
}


/**construirNav
 * construye el html de navegacion
 * @param {int} inicio el año de inicio YYYY
 * @param {int} fin el año de fin YYYY
 * @param {int} actual el año actual a resalta YYYY
 * @returns {String}
 */
function construirNav(inicio,fin1,actual){

    actual=parseInt(actual.trim());
    
    var html=" <ul class='nav' data-spy='affix' data-offset-top='50'> "
            +"  <li  class='"+("0"==actual?" active ":"")+"' ><a href='noticias.html'><i class='fa fa-home fa-lg'></i><span>Noticias</span></a></li>";
      
    for(var i=0 ;  localStorage.getItem("year"+i); i++){
        

        var valores= localStorage.getItem("year"+i).split("_");
        var yearAux=valores[0];
        var activo =valores[1];



        html+=" <li class='"+(yearAux==actual?" active ":"")+"  "+(activo=="0"?" invisible_menu ":" dropdown-submenu ")+"' > "
          +"  <a href='#'><i class='fa fa-th fa-lg'></i><span>"+yearAux +"</span></a>  ";
        
        if(activo=="1")
        {
          html+="  <ul class='dropdown-menu'> "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'OG' ,'AvanceGeneral.html')\" >Avance General</a></li> "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'OE','AvanceObjetivos.html')\" >Avance Objetivos</a></li> "            
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux+",'PR','AvanceProgramas.html') \" >Avance Programas</a></li> "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'SPR' ,'AvanceSubprogramas.html')\" >Avance Subprogramas</a></li> "
          
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'SPR' ,'SectoresBasicos.html')\">Sectores Basicos</a></li>             "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'SPR' ,'SecretariasDespacho.html')\" >Secretarias Despacho</a></li> "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'SPR' ,'DependenciasAdmin.html')\" >Dependencias Administrativas</a></li> "
          +"  </ul> ";
        }
    }
    
    html+="  <li  class='"+("1"==actual?" active ":"")+"' ><a href='AvanceVigencia.html'><i class='fa fa-bar-chart-o fa-lg'></i><span>Ponderado</span></a></li>"
         +" </ul>";
    
 return html; 

} 



/**construirNavUsuario
 * construye el html de navegacion
 * @param {int} inicio el año de inicio YYYY
 * @param {int} fin el año de fin YYYY
 * @param {int} actual el año actual a resalta YYYY
 * @returns {String}
 */
function construirNavUsuario(inicio,fin1,actual){

    actual=parseInt(actual.trim());
    
    var html=" <ul class='nav' data-spy='affix' data-offset-top='50'> "
            +"  <li  class='"+("0"==actual?" active ":"")+"' ><a href='noticias.html'><i class='fa fa-home fa-lg'></i><span>Noticias</span></a></li>";
      
    for(var i=0 ;  localStorage.getItem("year"+i); i++){        

        var valores= localStorage.getItem("year"+i).split("_");
        var yearAux=valores[0];
        var activo =valores[1];

        html+="<li class='"+(yearAux==actual?" active ":"")+"'>"
            +"   <a href='ProgramasUsuario.html'><i class='fa fa-th fa-lg'></i><span>yearAux<br/><span class='badge bg-primary'>10</span></span></a>";            
    }    
   
    

 return html; 

} 



/**
 * genere el html de las opciones del select
 * @param {array} de  forma id , nombre con los datos de opcion
 *  @return {String} html de los option
 * */

function generarHtmlOpcion(datos){
    
    var html="";
    
    for(var i=0; i<datos.length; i++){        
        html+="<option value='"+datos[i].id+"'> "+datos[i].nombre+"</option>";        
    }
    
  return html;  
    
}



/**
 * genera el html de footer de la tabla para controlar su paginado

 * @param {int} fin
 * @param {int} actual
 * @param {int} tam tamaño de particion cantidad max de filas que se puestra por pagina
 * @returns {String} html
 */
function generarHtmlPaginadoTable(fin, actual,tm){
    
    if(fin<=1)
    return "";
    
    var html="<div class='col-sm-6 text-center-sm'>";
      html+="<span class='text-muted inline m-t-small'>"+actual+"/"+fin+"</span></div>";
      html+= "<div class='col-sm-6 text-right text-center-sm'>  "              ;
      html+=   "      <ul class='pagination m-t-none m-b-none'>";
      
      
      ///anterior
      if(actual==1){
        html+=" <li><a href='#' onclick='return false;' class='my_disabled'  ><i class='fa fa-chevron-left '></i></a></li>";  
      }
      else{
        html+=" <li><a href='#' onclick=\"irPaginaTable("+1+","+tm+")\"><i class='fa fa-chevron-left'></i></a></li>";            
      }
      
      
      for(var i=1; i<=fin; i++){
          html+=" <li><a href='#'  "+ (actual==i? " onclick='return false ;' class='my_disabled' " : " onclick=\"irPaginaTable("+i+","+tm+")\" ")+ ">"+i+"</a></li>";   
      }
          
      
      
      ///siguiente
      if(actual==fin){
        html+="<li onclick='return false;'  ><a href='#' onclick='return false;'class='my_disabled'  ><i onclick='return false;' class='fa fa-chevron-right my_disabled'></i></a></li>";  
      }
      else{
        html+=" <li ><a href='#' onclick=\"irPaginaTable("+fin+","+tm+")\"><i class='fa fa-chevron-right'></i></a></li>";  
          
      } 
    
    
        html+= " </ul> </div>";
     
    
      return html;
}



/**
 * muestra los elementos de la particion 
 * @param {type} irPagina numero de la pagina a ver .. inicia desdde 1 
 * @param {type} tm
 *  @param {String} miIdTable de la tabla
 * @returns {undefined}
 */
function irPaginaTable(irPagina,tm,miIdTable){
    
    if(miIdTable)
        idTable=miIdTable;
    
    var totaFilas= $(idTable).find("tr").length;
    
    
   
    //valida que debe ser menor al  las particiones 
    if(tm<totaFilas){
        
        var particiones= Math.ceil(totaFilas/tm);
        
        
        var $filas= $(idTable).find("tr");
        $filas.hide();
        
        
        for(var i=(tm*(irPagina-1)); i< (tm*irPagina); i++){
            $($filas[i]).show();
        }
        
        
            
       $("#my_footer_table").html(generarHtmlPaginadoTable(particiones,irPagina,tm));
        
    }
    //muy grande se muestra todo y elimina la paginacion
    else{
        
        var $filas= $(idTable).find("tr");
        $filas.show();
        $("#my_footer_table").html("");
    }
    
   return false; 
}


/**
 * redonde el numero a el entre mayor 
 * @param {Float} n1
 
 * @returns {undefined}
 */
function redoarMayor(n1){
    
    var parteEntera= parseInt(n1);
    var diferencia =n1- parteEntera;
    
    if(diferencia==0)
        return n1;
    else
        return n1+1;
    
}




//$(function(){

     $('a[href*=#]').click(function(){

     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
         && location.hostname == this.hostname) {

             var $target = $(this.hash);

             $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

             if ($target.length) {

                 var targetOffset = $target.offset().top;

                 $('html,body').animate({scrollTop: targetOffset}, 500);

                 return false;

            }

       }

   });

//});