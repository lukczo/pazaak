

cardStack = [];
offStack = [];

function tossCards() {
  stack = [];
  dealtCards = Math.random();
  dealtCards = dealtCards.toString();

  for (i = 2; i < dealtCards.length; ++i) {
    output = dealtCards.charAt(i);
    output === "0"
      ? cardStack.push(parseInt(output) + 1)
      : cardStack.push(parseInt(output));
  }

  console.log("--[LOG]---Current cardstack is:", cardStack);
  return cardStack;
}

tossCards();

class player {
  constructor(name, cardPool, hand) {
    this.name = name,
    this.cardPool = cardPool,
    this.hand = hand}

  drawCards() {
    console.log('###########################')
    let generatedIndex;
    generatedIndex = randomNumber();
    console.log(`--[LOG]---We have generated index number of: [${generatedIndex}]`);

    
    if (
      generatedIndex <= cardStack.length &&
      cardStack[generatedIndex] !== null
    ) {
      console.log(`You have drawn card no.: ${cardStack[generatedIndex]}`);
      this.cardPool.push(cardStack[generatedIndex]);
      cardStack.splice(generatedIndex, 1, null);

      console.log(`--[LOG]---Stack status: [${cardStack}]`);
      console.log(`Player card pool: ${this.cardPool}`);
    } else if (
      generatedIndex > cardStack.length ||
      cardStack[generatedIndex] === null
    ) {
      check() === true
        ? console.log("--[LOG]---No more cards left")
        : this.drawCards() +
          console.log(
            `--[LOG]---Generated index: ${generatedIndex} is bigger than  Card Stack indexes, drawing again!`
          );
    } else {
    }
    this.cardPool.length > 0 ?  scoreKeeper() : console.log('--[LOG]---Player pool is empty. It must be a first');
  }
/* turn () {
   
} */

}

function check() {
  return cardStack.every((currentValue) => currentValue === null);
}

function randomNumber() {
  return Math.floor(Math.random() * cardStack.length);
}


function scoreKeeper() {
  playerScore = playerPool.reduce((acc,curVal) => {return acc + curVal});
  aiScore = enemyPool.reduce((acc,curVal) => {return acc + curVal});
  console.log(`Player counter: ${playerScore}`);
  console.log(`AI counter: ${aiScore}`)
  winHandler(playerScore);
}
function winHandler(playerScore) {
  playerScore === 20 ? console.log('win') : playerScore > 20 ? console.log(`${playerScore} you lose`) : console.log(`--[LOG]---Keep playing`)
}


playerHand = [-4, 3, 3, -2];
playerPool = [];
const humanPlayer = new player("You", playerPool, playerHand);

enemyHand = [2, 2, 4, -1];
enemyPool = [1];


const drawCardBtn = document.querySelector('#draw-card');
drawCardBtn.addEventListener('click', humanPlayer.drawCards.bind(humanPlayer))

const firstCardInHand = document.querySelector('#first-card');
const secondCardInHand = document.querySelector('#second-card');
const thirdCardInHand = document.querySelector('#third-card');
const fourthCardInHand = document.querySelector('#fourth-card');

function useCard(hand, pool) {
console.log('Used card no.: ' + hand[0])
pool.push(hand[0]);
playerHand.splice(hand[0], 1, null);
scoreKeeper();
}

firstCardInHand.addEventListener('click', useCard.bind(null, playerHand, playerPool))
standBtn = document.querySelector('#stand');
standBtn.addEventListener('click', winHandler.bind(null, scoreKeeper))