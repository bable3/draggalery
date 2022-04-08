import './style.css'

// import gsap from 'gsap'
// import Draggable from 'gsap/Draggable'
// import InertiaPlugin from 'gsap/InertiaPlugin'

// gsap.registerPlugin(Draggable, InertiaPlugin);

// var gridWidth = document.querySelector('.grid').offsetWidth;
// var gridHeight = document.querySelector('.grid').offsetHeight;
// var gridElWidth = document.querySelector('.grid-item').offsetWidth;
// var gridElHeight = document.querySelector('.grid-item').offsetHeight;

// Draggable.create(".grid", {
//   type: "x,y",
//   edgeResistance: 1,
//   inertia: true,
//   snap: {
//     x: function (endValue) {
//       return Math.round(endValue / gridElWidth) * gridElWidth + gridElWidth / 2;
//     },
//     y: function (endValue) {
//       return Math.round(endValue / gridElHeight) * gridElHeight + gridElHeight / 2;
//     }
//   },
//   onDrag: function (endValue) {
//   }
// });

import * as THREE from 'three';
import gsap from 'gsap';

import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

//create an array of every src in images folder
var images = [
  {
    title: 'Télévision',
    url: "./images/ajeet-mestry-UBhpOIHnazM-unsplash.jpg",
  },
  {
    title: 'Légo',
    url: "./images/carson-arias-7Z03R1wOdmI-unsplash.jpg",
  },
  {
    title: 'Idée',
    url: "./images/diego-ph-fIq0tET6llw-unsplash.jpg",
  },
  {
    title: 'Montagne',
    url: "./images/filip-micunda-VxIohgZLeG0-unsplash.jpg",
  },
  {
    title: 'Ouvert',
    url: "./images/finn-hackshaw-FQgI8AD-BSg-unsplash.jpg",
  },
  {
    title: 'Île',
    url: "./images/gianpaolo-antonucci-Jo9lg22aK6Q-unsplash.jpg",
  },
  {
    title: 'Montgolofière',
    url: "./images/ian-dooley-hpTH5b6mo2s-unsplash.jpg",
  },
  {
    title: 'Route',
    url: "./images/jake-blucker-tMzCrBkM99Y-unsplash.jpg",
  },
  {
    title: 'Pomme',
    url: "./images/jk-sloan-co1wmDhPjKg-unsplash.jpg",
  },
  {
    title: 'Nébuleuse',
    url: "./images/karl-beighley-TwLvnrlpbcw-unsplash.jpg",
  },
  {
    title: 'Montagne',
    url: "./images/katie-moum-iRMUDX0kyOc-unsplash.jpg",
  },
  {
    title: 'Écureuil',
    url: "./images/martin-eriksson-mdCW9f3uozM-unsplash.jpg",
  },
  {
    title: 'Lune',
    url: "./images/maryia-shedava-il8hVccXizc-unsplash.jpg",
  },
  {
    title: 'Rue',
    url: "./images/masahiro-miyagi-gOAYHhgaH8c-unsplash.jpg",
  },
  {
    title: 'Ruelle',
    url: "./images/mathias-p-r-reding--00MPDP1tKs-unsplash.jpg",
  },
  {
    title: 'Horrible chien',
    url: "./images/matthew-henry-U5rMrSI7Pn4-unsplash.jpg",
  },
  {
    title: 'Tasse',
    url: "./images/nathan-lemon-FBiKcUw_sQw-unsplash.jpg",
  },
  {
    title: 'Ux design',
    url: "./images/nubelson-fernandes-Yh2Y8avvPec-unsplash.jpg",
  },
  {
    title: 'Photographie',
    url: "./images/photo.jpg",
  },
  {
    title: 'Cocktail',
    url: "./images/roman-from-summerrain-j2MpqAGK2O0-unsplash.jpg",
  },
  {
    title: 'Netflix',
    url: "./images/sebastiaan-chia-qzx-MlNxzOw-unsplash.jpg",
  },
  {
    title: 'Monsterrat',
    url: "./images/severin-candrian-prDZKddND14-unsplash.jpg",
  },
  {
    title: 'Feu',
    url: "./images/toa-heftiba-DUXACn8tgp4-unsplash.jpg",
  },
  {
    title: 'Daim',
    url: "./images/wellstudio-x0cyv7BiPgs-unsplash.jpg",
  },
  {
    title: 'Cabane',
    url: "./images/woody-kelly-6rbX5jbjbp4-unsplash.jpg",
  },
];

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const container = document.querySelector('#gallery');
var squareWidth = window.innerHeight * 0.6;
var squareSpaces = 100;
var square = squareSpaces + squareWidth;
var numberOfSquares = images.length;
var numberOfSquaresByRow = Math.pow(numberOfSquares, 0.5) | 0;
var numberOfRows = Math.ceil(numberOfSquares / numberOfSquaresByRow);
var gridWidth = numberOfSquaresByRow * square - squareSpaces;
var gridHeight = numberOfRows * square - squareSpaces;
var textureLoaded = false;


