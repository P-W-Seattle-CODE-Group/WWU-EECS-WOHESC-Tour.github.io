import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.154.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.154.0/examples/jsm/loaders/GLTFLoader.js';
import { Rhino3dmLoader } from 'https://unpkg.com/three@0.154.0/examples/jsm/loaders/3DMLoader.js';
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';

const mainContent = document.getElementById('main-content');

const landingDiv = document.getElementById('landing');
const enterButton = document.getElementById('start-button');

const header = document.getElementById('header');
const headerText = document.getElementById('instructions');

const uiDiv = document.getElementById('ui-container');
const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');

const infoContainer = document.getElementById('info-container');
const infoHeader = document.getElementById('info-slider-head');
const infoHeaderArrow = document.getElementById('info-arrow');
const infoHeaderText = document.getElementById('info-header-text');
const infoSlide = document.getElementById('slide-info');
const infoText = document.getElementById('slide-text');
const imageContainer = document.getElementById('info-main');

const viewerContainer = document.getElementById('viewer-container');

let infoContainerState = 0;
let state = 0;

function loadingButtonStyling () {
    enterButton.textContent="Loading 0%"
    enterButton.style.backgroundColor = 'rgba(250,250,250,0.05)'
    setTimeout(() => {
        enterButton.textContent='Loading 20%'
        enterButton.style.backgroundColor = 'rgba(250,250,250,0.25)'
    }, 1000);
    setTimeout(() => {
        enterButton.textContent='Loading 40%'
        enterButton.style.backgroundColor = 'rgba(250,250,250,0.45)'
    }, 2000);
    setTimeout(() => {
        enterButton.textContent='Loading 60%'
        enterButton.style.backgroundColor = 'rgba(250,250,250,0.65)'
    }, 3000);
    setTimeout(() => {
        enterButton.textContent='Loading 80%'
        enterButton.style.backgroundColor = 'rgba(250,250,250,0.75)'
    }, 4000);
    setTimeout(() => {
        enterButton.textContent='Loading 100%'
        enterButton.style.backgroundColor = 'rgba(250,250,250,0.95)'
    }, 5000);
    setTimeout(() => {
        enterButton.textContent=`Let's Begin!`
        enterButton.addEventListener("click", function() {
            landingDiv.classList.add('animate-out');
            uiDiv.classList.add('animate-in');
            infoContainer.classList.add('animate-in');
            setTimeout(() => {
                header.classList.add('animate-in');
            }, 4000);
            console.log('Button clicked!');
        })
    }, 6000);
};
loadingButtonStyling();

function buttonStyling() {
    nextButton.addEventListener("mouseenter", function() {
        nextButton.style.backgroundColor = 'rgb(87, 86, 104)';
    })
    nextButton.addEventListener("mouseleave", function() {
        nextButton.style.backgroundColor = 'rgb(67, 66, 84)';
    })
    backButton.addEventListener("mouseenter", function() {
        backButton.style.backgroundColor = 'rgb(87, 86, 104)';
    })
    backButton.addEventListener("mouseleave", function() {
        backButton.style.backgroundColor = 'rgb(67, 66, 84)';
    })
};
buttonStyling();

function updateInfoContainer() {
    infoContainer.addEventListener('click', function() {
        console.log(infoContainer.offsetHeight)
        if (infoContainerState === 0) {
            infoPullUp();
        } else if (infoContainerState === 1) {
            infoDropdown();
        }
    })
    nextButton.addEventListener('click', function() {
        if (infoContainerState == 1) {
            infoDropdown();
        }
    })
    backButton.addEventListener('click', function() {
        if (infoContainerState== 1) {
            infoDropdown();
        }
    })
};
updateInfoContainer();

function infoPullUp () {
    infoContainerState += 1;

    infoContainer.style.height = '90%';
    infoContainer.style.top = '-107%';
    viewerContainer.style.top = '-210%'
    infoHeader.style.height = '15%'
    
    imageContainer.style.height = '75%'
    
    header.style.top = '-200%'
    headerText.style.opacity = '0'
    
    infoText.classList.add('animate-out')

    infoHeaderArrow.style.height = '20%'
    infoHeaderText.style.height = '80%'

    infoHeaderArrow.style.transform = 'rotate(180deg)';
    infoHeaderArrow.style.transform += 'scaleX(1)';
}
function infoDropdown() {
    infoContainerState -= 1;

    infoContainer.style.height = '15%';
    infoContainer.style.top = '-32%';
    viewerContainer.style.top = '-135%';
    
    infoHeader.style.height = '40%'
    
    imageContainer.style.height = '0%'
    
    header.style.top = '-125%'
    headerText.style.opacity = '1'
    
    infoText.classList.add('animate-in')

    infoHeaderArrow.style.height = '40%'
    infoHeaderText.style.height = '60%'

    infoHeaderArrow.style.transform = 'rotate(0deg)';
}