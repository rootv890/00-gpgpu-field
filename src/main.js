import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';


// canvas
const canvas = document.querySelector( 'canvas.webgl' );
console.log( canvas );

const scene = new THREE.Scene();

// Loaders
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader( dracoLoader );

/**
 * Environment map
**/

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
};

// Resize
window.addEventListener( 'resize', () =>
{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize( sizes.width, sizes.height );
    renderer.setPixelRatio( sizes.pixelRatio );
} );

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    1000,
);

camera.position.set( -5, 5, 12 );
scene.add( camera );



gltfLoader.load( './model.glb', ( gltf ) =>
{
    const model = gltf.scene;
    console.log( model );

    scene.add( model );
} );



// Renderer
const renderer = new THREE.WebGLRenderer( {
    canvas: canvas,
    antialias: true,
} );

renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio( sizes.pixelRatio );
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor( '#0b0b0b' );
// Oribit Controls
const controls = new OrbitControls( camera, canvas );
controls.enableDamping = true;


const tick = () =>
{
    renderer.render( scene, camera );

    // Update controls
    controls.update();

    window.requestAnimationFrame( tick );
};

tick();
