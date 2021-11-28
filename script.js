function init(){
  //variables
  var str,res;
  var resultado = document.getElementById("resultado");
  var p = document.getElementById("p");
  var q = document.getElementById("q");
  var r = document.getElementById("r");
  var neg = document.getElementById("neg");
  var y = document.getElementById("y");
  var o = document.getElementById("o");
  var sisolosi = document.getElementById("sisolosi");
  var entonces = document.getElementById("entonces");
  var limpiar = document.getElementById("limpiar");
  var igual = document.getElementById("igual");
  //eventos

  p.onclick = function(e){
    resultado.textContent = resultado.textContent + "P";
    habilitar();
  }
  q.onclick = function(e){
    resultado.textContent = resultado.textContent + "Q";
    habilitar();
  }
  r.onclick = function(e){
    resultado.textContent = resultado.textContent + "R";
    habilitar();
  }
  neg.onclick = function(e){
    resultado.textContent = resultado.textContent + "¬";
  }
  y.onclick = function(e){
    resultado.textContent = resultado.textContent + "∧";
    deshabilitar();
  }
  o.onclick = function(e){
    resultado.textContent = resultado.textContent + "∨";
    deshabilitar();
  }
  sisolosi.onclick = function(e){
    resultado.textContent = resultado.textContent + "↔";
    deshabilitar();
  }
  entonces.onclick = function(e){
    resultado.textContent = resultado.textContent + "→";
    deshabilitar();
  }
  limpiar.onclick = function(e){
    resultado.textContent=""
    deshabilitar();
  }
  igual.onclick = function(e){
    str = resultado.textContent;
    res = str.split('');
    contarProposiciones(res);
  }
}
function habilitar(){
  document.getElementById("y").disabled=false;
  document.getElementById("o").disabled=false;
  document.getElementById("sisolosi").disabled=false;
  document.getElementById("entonces").disabled=false;
  document.getElementById("p").disabled=true;
  document.getElementById("q").disabled=true;
  document.getElementById("r").disabled=true;
  document.getElementById("neg").disabled=true;

}
function deshabilitar(){
  document.getElementById("y").disabled=true;
  document.getElementById("o").disabled=true;
  document.getElementById("sisolosi").disabled=true;
  document.getElementById("entonces").disabled=true;
  document.getElementById("p").disabled=false;
  document.getElementById("q").disabled=false;
  document.getElementById("r").disabled=false;
  document.getElementById("neg").disabled=false;

}
function contarProposiciones(arr){
  var contador=0
  validarP=arr.includes("P");
  validarQ=arr.includes("Q");
  validarR=arr.includes("R");
  if(validarP==true){
    contador=contador+1;
    if(validarQ==true){
      contador=contador+1;
      if(validarR==true){
        contador=contador+1;
      }
    }
  }
alert(contador)

}
function operaciones(){
  
}