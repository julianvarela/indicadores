$(document).ready(function(){
    
        /*
         * Hace el llamado para obtener los datos de la tabla de Avance de Objetivos y los carga en su tabla
         */     
        $.ajax({
                url:'php/datosAvObjetivos.php'
                ,type:'POST'
                ,dataType:'json'  
                ,success: function(data,textStatus,jqXHR){

                    var filas="";
                    
                    for(var i=0; i<data.length; i++){
                        filas += "<tr>\n\
                            <td>"+data[i]['codigo']+"</td>\n\
                            <td>"+data[i]['nivel']+"</td>\n\
                            <td><b class='badge bg-success'>"+data[i]['semaSeguiFisico']+"</b></td>\n\
                            <td>"+data[i]['estadoMetaProducto']+"</td>\n\
                            <td>"+data[i]['recurProgramados']+"</td>\n\
                            <td>"+data[i]['recurEjecutados']+"</td>\n\
                            <td><b class='badge bg-success'>"+data[i]['semaSeguiFinanciero']+"</b></td>\n\
                            <td>"+data[i]['estadoFinanciero']+"</td>\n\
                        </tr>";
                    }
                    
                    $("#TablaAvanceObjetivos").html(filas);                                        
                }
         }); 

});