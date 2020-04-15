

cardStack = [];
offStack = [];

function tossCards() {
  stack = [];
  dealtCards = Math.random();
  dealtCards = dealtCards.toString();

  for (i = 2; i < dealtCards.length; ++i) {
    output = dealtCards.charAt(i);
    output === "0"
      ? cardStack.push(parseInt(output) + 2)
      : output === "1" ? cardStack.push(parseInt(output + 1)) : cardStack.push(parseInt(output));
  }

  console.log("--[LOG]---Current cardstack is:", cardStack);
  return cardStack;
}

tossCards();

class player {
  constructor(name, cardPool, hand, score) {
    this.name = name,
    this.cardPool = cardPool,
    this.hand = hand,
  this.score = score}

  drawCards() {
    console.log('###########################')
    let generatedIndex;
    generatedIndex = randomNumber();
/*     console.log(`--[LOG]---We have generated index number of: [${generatedIndex}]`); */

    
    if (
      generatedIndex <= cardStack.length &&
      cardStack[generatedIndex] !== null
    ) {
      console.log(`${this.name} have drawn card no.: ${cardStack[generatedIndex]}`);
      this.cardPool.push(cardStack[generatedIndex]);
      cardStack.splice(generatedIndex, 1, null);

/*       console.log(`--[LOG]---Stack status: [${cardStack}]`); */
      console.log(`${this.name} card pool: ${this.cardPool}`);
      this.cardPool.length > 0 ?  this.scoreKeeper() : console.log('--[LOG]---Pool is empty');
    } else if (
      generatedIndex > cardStack.length ||
      cardStack[generatedIndex] === null
    ) {
      check() === true
        ? console.log("--[LOG]---No more cards left")
        : this.drawCards()/*  +
          console.log(
            `--[LOG]---Generated index: ${generatedIndex} was unavailable, card was drawn again---[LOG]--`
          ) */;
    } else {
    }

  }
 turn () {   
  this.score < 20 ? this.drawCards() : this.score >= 20 ? this.winHandler() : console.log('Error') 
} 

scoreKeeper() {
  this.score = this.cardPool.reduce((acc,curVal) => {return acc + curVal});
  console.log(`${this.name} SCORE: ..::${this.score}::..`);
}
winHandler() {
  this.score === 20 ? console.log(`_^_^_^_^_^_${this.name} has won_^_^_^_^_^_`) : this.score > 20 ? console.log(`_^_^_^_^_^_${this.name} has lost_^_^_^_^_^_`) : console.log(`--[LOG]---Keep playing`);
}

useCard() {
  if (!!this.hand[0]){
console.log(`${this.name} used card no.: ${this.hand[0]}`)
this.cardPool.push(this.hand[0]);
this.hand.splice(this.hand[0], 1, null);
this.scoreKeeper();
firstCardInHand.classList.add('blocked');
aiBehavior();}
else {}
}

}

function check() {
  return cardStack.every((currentValue) => currentValue === null);
}

function randomNumber() {
  return Math.floor(Math.random() * cardStack.length);
}




function multiPlayer() {  
  humanPlayer.turn(humanPlayer);
  aiBehavior();
}


function aiBehavior(){
  if ((aiPlayer.score === 18 && !aiPlayer.hand[0]) || aiPlayer.score === 19) {
    console.log('AI stand the game')
  } else if (humanPlayer.score >= 20) {

  } else if (aiPlayer.score === 18) {
   aiPlayer.useCard(); 
  }else {
    aiPlayer.turn(aiPlayer);
  }
}
playerHand = [-4, 3, 3, -2];
playerPool = [];
playerScore = 0;
const humanPlayer = new player("Ukwial", playerPool, playerHand, playerScore);

aiHand = [2, 2, 4, -1];
aiPool = [];
aiScore = 0;
const aiPlayer = new player ('Opponent', aiPool, aiHand, aiScore)


const drawCardBtn = document.querySelector('#draw-card');
drawCardBtn.addEventListener('click', multiPlayer)

const firstCardInHand = document.querySelector('#first-card');
const secondCardInHand = document.querySelector('#second-card');
const thirdCardInHand = document.querySelector('#third-card');
const fourthCardInHand = document.querySelector('#fourth-card');


firstCardInHand.addEventListener('click', humanPlayer.useCard.bind(humanPlayer))
standBtn = document.querySelector('#stand');
standBtn.addEventListener('click', aiPlayer.turn.bind(aiPlayer))