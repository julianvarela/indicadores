/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var URL="";


$(document).ready(function (){
    $("#bton_login").click(login_usuario);

    
});



function login_usuario()
{
    
  var pass=$("#pass_login").val();  
  var correo=$("#correo_login").val();
    
     $.ajax({
        url:URL+"php/manejoVariables.php",
        dataType:'json',
        type:'POST' ,
        data:{opcion:'login',pass:pass,correo:correo},
        beforeSend:function(){
            
        },
        
        success:function ( data, textStatus, jqXHR ){
            
            if(data && data.correcto){
                
                if(isLocalStorageAvailable()){
                    
                    console.log(data.datos.correo);
                
                    localStorage.setItem("correo",data.datos[0].correo);
                    localStorage.setItem("usuario",data.datos[0].usuario);
                    localStorage.setItem("nombre",data.datos[0].nombre);
                
                }   
                
                console.log(data);                 
                location.href='noticias.html';
                
            }else{
                alert("Datos Incorrectos");
            }
            
        }
    });
}




