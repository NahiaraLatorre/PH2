//----- FICHA ROJA ------

var ficha_roja = new Image();
ficha_roja.src = 'ficha_roja.svg';
ficha_roja.width = '40';
ficha_roja.height = '40';

//----- FICHA VERDE ------
var ficha_verde = new Image();
ficha_verde.src = 'ficha_verde.svg';
ficha_verde.width = '40';
ficha_verde.height = '40';



/****** VARIABLES *****/
var contR = 0;
var contV = 0;
var turnoRojo=true;
var insertada=false;


var ficha = -1;
var color_ficha = 'n';
var ficha_roja_colocada = [false,false,false,false,false];
var ficha_verde_colocada = [false,false,false,false,false];


var tablero = [];
for(var i=0; i<9; i++) {
    tablero[i] = new Array(10);
  for(var j=0; j<18; j++){
    tablero[i][j]='n';    
  }
}


/*************** INICIO DE SESION ****************/

function f1() {
    if(typeof(Storage) !== "undefined") {
      var usu1=document.getElementById("equipo1").value;
      if(usu1!=""){
        sessionStorage.setItem("login1",usu1);
        document.getElementById("form1").innerHTML="<legend>Bienvenido "+sessionStorage.getItem("login1")+"</legend><br><br>";
       }else{
          document.getElementById("mensaje").innerHTML="Debes introducir un nombre al equipo <div style='cursor:pointer;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
          document.getElementById("mensaje").style.zIndex="5";
          document.getElementById("mensaje").style.transition="opacity 1s linear";
          document.getElementById("mensaje").style.opacity="1";

          document.getElementById("muro").style.opacity="0.3";
          document.getElementById("muro").style.zIndex="4";
       }
      if(sessionStorage.getItem("login1") && sessionStorage.getItem("login2")){
        console.log("mostrar boton Jugar 1");

        document.getElementById("botonJugar").innerHTML="<button onclick='f3();' class='button' value = 'Jugar'>Jugar</button>";
    
      }

    } else {
      document.getElementById("form1").innerHTML = "Sorry...";
    }
}

function f2() {
    if(typeof(Storage) !== "undefined") {
      var usu2=document.getElementById("equipo2").value;
      if(usu2!=""){
        sessionStorage.setItem("login2",usu2);
        document.getElementById("form2").innerHTML="<legend>Bienvenido "+sessionStorage.getItem("login2")+"</legend><br><br>";
      }else{
          document.getElementById("mensaje").innerHTML="Debes introducir un nombre al equipo <div style='cursor:pointer;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
          document.getElementById("mensaje").style.zIndex="5";
          document.getElementById("mensaje").style.transition="opacity 1s linear";
          document.getElementById("mensaje").style.opacity="1";

          document.getElementById("muro").style.opacity="0.3";
          document.getElementById("muro").style.zIndex="4";
       }
      if(sessionStorage.getItem("login1") && sessionStorage.getItem("login2")){
        console.log("mostrar boton Jugar 1");

        document.getElementById("botonJugar").innerHTML="<br><button onclick='f3();' class='button' value = 'Jugar'>Jugar</button>";
    
      }

    } else {
        document.getElementById("form2").innerHTML = "Sorry...";
    }
}

function f3(){
  //console.log("entrooo a la funcion 3: "+ajugar);
  if(sessionStorage.getItem("login1") && sessionStorage.getItem("login2")){
    window.location.href="./juego.html";
    console.log("entra cuando los 2 equipos ponen nombre");
  }
  else{
    window.location.href="./index.html";
  }
}


function actualizaIndex(){

  console.log("actualiza Index");

  if(sessionStorage.getItem("login1") && sessionStorage.getItem("login2")){
    document.getElementById("form1").innerHTML="<legend>Bienvenido "+sessionStorage.getItem("login1")+"</legend><br><br>";
    document.getElementById("form2").innerHTML="<legend>Bienvenido "+sessionStorage.getItem("login2")+"</legend><br><br>";
    document.getElementById("botonJugar").innerHTML="<button onclick='f3();' class='button' value = 'Jugar'>Jugar</button>";
    //window.location="juego.html";
  }  

  else{

    if(sessionStorage.getItem("login1")){
      document.getElementById("form1").innerHTML="<legend>Bienvenido "+sessionStorage.getItem("login1")+"</legend>";
    }
    else if(sessionStorage.getItem("login2")){
      document.getElementById("form2").innerHTML="<legend>Bienvenido "+sessionStorage.getItem("login2")+"</legend>";
    }

  }
}

