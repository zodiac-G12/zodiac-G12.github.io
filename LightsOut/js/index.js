var width; //window.innerWidth;
var height; //window.innerHeight;
var scene;
var camera;
var renderer;
var controls;
var cube = [];
var cubelist = [];
var r = 50;
var N=3;
var before_n=0;
var e = [];
var inv = [];
var tmp_e = [];
var tmp_i = [];
var now = [];
var ans = [];
var solved = 0;
// TODO ここ変数多過ぎだし、名前変えてconstにして


function windSize(){
    height = window.innerHeight;
    width = window.innerWidth;
}



function init(){
    windSize();

    // TODO あたまわるそう
    if([ 3, 6, 7, 8, 10, 12, 13, 15, 22, 25, 27 ].includes(parseInt(window.location.href.split("#")[1]))){
        N=window.location.href.split("#")[1];
        console.log("N=",N);
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = false;//true;
    renderer = createRenderer(width, height);
    for(var i = -1; i < N-1; i++){
        cube[i+1] = [];
        for(var j = -1; j < N-1; j++){
            cube[i+1][j+1] = createCube(r,i,j,0);
            cubelist[N*(i+1)+j+1] = cube[i+1][j+1];
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



function createRenderer(width, height){
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
    cube.position.set(x*(r+10), y*(r+10), z);
    cube.mapx = x+1;
    cube.mapy = y+1;
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


// TODO 長すぎるよ？
function update(){
    controls.update();
    requestAnimationFrame(update);
    renderer.render(scene, camera);
    var projector = new THREE.Projector();
    var mouse = {x: 0, y: 0};

    if(solved==0){
        for(var i=0;i<N;i++){
            for(var j=0;j<N;j++) now[i*N+j]=cube[i][j].color;
        }
        solved=solver(N,before_n);
        solved=1;
        console.log("ans=",ans);
    }

    // TODO 色も変えられたら.点滅とか.
    for(var i=0;i<N;i++){
        for(var j=0;j<N;j++){
            if(cube[i][j].ans==1){
                cube[i][j].rotation.y+=0.05;
            }
        }
    }

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
                var tmp = [obj[0].object.mapx,obj[0].object.mapy];
                for(var i = 0; i < 2; i++){
                    for(var j = -1; j < 2; j++){
                        var flag = 0;
                        var x = tmp[0];
                        var y = tmp[1];
                        if(i == 0 && j != 0){x += j; flag = 1;}
                        else if(i != 0){y += j; flag = 1;}
                        if(flag == 1 && 0 <= x && x <= N-1 && 0 <= y && y <= N-1){
                            var centerC = cube[x][y];
                            centerC.color = ~centerC.color&1;
                            cubecolorChange(centerC);
                            if(solved==1) solved=0;
                        }
                    }
                }
            }else controls.autoRotate = !controls.autoRotate;
        }
    };
}



function solver(n,before_n){
    var i, j, k, l, flag=0, count=1; //counter

    if(n<3) return -1;

    //Making I_n
    // var inv=[];
    // var e=[];
    // var tmp_e=[]; //maybe not necessary
    // var tmp_i=[]; // maybe not necessary
    // var now=[];

    for(i=0;i<n*n;i++) ans[i]=0;

    if(before_n!=n){
        for(i=0;i<n*n;i++){
            tmp_e[i]=0;
            tmp_i[i]=0;
            inv[i]=[];
            e[i]=[];
            for(j=0;j<n*n;j++){
                if(i==j){
                    inv[i][j]=1;
                    e[i][j]=1;
                }else{
                    inv[i][j]=0;
                    e[i][j]=0;
                }
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

        for(count=0;count<100;count++){
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
                    for(l=0;l<n*n;l++){
                        tmp_e[l]=e[i][l];
                        tmp_i[l]=inv[i][l];
                        e[i][l]=e[i+1][l];
                        inv[i][l]=inv[i+1][l];
                        e[i+1][l]=tmp_e[l];
                        inv[i+1][l]=tmp_i[l];
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

        if(count<100){
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
