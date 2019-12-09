// All the diffrent picutres on the front-side of the cards
const cards = [
    {image: "./img/breznak.jpg", type: "breznak"},
    {image: "./img/carlsberg.jpg", type: "carlsberg"},
    {image: "./img/coors.jpg", type: "coors"},
    {image: "./img/falcon.jpg", type:"falcon"},
    {image: "./img/koekedam.jpg", type: "koekedam"},
    {image: "./img/lapinkulta.jpg", type: "lapinkulta"},
    {image: "./img/threetowns.jpg", type: "threetowns"},
    {image: "./img/tuborg.jpg", type:"tuborg"},
]

const dubbleCards = [...cards, ...cards];
console.log(dubbleCards);

// This fetches the class ".memory-container"
const container = document.querySelector('.memory-container');
// This fetches the class ".start"
const start = document.querySelector('.start');
// This fetches the class ".replay-message"
const replayMessage = document.querySelector('.replay-message');

// This creates an HTML element from a string
function stringToHTML (str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
  };


// This function creates an image tag from the cards array using template literal
function createCard(image, type) {
    return `<div class="memory-card" data-framework="${type}"><img class="front-side" src="${image}">
            <img class="back-side" id="back-side" src="https://images-na.ssl-images-amazon.com/images/I/715dsfeaDdL._SL1500_.jpg">
    </div>`
}

// This function generates the cards from the cards array to the DOM, (Document Object Model), and appends it to the memory container
function generateCards() {
    dubbleCards.forEach((card) => {
        const image = createCard(card.image, card.type);
        container.appendChild(stringToHTML(image));
    })
}

// This generates the cards to the DOM on load
generateCards(); 

const memoryCards = document.querySelectorAll('.memory-card');

start.addEventListener('click', startGame)

// This is a function that shuffles the cards by randomizing the position inside the flex box
function shuffle() {
    memoryCards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 8);
        card.style.order = randomPosition;
})}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

// This is a function that flips the cards
function flipCard() {

    if (lockBoard) {return;}

    if (this === firstCard) {return;}

    this.classList.toggle('flip')
    onClick(); 

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    } 

    hasFlippedCard = false;
    secondCard = this;
        
    checkForMatch();   
}

// This fucntion checks for a match by comparing the data type on the cards
function checkForMatch() {

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
  }

// This function disables the cards from flipping, and its called in the checkForMatch-function to prevent two matched cards from being flipped again.
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function enableCards() {
    memoryCards.forEach((memoryCard) => {
        memoryCard.addEventListener('click', flipCard)
        })
}

function unflipCards () {

    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;

    }, 1100);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Add the function flipCard when clicking on one of the cards, witch then flips the card, (duh)
memoryCards.forEach((memoryCard) => {
    memoryCard.addEventListener('click', flipCard)
    })

shuffle();

// This is the click-counter
var clickCounter = 0;
function onClick() {
    clickCounter++;
    document.getElementById("clicks").innerHTML = clickCounter;
}

// This is a function that resets the game and the click-counter
function startGame() {
    
    setTimeout(shuffle, 500);
    memoryCards.forEach(card => {
        card.classList.remove('flip');
        document.getElementById("clicks").innerHTML = 0;
        clickCounter = 0;
    })
    replayMessage.classList.add('replay-shuffling')
    setTimeout(()=> {
        replayMessage.classList.remove('replay-shuffling')
    }, 2000);
    
    enableCards();
}