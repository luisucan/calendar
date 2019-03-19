/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Fecha.meses = new Array("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
Fecha.meses_cortos = new Array("","Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");
function Fecha(stringfecha,separador = "-"){
    var _this = this;
    var fecha = stringfecha || new Date();
    ///si la fecha es string la convertimos a objeto date
    if(typeof (fecha) === 'string'){
        fecha = convierteFechaStrinToDate(fecha);
    }
    
    function convierteFechaStrinToDate(fecha) {
        fecha = fecha.split(separador);
        return new Date(fecha[0], (fecha[1] - 1), fecha[2]);
    } 
    
    function completarCeros(numero){
        numero = numero+"";
        if(numero.length <= 1){
            return "0"+numero;
        }else{
            return numero;
        }
    }
    
    function getFechaMX(fecha){
        return completarCeros(fecha.getDate())+separador+completarCeros(fecha.getMonth()+1)+separador+fecha.getFullYear();
    }
    
    
    this.toString = function(){
        return getFechaMX(fecha);
    };
    
    this.diferenciaDiasFechas = function(fecha2) {
        var resta = fecha.getTime() - fecha2.getObjetoDate().getTime();
        return Math.round(resta / (1000 * 60 * 60 * 24));
    };
    
    this.getObjetoDate = function(){
        return fecha;
    };
    
    this.getDia = function(conCero = false){
        return (conCero)?completarCeros(fecha.getDate()):fecha.getDate();
    };
    
    this.getMes = function(conCero = false){
        return (conCero)?completarCeros(fecha.getMonth()+1):fecha.getMonth()+1;
    };
    
    this.getAnio = function(){
        return fecha.getFullYear();
    };
    
    this.getNumeroDiaSemana = function(){
        return fecha.getDay();
    };
    
    this.getFechaNombre = function(){
        return _this.getDia(true)+separador+Fecha.meses[_this.getMes()]+separador+_this.getAnio();
    };
    
    this.getFechaNombreCorto = function(){
        return _this.getDia(true)+separador+Fecha.meses_cortos[_this.getMes()]+separador+_this.getAnio();
    };
}