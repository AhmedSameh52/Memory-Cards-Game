const gameBoard = document.getElementById("game-board");
const playerLivesCount = document.getElementById("playerLivesCount");
const playerLives = 6;

playerLivesCount.textContent = playerLives;


imagesData = [
    {imgSrc: './images/angular.svg', name: 'angular'},
    {imgSrc: './images/aurelia.svg', name: 'aurelia'},
    {imgSrc: './images/backbone.svg', name: 'backbone'},
    {imgSrc: './images/ember.svg', name: 'ember'},
    {imgSrc: './images/react.svg', name: 'react'},
    {imgSrc: './images/vue.svg', name: 'vue'},
    {imgSrc: './images/nest.png', name: 'nest'},
    {imgSrc: './images/ajax.png', name: 'ajax'},
    {imgSrc: './images/angular.svg', name: 'angular'},
    {imgSrc: './images/aurelia.svg', name: 'aurelia'},
    {imgSrc: './images/backbone.svg', name: 'backbone'},
    {imgSrc: './images/ember.svg', name: 'ember'},
    {imgSrc: './images/react.svg', name: 'react'},
    {imgSrc: './images/vue.svg', name: 'vue'},
    {imgSrc: './images/nest.png', name: 'nest'},
    {imgSrc: './images/ajax.png', name: 'ajax'},
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

        card.appendChild(faceImage);
        card.appendChild(backImage);
        gameBoard.appendChild(card);
    }

}

cardGenerator();