function actualizaJuego(){

  if(sessionStorage.getItem("login1") && sessionStorage.getItem("login2")){
    hacerRejilla();
    /*pinta_ficha_no_colocada();*/
    pintarTurno();

    document.getElementById("jugador1").innerHTML="<p>Equipo 1: "+sessionStorage.getItem("login1")+"</p>";
    document.getElementById("jugador2").innerHTML="<p>Equipo 2: "+sessionStorage.getItem("login2")+"</p>";
  }else{
    window.location.href="./index.html";
  }

}

/********************************/
function dados(){
  var x = Math.floor((Math.random()*6)+1);
  document.getElementById("dados").innerHTML = x;
  ctx.drawImage(x,0,0);
}


function iniciar(){

  console.log("INICIANDO EL JUEGO");

  document.getElementById("marcadorRojo").innerHTML ="<article class='cuadroMarcador'></article><br>";
  document.getElementById("marcadorVerde").innerHTML ="<article class='cuadroMarcador'></article><br>"

  document.getElementById("lanzarDados").innerHTML = "<p>Dado</p><article class='cuadro'><p id='dados'></p></article><br><button onclick='dados();' class='botonAct'>Lanzar</button><button onclick='logout();'' class='botonAct'>Finalizar</button>";

}

function logout(){

    console.log("----------LOGOUT-----------");
    if(window.sessionStorage){
        
        sessionStorage.clear();
        /*sessionStorage.removeItem("login1");
        sessionStorage.removeItem("login2");*/
        window.location.assign('index.html');
    }
}

function cerrarMensajeConFocus(){
     document.getElementById("mensaje").style.zIndex="-1";
     document.getElementById("muro").style.zIndex="-2";
     document.getElementById("mensaje").style.opacity="0";
     document.getElementById("muro").style.opacity="0";
}

/*********** CAMPO DE FUTBOL ************/

function hacerRejilla(){  

  console.log("***HACIENDO REJILLA***");  

  var c=document.getElementById("canvasJuego");
  var ctx=c.getContext("2d");
  ctx.strokeStyle = 'black';
  var dim = c.width/20;//lo que mide un cuadrado de ancho y de largo
  //324 sería para alto

  for(i=2; i<=18; i++){

    ctx.moveTo(i*dim,0);
    ctx.lineTo(i*dim, c.height);
  }

  for(i=1; i<=9; i++){

    ctx.moveTo(dim,i*dim);
    ctx.lineTo(c.width-dim, i*dim);
  }
  ctx.stroke();

  //rectangulo grande
  ctx.beginPath();
  ctx.lineWidth;
  ctx.strokeStyle='blue';
  ctx.strokeRect(dim,0,720-dim-dim,324);

  //linea central
  ctx.beginPath();
  ctx.lineWidth=3.5;
  ctx.moveTo(360,0);
  ctx.lineTo(360,324);
  ctx.strokeStyle='red';
  ctx.stroke();

  //circulo centro
  ctx.beginPath();
  ctx.arc(360,162,dim,0,2*Math.PI);
  ctx.stroke();

  //porteria izquierda
  ctx.beginPath();
  ctx.lineWidth;
  ctx.strokeStyle='red';
  ctx.strokeRect(dim,dim*2,dim*3,dim*5);
  
  //porteria derecha
  ctx.beginPath();
  ctx.lineWidth;
  ctx.strokeStyle='red';
  ctx.strokeRect(720-(dim*4),dim*2,dim*3,dim*5);

  //semicirculo izquierda
  ctx.beginPath();
  ctx.arc(dim*4,162,37,Math.PI*-0.5,Math.PI*0.5,false);
  ctx.strokeStyle='red';
  ctx.stroke();
  //semicirculo derecha
  ctx.beginPath();
  ctx.arc(dim*16,162,37,Math.PI*0.5,Math.PI*-0.5,false);
  ctx.strokeStyle='red';
  ctx.stroke();

  //final porteria izquierda
  ctx.beginPath();
  ctx.fillStyle = "gray";
  ctx.fillRect(0, dim*3, dim, dim);
  ctx.fillRect(0, dim*4, dim, dim);
  ctx.fillRect(0, dim*5, dim, dim);
  ctx.fillRect(720-dim, dim*3, dim, dim);
  ctx.fillRect(720-dim, dim*4, dim, dim);
  ctx.fillRect(720-dim, dim*5, dim, dim);
  ctx.stroke();

  ctx.beginPath();
  ctx.lineWidth;
  ctx.strokeStyle='black';
  ctx.strokeRect(720-(dim*20),dim*4,dim,dim);
  ctx.strokeRect(720-(dim*20),dim*3,dim,dim);
  ctx.strokeRect(720-(dim*20),dim*5,dim,dim);
  ctx.strokeRect(720-dim,dim*4,dim,dim);
  ctx.strokeRect(720-dim,dim*3,dim,dim);
  ctx.strokeRect(720-dim,dim*5,dim,dim);

}

