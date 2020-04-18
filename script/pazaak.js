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
const aiHandCardcolor = 'ai-hand-card';

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
if( 
  (humanPlayer.score <= 20 && aiPlayer.score <= 20)
  || (humanPlayer.score === 20 && aiPlayer.score <= 20)
  || (humanPlayer.score <= 20 && aiPlayer.score === 20)
  || (humanPlayer.score <= 20 && aiPlayer.score >= 20) 
  ){
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
    
} else {
  this.winHandler(this);
}
}
/*   turn() {
    if ( humanPlayer.score <= 20 && aiPlayer.score > 20) {
      this.winHandler(humanPlayer);      
    } else if (humanPlayer.score === 20 && aiPlayer.score === 20) {
      this.winHandler(humanPlayer);
    } else if (humanPlayer.score > 20 && aiPlayer.score < 20) {
      this.winHandler(aiPlayer);
    } else if (humanPlayer.score > 20 && aiPlayer.score === 20) {
      this.winHandler(aiPlayer);
    } else if (aiPlayer.score > 20) {
      this.winHandler(humanPlayer);
    } else if (humanPlayer.score < 20 && aiPlayer.score === 20){
      this.drawCards();
    } else if (humanPlayer.score < 20 && aiPlayer.score < 20){
      this.drawCards() 
    } else if (humanPlayer.score === 20 && aiPlayer.score < 20) {
      this.drawCards();
    } else {
      console.log('turn error')
    }
  } */

  

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
  winHandler(win) {
/*     humanPlayer.score === aiPlayer.score
      ? alert("_^_^_^_^_^_It's a draw_^_^_^_^_^_")
      : this.score > 20
      ? alert(`_^_^_^_^_^_${this.name} has lost_^_^_^_^_^_`) 
      : this.score === 20
      ? alert(`_^_^_^_^_^_${this.name} has won_^_^_^_^_^_`) 
      : console.log(`--[LOG]---Keep playing`); */

      
      (humanPlayer.score === 20 && aiPlayer.score === 20)
      && (humanPlayer.score === aiPlayer.score)
      ? alert("_^_^_^_^_^_It's a draw_^_^_^_^_^_")
      : win === (aiPlayer)
      ? alert(`_^_^_^_^_^_${aiPlayer.name} has won_^_^_^_^_^_`)
        + aiCardDom.classList.toggle('rotate-vert-center')
      : win === (humanPlayer)
      ? alert(`_^_^_^_^_^_${humanPlayer.name} has won_^_^_^_^_^_`)
        + playerCardDom.classList.toggle('rotate-vert-center') 
      : console.log('--[LOG]--- win handler error');

      resetBtn.innerHTML='Continue?'
      drawCardBtn.classList.toggle('unclickable');
      standBtn.classList.toggle('unclickable');
      drawCardBtn.removeEventListener('click', multiPlayer);
      /* Declared in ui_functions.js: const bindedToAiPlayer = aiPlayer.turn.bind(aiPlayer); */
      standBtn.removeEventListener("click", bindedToAiPlayer);
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
    humanPlayer.winHandler()
  }

/*   renderCards(){
    humanPlayer.hand.length = 0;
    aiPlayer.hand.length = 0;

    let handdeck, createdCardObject;
    this.name === humanPlayer.name
    ? handdeck = Array.from(playerHandDeck.children)
    : handdeck = aiHanddeck = Array.from(aiHandDeck.children);

    for (const [index, cards] of handdeck.entries()){
      random = randomNumber() * randomOperator();  
      createdCardObject = createCardObjects(playerCard, random);
      
      if(this.name === humanPlayer.name) {      
        cards.innerHTML = createdCardObject.name
        resetCardStyle(cards);  
        cards.classList.add(createdCardObject.color);
        cards.addEventListener("click", humanPlayer.useCard.bind(humanPlayer, index), { once: true});
      } else {
        cards.classList.add(aiHandCardcolor);
      }
      this.hand.push(createdCardObject);  
  }
}*/
} 
/////////////////////////////////
/* Players declarations */ 
const humanPlayer = new player("Ukwial", new Array, new Array, 0);
const aiPlayer = new player("Opponent", new Array, new Array, 0);

