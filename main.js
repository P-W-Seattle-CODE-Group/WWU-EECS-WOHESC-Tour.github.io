const mainContent = document.getElementById('main-content');

const landingDiv = document.getElementById('landing');
const enterButton = document.getElementById('start-button');

const header = document.getElementById('header');
const headerText = document.getElementById('instructions');

const uiDiv = document.getElementById('ui-container');
const stateMarker = document.getElementById('state-marker')
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
    enterButton.addEventListener('click', function() {
        state += 1;
    })
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
            updateInfoText();
        } else if (infoContainerState === 1) {
            infoDropdown();
            updateInfoText();
        }
    })
    nextButton.addEventListener('click', function() {
        console.log('Next Button Clicked!')
        if (infoContainerState === 1) {
            infoDropdown();
        }
        if (state <= 5) {
            state += 1;
            stateMarker.textContent = `0${state}`
            stateMarker.classList.add('animate-right')
            setTimeout(() => {
                stateMarker.classList.remove('animate-right')
            }, 2000);
            console.log('State is: ' + state)
            updateInfoText();
        }
    })
    backButton.addEventListener('click', function() {
        console.log('Back Button Clicked!')
        if (infoContainerState === 1) {
            infoDropdown();
        }
        if (state >= 2) {
            state -= 1;
            stateMarker.textContent = `0${state}`
            stateMarker.classList.add('animate-left')
            setTimeout(() => {
                stateMarker.classList.remove('animate-left')
            }, 2000);
            console.log('State is: ' + state)
            updateInfoText();
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

function updateInfoText () {
    if (state === 0 || state === 1) {
        if (infoContainerState === 0) {
            infoHeaderText.style.textAlign = 'center';
            infoHeaderText.style.fontSize = '12px';
            infoHeaderText.style.lineHeight = '14px';
            infoHeaderText.textContent = `Welcome! Click Here to Learn More!`;
        } else if (infoContainerState === 1) {
            infoHeaderText.style.textAlign = 'left'
            infoHeaderText.style.fontSize = '10px';
            infoHeaderText.style.lineHeight = '12px';
            infoHeaderText.innerHTML = `
            Thank you for joing us on a tour of the WWU EECS Kaiser Borsari Hall! Please use the next and back buttons to move between 
            slides, at any time you can also use your fingers to rotate, zoom and pan around the model! 
            <br>
            *Warning, the site depends on your phone's GPU and may drain battery!*
            `;
        }
        imageContainer.removeAttribute('class')
        imageContainer.classList.add('slide-one');
        backButton.style.opacity = '0.25';
        sectionSlider();
        
    } else if (state === 2) {
        if (infoContainerState === 0) {
            infoHeaderText.style.textAlign = 'center';
            infoHeaderText.style.fontSize = '12px';
            infoHeaderText.style.lineHeight = '14px';
            infoHeaderText.textContent = `Zero Energy & Carbon: Design Goals & Certification`;
        } else if (infoContainerState === 1) {
            infoHeaderText.style.textAlign = 'left';
            infoHeaderText.style.fontSize = '10px';
            infoHeaderText.style.lineHeight = '12px';
            infoHeaderText.textContent = `
            The Electrical Engineering & Computer Science Building will be the first mass timber Higher Education
            STEM building to achieve Zero Energy & Zero Carbon in the United States. It's "Whole Life" (operational
                & embodied) carbon impacts are reduced by 90% from a comparable "business as usual" project.
                `;
            }
            imageContainer.removeAttribute('class')
            imageContainer.classList.add('slide-two');
            backButton.style.opacity = '1';
            sectionSlider();
            
        } else if (state === 3) {
            if (infoContainerState === 0) {
                infoHeaderText.style.textAlign = 'center';
                infoHeaderText.style.fontSize = '12px';
                infoHeaderText.style.lineHeight = '14px';
                infoHeaderText.textContent = `Systems Integration: Net-Positive`;
            } else if (infoContainerState === 1) {
                infoHeaderText.style.textAlign = 'left';
                infoHeaderText.style.fontSize = '10px';
                infoHeaderText.style.lineHeight = '12px';
                infoHeaderText.innerHTML = `
                The building is designed to be net-positive, generating more solar energy than it consumes. All 
                laboratory spaces have direct access to daylight & views to the Sehome Hill Arboreteum & campus 
                green space. Glazing is ultra-high performance fiberglass windows with two low-e coatings. 
                <br>
                Drag the dot below to reveal the building section!
                `;
            }
            imageContainer.removeAttribute('class')
            imageContainer.classList.add('slide-three');
            sectionSlider();
            
        } else if (state === 4) {
            if (infoContainerState === 0) {
                infoHeaderText.style.textAlign = 'center';
                infoHeaderText.style.fontSize = '12px';
                infoHeaderText.style.lineHeight = '14px';
                infoHeaderText.textContent = `Timber Innovation: Inside & Out`;
            } else if (infoContainerState === 1) {
                infoHeaderText.style.textAlign = 'left';
                infoHeaderText.style.fontSize = '10px';
                infoHeaderText.style.lineHeight = '12px';
                infoHeaderText.textContent = `
                Reducing embodied carbon was primarily achieved through the use of wood. The exterior wood siding 
                is treated naturally using the shoi sugi ban charring process. The interior structure is exposed with
                glulam columns / beams & cross laminated timber floors / ceilings. When selecting all materials, the design team always started by asking: Why not wood? 
                `;
            }
            imageContainer.removeAttribute('class')
            imageContainer.classList.add('slide-four');
            sectionSlider();
            
        } else if (state === 5) {
            if (infoContainerState === 0) {
                infoHeaderText.style.textAlign = 'center';
                infoHeaderText.style.fontSize = '12px';
                infoHeaderText.style.lineHeight = '14px';
                infoHeaderText.textContent = `Building Program: A Home for the Future`;
            } else if (infoContainerState === 1) {
                infoHeaderText.style.textAlign = 'left';
                infoHeaderText.style.fontSize = '10px';
                infoHeaderText.style.lineHeight = '12px';
                infoHeaderText.textContent = `
                The building is designed to be the new home for the WWU Electrical Engineering and Computer Science program,
                providing state of the art collaboration, teaching & community learning spaces for students. Every floor will have
                a communal space for students to connect and ideate together in search of innovation and creation. 
                `;
            }
            imageContainer.removeAttribute('class')
            imageContainer.classList.add('slide-five');
            nextButton.style.opacity = '1';
            sectionSlider();
            
        } else if (state === 6) {
            if (infoContainerState === 0) {
                infoHeaderText.style.textAlign = 'center';
                infoHeaderText.style.fontSize = '12px';
                infoHeaderText.style.lineHeight = '14px';
                infoHeaderText.textContent = `Forest Bathing: Biophilic Design & Approach`;
            } else if (infoContainerState === 1) {
                infoHeaderText.style.textAlign = 'left';
                infoHeaderText.style.fontSize = '10px';
                infoHeaderText.style.lineHeight = '12px';
            infoHeaderText.textContent = `
            The project harmonizes with the neighboring Sehome Arboreteum & the health benefits it offers. Forest bathing
            has shown numerous health benefits, including lowered blood pressure & heart rate & positive affects on immune function.
            Biophilic design strategies play a key role throughout the building & ease the transition 
            from the natural to built environment.
            `;
        }
    imageContainer.removeAttribute('class')
    imageContainer.classList.add('slide-six');
    nextButton.style.opacity = '0.25';
    sectionSlider();
    }
}
updateInfoText();

function sectionSlider() {
    let infoContainer = document.getElementById('info-main')
    if (state === 0 || state === 1) {
        infoContainer.innerHTML = '';
    } else if (state === 2) {
        infoContainer.innerHTML = '';
    } else if (state === 3) {
        infoContainer.innerHTML = (
            `
            <div id='image-wrapper'>
                <div id="image-container"></div>
                <div id="image-container-overlay"></div>
                <input type="range" min="0" max="100" value="50" class="slider" id="image-slider">
            </div>
            `
        )
            
        let slider = document.getElementById('image-slider');
        let baseImage = document.getElementById('image-container')
        let overlayImage = document.getElementById('image-container-overlay')
        
        baseImage.style.width = `${slider.value}%`
        overlayImage.style.width = `${100 - slider.value}%`
        overlayImage.style.left = `${slider.value}%`
            
        slider.addEventListener('input', function() {
        console.log(slider.value)
        baseImage.style.width = `${slider.value}%`
        overlayImage.style.width = `${100 - slider.value}%`
        overlayImage.style.left = `${slider.value}%`
        })
    
    } else if (state === 4) {
        infoContainer.innerHTML = '';
    } else if (state === 5) {
        infoContainer.innerHTML = '';
    } else if (state === 6) {
        infoContainer.innerHTML = '';
    }
}