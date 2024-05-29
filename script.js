const gameBoard = document.getElementById("game-board");
const playerLivesCount = document.getElementById("playerLivesCount");
var playerLives = 6;

playerLivesCount.textContent = playerLives;


imagesData = [
    {imgSrc: './images/blue-monster.png', name: 'blue-monster'},
    {imgSrc: './images/cyan-monster.png', name: 'cyan-monster'},
    {imgSrc: './images/devil-monster.png', name: 'devil-monster'},
    {imgSrc: './images/green-monster.png', name: 'green-monster'},
    {imgSrc: './images/one-eye-monster.png', name: 'one-eye-monster'},
    {imgSrc: './images/purple-monster.png', name: 'purple-monster'},
    {imgSrc: './images/red-monster.png', name: 'red-monster'},
    {imgSrc: './images/yellow-monster.png', name: 'yellow-monster'},
    {imgSrc: './images/blue-monster.png', name: 'blue-monster'},
    {imgSrc: './images/cyan-monster.png', name: 'cyan-monster'},
    {imgSrc: './images/devil-monster.png', name: 'devil-monster'},
    {imgSrc: './images/green-monster.png', name: 'green-monster'},
    {imgSrc: './images/one-eye-monster.png', name: 'one-eye-monster'},
    {imgSrc: './images/purple-monster.png', name: 'purple-monster'},
    {imgSrc: './images/red-monster.png', name: 'red-monster'},
    {imgSrc: './images/yellow-monster.png', name: 'yellow-monster'},
];

function randomize() {
    return imagesData.sort( () => Math.random() - 0.5);
}

function cardGenerator() {
    const shuffledImages = randomize();

    for(let i = 0; i < shuffledImages.length; i++) {
        const card = document.createElement('div');
        const faceImage = document.createElement('img');
        const backImage = document.createElement('div');

        card.classList = 'card';
        faceImage.classList = 'card-face';
        backImage.classList = 'card-back';

        faceImage.src = shuffledImages[i].imgSrc;
        card.setAttribute('name', shuffledImages[i].name);

        card.appendChild(faceImage);
        card.appendChild(backImage);
        gameBoard.appendChild(card);

        card.addEventListener('click', (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    }

}

function checkCards(e) {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");

    const flippedCards = document.querySelectorAll('.flipped');

    if(flippedCards.length == 2) {
        if(flippedCards[0].getAttribute('name') == flippedCards[1].getAttribute('name')) {
            for(let i = 0; i < flippedCards.length; i++) {
                flippedCards[i].classList.remove("flipped");
                flippedCards[i].style.pointerEvents = "none";
            }
        } else {
            for (let i = 0; i < flippedCards.length; i++) {
                flippedCards[i].classList.remove("flipped");
                setTimeout(() => flippedCards[i].classList.remove("toggleCard"), 1000);
            }
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives == 0) {
                restartGame("You Lost the Game");
            }
        }
    }

    const toggleCards = document.querySelectorAll(".toggleCard");
    if(toggleCards.length == 16) {
         restartGame("You Won!");
    }
}

function restartGame(textAlert) {
    const shuffledImages = randomize();
    const faces = document.querySelectorAll(".card-face");
    const cards = document.querySelectorAll(".card");

    gameBoard.style.pointerEvents = "none";

    for(let i = 0; i < shuffledImages.length; i++) {
        cards[i].classList.remove("toggleCard");
        setTimeout(() => {
            cards[i].style.pointerEvents = "all";
            faces[i].src = shuffledImages[i].imgSrc;
            cards[i].setAttribute('name', shuffledImages[i].name);
        }, 1000);
    }
    playerLives = 6;
    playerLivesCount.textContent = playerLives;

    gameBoard.style.pointerEvents = "all";

    setTimeout(() => window.alert(textAlert), 100);
}

cardGenerator();
