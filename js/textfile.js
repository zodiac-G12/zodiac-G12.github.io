function textadd(){
  $(function(){
    var html = window.location.href.split("\.")[2].split("/")[1] + '.txt';
    $.ajax({
      url: html,
      type: 'get',
      success: function(data){
        console.log(data.split("\n"));
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', textadd());
