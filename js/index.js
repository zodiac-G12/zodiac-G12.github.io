function mama(){
  var maman = ["ぽよ...", "ぽよぽよ！", "ぽよ？", "(ง '-' )ง うーっ٩( 'o' )۶ぽよぽよ～っ！", "おい"];

  if(window.location.href.split("#")[1] == "justice"){
    document.getElementById("enforcement").textContent = "👈可愛い";
  }

  if(navigator.userAgent.indexOf('iPhone') == 0 && navigator.userAgent.indexOf('Android') == 0){
    document.getElementById("jsadd").src = "js/app.js";
  }

  console.log(maman[Math.floor(Math.random()*maman.length)]);
  setTimeout(arguments.callee, 2000);
}

window.addEventListener('DOMContentLoaded', mama());
