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
    var fecha = new Fecha();
    var dias = new Array();
    var body = document.getElementsByTagName("BODY")[0];
    
    function crearVentana(){
        ventana = document.createElement('div');//creando div
        ventana.id = "vtn";
        ventana.style = "-webkit-box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);";
        ventana.style.position = "fixed";
        ventana.style.width = "190px";
        //ventana.style.height = "150px";
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
        
        tabla_dias();
    };
    
    function tabla_dias(){
        var DS = Fecha.dias_semanas_corto;
        ventana.innerHTML = "";
        var tabla = document.createElement('table');
        tabla.style = "border: 1px solid silver;width:100%;border-collapse:collapse;";
        var tr = document.createElement('tr');
        var td;
        for (var i=1;i<DS.length;i++){
            td = document.createElement('td');
            td.style = "text-align: center;background: #616161;border: 1px solid #9e9e9e;color: white;font-weight: bold;";
            td.innerHTML = Fecha.dias_semanas_corto[i];
            tr.appendChild(td);
            
            tabla.appendChild(tr);
        }
        ventana.appendChild(tabla);
                
        var primerDia = fecha.getPrimerDiaMes();
        var ultimoDia = fecha.getUltimoDiaMes();
        var ultimoDiaMesAnterior = (function(){
            var mes = fecha.getMes();
            if(mes === 0){mes = 12;}
            return fecha.getPrimerDiaMes(mes-1);
        })().getUltimoDiaMes();
        var primerDiaMesSiguiente = (function(){
            var mes = fecha.getMes();
            if(mes === 12){mes = -1;}
            return fecha.getPrimerDiaMes(mes+1);
        })();
        var numeroDiaUltimaSemanaAnterior = ultimoDiaMesAnterior.getNumeroDiaSemana();
        var primerDiaUltimaMesAnterior = (function(){
            var fecha = ultimoDiaMesAnterior;
            for (var i = 0; i < numeroDiaUltimaSemanaAnterior-1; i++) {
                fecha = fecha.getDiaAnterior();
            }
            return fecha;
        })();
        
        var numero_dia = 1;
        var dias_del_mes = primerDia;
        for(var y = 0;y< 6;y++){
            tr = document.createElement('tr');
            DS.forEach(function(dia_semana,index){
                if(index === 0)
                    return;
                
                td = document.createElement('td');
                
                if(numeroDiaUltimaSemanaAnterior !== 0){
                    td.style = "text-align: center;cursor:pointer;color:silver;";
                    td.innerHTML = primerDiaUltimaMesAnterior.getDia(true);
                    td.fecha = primerDiaUltimaMesAnterior;
                    tr.appendChild(td);

                    primerDiaUltimaMesAnterior = primerDiaUltimaMesAnterior.getDiaSiguiente();
                    numeroDiaUltimaSemanaAnterior--;
                }else if(numero_dia <= ultimoDia.getDia()){
                    td.style = "text-align: center;cursor:pointer;color:black;";
                    td.innerHTML = dias_del_mes.getDia(true);
                    td.fecha = dias_del_mes;
                    tr.appendChild(td);
                    
                    numero_dia++;
                    dias_del_mes = dias_del_mes.getDiaSiguiente();
                }else{
                    td.style = "text-align: center;cursor:pointer;color:silver;";
                    td.innerHTML = primerDiaMesSiguiente.getDia(true);
                    td.fecha = primerDiaMesSiguiente;
                    tr.appendChild(td);
                    
                    primerDiaMesSiguiente = primerDiaMesSiguiente.getDiaSiguiente();
                }
                
                td.onclick = function(){
                    console.log(this.fecha.toString());
                };
            });
            tabla.appendChild(tr);
        }
        
    }
    
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
            //scerrar();
        };
    };
    
    buid();
}