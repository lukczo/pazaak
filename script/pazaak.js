///////////////////////////////
/* CLASS FUNCTIONS */ 
class card {
  constructor(name, type, value, color){
      this.id = Math.random(),
      this.name = name,
      this.type = type, 
      this.value = value,
      this.color = color
  }
}

const stackCardColor = 'pazaak-card-pool';
const plusCardColor = 'plus-card';
const minusCardColor ='minus-card';
const stackCard = 'StackCard';
const playerCard = 'Players Card';

function createCardObjects(type, value) {
  cardName = value > 0 ? `+${value}` : `${value}`;

  if (type === stackCard) {
    return cardName = new card(value.toString(), type, value, stackCardColor);
          
  } else if (type === playerCard) {
    return cardName === `+${value}`
      ? cardName = new card (cardName, type, value, plusCardColor)
      : cardName = new card (cardName, type, value, minusCardColor);
      }
      else {
          console.log('error');
      }
}


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

      let createdCardObject;
      createdCardObject = createCardObjects(stackCard, _CARDSTACK[generatedIndex]);
      this.cardPool.push(createdCardObject);
      _CARDSTACK.splice(generatedIndex, 1, null);
      
      this.cardPool.length > 0
        ? this.scoreKeeper()
        : console.log("--[LOG]---Pool is empty");
  
        outputPool(this.name, stackCard, createdCardObject.id)
  
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
  
    const cardPoolValues = [];
    for (const cards of this.cardPool) {
      cardPoolValues.push(cards.value);
    }

    this.score = cardPoolValues.reduce((acc, curVal) => {
      return (acc + curVal) < 0 ? 0 : acc + curVal;
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
    if (this.hand[num] != null) {
      console.log(`${this.name} used card no.: ${this.hand[num].value}`);

      this.cardPool.push(this.hand[num]);
      this.hand.splice(num, 1, null);
      
      this.scoreKeeper();

      resetCardStyle(playerHandDeck.children[num]);
      playerHandDeck.children[num].innerHTML = null;    
      outputPool(this.name); 
      setTimeout(aiBehavior, 1000);
    } else {
    }
  }
}
///////////////////////////////
/* Players declarations */ 
const humanPlayer = new player("Ukwial", new Array, new Array, 0);
const aiPlayer = new player("Opponent", new Array, new Array, 0);

