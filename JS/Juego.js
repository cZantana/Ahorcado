const canvas = document.getElementById("ahorcanvas")//constante canvas 
const ctx = canvas.getContext("2d")//Contexto canvas

const texto = document.getElementById("word-input")//Constante para obtener la palabra que se requiera para el ahorcado
const empezar = document.getElementById("start-button")//Constante boton iniciar

var Imagenes = ["Suelo.png","Horca.png","Cabeza y torzo.png","Brazo izquierdo.png","Brazo derecho.png","Pierna izquierda.png","Pierna derecha.png","Ojos nariz y boca.png"]//Guardar los nombres de las imagenes en un arreglo
var errores = 0;//variable para contar la cantidad de errores
var palabra = []//arreglo para guardar letra por letra la palabra escrita en el word input
var palabraminus = []//arreglo para guardar letra por letra pero en minusculas
var barrabaja = []//Arreglo para guardar letra por letra la palabra escrita pero remplazando todas por "_" 
var rellenar = document.getElementById("rellenar")//variable para mostrar las letras que el usuario acerte
var indices
var idx
var letra

var caracter = document.getElementById("character-input")//obtener las letras que ingrese el usuario en el character input

document.getElementById("character-input").style.visibility = "hidden";//ocultar el input mientras se inicia el juego

for (var dib = 0; dib <= 7;dib++){ // for para dibujar el personaje antes de iniciar la partida
  Dibujar(); //funcion dibujar
  errores+1; //sumarle 1 a los errores en cada iteracion
}

empezar.addEventListener("click", convertir);//llamar a la funcion "Convertir" cuando se presione el boton empezar

caracter.addEventListener("keypress",function(event){//Realizar las siguientes lineas de codigo cuando se presione una tecla en el character input
  if (event.key == "Enter")//verificar si la tecla presionada en el character input es la tecla enter
  {
    if (palabra.indexOf(caracter.value.toLowerCase())!=-1 || palabra.indexOf(caracter.value.toUpperCase())!=-1)//verifica si la letra escrita por el usuario(sea minuscula o mayuscula) se encuentra en la palabra  
    {
      indices=[]//crea un arreglo para guardar el inidice de los espacios de donde se encuentre la letra en la palabra correcta 
      idx = palabraminus.indexOf(caracter.value.toLowerCase());//agrega a la variable idx el indice del espacio donde se encuentra la letra en la palabra correcta
      while (idx != -1) {//bucle recorriendo la palabra hasta que ya no se encuentre la letra digitada por el usuario en la palabra
        indices.push(idx);//agrega el indice del espacio encontrado de la letra digitada por el usuario en la palabra correcta
        idx = palabraminus.indexOf(caracter.value.toLowerCase(), idx + 1);//agrega a la variable el retorno de la funcion de busqueda, despues de la anterior letra digitada por el usuario encontrada
      }
      for (letra of indices)//for para recorrer los espacios de las letras encontradas
      {
        console.log(letra)//mostrar la letra a remplazar
        barrabaja[letra]=palabra[letra]//remplazar la barrabaja por la letra correcta
      }
      rellenar.innerHTML=barrabaja.toString().replaceAll(',','')//actualizar el div rellenar
      if(barrabaja.toString().replace(',','') == palabra.toString().replace(',','').replace('_','\xa0 '))//Condicional que verifica si el arreglo de "_" Ya ha sido remplazado en su totalidad por las letras correctas
      {
        document.getElementById("rellenar").innerHTML=texto.value//Insertar en el div "rellenar" la palabra correcta
        document.getElementById("titulo").style.display = "none";//Quitar la visibilidad del titulo ahorcado
        document.getElementById("character-input").style.visibility = "hidden";//quitar la visibilidad del character input
        document.getElementById("game-over").style.marginTop = "30%";//organizar la margen del div gameover
        document.getElementById("game-over").style.fontSize = "50px";//organizar el tamaño de letra del div gameover
        document.getElementById("game-over").innerHTML="¡Haz ganado!"//Insertar la frase "Haz ganado", en el div gameover
      }
      
    }
    else//en caso de que la letra no se encuentre en la palabra correcta
    {
      Dibujar()//funcion dibujar
    }
    caracter.value="";//quitar la letra escrita en el character input
    if (errores == 8)//si la cantidad de errores es de 8
      {
        document.getElementById("rellenar").style.fontSize = "50px"//organizar el tamaño de letra del div rellenar
        document.getElementById("rellenar").innerHTML="¡Haz sido ahorcado!"//insertar en el div rellenar la frase "Haz sido ahorcado"
        document.getElementById("titulo").style.display = "none";//Hacer invisible el titulo Ahorcado
        document.getElementById("character-input").style.visibility = "hidden";//Hacer invisible el character input
        document.getElementById("game-over").style.marginTop = "30%";//organizar la margen del div gameover
        document.getElementById("game-over").style.fontSize = "40px";//organizar el tamaño de letra del div gameover
        document.getElementById("game-over").innerHTML="Respuesta correcta: <br>"+texto.value+"<br>"//insertar la palabra correcta en el div gameover
      }
  }
});


function convertir()//Funcion convertir
{
  document.getElementById("start-button").style.display = "none"//hacer invisible el boton de empezar
  document.getElementById("character-input").style.visibility = "visible";//hacer visible el character input
  palabra = Array.from(texto.value.replaceAll(' ','_'))//Ingresar en un arreglo cada una de las letras de la palabra correcta y remplazando los espacios por "_"
  palabraminus = Array.from(texto.value.toLowerCase().replaceAll(' ','_'))//Ingresar en un arreglo cada una de las letras de la palabra correcta pero en minuscula y remplazando los espacios por "_"
  for (var i in palabra)//bucle for para recorrer el arreglo palabra
  {   
      if (palabra[i] == '_'){//condicional, en caso de que al recorrer el arreglo se encuentre una "_"
          barrabaja.push("\xa0 ")  }//ingresar en el arreglo de barrabajas un espacio para que al momento de insertar el arreglo en modo de string, separe las "_" correctamente y se distinga que son dos palabras o mas
      else{
          barrabaja.push("_ ")}//agregar "_" al arrelgo de barrabajas para insertarlo en el div "rellenar"
  }

  errores=0;//hacer los errores 0 debido a que se esta iniciando el juego
  ctx.clearRect(-300, 30, 1280, 720)//borrar el dibujo anterior de introduccion con las coordenadas (x,y,tamañox,tamañoy)
  Dibujar();//dibujar la plataforma de abajo
  
  rellenar.innerHTML=barrabaja.toString().replaceAll(',','')//insertar a modo de string el arreglo barrabaja en el div "rellenar"
}

function Dibujar()//Funcion dibujar
{
  console.log(errores);//mostrar la cantidad de errores
  var image = new Image(); // variable para crear una nueva imagen
  image.src = "Imagenes/"+Imagenes[errores];//buscar la imagen en el arreglo de dibujos con el indice de la cantidad de errores
  image.onload = drawImageActualSize; // cargada la imagen, llamar a la funcion "DrawImageActualSize"
  errores+=1;//sumarle 1 al error cada vez que dibuja una imagen
}


function drawImageActualSize() {//funcion "DrawImageActualSize"
  ctx.drawImage(this, -300, 30, 1280, 720);//Dibujar la imagen con los valores con las coordenadas (x,y,tamañox,tamañoy) 
}