/******************************* CLICK ******************************/
function mouseClick(e){


  console.log("mouseClick");


  let cv = e.target,
    x = e.offsetX,
    y = e.offsetY,
    dim = cv.width / 20,
    fila = Math.floor(y / dim),
    columna = Math.floor(x / dim);

    //if(x<1 || x>cv.width-1 || y<1 || y>cv.height){}
    //console.log('Fila: ' + fila + ' - Columna: ' + columna);

    //para que se limpie el canvas cada vez que se pincha uno
    //cv.width = cv.width;
    //hacerRejilla();


  if(turnoRojo && contR<5){

      console.log("******** TURNO DEL EQUIPO ROJO ***********");
      console.log("Ficha numero = " + contR);

      if(columna>9){
        document.getElementById("mensaje").innerHTML="Debes de poner la ficha en lado izquierdo del campo (roja) <div style='cursor:pointer;text-align: center;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
        document.getElementById("mensaje").style.zIndex="5";
        document.getElementById("mensaje").style.transition="opacity 1s linear";
        document.getElementById("mensaje").style.opacity="1";

        document.getElementById("muro").style.opacity="0.3";
        document.getElementById("muro").style.zIndex="4";
        
        //console.log("TIENES QUE PONER LA FICHA EN EL LADO IZQUIERDO DEL CAMPO ---- ROJO");
      }

      else{

        insertada = false;
        console.log("FILA ======= " + fila);
        console.log("COLUMNA ======= " + columna);

        //console.log("ESTA INSERTADA-------------------" + insertada);

        insertarFicha(fila, columna, 'r');

        //console.log("Y AHORA ESTA INSERTADA-------------------" + insertada);

        if(insertada){

          let ctx = cv.getContext('2d'),
            img = new Image();

          img.onload = function(){

            ctx.drawImage(ficha_roja, columna*dim, fila*dim, dim, dim);
            contR +=1;

          };

          img.src="ficha_roja.svg";

          ctx.beginPath();
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 3;
          ctx.strokeRect(columna * dim, fila * dim, dim, dim);

          //console.log("Turno Rojo = " + turnoRojo);
          turnoRojo=false;
          //console.log("Turno Verde = " + turnoRojo);
          pintarTurno();

        }

        else{
          document.getElementById("mensaje").innerHTML="Esta casilla está llena <div style='cursor:pointer;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
          document.getElementById("mensaje").style.zIndex="5";
          document.getElementById("mensaje").style.transition="opacity 1s linear";
          document.getElementById("mensaje").style.opacity="1";

          document.getElementById("muro").style.opacity="0.3";
          document.getElementById("muro").style.zIndex="4";
        }
      }
    }

    else
      if(!turnoRojo && contV<5){
          console.log("********TURNO DEL EQUIPO VERDE***********")
          console.log("Ficha numero = " + contV);
        
        if(columna<10){
          document.getElementById("mensaje").innerHTML="Debes de poner la ficha en lado derecho del campo (verde) <div style='cursor:pointer;text-align: center;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
          document.getElementById("mensaje").style.zIndex="5";
          document.getElementById("mensaje").style.transition="opacity 1s linear";
          document.getElementById("mensaje").style.opacity="1";

          document.getElementById("muro").style.opacity="0.3";
          document.getElementById("muro").style.zIndex="4";
          //console.log("TIENES QUE PONER LA FICHA EN EL LADO DERECHO DEL CAMPO ---- VERDE");
        }

        else{

          insertada = false;
          console.log("FILA ======= " + fila);
          console.log("COLUMNA ======= " + columna);

          //console.log("ESTA INSERTADA-------------------" + insertada);

          insertarFicha(fila, columna, 'v');

          //console.log("Y AHORA ESTA INSERTADA-------------------" + insertada);

          if(insertada){
            
            let ctx = cv.getContext('2d'),
              img = new Image();

            img.onload = function(){
              ctx.drawImage(ficha_verde, columna*dim, fila*dim, dim, dim);
              contV +=1;
            };

            img.src="ficha_verde.svg";

            ctx.beginPath();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.strokeRect(columna * dim, fila * dim, dim, dim);

            //console.log("Turno Verde = " + turnoRojo);

            turnoRojo=true;

            //console.log("Turno Rojo = " + turnoRojo);

            pintarTurno();
          }
          else{
            document.getElementById("mensaje").innerHTML="Esta casilla está llena <div style='cursor:pointer;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
            document.getElementById("mensaje").style.zIndex="5";
            document.getElementById("mensaje").style.transition="opacity 1s linear";
            document.getElementById("mensaje").style.opacity="1";

            document.getElementById("muro").style.opacity="0.3";
            document.getElementById("muro").style.zIndex="4";
            //console.log("CASILLA LLENA ------------ NO PUEDES!!!")
          }
        }
    }

    else{
      //PONER MENSAJE
      console.log("-------QUE EMPIECE EL JUEGO------");
      document.getElementById("botones").innerHTML ="<button onclick='iniciar();' id='botJugar'>Jugar</button>";

    }

}

