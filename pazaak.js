///////////////////////////////
/* VENDORS */
const firstCardInHand = document.querySelector("#first-card");
const secondCardInHand = document.querySelector("#second-card");
const thirdCardInHand = document.querySelector("#third-card");
const fourthCardInHand = document.querySelector("#fourth-card");

const standBtn = document.querySelector("#stand");
const drawCardBtn = document.querySelector("#draw-card");

const playerScorePlace = document.querySelector("#score-player");
const aiScorePlace = document.querySelector("#score-ai")

const playerPoolCards = document.querySelector("#player-pool").querySelectorAll('.pazaak-card');
const aiPoolCards = document.querySelector("#ai-pool").querySelectorAll('.pazaak-card');

const modal = document.querySelector('#modal');
const backdrop = document.querySelector("#backdrop");
const modalP = modal.getElementsByTagName('p')[0];
const pickHandDeckBtn = document.querySelector("#pick-handdeck");
///////////////////////////////
const _CARDSTACK = [];

///////////////////////////////
function tossCards() {
  stack = [];
  dealtCards = Math.random();
  dealtCards = dealtCards.toString();

  for (i = 2; i < dealtCards.length; ++i) {
    output = dealtCards.charAt(i);
    output === "0"
      ? _CARDSTACK.push(parseInt(output) + 2)
      : output === "1"
      ? _CARDSTACK.push(parseInt(output + 1))
      : _CARDSTACK.push(parseInt(output));
  }

  console.log("--[LOG]---Current cardstack is:", _CARDSTACK);
  return _CARDSTACK;
}

tossCards();

///////////////////////////////
/* CLASS CONSTRUCTOR */ 

class player {
  constructor(name, cardPool, hand, score) {
    (this.name = name),
      (this.cardPool = cardPool),
      (this.hand = hand),
      (this.score = score);
  }

  drawCards() {
    console.log("###########################");
    let generatedIndex;
    generatedIndex = randomNumber();
    /*     console.log(`--[LOG]---We have generated index number of: [${generatedIndex}]`); */

    if (
      generatedIndex <= _CARDSTACK.length &&
      _CARDSTACK[generatedIndex] !== null
    ) {
      console.log(
        `${this.name} have drawn card no.: ${_CARDSTACK[generatedIndex]}`
      );
      
      
      this.cardPool.push(_CARDSTACK[generatedIndex]);
      _CARDSTACK.splice(generatedIndex, 1, null);
      /*       console.log(`--[LOG]---Stack status: [${_CARDSTACK}]`); */
      console.log(`${this.name} card pool: ${this.cardPool}`);
      this.cardPool.length > 0
        ? this.scoreKeeper()
        : console.log("--[LOG]---Pool is empty");

        outputPool(this.name)

    } else if (
      generatedIndex > _CARDSTACK.length ||
      _CARDSTACK[generatedIndex] === null
    ) {
      check() === true
        ? console.log("--[LOG]---No more cards left")
        : this.drawCards() /*  +
          console.log(
            `--[LOG]---Generated index: ${generatedIndex} was unavailable, card was drawn again---[LOG]--`
          ) */;
    } else {
    }
  }
  turn() {
    this.score < 20
      ? this.drawCards()
      : this.score >= 20
      ? this.winHandler()
      : console.log("Error");
  }

  scoreKeeper() {
    this.score = this.cardPool.reduce((acc, curVal) => {
      return acc + curVal;
    });
    outputScore(this.name, this.score);
    console.log(`${this.name} SCORE: ..::${this.score}::..`);
  }
  winHandler() {
    humanPlayer.score === aiPlayer.score
      ? console.log("_^_^_^_^_^_It's a draw_^_^_^_^_^_")
      : this.score > 20
      ? console.log(`_^_^_^_^_^_${this.name} has lost_^_^_^_^_^_`) 
      : this.score === 20
      ? console.log(`_^_^_^_^_^_${this.name} has won_^_^_^_^_^_`) 
      : console.log(`--[LOG]---Keep playing`);

      modalToggler()
  }

