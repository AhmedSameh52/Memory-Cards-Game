const gameBoard = document.getElementById("game-board");
const playerLivesCount = document.getElementById("playerLivesCount");
const scoreCount = document.getElementById("scoreCount");

var playerLives = 6;
var score = 0

playerLivesCount.textContent = playerLives;
scoreCount.textContent = score;

WebFont.load({
    google: {
        families: ['Jua']
    },
});

imagesData = [
    {imgSrc: './images/blue-monster.png', name: 'blue-monster'},
    {imgSrc: './images/cyan-monster.png', name: 'cyan-monster'},
    {imgSrc: './images/devil-monster.png', name: 'devil-monster'},
    {imgSrc: './images/green-monster.png', name: 'green-monster'},
    {imgSrc: './images/one-eye-monster.png', name: 'one-eye-monster'},
    {imgSrc: './images/purple-monster.png', name: 'purple-monster'},
    {imgSrc: './images/red-monster.png', name: 'red-monster'},
    {imgSrc: './images/yellow-monster.png', name: 'yellow-monster'},
    {imgSrc: './images/wide-monster.png', name: 'wide-monster'},
    {imgSrc: './images/blue-monster.png', name: 'blue-monster'},
    {imgSrc: './images/cyan-monster.png', name: 'cyan-monster'},
    {imgSrc: './images/devil-monster.png', name: 'devil-monster'},
    {imgSrc: './images/green-monster.png', name: 'green-monster'},
    {imgSrc: './images/one-eye-monster.png', name: 'one-eye-monster'},
    {imgSrc: './images/purple-monster.png', name: 'purple-monster'},
    {imgSrc: './images/red-monster.png', name: 'red-monster'},
    {imgSrc: './images/yellow-monster.png', name: 'yellow-monster'},
    {imgSrc: './images/wide-monster.png', name: 'wide-monster'},
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
            score += 2;
            scoreCount.textContent = score;
        } else {
            for (let i = 0; i < flippedCards.length; i++) {
                flippedCards[i].classList.remove("flipped");
                setTimeout(() => flippedCards[i].classList.remove("toggleCard"), 1000);
            }
            playerLives--;
            score -= 2;
            playerLivesCount.textContent = playerLives;
            scoreCount.textContent = score;
            if(playerLives == 0) {
                setTimeout(() => {
                    restartGame("You Lost the Game");
                }, 1000);
            }
        }
    }

    const toggleCards = document.querySelectorAll(".toggleCard");
    if(toggleCards.length == 16) {
        setTimeout(() => {
            restartGame("You Won!");
        }, 1000);
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
    score = 0;

    playerLivesCount.textContent = playerLives;
    scoreCount.textContent = score;

    gameBoard.style.pointerEvents = "all";

    setDifficulty();

    setTimeout(() => window.alert(textAlert), 100);
}


document.addEventListener('DOMContentLoaded', function() {
    const difficultySlider = document.getElementById('difficulty');
    const difficultyLabel = document.getElementById('difficulty-label');
    const timerElement = document.getElementById('timer');

    let timerInterval;
    const difficulties = {
        1: { label: 'Easy', time: 300 }, // 5 minutes
        2: { label: 'Medium', time: 180 }, // 3 minutes
        3: { label: 'Hard', time: 60 } // 1 minute
    };

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function updateTimer(seconds) {
        clearInterval(timerInterval);
        timerElement.textContent = formatTime(seconds);
        timerInterval = setInterval(() => {
            seconds--;
            timerElement.textContent = formatTime(seconds);
            if (seconds <= 0) {
                clearInterval(timerInterval);
                setTimeout(() => {
                    restartGame("Time's Up, You Lost the Game");
                }, 1000);
            }
        }, 1000);
    }

    function setDifficulty() {
        const difficulty = difficulties[difficultySlider.value];
        difficultyLabel.textContent = difficulty.label;
        updateTimer(difficulty.time);
    }

    difficultySlider.addEventListener('input', setDifficulty);

    // Initialize with default difficulty
    setDifficulty();

    // Expose setDifficulty function globally so it can be called elsewhere
    window.setDifficulty = setDifficulty;
});


cardGenerator();
