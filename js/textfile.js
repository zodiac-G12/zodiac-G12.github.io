function textadd(){
  $(function(){
    var html = window.location.href.split("\.")[2].split("/")[1] + '.txt';
    $.ajax({
      url: html,
      type: 'get',
      success: function(data){
        alert(data[0]);
        $('#text-file').text(data[0]);
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', textadd());
