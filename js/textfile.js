function textadd(){
  $(function(){
    var html = window.location.href.split("\.")[2].split("/")[1] + '.txt';
    $.ajax({
      url: 'https://zodiac-g12.github.io/' + html,
      type: 'get',
      success: function(data){
        alert(data);
        console.log(data);
        $('#text-file').text(data);
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', textadd());
