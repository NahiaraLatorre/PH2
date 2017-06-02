function colorearCasilla(event){

  console.log("+-+-+COLOREANDO CASILLA+-+-+");


  var x = event.clientX;
  var y = event.clientY;
  var dim = c.width/20;


  var canvas = document.getElementById("canvasJuego");
  var ctx = canvas.getContext("2d");
  var rect = canvas.getBoundingClientRect();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  hacerRejilla();

  x -= parseInt(rect.left);
  y -= parseInt(rect.top);
  
  
  ctx.strokeStyle = "#000";
  ctx.strokeRect(parseInt(x/160)*100,parseInt(y/160)*160,160,1180);
  

  pintarFichas();
}

function pintarFichas(){
  
  console.log("+-++++PINTAR FICHAS++++++");

  var canvas = document.getElementById("canvasJuego");
  var ctx = canvas.getContext("2d");

    for(var i=0; i<18; i++) {
      for(var j=0; j<9; j++){
        if(tablero[i][j]!='n'){
          if(tablero[i][j]=='r'){
            ctx.drawImage(ficha_roja,(i)*162,(j)*162);
            
          }else{
            ctx.drawImage(ficha_verde,(i)*162,(j)*162);
          }
        } 
      }
    }
}


function clickEnJuego(event){

  console.log("wwwwwCLICK JUEGOwwwww");

  if(ficha!=-1 && color_ficha!='n'){

    var x = event.clientX;
    var y = event.clientY;

    alert("hhoooooolaaaa"+x+y);

    var canvas = document.getElementById("canvasJuego");
    var ctx = canvas.getContext("2d");
    var rect = canvas.getBoundingClientRect();

    x -= parseInt(rect.left);
  
    if(color_ficha=='r' && turnoRojo==true){
      var c=document.getElementById("fichar"+ficha);
      var ctx=c.getContext("2d");
      ctx.clearRect(0,0,c.width,c.height);
      ficha_roja_colocada[ficha]=true;
      insertaFicha(parseInt(x/162),'r');
      turnoRojo=false;

    }else if(turnoRojo==false && color_ficha=='v'){
      
      var c=document.getElementById("fichav"+ficha);
      var ctx=c.getContext("2d");
      ctx.clearRect(0,0,c.width,c.height);
      ficha_verde_colocada[ficha]=true;
      insertaFicha(parseInt(x/162),'v');
      turnoRojo=true;
    }

    pintarTurno();
    color_ficha='n';
    ficha=-1;
  }
}

function insertaFicha(columna,color){
  var hecho=false;

    for(var j=18; j>=0; j--){
        if(tablero[columna][j]=='n' && hecho==false){
          tablero[columna][j]=color;
          console.log("insertado color "+color+" en columna "+columna);
          hecho=true;
        } 
      }   
}

function ficha_seleccionada(color,num){

  limpia_ficha();

  if(color=='r'){
    if(ficha_roja_colocada[num]==false){
    for(i=0;i<=80;i++){
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
  }else{
    if(ficha_verde_colocada[num]==false){
    for(i=0;i<=80;i++){
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
  }
    else{
  var c=document.getElementById("fichav"+ficha);
  var ctx=c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  ctx.drawImage(ficha_verde,0,0);
  
    }
  }
}

function pinta_ficha_no_colocada(){

  console.log("FICHA NO COLOCADA");

  for(i=0;i<=81;i++){
    if(ficha_roja_colocada[i]==false){
    var c=document.getElementById("fichar"+i);
    var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(ficha_roja,0,0);
    }
  }
  for(i=0;i<=81;i++){
    if(ficha_verde_colocada[i]==false){
    var c=document.getElementById("fichav"+i);
    var ctx=c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(ficha_verde,0,0);
    }
  }
}

function reiniciar(){

  for(var i=0; i<18; i++) {
    for(var j=0; j<9; j++){
      tablero[i][j]='n';
    } 
  }

  for(var i=0;i<=80;i++){
    ficha_verde_colocada[i]=false;
    ficha_roja_colocada[i]=false;
  }
    hacerRejilla();
    pinta_ficha_no_colocada();
    pintarTurno();
    pintarFichas();
}
