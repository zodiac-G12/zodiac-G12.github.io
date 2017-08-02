function mama(){
  var maman = ["ぽよ...", "ぽよぽよ！", "ぽよ？", "(ง '-' )ง うーっ٩( 'o' )۶ぽよぽよ～っ！", "おい"];

  if(window.location.href.split("#")[1] == "justice"){
    document.getElementById("enforcement").textContent = "👈可愛い";
  }

  console.log(maman[Math.floor(Math.random()*maman.length)]);
  setTimeout(arguments.callee, 2000);
}

window.addEventListener('DOMContentLoaded', mama());