  useCard(num) {
    if (!!this.hand[num]) {
      console.log(`${this.name} used card no.: ${this.hand[num]}`);
      this.cardPool.push(this.hand[num]);
      this.hand.splice(this.hand[num], 1, null);
      this.scoreKeeper();
      firstCardInHand.classList.add("blocked");
      aiBehavior();
    } else {
    }
  }
}


///////////////////////////////
/* Players declarations */ 
playerHand = [];
playerPool = [];
playerScore = 0;
const humanPlayer = new player("Ukwial", playerPool, playerHand, playerScore);

aiHand = [2, 2, 4, -1];
aiPool = [];
aiScore = 0;
const aiPlayer = new player("Opponent", aiPool, aiHand, aiScore);

function renderCards() {
a = randomNumber() * randomOperator();
b = randomNumber() * randomOperator();
c = randomNumber() * randomOperator();
d = randomNumber() * randomOperator();

  firstCardInHand.innerHTML =  a;
  secondCardInHand.innerHTML = b;
  thirdCardInHand.innerHTML =  c;
  fourthCardInHand.innerHTML = d;

  humanPlayer.hand.push(a,b,c,d);
  
  firstCardInHand.addEventListener(
    "click",
    humanPlayer.useCard.bind(humanPlayer, a)
  );
  secondCardInHand.addEventListener(
    "click",
    humanPlayer.useCard.bind(humanPlayer, b)
  );
  thirdCardInHand.addEventListener(
    "click",
    humanPlayer.useCard.bind(humanPlayer, c)
  );
  fourthCardInHand.addEventListener(
    "click",
    humanPlayer.useCard.bind(humanPlayer, d)
  );
}

pickHandDeckBtn.addEventListener('click', renderCards)
renderCards();
///////////////////////////////
/* Minor functions */

function check() {
  return _CARDSTACK.every((currentValue) => currentValue === null);
}

function randomNumber() {
  random = Math.floor(Math.random() * _CARDSTACK.length);
  random > 0 && random <= 10 ? random : randomNumber();
  return random
}

function randomOperator() {
  random = randomNumber();
  return random <= 5
    ? 1
    : random > 5
    ? -1
    : console.log("error drawing operator");
}

function multiPlayer() {
  humanPlayer.turn(humanPlayer);
  aiBehavior();
}

function aiBehavior() {
  if ((aiPlayer.score === 18 && !aiPlayer.hand[0]) || aiPlayer.score === 19) {
    console.log("AI stand the game");
  } else if (humanPlayer.score >= 20) {
  } else if (aiPlayer.score === 18) {
    aiPlayer.useCard();
  } else {
    aiPlayer.turn(aiPlayer);
  }
}
function outputScore(name, score) {
  if (name === humanPlayer.name) {
    playerScorePlace.innerHTML = score;
  }
  else {
    aiScorePlace.innerHTML = score;
  }
}

function outputPool(player){

  if (player === humanPlayer.name){
    arrPlayerPoolCards = Array.from(playerPoolCards);
    for (const [index, card] of humanPlayer.cardPool.entries()) {
      arrPlayerPoolCards[index].innerHTML = card; 
      arrPlayerPoolCards[index].classList.add('pazaak-card-pool')
    }
  } else {
    arrAiPoolCards = Array.from(aiPoolCards);
    for (const [index, card] of aiPlayer.cardPool.entries()) {
      arrAiPoolCards[index].innerHTML = card; 
      arrAiPoolCards[index].classList.add('pazaak-card-pool')
  }
}
}

function modalToggler(){
  modal.classList.toggle('blocked');
  backdrop.classList.toggle('blocked');
  document.body.classList.toggle('overflow');
  modal.addEventListener('click', modalToggler);
  backdrop.addEventListener('click', modalToggler);
/*   modalP.addEventListener('click', ()=>
  {
    _CARDSTACK = [],
    playerPool = [];
    playerScore = 0;
    aiPool = [];
    aiScore = 0;
    tossCards;
    modalToggler
  }
  ) */
}
///////////////////////////////
/* Event listeners */ 
drawCardBtn.addEventListener("click", multiPlayer);

standBtn.addEventListener("click", aiPlayer.turn.bind(aiPlayer));
