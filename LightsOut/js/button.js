document.getElementById("solve-btn").onclick = function(){
    const sentence = 'If you want to solve this ploblem, when you click to the spinning cube, you will solve.';
    alert("IN!");
    document.getElementById('solve-on').innerHTML=!document.getElementById('solve-on').innerHTML ? "" : sentence;
};
