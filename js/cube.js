var width; //window.innerWidth;
var height; //window.innerHeight;
var r = 10;
var scene;
var camera;
var renderer;
var controls;
var cube;
var cubelist = [];
var save = [];
//var container = document.getElementById('container');



function windSize(){
  height = (window.innerHeight + window.innerWidth) / 20;
  width = height;
}



function init(){
  windSize(); //Windowサイズ取得
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, width / height, 1, 1000);
  controls = new THREE.OrbitControls(camera);
  renderer = createRenderer(width, height);
  cube = createCube(r);
  cubelist[0] = cube;
  var light1 = createLight(0xFFFFFF, -10, 20, -10);
  var light2 = createLight(0xFFFFFF, 10, 20, 10);
  camera.position.x = 10;
  camera.position.y = 10;
  camera.position.z = 10;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(light1);
  scene.add(light2);
  update();
}



function createRenderer(width, height){
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  //renderer.setClearColor(0x000000, 1);
  document.body.appendChild(renderer.domElement);
  //container.appendChild(renderer.domElement);
  return renderer;
}



function createCube(r){
  var geometry = new THREE.BoxGeometry(r, r, r);
  var material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
  var cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 0, 0);
  scene.add(cube);
  return cube;
}



function setcolor(color){
  cube.material.color.setHex(color);
}



function createLight(color, x, y, z){
  var light = new THREE.DirectionalLight(color);
  light.position.set(x, y, z);
  return light;
}



function update(){
  controls.update();
  requestAnimationFrame(update);
  renderer.render(scene, camera);
  var projector = new THREE.Projector();
  cube.rotation.y += 0.05;
}



window.addEventListener('DOMContentLoaded', init);
