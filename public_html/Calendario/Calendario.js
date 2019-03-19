/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Calendario(IdObjeto){
    var _this = this;
    ///PROPIEDADES DEL OBJETO
    var ventana;
    var objeto;
    var body = document.getElementsByTagName("BODY")[0];
    
    function crearVentana(){
        ventana = document.createElement('div');//creando div
        ventana.id = "vtn";
        ventana.style = "-webkit-box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);";
        ventana.style.position = "fixed";
        ventana.style.width = "190px";
        ventana.style.height = "150px";
        ventana.style.border = "DarkGray 0px solid";
        ventana.style.top = (objeto.offsetTop+objeto.clientHeight) +  "px";//objeto.clientHeight
        ventana.style.left = (objeto.offsetLeft) +  "px";//objeto.clientWidth
        ventana.style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
        ventana.style.fontSize = "12px";
        ventana.style.fontWeight = "normal";
        ventana.style.backgroundColor = "GhostWhite";
        ventana.style.borderRadius = "3px";
        ventana.style.color = "#000000";
        body.appendChild(ventana);
        
    };
    function cerrar(){
        var padre = ventana.parentNode;
        padre.removeChild(ventana);
    }
    
    
    function buid(){
        ///OBTENIENDO EL OBJETO INPUT SI ES NECESARIO
        if(typeof (IdObjeto) === 'string'){
            objeto = document.getElementById(IdObjeto);
        }

        ///PROPIEDADES INPUT
        objeto.onfocus = function(){
            crearVentana();   
        };
        objeto.onblur = function(){
            cerrar();
        };
    };
    
    buid();
}