function mama(){
  var maman = ["ぽよ...", "ぽよぽよ！", "ぽよ？", "(ง '-' )ง うーっ٩( 'o' )۶ぽよぽよ～っ！", "おい"];

  if(window.location.href.split("#")[1] == "justice"){
    document.getElementById("enforcement").textContent = "👈可愛い";
  }

  if(navigator.platform.indexOf("Win") == -1 && navigator.platform.indexOf("Mac") == -1 && navigator.platform.indexOf("Linux") == -1){
    var node = document.getElementById("particles-js");
    node.parentNode.removeChild(node);
  }

  console.log(maman[Math.floor(Math.random()*maman.length)]);
  setTimeout(arguments.callee, 2000);
}

window.addEventListener('DOMContentLoaded', mama());
