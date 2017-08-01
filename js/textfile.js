function textadd(){
  $(function(){
    var html = window.location.href.split("\.")[2].split("/")[1] + '.txt';
    $.ajax({
      url: 'https://zodiac-g12.github.io/' + html,
      type: 'get',
      success: function(data){
        var content = $($(data.responseText).text());
        alert(content);
        console.log(content);
        $('#text-file').text(content);
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', textadd());
