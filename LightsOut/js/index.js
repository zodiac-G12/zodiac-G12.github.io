let width; //window.innerWidth;
let height; //window.innerHeight;
let scene;
var camera;
var renderer;
var controls;
var cube = [];
var cubelist = [];
const r = 50;
var N=3;
var before_n=0;
var e = [];
var inv = [];
var tmp_e;
var tmp_i;
var now = [];
var ans = [];
var solved = 0;
var zure;
var href;
// TODO ここ変数多過ぎだし、名前変えてconstにして


function windSize(){
    height = window.innerHeight;
    width = window.innerWidth;
}



function init(){
    windSize();

    // TODO あたまわるそう
    href=parseInt(window.location.href.split("#").pop());
    if([ 3, 6, 7, 8, 10, 12, 13, 15, 22, 25, 27 ].includes(href)){
        N=href;
    }else if(href){
        let message;
        if(href<3) message = "Too smaller n. So i suggest you to play N=3.";
        else if(href>30) message = "Too bigger n. So i suggest you to play N=3.";
        else message = "Maybe can't solve in n. So i suggest you to play N=3.";
        alert(message);
        N=3;
    }
    zure=parseInt(N/2);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = false;//true;
    renderer = createRenderer();
    for(var i = -zure; i < N-zure; i++){
        cube[i+zure] = [];
        for(var j = -zure; j < N-zure; j++){
            cube[i+zure][j+zure] = createCube(r,i,j,0);
            cubelist[N*(i+zure)+j+zure] = cube[i+zure][j+zure];
        }
    }
    var light1 = createLight(0xFFFFFF, 0, 1000, 0);
    var light2 = createLight(0xFFFFFF, 500, 1000, 1000);
    var light3 = createLight(0xFFFFFF, -500, 1000, -1000);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 200;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    update();
}



function createRenderer(){
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xFFFFFF, 1);
    document.body.appendChild(renderer.domElement);
    return renderer;
}



function createCube(r,x,y,z){
    var color = Math.floor(Math.random()*2);
    var geometry = new THREE.BoxGeometry(r, r, r);
    var material = new THREE.MeshPhongMaterial({color: (color == 0 ? 0x353535 : 0xFF8000)});
    var cube = new THREE.Mesh(geometry, material);
    cube.color = color;
    var centerring = N%2!=0? 0 : r/2;
    cube.position.set(x*(r+10)+centerring, y*(r+10)+centerring, z);
    cube.mapx = x+zure;
    cube.mapy = y+zure;
    cube.ans = 0;
    scene.add(cube);
    return cube;
}



// TODO 色は変数にした方が良いのでは？
function cubecolorChange(obj){
    if(obj.color == 0) obj.material.color.setHex(0x353535);
    else obj.material.color.setHex(0xFF8000);
}



function createLight(color, x, y, z){
    var light = new THREE.DirectionalLight(color);
    light.position.set(x, y, z);
    return light;
}



function cubeSpin(){
    // TODO 色も変えられたら.点滅とか.
    for(var i=0;i<N;i++){
        for(var j=0;j<N;j++){
            if(cube[i][j].ans==1){
                cube[i][j].rotation.y+=0.05;
            }
        }
    }
}



function cubeStop(){
    for(var i=0;i<N;i++){
        for(var j=0;j<N;j++){
            cube[i][j].rotation.y=0;
        }
    }
}



function buttonAction(){
    document.getElementById("solve-btn").onclick = function(){
        var sentence = 'If you want to solve this ploblem, when you click to the spinning cube, you will solve.';

        if(document.getElementById('solve-on').innerHTML) document.getElementById('solve-on').innerHTML="";
        else document.getElementById('solve-on').innerHTML=sentence;
    };
}



function preSolve(){
    if(solved==0){
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++) now[i*N+j]=cube[i][j].color;
        }
        solved=solver(N);
        solved=1;
    }
}



function lightsOut(take_x, take_y){
    for(var i = 0; i < 2; i++){
        for(var j = -1; j < 2; j++){
            var flag = 0;
            var x = take_x;
            var y = take_y;
            if(i == 0 && j != 0){x += j; flag = 1;}
            else if(i != 0){y += j; flag = 1;}
            if(flag == 1 && 0 <= x && x <= N-1 && 0 <= y && y <= N-1){
                var centerC = cube[x][y];
                centerC.color = ~centerC.color&1;
                cubecolorChange(centerC);
            }
        }
    }
    if(solved==1) solved=0;
}



