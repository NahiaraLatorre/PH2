/* Funcion de acceso */
function acceso(formularioacceso){

    var usuario = formularioacceso.usuario.value;
    var password = formularioacceso.password.value;

    if (usuario == ""){// No puede estar vacio

        alert ("Debes escribir tu nombre de usuario");
        return;
    }

    if (password == ""){// No puede estar vacio

        alert ("Debes escribir tu contrase\u00F1a");
        return;
    }

    if (!longitud (3, 20, usuario)){// No pude superar los 20 caracteres

        alert ("Usuario incorrecto");
        return;
    }

    if(!primerCaracter(usuario)){

        alert ("El nombre de usuario no puede empezar por un n\u00FAmero");
        return;
    }

    if (!compruebaCaracteres(usuario, 1)){// Solo puede contener numeros y letras

        alert ("El usuario debe contener caracteres alfanum\u00E9ricos");
        return;
    }
}

/* Funcion de registro */

function registrarse(formularioregistro){

    var usuario = formularioregistro.usuario.value;
    var password = formularioregistro.password.value;
    var password2 = formularioregistro.password2.value;
    var email = formularioregistro.email.value;

    // Usuario no vacio
    if (usuario == ""){

        alert ("Debes escribir tu nombre de usuario");
        return;
    }

    // Contrasenya no vacia
    if (password == ""){

        alert ("Debes escribir tu contrase\u00F1a");
        return;
    }

    // Longitud de usuario maxima 20 caracteres
    if (!longitud (3, 20, usuario)){

        alert ("El usuario no puede ser mayor de 20 caracteres");
        return;
    }

    if(!primerCaracter(usuario)){

        alert ("El nombre de usuario no puede empezar por un n\u00FAmero");
        return;
    }

    // Caracteres de usuario
    if (!compruebaCaracteres(usuario, 1)){

        alert ("El usuario debe contener caracteres alfanum\u00E9ricos");
        return;
    }

    // Caracteres de la contrasenya
    if (!compruebaCaracteres(password, 2)){

        alert ("La contrase\u00F1a debe contener caracteres alfanum\u00E9ricos y los simbolos (- _)");
        return;
    }

    // Longitud de la contrasenya maximo 20 caracteres
    if (!longitud (6, 20, password)){

        alert ("La contrase\u00F1a no puede ser mayor de 20 caracteres");
        return;
    }

    // Contrasenya debe tener mayusculas, minusculas y numeros
    if (!contieneMayMinNum (password)){

        alert ("La contrase\u00F1a debe tener al menos una may\u00FAscula, una min\u00FAscula y un n\u00FAmero");
        return;
    }

    // Las contrasenyas deben coincidir
     if (password != password2){

        alert ("Las contrase\u00F1as no coinciden");
        return;
    }

    // Email no vacio
    if (email == ""){

        alert ("Debes escribir tu email");
        return;
    }

    // Email valido
    if (!emailValido (email)){

        alert ("El email no es valido");
        return;
    }

}

/********** Funciones auxiliares **********/

/* Funcion que comprueba que la longitud esta entre una minima y maxima */
function longitud(min, max, vari){

    if ((vari.length >= min) && (vari.length <= max)){
        return true;
    }else{
        return false;
    }
}

/* Funcion que comprueba que el primer caracter del usuario no sea un numero */
function primerCaracter(vari){

    var c; 
    c = vari.charCodeAt(0);// Cojo la primera posicion del nombre del usuario
    var tieneNum = true;

    // Compruebo que el primer caracter no tenga numeros
    if(c >= 48 && c <= 57){
        tieneNum = false;
    }
    return tieneNum;
}

/* Funcion que comprueba que el tipo de caracteres son correctos */
function compruebaCaracteres(vari, tipo){   

    var i = 0;
    var c;  
    var ok = true;
 
    // Para comprobar que son caracteres alfanumericos
    if(tipo == 1)
    {
        while ( (i<vari.length) && (ok) )
        {
            c = vari.charCodeAt(i);
            if ( (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || (c >= 48 && c <= 57) )
                i++;
            else
                ok = false;
        }
        return ok;
    }
 
    // Para comprobar que son caracteres alfanumericos y los simbolos (_) o (-)
    else if(tipo == 2)
    {
        while ( (i<vari.length) && (ok) )  
        {
            c = vari.charCodeAt(i);
            if ( (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || (c >= 48 && c <= 57) || (c == 95) || (c == 45))
                i++;
            else
                ok = false;
        }
        return ok;
    }   
}

/* Funcion que comprueba si hay mayusculas, minusculas y numeros */
function contieneMayMinNum(vari){

    var i = 0;
    var c;  
    var tieneMayus = false;    
    var tieneMinus = false;
    var tieneNum = false;   

    while ( (i<vari.length) ) 
    {
        c = vari.charCodeAt(i);
        if (c >= 65 && c <= 90) 
            tieneMayus = true;
        if (c >= 97 && c <= 122) 
            tieneMinus = true;
        if(c >= 48 && c <= 57)
            tieneNum = true;
        i++;
    }
    if(tieneMayus && tieneMinus && tieneNum)
        return true;
    else
        return false;
}

/* Funcion que comprueba que el email tiene @ y despues del . tiene entre 2 y 4 caracteres*/
function emailValido(vari){

    var i = 0;
    var j = 0;
    var c;
    var ok = false;
    var arroba = false;
    var dominio = false;

    while ( (i < vari.length) )
    {
        c = vari.charCodeAt(i);

        if (c == 64) // Si vemos una arroba
        {
            arroba = true;   
        }

        if (c == 46) // Si vemos un punto miramos cuantos caracteres hay detras
        {
            while( (i < vari.length - 1) ) // Cuando llegue a la ultima posicion ya no incrementa la j
            {
                j++;
                i++;
            }

            if (j >= 2 && j <= 4)   
            {
                dominio = true;
            }
        }

        i++;
    }
    
    
    if ((arroba == true) && (dominio == true))
    {
        ok = true;
    }

    return ok;
}

