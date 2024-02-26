let landingDiv = document.getElementById("landing")

let mainContent = document.getElementById('main-content')

let enterButton = document.getElementById("start-button")

let uiDiv = document.getElementById("ui-container")
let infoDiv = document.getElementById("info-container")

enterButton.addEventListener("click", function() {
    landingDiv.classList.add('animate-out');
    uiDiv.classList.add('animate-in');
    infoDiv.classList.add('animate-in');
    console.log('Button clicked!');
})

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
    viewerDiv.style.top = '-200%'
    infoSliderState += 1
    infoHeader.style.height = '5%'
    
    imageDiv.style.height = '80%'
}
function infoPullUp() {
    infoSlider.style.height = '15%';
    infoSlider.style.top = '-31%';
    viewerDiv.style.top = '-125%';
    infoSliderState -= 1
      
    infoHeader.style.height = '35%'

    imageDiv.style.height = '0%'
}

nextButton.addEventListener('click', function() {
    if (infoSliderState == 1) {
        infoPullUp();
    }
})