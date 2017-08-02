function mama(){
  var maman = ["ぽよ...", "ぽよぽよ！", "ぽよ？", "(ง '-' )ง うーっ٩( 'o' )۶ぽよぽよ～っ！", "おい"];

  if(window.location.href.split("#")[1] == "justice"){
    document.getElementById("enforcement").textContent = "👈可愛い";
  }

  if(navigator.platform.indexOf("Win") > -1 || navigator.platform.indexOf("Mac") > -1 || navigator.platform.indexOf("Linux") > -1){
    console.log(maman[Math.floor(Math.random()*maman.length)]);
    setTimeout(arguments.callee, 2000);
  }
  alert(navigator.platform);

}

window.addEventListener('DOMContentLoaded', mama());
