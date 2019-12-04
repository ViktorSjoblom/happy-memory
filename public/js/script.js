const cards = [
    {image: "./img/breznak.jpg", type: "breznak"},
    {image: "./img/carlsberg.jpg", type: "carlsberg"},
    {image: "./img/coors.jpg", type: "coors"},
    {image: "./img/falcon.jpg", type:"falcon"},
    {image: "./img/koekedam.jpg", type: "koekedam"},
    {image: "./img/lapinkulta.jpg", type: "lapinkulta"},
    {image: "./img/threetowns.jpg", type: "threetowns"},
    {image: "./img/tuborg.jpg", type:"tuborg"},
    {image: "./img/breznak.jpg", type: "breznak"},
    {image: "./img/carlsberg.jpg", type: "carlsberg"},
    {image: "./img/coors.jpg", type: "coors"},
    {image: "./img/falcon.jpg", type:"falcon"},
    {image: "./img/koekedam.jpg", type: "koekedam"},
    {image: "./img/lapinkulta.jpg", type: "lapinkulta"},
    {image: "./img/threetowns.jpg", type: "threetowns"},
    {image: "./img/tuborg.jpg", type:"tuborg"},
]

const container = document.querySelector('.memory-container');
const start = document.querySelector('.start');
const replayMessage = document.querySelector('.replay-message');

// Helper function to prevent XSS injections
// Creates an HTML element from string
function stringToHTML (str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
  };

// This function creates an image tag from the cards array
function createCard(image, type) {
    return `<div class="memory-card" data-framework="${type}"><img class="front-side" src="${image}">
            <img class="back-side" id="back-side" src="https://images-na.ssl-images-amazon.com/images/I/715dsfeaDdL._SL1500_.jpg">
    </div>`
}

// This function generates the cards from the cards array to the DOM and appends it to the memoryContainer
function generateCards() {
    cards.forEach((card) => {
        const image = createCard(card.image, card.type);
        container.appendChild(stringToHTML(image));
    })
}

// This generates the cards to the DOM on load
generateCards(); 

const memoryCards = document.querySelectorAll('.memory-card');

start.addEventListener('click', startGame)

// This function shuffles the card by randomizing the positioning within the flex box
function shuffle() {
    memoryCards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 8);
        card.style.order = randomPosition;
})}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

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


// this function checks for a match by comparing the data type of the cards
function checkForMatch() {

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
  }


// This function disables the cards from flipping and is called in the checkForMatch function to prevent two matched cards from being flipped again.
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

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// add the flip class when clicking on one of the cards, flipping the cards.
memoryCards.forEach((memoryCard) => {
    memoryCard.addEventListener('click', flipCard)
    })

shuffle();

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

var clickCounter = 0;
function onClick() {
    clickCounter++;
    document.getElementById("clicks").innerHTML = clickCounter;

};