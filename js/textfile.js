function textadd(){
  $(function(){
    var html = window.location.href.split("\.")[2].split("/")[1] + '.txt';
    $.ajax({
      url: 'https://zodiac-g12.github.io/' + html,
      cache: false,
      type: 'get',
      success: function(data){
        $('#text-file').text(data);
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', textadd());
