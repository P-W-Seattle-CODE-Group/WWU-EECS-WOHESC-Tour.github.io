import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js';
import { Rhino3dmLoader } from 'https://unpkg.com/three@0.154.0/examples/jsm/loaders/3DMLoader.js';
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';

function mainViewer() {

    let scene = new THREE.Scene();

    let sceneWrapper = document.getElementById('viewer-container');
    let wrapperWidth = sceneWrapper.clientWidth;
    let wrapperHeight = sceneWrapper.clientHeight;

    sceneWrapper.style.borderRadius = '20px';

    window.addEventListener('resize', function() {
        camera.aspect = wrapperWidth / wrapperHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(wrapperWidth, wrapperHeight)
    })
    
    let renderer = new THREE.WebGLRenderer (
        {antialias: true, alpha:true}
    );
    renderer.setSize ( wrapperWidth, wrapperHeight);
    sceneWrapper.appendChild(renderer.domElement);
    renderer.autoClear = false;
    renderer.setClearColor (0x0000, 0, 0);
    renderer.setPixelRatio (window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaFactor = 0;


    let camera = new THREE.PerspectiveCamera (
        65,
        wrapperWidth / wrapperHeight,
        0.1,
        20000
    );
    camera.position.set (-100,-100,5000);
    camera.up = new THREE.Vector3 (0,0,1);

    let cameraTarg = new THREE.Vector3(0,0,500);
    camera.lookAt (cameraTarg);

    
    let controls = new OrbitControls ( camera, renderer.domElement);
    controls.target = cameraTarg
    
        /*Lighting setup*/
    /*Ambient Light for basic scene lighting*/
    const ambientColor = new THREE.Color ( "rgb(255,255,255)" )
    const ambientLight = new THREE.AmbientLight(ambientColor);
    scene.add(ambientLight);

    ambientLight.intensity = 0.9

    /*Primary spot light*/
    const spotColor = new THREE.Color ( "rgb(245,235,165)" );
    const spotLight = new THREE.SpotLight ( spotColor );
    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    //scene.add(spotLightHelper)
    scene.add(spotLight);

    spotLight.position.set (-3000, -2000, 7500)
    spotLight.intensity = 0.75
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 20;
    spotLight.penumbra = 1;
    spotLight.decay = 1;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 50000;
    spotLight.shadow.mapSize.height = 1024 * 1;
    spotLight.shadow.mapSize.width = 1024 * 1;


    const backColor = new THREE.Color ( "rgb(200, 195, 195)" );
    const backdirectionalLight = new THREE.DirectionalLight( backColor );
    backdirectionalLight.position.set(3000, 2000, 7500);
    backdirectionalLight.intensity = 0.25;
    backdirectionalLight.castShadow = true;
    backdirectionalLight.shadow.mapSize.width = 1024 * 1;
    backdirectionalLight.shadow.mapSize.height = 1024 * 1;
    backdirectionalLight.decay = 1;
    scene.add(backdirectionalLight);


    const baseColor = new THREE.Color ( "rgb(250, 250, 250)" );
    const baseMesh = new THREE.Mesh( new THREE.PlaneGeometry( 100000, 100000 ), new THREE.MeshPhongMaterial ({color:baseColor}));
    scene.add(baseMesh);
    baseMesh.receiveShadow = true;

    const boxColor = new THREE.MeshPhongMaterial ( {color: 'rgb(255,100,50)'});
    const boxMesh = new THREE.BoxGeometry (1000, 1000, 1000);
    const cube = new THREE.Mesh(boxMesh, boxColor)
    //scene.add(cube)
    cube.position.set(0,0,501)
    cube.castShadow = true;
    cube.receiveShadow = true;

    const loader = new Rhino3dmLoader();
    loader.setLibraryPath('https://cdn.jsdelivr.net/npm/rhino3dm@7.15.0/');

    loader.load ('public/site-model.3dm', function(object){
        object.traverse( function(child){
            child.castShadow = false;
            child.receiveShadow = true;
        }); 
        scene.add(object)
    });
    loader.load ('public/site-trees.3dm', function(object){
        object.traverse( function(child){
            child.castShadow = true;
            child.receiveShadow = false;
        }); 
        scene.add(object)
    });
    loader.load ('public/site-buildings.3dm', function(object){
        object.traverse( function(child){
            child.castShadow = true;
            child.receiveShadow = false;
        }); 
        scene.add(object)
    });
    loader.load ('public/eecs-simple.3dm', function(object){
        object.traverse( function(child){
            child.castShadow = true;
            child.receiveShadow = false;
        }); 
        scene.add(object)
    });

    function animateCamera(targPos, targPoint, duration) {
        let currentPosition = camera.position.clone();
        let currentTarget = controls.target.clone();

        new TWEEN.Tween(currentPosition)
            .to (targPos, duration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function() {
                camera.position.copy(currentPosition);
            })
            .start();
        new TWEEN.Tween(currentTarget)
            .to (targPoint, duration)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(function() {
                controls.target.copy(currentTarget);
                camera.lookAt(currentTarget);
            })
            .start();
    };

    let radius = 5000;
    let speed = 0.0005;
    let angle = 0;

    function spotlightTurntable () {
        let centerPoint = new THREE.Vector3(0,0,0);
        angle += speed

        let nextX = centerPoint.x + radius * Math.cos(angle)
        let nextY = centerPoint.y + radius * Math.sin(angle)

        spotLight.position.set(-nextX, -nextY, 7500)
        backdirectionalLight.position.set(nextX, nextY, 7500)

    }
    spotlightTurntable();

    function render () {
        camera.updateMatrixWorld();
        renderer.render( scene, camera );
        spotLightHelper.update();
    }
    function animate() {
        spotlightTurntable();
        requestAnimationFrame( animate );
        TWEEN.update();
        render();
        /*
        console.log(' ')
        console.log('Position')
        console.log(camera.position)
        console.log('Target')
        console.log(controls.target)
        console.log('FOV')
        console.log(camera.fov)
        console.log(' ')
        */
    }
    animate();


    // State initialization and setup for camera animation
    let state = 0;

    let nextButton = document.getElementById('next-button')
    let backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', function() {
        console.log('Next Button Clicked!')
        if (state <= 5) {
            state += 1;
            updateCamera();
        }
    })
    backButton.addEventListener('click', function() {
        console.log('Back Button Clicked!')
        if (state >= 1) {
            state -= 1;
            updateCamera();

        }
    })

    let startButton = document.getElementById('start-button')

    startButton.addEventListener('click', function() {
        animateCamera(
            new THREE.Vector3(-230,-235,750), 
            new THREE.Vector3(-25,-30,450), 
            6000
        );
        state += 1;
    });

    function updateCamera () {
        
        if (state === 1) {
            animateCamera(
                new THREE.Vector3(-230,-235,750), 
                new THREE.Vector3(-25,-30,450), 
                6000
            )
        }else if (state === 2) {
            animateCamera(
                new THREE.Vector3(-50,-135,325), 
                new THREE.Vector3(40,-15,340), 
                6000
            )
        } else if (state === 3) {
            animateCamera(
                new THREE.Vector3(30,-150,325), 
                new THREE.Vector3(40,-15,340), 
                4000
            )
        } else if (state === 4) {
            animateCamera(
                new THREE.Vector3(200,-120,560), 
                new THREE.Vector3(70,40,355), 
                4000
            )
        } else if (state === 5) {
            animateCamera(
                new THREE.Vector3(-200,-150,600), 
                new THREE.Vector3(100,75,400), 
                4000
            )
        } else if (state === 6) {
            animateCamera(
                new THREE.Vector3(-185,75,550), 
                new THREE.Vector3(90,70,400), 
                4000
            )
        }

    }
    updateCamera();
}
mainViewer();