function main(){
  $(function(){
    $.ajax({
      url: 'https://twitter.com/zodi_G12',
      type: 'GET',
      success: function(res) {
        var content = $($(res.responseText).text()).find('img')[1].src;
        console.log(content);
        document.getElementById('yazawa').src = content;
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', main());
