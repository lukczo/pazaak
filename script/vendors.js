///////////////////////////////
/* VENDORS */
const startBtn = document.querySelector('#start')
const resetBtn = document.querySelector('#reset');
const standBtn = document.querySelector("#stand");
const drawCardBtn = document.querySelector("#draw-card");

const playerHandDeck = document.querySelector('.player').lastElementChild;
const aiHandDeck = document.querySelector('.ai').lastElementChild;

const playerScorePlace = document.querySelector("#score-player");
const aiScorePlace = document.querySelector("#score-ai")

const playerPoolCards = document.querySelector("#player-pool").querySelectorAll('.pazaak-card');
const aiPoolCards = document.querySelector("#ai-pool").querySelectorAll('.pazaak-card');

const modal = document.querySelector('#modal');
const backdrop = document.querySelector("#backdrop");
const modalP = modal.getElementsByTagName('p')[0];
const pickHandDeckBtn = document.querySelector("#pick-handdeck");
const pazaakTitle = document.querySelector('.header').firstElementChild;

const clickAudio = new Audio ('./assets/click.mp3')