const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000);
camera.position.set((square * 5) / 2, (square * 5) / 2, -100);
camera.lookAt((square * 5) / 2, (square * 5) / 2, 0);

const renderer = new THREE.WebGLRenderer({
  stencil: false,
  depth: false,
});
renderer.setClearColor(0x272629);

scene.add(camera);
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.PlaneGeometry(squareWidth, squareWidth, 32, 32);

const myVertexShader = `
 transformed = transformed * scale;
 `;

const magnifyShader = `
//gl_Position.x = gl_Position.x - pow(abs(gl_Position.y), 2.2) * clamp(movement.x * 0.001 , -1., 1.);
  gl_Position.y = gl_Position.y + pow(abs(gl_Position.x), 2.2) * clamp(movement.y * 0.001 , -1., 1.);

  gl_Position.z = -0.99 + length(gl_Position.xy);
  gl_Position.xy  =  gl_Position.xy * mix(1., (4. - length(gl_Position.xy)) * 0.5, (1. - scale) * loadScale) ;
`
const myFragmentShader = `

  gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3((gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.), grayscale);
  `;

const uniform = `uniform float time;
uniform float scale;
uniform float loadScale;
uniform vec2 movement;
uniform float grayscale;
`;

const planes = [];
for (let index = 0; index < numberOfSquares; index++) {
  const texture = new THREE.TextureLoader().load(images[index].url, texture => {
    var repeatX, repeatY;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    if (texture.source.data.height < texture.source.data.width) {
      //if landscape 
      repeatX = - (squareWidth * texture.source.data.height / (squareWidth * texture.source.data.width));
      repeatY = 1;
      texture.repeat.set(repeatX, repeatY);
      texture.offset.x = (repeatX - 1) / 2 * -1;
    } else {
      //if portrait 
      repeatX = -1;
      repeatY = (squareWidth * texture.source.data.width / (squareWidth * texture.source.data.height));
      texture.repeat.set(repeatX, repeatY);
      texture.offset.y = (repeatY - 1) / 2 * -1;
    }
    if (index === images.length - 1) {
      loop(0);
    }
  });

  const material = new THREE.MeshBasicMaterial({
    map: texture, side: THREE.DoubleSide, onBeforeCompile:
      (shader) => {
        shader.uniforms.grayscale = { value: 1.0 };
        shader.uniforms.time = { value: 10 };
        shader.uniforms.scale = { value: 10 };
        shader.uniforms.loadScale = { value: 2 };
        shader.uniforms.movement = { value: new THREE.Vector2(0, 0) };
        shader.vertexShader = shader.vertexShader.replace('	#include <project_vertex>', myVertexShader + '#include <project_vertex>' + magnifyShader);
        shader.vertexShader = uniform + shader.vertexShader;
        shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', '#include <dithering_fragment>' + myFragmentShader);
        shader.fragmentShader = uniform + shader.fragmentShader;
        material.userData.shader = shader;
        material.customProgramCacheKey = function () {
          return 1;
        };
      }
  });
  material.wireframe = false;
  var plane = new THREE.Mesh(geometry, material);
  var x = index % numberOfSquaresByRow;
  var y = index / numberOfSquaresByRow | 0;
  plane.position.set(x * square, y * square, 0);
  plane.frustumCulled = false;
  scene.add(plane)
  planes.push(plane);
}


var cameraTargetX = (square * numberOfSquaresByRow) / 2 - square / 2;
var cameraTargetY = (square * numberOfSquaresByRow) / 2 - square / 2;
var cameraX = cameraTargetX;
var cameraY = cameraTargetY;

var mouseX, mouseY;
var mouseDown = false;
var titleShown = true;


var offset = {
  minX: 0,
  maxX: gridWidth - square * 0.5,
  minY: 0,
  maxY: gridHeight - square * 0.5
}

