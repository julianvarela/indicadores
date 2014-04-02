/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/***
 * @param {year} año en formato YYYY
 * @param {String} incialse de de la clase puede ser .OG ,OE ,PR ,SPR
 * @param {int} pagina
 * @returns {boolean} false
 */
var URL="";

var _colores=null;


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
function setColor(miColor)
{
    
    if(miColor)
    {
        
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
    
    
    
    if(_colores)
    {
        for(var i=0;i<_colores.length; i++)
        {
            
            if(valor>=_colores[i].rango_min && valor<=_colores[i].rango_max)
            {
                
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
function getHtmlColor(valor)
{
    
    
   var html="<b class='badge' ";
   var estilo=" style='background-color:white' "
    valor = parseFloat(valor);
    
    
    
    if(_colores)
    {
        for(var i=0;i<_colores.length; i++)
        {
            
            if(valor>=_colores[i].rango_min && valor<=_colores[i].rango_max)
            {
                
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
    
    for(var i =0 ; i< numerosParte1.length ; i++)
    {
        
        if((i+1)%3==0)
        {
            salida+=","+numerosParte1[i];
        
        }
        else{
            salida+=numerosParte1[i]; 
        }
        
        
    }//fin del for
    
    
    
    if(salida.length>0 &&  salida[0]==",")
    {
        
        salida=salida.substring(1,salida.length);
    }
    
    
    //reunir
    if(datosNumeros.length>=2)
    {
        
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
function construirNav(inicio,fin,actual)
{
    actual=parseInt(actual.trim());
    
    var html=" <ul class='nav' data-spy='affix' data-offset-top='50'> "
            +"  <li ><a href='index1.html'><i class='fa fa-home fa-lg'></i><span>Seguimiento</span></a></li>";
       
      
    for(var yearAux=inicio ; yearAux <=fin; yearAux++)
    {
        html+=" <li class='dropdown-submenu "+(yearAux==actual?" active ":"")+"' > "
          +"  <a href='#'><i class='fa fa-th fa-lg'></i><span>"+yearAux +"</span></a>  "
          +"  <ul class='dropdown-menu'> "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'OG' ,'AvanceGeneral.html')\" >Avance General</a></li> "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'OE','AvanceObjetivos.html')\" >Avance Objetivos</a></li> "            
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux+",'PR','AvanceProgramas.html') \" >Avance Programas</a></li> "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'SPR' ,'AvanceSubprogramas.html')\" >Avance Subprogramas</a></li> "
          
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'SPR' ,'SectoresBasicos.html')\">Sectores Basicos</a></li>             "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'SPR' ,'SecretariasDespacho.html')\" >Secretarias Despacho</a></li> "
          +"    <li><a href='#' onclick=\"cargar_opcion1("+yearAux +",'SPR' ,'DependenciasAdmin.html')\" >Dependencias Administrativas</a></li> "
          +"  </ul> ";
    }
    
    
    html+=" </ul>"
 return html; 

} 