function mouseMove(e){
  let cv = e.target,
    x = e.offsetX,
    y = e.offsetY,
    dim = cv.width / 20,
    fila = Math.floor(y / dim),
    columna = Math.floor(x / dim);

  //console.log('Posicion: ' + x + ' - ' + y);
  if(cv.getAttribute('data-down')){
    //Estoy arrastrando la ficha
    console.log("MOUSEMOVE => fila: " + fila + " - columna: " + columna);
    if(ficha.columna != columna || ficha.fila != fila){
      ficha.columna = columna;
      ficha.fila = fila;
      //redibujarCanvas();
    }
  }
}

function mouse_down(e){
  let cv = e.target,
    x = e.offsetX,
    y = e.offsetY,
    dim = cv.width / 3,
    fila = Math.floor(y / dim),
    columna = Math.floor(x / dim);

  //console.log("DOWN => fila: " + fila + " - columna: " + columna);
  if(ficha.columna == columna && ficha.fila == fila){
    //Hay ficha
    cv.setAttribute('data-down', 'true');
  }
}

function mouse_up(e){
  let cv = e.target,
    x = e.offsetX,
    y = e.offsetY,
    dim = cv.width / 20,
    fila = Math.floor(y / dim),
    columna = Math.floor(x / dim);

  //console.log("UP => fila: " + fila + " - columna: " + columna);

  cv.removeAttribute('data-down');
}

/************************************************************/

function insertarFicha(fila, columna, color){

    //insertada = false;
      
      console.log("ESTAS EN LA CASILLA = " + fila +","+ columna);
      console.log("CASILLA LLENA? = " + tablero[fila][columna]);
      console.log("COLOR QUE VAMOS A INSERTAR = " + color);

      if(tablero[fila][columna]=='n' && insertada==false){
        tablero[fila][columna]=color;
        console.log("insertado color "+color+" en la fila "+ fila + " y en la columna " + columna);
        insertada=true;        
      }
}