// TODO 長すぎるよ？
function update(){
    controls.update();
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    var projector = new THREE.Projector();
    var mouse = {x: 0, y: 0};

    preSolve();

    buttonAction();

    if(document.getElementById('solve-on').innerHTML) cubeSpin();
    else cubeStop();

    // TODO 関数にしよう
    window.onmousedown = function(e){
        if(e.target == renderer.domElement){
            var rect = e.target.getBoundingClientRect();
            mouse.x =  e.clientX - rect.left;
            mouse.y =  e.clientY - rect.top;
            mouse.x =  (mouse.x / width) * 2 - 1;
            mouse.y = -(mouse.y / height) * 2 + 1;
            var vector = new THREE.Vector3(mouse.x, mouse.y ,1);
            projector.unprojectVector(vector, camera);
            var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
            var obj = ray.intersectObjects(cubelist);
            if(obj.length > 0){
                lightsOut(obj[0].object.mapx,obj[0].object.mapy);
            }//else controls.autoRotate = !controls.autoRotate;
        }
    };
}



function solver(n){
    var i, j, k, l, flag=0, count=1; //counter

    if(n<3) return -1; // ツマランからエラー
    for(i=0;i<n*n;i++) ans[i]=0;

    if(before_n!=n){
        for(i=0;i<n*n;i++){
            inv[i]=[];
            e[i]=[];
            for(j=0;j<n*n;j++){
                inv[i][j] = i==j ? 1 : 0;
                e[i][j] = i==j ? 1 : 0;
            }
        }

        //Making expansion adjacent matrix(E_n)
        for(i=0;i<n*n;i++){
            if(i>=n)        e[i][i-n]=1;
            if(i%n!=0)      e[i][i-1]=1;
            if((i+1)%n!=0)  e[i][i+1]=1;
            if(i<n*n-n)     e[i][i+n]=1;
        }

        //Making inverse matrix(E_n^-1)

        for(count=0;count<500;count++){
            for(i=0;i<n*n;i++){
                for(j=0;j<n*n;j++){
                    if(i!=j&&e[i][j]!=0){ //i==j must be 1
                        if(j<i){ //from now to top at bottom, 
                            //単位行列左斜め上1..1右斜め下より下側
                            //e[j][0~n*n](上)はもう単位行列の準備が出来ているとする
                            for(k=0;k<n*n;k++){
                                e[i][k]=(e[i][k]+e[j][k])&1;
                                inv[i][k]=(inv[i][k]+inv[j][k])&1;
                            }
                        }else{ //j>i, from now
                            //単位行列左斜め上1..1右斜め下より上側
                            //e[j](下)はまだ単位行列の準備が出来ていないとする
                            //e[0~i-1][0~n*n](上)はもう単位行列の準備が出来ているとする
                            for(k=i+1;k<n*n;k++){
                                if(e[k][j]==1){
                                    for(l=0;l<j&&e[k][l]!=1;l++);
                                    if(l==j){
                                        for(l=0;l<n*n;l++){
                                            e[i][l]=(e[i][l]+e[k][l])&1;
                                            inv[i][l]=(inv[i][l]+inv[k][l])&1;
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            for(i=0;i<n*n;i++){
                if(e[i][i]!=1&&i!=n*n-1){
                    for(l=0;l<n*n;l++){ // swap
                        e[i][l]=[e[i+1][l],e[i+1][l]=e[i][l]][0];
                        inv[i][l]=[inv[i+1][l],inv[i+1][l]=inv[i][l]][0];
                    }
                }
            }
            for(flag=0,i=0;i<n*n&&flag==0;i++){
                for(j=0;j<n*n;j++){
                    if((i==j&&e[i][j]!=1)||(i!=j&&e[i][j]!=0)){
                        flag=1;
                        break;
                    }
                }
            }
            if(flag==0) break;
        }

        if(count<500){
            console.log("Exist.\n");
        }else{
            console.log("Maybe nothing.\n");
            return -1;
        }
        before_n=n;
    }

    for(i=0;i<n*n;i++){
        for(j=0;j<n*n;j++){
            ans[i]=(ans[i]+(inv[i][j]*now[j])&1)&1;
        }
    }
    for(i=0;i<n;i++){
        for(j=0;j<n;j++){
            cube[i][j].ans=ans[i*n+j];
        }
    }

    return 1;
}



window.addEventListener('DOMContentLoaded', init);
