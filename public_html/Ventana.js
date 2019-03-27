/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ventana.generarIdentificadorUnico = 0;
function Ventana(IdVentana,objetoBody = null){
    var _this = this;
    
    /////PROPIEDADES DE LA VENTNAA
    var ventana,encabezado,divCuerpo,divModal;
    var Ancho = 390,Alto = 190;
    var isDown = false;
    var viewModal = false;
    var colorModal = "gray";
    var habilitarMaximizarMinimizar = true;
    
    ///VARIABLES EVENTOS
    var EventoAntesDeAbrir = function(){};
    var EventoDespuesDeAbrir = function(){};
    var EventoAntesDeCerrar = function(){};
    var EventoDespuesDeCerrar = function(){};
    var EventoVentanaMovimiento = function(){};
    
    ///VARIABLES ENCABEZADO
    var AltoEncabezado = 20;
    
    ////POSICIONES
    this.Centro = 0;
    this.Arriba = 1;
    this.Abajo = 2;
    this.Izquierda = 3;
    this.Derecha = 4;
    
    ///PROPIEDADES DE LA VENTANA TITULO
    var Titulo = "Default";
    var colorTitulo = "white";
    var fuenteTitulo = "bold";
    var colorFondoTitulo = "#01579b";
    var bordeTitulo = "0px solid silver";
    
    ///FUNCIONES PARA PROPIEDADES
    this.getTitulo = function(){
        return Titulo;
    };
    this.getColorTitulo = function(){
        return colorTitulo;
    };
    this.getFuenteTitulo = function(){
        return fuenteTitulo;
    };
    this.getBordeTitulo = function(){
        return bordeTitulo;
    };
    this.getColorFondoTitulo = function(){
        return colorFondoTitulo;
    };
    
    ///UBICANDONOS EN EL BODY
    var body;
    if(objetoBody !== null){
        body = document.getElementById(objetoBody);
    }else{
        body = document.getElementsByTagName("BODY")[0];
    }     
    
    console.log(document.getElementsByTagName("BODY"));
    
    //****************************************************************///
    //**************CLASE VENTANA ENCABEZADO**************************///
    //****************************************************************///
    var ventanaEncabezado = function(ventana){
        ///VARIABLES PARA LOS ESPACIOS DEL TITULO
        var divEncabezado,divDerecho,divCentro,divIzquierdo,botoneraTitulo;
        
        ///VARIABLES PARA MAXIMIZAR Y MINIMIZAR
        var isMaximizado = false,h,w,x,y;
        
        var crearPanelIzquierdo = function(conBotonera = false){
            divIzquierdo = document.createElement('div');
            divIzquierdo.style.floatValue = "left";
            divIzquierdo.style.display = "inline-block";
            divIzquierdo.style.width = "15%";
            divIzquierdo.style.textAlign = "center";
            divIzquierdo.orientacion = 1;
            divIzquierdo.innerHTML = "";
            
            if(conBotonera)
                botoneraTitulo = new crearBotoneraTitulo(divIzquierdo);
            
            return divIzquierdo;
        };
        
        var crearPanelCentral = function(){
            divCentro = document.createElement('div');
            divCentro.style.floatValue = "left";
            divCentro.style.display = "inline-block";
            divCentro.style.width = "67%";
            divCentro.style.height = "90%";
            divCentro.style.textAlign = "center";
            divCentro.innerHTML = ventana.getTitulo();
            
            return divCentro;
        };
        
        var crearPanelDerecho = function(conBotonera = false){
            divDerecho = document.createElement('div');
            divDerecho.style.floatValue = "left";
            divDerecho.style.display = "inline-block";
            divDerecho.style.width = "15%";
            divCentro.style.height = "90%";
            divDerecho.style.textAlign = "right";
            divDerecho.orientacion = 2;
            divDerecho.innerHTML = "";
            
            if(conBotonera){
                botoneraTitulo = new crearBotoneraTitulo(divDerecho);
            }
            
            return divDerecho;
        };
        
        var crearBotoneraTitulo = function(div){///1 derecho, 2 izquierdo
            var imgMaximizar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAVZJREFUeNpiYMAB9u/fn/v////X/ykEWA0/efIkw79//w4A5f/RxAIhISGGo0ePnvxPBcCCzYJ3794xcHJy1gKZZUCsCMS/GIgDIBeDzJQFYg6QACMulfLy8qzc3NwiQCYbVCNRQFpaWmTXrl1LgExNuOCBAwcYTp8+zcDMzMxAKZCUlBQChsx5eBxAU8t+ID5y4sQJd6DLWSixQEFBQRxo1gW4BWhJca+Ojo4ENS1gAoqJIMsDkyc7AxUBExr/FykRSo4FVAejFoxaQBYAlW+sNLOAkZHxD5B6QjMLfv78+fHixYs9QOYFMEarH66pqqpKUcOiq1evgjF6yckKLKwkf//+/ZfEMP/z69evj8+ePfsNE9TW1oZIotWbP4H4HpRmJNICUIX06MaNG72ampq70SXRfcCOUhMRDzS/f/8uCawB9b9+/YpWiVIPnL958yaGzQABBgBpC7wCSqTUAQAAAABJRU5ErkJggg==";
            var imgMinimizar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAECAYAAACUY/8YAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACRJREFUeNpi+P//f/J/2oEHjCCSgYaAiYHGAGRBCg3NfwgQYABykmQsGcr+rwAAAABJRU5ErkJggg==";
            var imgCerrar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAs5JREFUeNqkVktrWlEQvhTju6aLQqFQlAqKLpSQiETUGFRCiOJC3Ld/oE1tm6gJVdt/kR+QhevsCl0Vug8oKmqIxmeN1fqK1dTOiAY5OddHOjB4uc75Zs4533xzmeFwGALvgf8BD6jV6sfMf5hMJhMCjhe8Az5kxuATu2m1Wj6VSiV4CLhUKuXB+neIMwFkxpVPW7tWq/m1Wu1SSeRyORfWYeXtaTBMEBjet9+lUsm/vr7OWwQcdrxSKBSw8gYJxOCZw+8hJUk9l8sF9Hr9zCQajYZzeXn5HuJrFIzQKGhtbU3MkqR2cXFxtLW1xaWBww456XT6A8RdU9Z+2tjYkNwFGwwGtp1cp1KpY6vVujINvrm5yYnH4wj+k7ImaDQaV+9VZLFYxL1ezwcBt2SSZDJ5vLOzM9qJ2WxeicViB/C+QqscilllPVO73S5uNps+gr6jJIlE4mMkEnkWjUbfUMD/9vv94O7urmQuK/b29kTVahXZ1SVAyuBfwQvE+3673Q67XC7Jwrx2Op3CYrEYIHlNsRvgf8jtdouX7kyoSHB+fo4Xn2UBL8BFH3k8HtGDteXk5OQJAH1jSfDj9PT06az1j2b9Cazh63S6V/D4kiXkBTTaazzOpSsHNgmvrq6wQ1tz7qCLhEBiLAy+vb0trFQqXsoFY1N9H7Np2npIbaT4XHDoQFGj0fBOS+7YfmUymcDZ2dlzaDqaPNxik2KzsoKDsIm63S6C90lw0KTPDoeDj3HQqVyUDxYNOkTZuQcO+i8aDAZvKTJRz2azX6BD+dPxKIAohCwqeogCehesVCpxzO1juxOBjXw+H7bZbAKWHfNQ0rEIWhIYBeLJDN2nBDTL5XLIZDLNnGw4lHA44ZCiYPiZ8YAmrVOv18NwlgvxG8crjtnJoCdHZoc4mh4IVxAabCltwQ8F/GAgVZihVB+GC3rQp4tCoRCSM/6fAAMAYNlRkJLaOtoAAAAASUVORK5CYII=";  
            
            var btnMaximizar,btnMinimizar;
            
            var fnMaximizarMinimizar = function(bol){
                if(!isMaximizado){
                    w = ventana.getDivVentana().clientWidth;
                    h = ventana.getDivVentana().clientHeight;
                    x = ventana.getDivVentana().offsetTop;
                    y = ventana.getDivVentana().offsetLeft;
                    ventana.getDivVentana().style.width = "100%";
                    ventana.getDivVentana().style.height = "100%";
                    ventana.getDivVentana().style.left = "0px";
                    ventana.getDivVentana().style.top = "0px";
                    isMaximizado = true;
                }else{
                    ventana.getDivVentana().style.width = w+"px";
                    ventana.getDivVentana().style.left = ((document.body.clientWidth-w) / 2) +  "px";
                    ventana.getDivVentana().style.height = h+"px";
                    ventana.getDivVentana().style.top = ((document.body.clientHeight+h) / 2) +  "px";
                    isMaximizado = false;
                }
                
                if(bol){
                    btnMaximizar.style.display = "none";
                    btnMaximizar.style.visibility = "hidden";
                    btnMinimizar.style.display = "";
                    btnMinimizar.style.visibility = "visible";
                }else{
                    btnMinimizar.style.display = "none";
                    btnMinimizar.style.visibility = "hidden";
                    btnMaximizar.style.display = "";
                    btnMaximizar.style.visibility = "visible";
                }
            };
            
            btnMaximizar = document.createElement('img');
            btnMaximizar.src = imgMaximizar;
            btnMaximizar.style.width = "11px";
            btnMaximizar.style.cursor = "pointer";
            btnMaximizar.style.paddingRight = "4px";
            btnMaximizar.onclick = function(){
                fnMaximizarMinimizar(true);
            };

            btnMinimizar = document.createElement('img');
            btnMinimizar.src = imgMinimizar;
            btnMinimizar.style.width = "11px";
            btnMinimizar.style.cursor = "pointer";
            btnMinimizar.style.paddingRight = "4px";
            btnMinimizar.onclick = function(){
                fnMaximizarMinimizar(false);
            };

            var btnCerrar = document.createElement('img');
            btnCerrar.src = imgCerrar;
            btnCerrar.style.width = "11px";
            btnCerrar.style.cursor = "pointer";
            btnCerrar.onclick = function(){
                _this.cerrar();
            };
            
            if(div.orientacion === 1){
                div.appendChild(btnCerrar);
                div.appendChild(btnMaximizar);
                div.appendChild(btnMinimizar);
            }else{
                div.appendChild(btnMaximizar);
                div.appendChild(btnMinimizar);
                div.appendChild(btnCerrar);
            }
            
            ////OCULTAR LA MINIMIZAR
            btnMaximizar.style.display = "none";
            btnMaximizar.style.visibility = "hidden";
            btnMinimizar.style.display = "";
            btnMinimizar.style.visibility = "visible";
            
            this.ocultarBotonMaximizar = function(){
                btnMinimizar.style.display = "none";
                btnMinimizar.style.visibility = "hidden";
            };
        };
        
        this.construirTituloVentana = function(){
            divEncabezado = document.createElement('div');
            divEncabezado.style.border = ventana.getBordeTitulo();
            divEncabezado.style.backgroundColor = ventana.getColorFondoTitulo();
            divEncabezado.style.color = ventana.getColorTitulo();
            divEncabezado.style.fontWeight = ventana.getFuenteTitulo();
            divEncabezado.style.paddingLeft = "0px";
            divEncabezado.style.paddingTop = "10px";
            divEncabezado.style.height = AltoEncabezado+"px";
            divEncabezado.style.cursor = "pointer";
            divEncabezado.style.borderTopLeftRadius = "3px";
            divEncabezado.style.borderTopRightRadius = "3px";
            divEncabezado.style.fontFamily = "Raleway";
            divEncabezado.innerHTML = "";
            
            divEncabezado.appendChild(crearPanelIzquierdo(false));
            divEncabezado.appendChild(crearPanelCentral());
            divEncabezado.appendChild(crearPanelDerecho(true));
        };
        this.construirTituloVentana();
        
        this.cambiarTitulo = function(titulo){
           divCentro.innerHTML = titulo;
        };
        this.cambiarBorde = function(borde){
           divEncabezado.style.border = borde;
        };
        this.cambiarColorFondo = function(color){
           divEncabezado.style.backgroundColor = color;
        };
        this.cambiarColorFuente = function(colorFuente){
            divEncabezado.style.color = colorFuente;
        };
        this.cambiarFuenteTitulo = function(Color){
            divEncabezado.style.fontWeight = Color;
        };
        this.cambiarAltoEncabezado = function(Alto){
            divEncabezado.style.height = Alto+"px";
        };
        this.getVentanaEncabezado = function(){
            return divEncabezado;
        };
        this.getDivCentro = function(){
            return divCentro;
        };
        this.inhablitarBotonMaximizar = function(){
            botoneraTitulo.ocultarBotonMaximizar();
        };
    };
    //****************************************************************///
    //****************************************************************///
    //****************************************************************///
    
    var construirVentana = function(){
        ///CREACION DEL MODAL
        divModal = document.createElement("div");
        divModal.style.position = "fixed";
        divModal.style.width = "100%";
        divModal.style.height = "100%";
        divModal.style.top = "0px";
        divModal.style.left = "0px";
        divModal.style.backgroundColor = colorModal;
        divModal.style.opacity = "0.2";
        
        ///CREACION DE LA VENTANA
        var id = Ventana.generarIdentificadorUnico++;
        ventana = document.createElement('div');//creando div
        ventana.id = "vtn"+id+IdVentana;
        ventana.style = "-webkit-box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.75);";
        ventana.style.position = "fixed";
        ventana.style.width = Ancho+"px";
        ventana.style.height = Alto+"px";
        ventana.style.border = "DarkGray 0px solid";
        ventana.style.top = ((document.body.clientHeight+Alto) / 2) +  "px";
        ventana.style.left = ((document.body.clientWidth-Ancho) / 2) +  "px";
        ventana.style.fontFamily = "Verdana, Arial, Helvetica, sans-serif";
        ventana.style.fontSize = "12px";
        ventana.style.fontWeight = "normal";
        ventana.style.backgroundColor = "GhostWhite";
        ventana.style.borderRadius = "3px";
        ventana.style.color = "#000000";
        
        encabezado = new ventanaEncabezado(_this);

        divCuerpo = document.createElement('div');
        divCuerpo.style.border = "0px solid silver";
        divCuerpo.style.height = "83%";
        divCuerpo.style.padding = "3px";
        divCuerpo.style.overflow = "auto";
        divCuerpo.innerHTML = "";


        ventana.appendChild(encabezado.getVentanaEncabezado());
        ventana.appendChild(divCuerpo);
    };
    
    
    construirVentana();
    
    ///ACCIONES DE MOVIMIENTO
    var ventanaHead = encabezado.getVentanaEncabezado();
    var mousePosition;
    var posicionRaton = {
        x:0,
        y:0
    };
    
    ventanaHead.onmousedown = function(e){
       isDown = true;
       posicionRaton.x = ventana.offsetLeft - e.clientX;
       posicionRaton.y = ventana.offsetTop - e.clientY;
    };
    ventanaHead.onmouseup = function(){
       isDown = false;
    };
    var mX,mY;
    ventanaHead.onmousemove = function(evento){
       if(isDown){
            mousePosition = {
                x: evento.clientX,
                y: evento.clientY
            };
            mX = (mousePosition.x + posicionRaton.x);
            mY = (mousePosition.y + posicionRaton.y);
            
            
            //validar que no sean negativos para que no pasen la panalla
            mX = (mX < 0)?0:mX;
            mY = (mY < 0)?0:mY;
            
            ventana.style.left = mX + 'px';
            ventana.style.top  = mY + 'px';
            
            EventoVentanaMovimiento(mX,mY);
       }  
    };
    
    
    ////FUNCIONES PUBLICAS
    this.cerrar = function(){
        EventoAntesDeCerrar();
        var padre;
        if(viewModal){
            padre = divModal.parentNode;
            padre.removeChild(divModal);
        }
        padre = ventana.parentNode;
        padre.removeChild(ventana);
        EventoDespuesDeCerrar();
    };
    this.getIdVentana = function(){
        return ventana.id;
    };
    this.getDivContenido = function(){
        return divCuerpo;
    };
    this.getDivVentana = function(){
        return ventana;
    };
    this.show = function(){
        EventoAntesDeAbrir();
        if(viewModal)
            body.appendChild(divModal);
        body.appendChild(ventana);
        EventoDespuesDeAbrir();
    };
    this.setEventoAntesDeAbrir = function(Evento){
        EventoAntesDeAbrir = Evento;
    };
    this.setEventoDespuesDeAbrir = function(Evento){
        EventoDespuesDeAbrir = Evento;
    };
    this.setEventoAntesDeCerrar = function(Evento){
        EventoAntesDeCerrar = Evento;
    };
    this.setEventoDespuesDeCerrar = function(Evento){
        EventoDespuesDeCerrar = Evento;
    };
    
    this.setEventoMovimientoVentana = function(Evento){
        EventoVentanaMovimiento = Evento;
    };
    
    
    /////FUNCIONES SET PROPIEDAES
    this.setTitulo = function(titulo){
        if(titulo.length > 35){
            titulo = titulo.substring(0,35)+"...";
        }
        encabezado.cambiarTitulo(titulo);
        Titulo = titulo;
    };
    this.setAncho = function(ancho){
        Ancho = ancho;
        ventana.style.width = Ancho+"px";
    };
    this.setAlto = function(alto){
        Alto = alto;
        ventana.style.height = Alto+"px";
    };
    this.setColorFondoTitulo = function(colorFondo){
        encabezado.cambiarColorFondo(colorFondo);
        colorFondoTitulo = colorFondo;
    };
    this.setBordeTitulo = function(borde){
        encabezado.cambiarBorde(borde);
        bordeTitulo = borde;
    };
    this.setFuenteTitulo = function(fuente){
        encabezado.cambiarFuenteTitulo(fuente);
        fuenteTitulo = fuente;
    };
    this.setFontFamilyTitulo = function(font){
        encabezado.getVentanaEncabezado().style.fontFamily = font;
    };
    this.setTamanioLetraTitulo = function(size){
        encabezado.getVentanaEncabezado().style.fontSize = size+"px";
    };
    this.setColorTitulo = function(Color){
        encabezado.cambiarColorFuente(Color);
        colorTitulo = Color;
    };
    this.setModal = function(Condicion){
        viewModal = Condicion;
    };
    this.setColorModal = function(Color){
        colorModal = Color;
        divModal.style.backgroundColor = Color;
    };
    this.setAltoEncabezado = function(Alto){
        encabezado.cambiarAltoEncabezado(Alto);
        //AltoEncabezado = Alto;
    };
    this.habilitarMaximizarMinimizar = function(){
        encabezado.inhablitarBotonMaximizar();
    };
    this.setHTML = function(html){
        divCuerpo.innerHTML = "";
        if(typeof (html) === 'string'){
            divCuerpo.innerHTML = html;
        }else{
            divCuerpo.appendChild(html);
        }
    };
    this.setOrientacionVentanaObjeto = function(IdObjeto,AjusteX = 0,AjusteY = 0){
        var objeto = IdObjeto;
        if(typeof (IdObjeto) === 'string'){
            objeto = document.getElementById(IdObjeto);
        }
        ventana.style.top = (objeto.offsetTop+objeto.clientHeight+AjusteX) +  "px";
        ventana.style.left = (objeto.offsetLeft+objeto.clientWidth+AjusteY) + "px";
    };
    this.setOrientacionVentana = function(Horizontal = 0,Vertical = 0,AjusteX = 0,AjusteY = 0){
        var codigo = Horizontal+""+Vertical;
        console.log(codigo);
        var x,y;
        ///lo quiero en el centro
        console.log(document.body.clientHeight,document.body.clientWidth);
        if(codigo === '00'){
            x = ((document.body.clientHeight / 2) - (Alto / 2));
            y = ((document.body.clientWidth / 2) - (Ancho / 2));
        }
        else if(codigo === '13' || codigo === '31'){///superior izquierdo
            x = 0;
            y = 0;
        }
        else if(codigo === '10' || codigo === '01'){///superior centro
            x = 0;
            y = ((document.body.clientWidth-Ancho) / 2);
        }
        else if(codigo === '14' || codigo === '41'){///superior derecho
            x = 0;
            y = document.body.clientWidth-Ancho;
        }
        else if(codigo === '03' || codigo === '30'){///centro izquierdo
            x = ((document.body.clientHeight+Alto) / 2);
            y = 0;
        }
        else if(codigo === '04' || codigo === '40'){///centro derecho
            x = ((document.body.clientHeight+Alto) / 2);
            y = document.body.clientWidth-Ancho;
        }
        else if(codigo === '23' || codigo === '32'){///inferior izquierdo
            x = document.body.clientHeight+Alto;
            y = 0;
        }
        else if(codigo === '20' || codigo === '02'){///inferior centro
            x = document.body.clientHeight-Alto;
            y = ((document.body.clientWidth-Ancho) / 2);
        }
        else if(codigo === '24' || codigo === '42'){///inferior derecho
            x = document.body.clientHeight-Alto;
            y = document.body.clientWidth-Ancho;
        }
        console.log(x,y);
        ventana.style.top = (x+AjusteX) +  "px";
        ventana.style.left = (y+AjusteY) + "px";
    };
}