var scaleTargetEfect = 1.0;
var scaleEffect = 0.02;
var
  lookingAtX = Math.floor(cameraTargetX / gridWidth * numberOfSquaresByRow),
  lookingAtY = Math.floor(cameraTargetY / gridHeight * numberOfRows),
  lookingAt = lookingAtY * numberOfSquaresByRow + lookingAtX,
  title;

document.addEventListener('mousedown', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  mouseDown = true;
  document.querySelector('canvas').style.cursor = 'grabbing';
})

document.addEventListener('mousemove', (e) => {
  if (mouseDown) {
    cameraTargetX += e.clientX - mouseX;
    cameraTargetY += e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    scaleTargetEfect = 0.8;
  }
  if (mouseDown && titleShown) {
    hideTitle();
  }
})
document.addEventListener('mouseup', (e) => {
  mouseDown = false;
  cameraTargetX = Math.round(cameraTargetX / square) * square;
  cameraTargetY = Math.round(cameraTargetY / square) * square;
  scaleTargetEfect = 1.0;
  document.querySelector('canvas').style.cursor = 'grab';

  if (!titleShown) {
    setTimeout(() => {
      title = images[lookingAt].title;
      changeTitle(title);
    }, 500)
  }
})


function hideTitle() {
  const lastTitle = new SplitText('#title .title--last', { type: "words,chars" });
  gsap
    .fromTo(shuffleArray(lastTitle.chars),
      {
        opacity: 1,
        ease: "power4.out",
        webkitFilter: "blur(0)"
      },
      {
        duration: 2,
        opacity: 0,
        ease: "power4.out",
        stagger: 0.03,
        webkitFilter: "blur(15px)"
      })
  titleShown = false;
}

function changeTitle(title) {
  document.querySelector('#title .title--last').innerHTML = title;
  const nextTitle = new SplitText('#title .title--last', { type: "words,chars" });
  gsap
    .fromTo(shuffleArray(nextTitle.chars),
      {
        opacity: 0,
        ease: "power4.out",
        webkitFilter: "blur(15px)"
      },
      {
        duration: 2,
        opacity: 1,
        ease: "power4.out",
        stagger: 0.03,
        webkitFilter: "blur(0px)"
      });
  titleShown = true;
}

setTimeout(
  () => {
    changeTitle(images[lookingAt].title)
  }, 1500);

var vectorTarget = new THREE.Vector2(cameraTargetX - cameraX, cameraTargetY - cameraY);
var vector = vectorTarget.clone();

var targetLoadScale = 2.0;
var loadScale = 100.0;

function loop(time) {
  cameraTargetX = Math.min(Math.max(offset.minX, cameraTargetX), offset.maxX);
  cameraTargetY = Math.min(Math.max(offset.minY, cameraTargetY), offset.maxY);


  lookingAtX = Math.floor(cameraTargetX / gridWidth * numberOfSquaresByRow);
  lookingAtY = Math.floor(cameraTargetY / gridHeight * numberOfRows);
  lookingAt = lookingAtY * numberOfSquaresByRow + lookingAtX;

  cameraX = cameraTargetX + (cameraX - cameraTargetX) * 0.95;
  cameraY = cameraTargetY + (cameraY - cameraTargetY) * 0.95;

  loadScale = loadScale + (targetLoadScale - loadScale) * 0.05;
  loadScale = Math.max(2, loadScale) | 0;

  scaleEffect = scaleTargetEfect + (scaleEffect - scaleTargetEfect) * 0.9;
  vectorTarget.set(cameraTargetX - cameraX, cameraTargetY - cameraY);
  vector.x = vectorTarget.x + (vector.x - vectorTarget.x) * 0.8;
  vector.y = vectorTarget.y + (vector.y - vectorTarget.y) * 0.8;

  camera.position.set(cameraX, cameraY, -100);

  planes.forEach((plane, index) => {
    const shader = plane.material.userData.shader;
    if (shader) {
      shader.uniforms.scale.value = scaleEffect;
      shader.uniforms.time.value = time;
      shader.uniforms.movement.value = vector;
      shader.uniforms.loadScale.value = loadScale;
      if (index === lookingAt) {
        shader.uniforms.grayscale.value = 0.0;
      } else {
        shader.uniforms.grayscale.value = 1.0;
      }
    }

  })
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

document.getElementById('gallery').appendChild(renderer.domElement);