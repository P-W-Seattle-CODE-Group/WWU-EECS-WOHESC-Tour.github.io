let landingDiv = document.getElementById("landing")

let mainContent = document.getElementById('main-content')

let enterButton = document.getElementById("start-button")

let uiDiv = document.getElementById("ui-container")
let infoDiv = document.getElementById("info-container")
let header = document.getElementById('header')

let infoText = document.getElementById('slide-text')

function loadingPause () {
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
            infoDiv.classList.add('animate-in');
            setTimeout(() => {
                header.classList.add('animate-in');
            }, 4000);
            console.log('Button clicked!');
        })
    }, 6000);
}
loadingPause();


let nextButton = document.getElementById("next-button")
let backButton = document.getElementById("back-button")

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




let infoSlider = document.getElementById('info-container')
let slideInfo = document.getElementById('slide-info')
let infoHeader = document.getElementById('info-slider-head')

let viewerDiv = document.getElementById('viewer-container')
let imageDiv = document.getElementById('info-main')


let infoSliderState = 0
infoSlider.addEventListener('click', function() {
    console.log(infoSlider.offsetHeight)
    if (infoSliderState === 0) {
        infoDropdown();
    } else if (infoSliderState === 1) {
        infoPullUp();
    }
})

function infoDropdown () {
    infoSlider.style.height = '90%';
    infoSlider.style.top = '-105%';
    viewerDiv.style.top = '-210%'
    infoSliderState += 1
    infoHeader.style.height = '5%'
    
    imageDiv.style.height = '80%'

    header.style.top = '-195%'
    
    infoText.classList.add('animate-out')
}
function infoPullUp() {
    infoSlider.style.height = '15%';
    infoSlider.style.top = '-30%';
    viewerDiv.style.top = '-135%';
    infoSliderState -= 1
    
    infoHeader.style.height = '35%'
    
    imageDiv.style.height = '0%'

    header.style.top = '-125%'

    infoText.classList.add('animate-in')
}

nextButton.addEventListener('click', function() {
    if (infoSliderState == 1) {
        infoPullUp();
    }
})
backButton.addEventListener('click', function() {
    if (infoSliderState == 1) {
        infoPullUp();
    }
})