function pintarTurno(){

  console.log("///////////cambio de turno//////////////");
  console.log("turno rojo es ======== " + turnoRojo);

  if(turnoRojo==true){
    document.getElementById("jugadorRojo").style.backgroundColor="#A9E2F3";
    document.getElementById("jugadorVerde").style.backgroundColor="white";
  }
  else if(turnoRojo==false){
    document.getElementById("jugadorRojo").style.backgroundColor="white";
    document.getElementById("jugadorVerde").style.backgroundColor="#A9E2F3";
  }
}


function ficha_seleccionada(color,num){

  limpia_ficha();

  if(color=='r'){
    if(ficha_roja_colocada[num]==false){
      for(i=0;i<=5;i++){
          if(i==num && ficha_roja_colocada[i]==false){

            var c=document.getElementById("fichar"+i);
            var ctx=c.getContext("2d");
            ctx.strokeStyle = 'red';
            ctx.strokeRect(0, 0, c.width, c.height);
            ficha=i;
            color_ficha='r';
          }
      }
    }
  }

  else{
    if(ficha_verde_colocada[num]==false){
      for(i=0;i<=5;i++){
        if(i==num && ficha_verde_colocada[i]==false){
      
            var c=document.getElementById("fichav"+i);
            var ctx=c.getContext("2d");
            ctx.strokeStyle = 'red';
            ctx.strokeRect(0, 0, c.width, c.height);
            ficha=i;
            color_ficha='v';
          }
        }
    }
  }

  console.log(ficha);   
  console.log(color_ficha);

}

function limpia_ficha(){
  if(ficha!=-1 && color_ficha!='n'){
    if(color_ficha=='r'){
    var c=document.getElementById("fichar"+ficha);
    var ctx=c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    ctx.drawImage(ficha_roja,0,0);
  }else{
    var c=document.getElementById("fichav"+ficha);
    var ctx=c.getContext("2d");
    ctx.clearRect(0,0,c.width,c.height);
    ctx.drawImage(ficha_verde,0,0);
  
    }
  }
}

/************************* ARRASTRAR -- Drag & Drop *************************/

