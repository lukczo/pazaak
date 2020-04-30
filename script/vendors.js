///////////////////////////////
/* VENDORS */
const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset');
const standBtn = document.querySelector("#stand");
const drawCardBtn = document.querySelector("#draw-card");
const continueBtn = document.querySelector('#continue');

const playerCardDom = document.querySelector('.player');
const aiCardDom = document.querySelector('.ai');
const playerHandDeck = playerCardDom.lastElementChild;
const aiHandDeck = aiCardDom.lastElementChild;

const playerScorePlace = document.querySelector("#score-player");
const aiScorePlace = document.querySelector("#score-ai")
const playerRoundCounter = document.querySelector('#player-won-rounds');
const aiRoundCounter = document.querySelector('#ai-won-rounds');

const playerNameDisplayed = document.querySelector('#pleayer-name-header');

const playerPoolCards = document.querySelector("#player-pool").querySelectorAll('.pazaak-card');
const aiPoolCards = document.querySelector("#ai-pool").querySelectorAll('.pazaak-card');

const pickHandDeckBtn = document.querySelector("#pick-handdeck");
const pazaakTitle = document.querySelector('.header').firstElementChild;

const clickAudio = new Audio ('./assets/click.mp3')

const cardInPlayerPool = document.querySelector('#player-pool').children[1]


const modalCard = document.querySelector('.modal-template');
const backdrop = document.querySelector('.backdrop');

const mainTag = document.querySelector('main')

const modalLeftPosition = cardInPlayerPool.offsetLeft + (cardInPlayerPool.offsetWidth / 2);