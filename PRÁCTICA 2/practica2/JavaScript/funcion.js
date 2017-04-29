function crearObjAjax(){
 var xmlhttp;
  if(window.XMLHttpRequest) { // Objeto nativo
   xmlhttp= new XMLHttpRequest(); // Se obtiene el nuevo objeto
     } 
     else 
      if(window.ActiveXObject) { // IE(Windows): objectoActiveX
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
      return xmlhttp;
}

function inicio(){
    console.log("iniciando");
    if(window.sessionStorage){
        if(sessionStorage.getItem("nick")){  
            console.log("user");
            document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="Nueva-entrada.html" id="Nueva_entrada"><i class="icon-picture"></i><a onclick="NuevaEntrada()">Nueva entrada</a></li><li><a href="index.html" id="Logout"><i class="icon-logout"></i><a onclick="logout()"> Logout</a></li></ul>';
        }else{
            console.log("no user");
            document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="registro.html" id="Registro"><i class="icon-user-plus"></i> Registrarse</a></li><li><a href="login.html" id="Login"><i class="icon-login"></i> Login</a></li></ul>';
        }
    }
}

function logout(){

    if(window.sessionStorage){
        
        sessionStorage.clear();
        document.getElementById("menu").innerHTML='<ul><li><label for="ckb-menu">&equiv;</label></li><li><a href="index.html" id="Inicio"><i class="icon-home"></i> Inicio</a></li><li><a href="buscar.html" id="Busqueda"><i class="icon-search"></i> Búsqueda</a></li><li><a href="Nueva-entrada.html" id="Nueva_entrada"><i class="icon-picture"></i><a onclick="NuevaEntrada()">Nueva entrada</a></li><li><a href="registro.html" id="Registro"><i class="icon-user-plus"></i> Registrarse</a></li><li><a href="login.html" id="Login"><i class="icon-login"></i> Login</a></li></ul>';
        window.location.assign('index.html');
    }
}