function prepararDnD2(){


  insertada = true;

  console.log("prepararDnD2");
  //ZONA DRAG
  let v = document.querySelectorAll('body>section>section>section>article>img');

  for(let i = 0; i < v.length; i++){
    v[i].setAttribute('draggable', 'true');
    v[i].id = 'img' + i;
    v[i].ondragstart = function(e){
      e.dataTransfer.setData('text/plain', v[i].id);
    };
  }

  //ZONA DROP
  let cv = document.getElementById('canvasJuego');

  if(turnoRojo && contR<=5){

      console.log("******** TURNO DEL EQUIPO ROJO ***********");
      console.log("Ficha numero = " + contR);

      cv.ondragover = function(e){

        if(turnoRojo && contR<5){

          e.preventDefault();
          e.stopPropagation();
          let x = e.offsetX,
            y = e.offsetY,
            dim = cv.width/20,
            fila= Math.floor(y/dim),
            columna= Math.floor(x/dim),
            ctx=cv.getContext('2d');

            if(columna>9){
              document.getElementById("mensaje").innerHTML="Debes de poner la ficha en lado izquierdo del campo (roja) <div style='cursor:pointer;text-align: center;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
              document.getElementById("mensaje").style.zIndex="5";
              document.getElementById("mensaje").style.transition="opacity 1s linear";
              document.getElementById("mensaje").style.opacity="1";

              document.getElementById("muro").style.opacity="0.3";
              document.getElementById("muro").style.zIndex="4";
                            
            }

            hacerRejilla();       

            ctx.beginPath();
            ctx.strokeStyle= '#f00';
            ctx.lineWidth= 3;
            ctx.strokeRect(columna*dim, fila*dim, dim, dim);
        }
    }

    cv.ondrop = function(e){

      if(turnoRojo && contR<5){

          e.preventDefault();
          e.stopPropagation();

          let x = e.offsetX,
            y = e.offsetY,
            dim = cv.width/20,
            fila= Math.floor(y/dim),
            columna= Math.floor(x/dim),
            id = e.dataTransfer.getData('text/plain'),
            ctx = cv.getContext('2d'),
            img = new Image();

            img.onload = function(){
              //ctx.drawImage(img, x, y);
              ctx.drawImage(img,columna*dim,fila*dim,dim, dim);
              contR+=1;
              console.log("llevamos " + contR + " fichas Rojas");
            }


            insertada = false;
            
            insertarFicha(fila, columna, 'r');

            console.log("ARRASTRAR INSERTADA????????" + insertada);

            if(!insertada){
              document.getElementById("mensaje").innerHTML="Esta casilla está llena <div style='cursor:pointer;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
              document.getElementById("mensaje").style.zIndex="5";
              document.getElementById("mensaje").style.transition="opacity 1s linear";
              document.getElementById("mensaje").style.opacity="1";

              document.getElementById("muro").style.opacity="0.3";
              document.getElementById("muro").style.zIndex="4";

            }

            else{

              img.src = document.getElementById(id).src;

              turnoRojo = false;

              pintarTurno();
            }
        }
      }
    }

  else
    if(!turnoRojo && contV<5){

        console.log("******** TURNO DEL EQUIPO VERDE ***********");
        console.log("Ficha numero = " + contV);

      cv.ondragover = function(e){
        if(!turnoRojo && contV<=5){
          e.preventDefault();
          e.stopPropagation();
          let x = e.offsetX,
            y = e.offsetY,
            dim = cv.width/20,
            fila= Math.floor(y/dim),
            columna= Math.floor(x/dim),
            ctx=cv.getContext('2d');

            if(columna<10){
                document.getElementById("mensaje").innerHTML="Debes de poner la ficha en lado derecho del campo (verde) <div style='cursor:pointer;text-align: center;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
                document.getElementById("mensaje").style.zIndex="5";
                document.getElementById("mensaje").style.transition="opacity 1s linear";
                document.getElementById("mensaje").style.opacity="1";

                document.getElementById("muro").style.opacity="0.3";
                document.getElementById("muro").style.zIndex="4";
              }

            //hacerRejilla();

            ctx.beginPath();
            ctx.strokeStyle= '#f00';
            ctx.lineWidth= 3;
            ctx.strokeRect(columna*dim, fila*dim, dim, dim);
        }

    }

    cv.ondrop = function(e){
      if(!turnoRojo && contV<5){
        e.preventDefault();
        e.stopPropagation();

        let x = e.offsetX,
          y = e.offsetY,
          dim = cv.width/20,
          fila= Math.floor(y/dim),
          columna= Math.floor(x/dim),
          id = e.dataTransfer.getData('text/plain'),
          ctx = cv.getContext('2d'),
          img = new Image();

        img.onload = function(){
          //ctx.drawImage(img, x, y);
          ctx.drawImage(img,columna*dim,fila*dim,dim, dim);
          contV+=1;
          console.log("llevamos " + contV + " fichas Verdes");
        }

          insertada = false;
            
          insertarFicha(fila, columna, 'v');

          console.log("ARRASTRAR INSERTADA????????" + insertada);

          if(!insertada){
              document.getElementById("mensaje").innerHTML="Esta casilla está llena <div style='cursor:pointer;' id='botMensaje' onclick='cerrarMensajeConFocus()'>Cerrar</div>";
              document.getElementById("mensaje").style.zIndex="5";
              document.getElementById("mensaje").style.transition="opacity 1s linear";
              document.getElementById("mensaje").style.opacity="1";

              document.getElementById("muro").style.opacity="0.3";
              document.getElementById("muro").style.zIndex="4";
          }

          else{
        
            img.src = document.getElementById(id).src;

            turnoRojo = true;

            pintarTurno();

            hacerRejilla();
          }
      }

    }
  }

  else{
      //PONER MENSAJE
      console.log("-------QUE EMPIECE EL JUEGO------");
      document.getElementById("botones").innerHTML ="<button onclick='iniciar();' id='botJugar'>Jugar</button>";

    }




}