import { fruitsData } from './data.js';

const emotionRadios = document.getElementById("emotion-radios");
const getImagesBtn = document.getElementById("get-images-btn");
const gifsOnlyCheckbox = document.getElementById("gifs-only-checkbox");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");
 
emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImagesBtn.addEventListener('click', renderFruit)

function highlightCheckedOption(e) {
    const radioArray = document.getElementsByClassName('radio')
    for(let radio of radioArray) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal() {
    memeModal.style.display = 'none'
}

function renderFruit() {
    const fruitObject = getSingleFruitObject()
    memeModalInner.innerHTML = 
        `<img
        class="fruit-img"
        src="./images/${fruitObject.image}"
        alt="./images/${fruitObject.alt}"
        >`
        memeModal.style.display = 'flex'
}

function getSingleFruitObject() {
    const fruitsArray = getMatchingFruitsArray()
    if (fruitsArray.length === 1) {
        return fruitsArray[0]
    }
    else {
        const randomNumber = Math.floor(Math.random() * fruitsArray.length)
        return fruitsArray[randomNumber] 
    }
}

function getMatchingFruitsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyCheckbox.checked
        
        const matchingFruitsArray = fruitsData.filter(function(fruit){
            if (isGif) {
                return fruit.emotionTags.includes(selectedEmotion) && fruit.isGif
            }
            else {
                return fruit.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingFruitsArray
    }
}

function getEmotionsArray(fruits) {
    const emotionsArray = [];
    for(let fruit of fruits) {
        for(let emotion of fruit.emotionTags) {
            if(!emotionsArray.includes(emotion)) { 
                emotionsArray.push(emotion) 
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(fruits) {
    const emotions = getEmotionsArray(fruits);
    let radioItems = ``;
    for(let emotion of emotions) {
        radioItems += `
        <div class="radio">
        <label for="${emotion}">${emotion}</label>
            <input
                type="radio"
                id="${emotion}"
                value="${emotion}"
                name="emotions"
            >
            </input>
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(fruitsData)