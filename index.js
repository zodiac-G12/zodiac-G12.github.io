window.addEventListener('DOMContentLoaded', function(){
  var maman = ["ぽよ...", "ぽよぽよ！", "ぽよ？", "(ง '-' )ง うーっ٩( 'o' )۶ぽよぽよ～っ！", "おい"];
  var real = 0;
  var mama = function(){
    console.log(maman[Math.floor(Math.random()*maman.length)]);
    setTimeout(arguments.callee, 5000);
    if(real == 60 || real++ > 5000000000000000){
      if(real++ % 2 == 0){
        console.log("期待しても何もでません");
      }else{
        console.log("なすび！ｗ");
        real = 0;
      }
    }
  }
  mama();
});
