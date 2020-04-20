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
    let generatedIndex, createdCardObject;
    generatedIndex = randomNumber();    
    console.log(`${this.name} have drawn card no.: ${generatedIndex}`);   
    
    createdCardObject = createCardObjects(stackCard, generatedIndex);      
    this.cardPool.push(createdCardObject);

    this.cardPool.length > 0
    ? this.scoreKeeper()
    : console.log("--[LOG]---Pool is empty");  
    
    outputPool(this.name, stackCard, createdCardObject.id)
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

    if (humanPlayer.score === 20 && aiPlayer === 20) {
      gm.winHandler(gm); /* outputs 'it's a draw' */
    }


    console.log(`${this.name} SCORE: ..::${this.score}::..`);
  }

  winHandler(win) {   

    /* */
    drawCardBtn.classList.add('unclickable');
    standBtn.classList.add('unclickable');
    drawCardBtn.removeEventListener('click', multiPlayer);
    standBtn.removeEventListener("click", bindedToAiPlayer);
    resetBtn.innerHTML='Continue?';

    switch (win){
      case gm:
          if (humanPlayer.score < 20
              && humanPlayer.score > aiPlayer.score
              && aiPlayer.score < 20) {
                  alert(`_^_^_^_^_^_${humanPlayer.name} has won_^_^_^_^_^_`);
                  playerCardDom.classList.toggle('rotate-vert-center');
          } else if(humanPlayer.score < 20
                  && humanPlayer.score < aiPlayer.score
                  && aiPlayer.score < 20) {
                      alert(`_^_^_^_^_^_${aiPlayer.name} has won_^_^_^_^_^_`);
                      aiCardDom.classList.toggle('rotate-vert-center');
          } else if ( humanPlayer.score > 20) {
              alert(`_^_^_^_^_^_${aiPlayer.name} has won_^_^_^_^_^_`);
              aiCardDom.classList.toggle('rotate-vert-center');
          } else if (aiPlayer.score > 20) {
              alert(`_^_^_^_^_^_${humanPlayer.name} has won_^_^_^_^_^_`);
              playerCardDom.classList.toggle('rotate-vert-center');
          } else if (humanPlayer.score === aiPlayer.score) {
              alert('`_^_^_^_^_^_ A draw! This set is tied `_^_^_^_^_^_') 
          } else if (humanPlayer.cardPool.length === 9
            && humanPlayer.score < 20
            && aiPlayer.score === 20){
              alert(`_^_^_^_^_^_${aiPlayer.name} has won_^_^_^_^_^_`);
              aiCardDom.classList.toggle('rotate-vert-center');
          } else if (aiPlayer.cardPool.length === 9
            && aiPlayer.score < 20
            && humanPlayer.score === 20){
              alert(`_^_^_^_^_^_${humanPlayer.name} has won_^_^_^_^_^_`);
              playerCardDom.classList.toggle('rotate-vert-center');
          }else {
              console.log('case gm handler error');
          }
      break;
  
      case aiPlayer:
          alert(`_^_^_^_^_^_${aiPlayer.name} has won_^_^_^_^_^_`) ;
          aiCardDom.classList.toggle('rotate-vert-center');
  
      break;
  
      case humanPlayer:
          alert(`_^_^_^_^_^_${humanPlayer.name} has won_^_^_^_^_^_`);
          playerCardDom.classList.toggle('rotate-vert-center');
      break;
        }


  }
  
  useCard(num) {
    if (this.hand[num] != null) {
      console.log(`${this.name} used card no.: ${this.hand[num].value}`);

      this.cardPool.push(this.hand[num]);
      this.hand.splice(num, 1, null);
      
      this.scoreKeeper();


      outputPool(this.name); 
    } else {
    }
    if (this === humanPlayer){
      (humanPlayer.score <= 20 && aiPlayer.score <= 20)
      ? console.log('no trigger') /* multiPlayer('usedCard') */
      : humanPlayer.score > 20
      ? aiPlayer.winHandler(aiPlayer)
      : (humanPlayer.score < 20 && aiPlayer.score > 20)
      ? humanPlayer.winHandler(humanPlayer)
      : console.log('useCard() error first if section');

      resetCardStyle(playerHandDeck.children[num]);
      playerHandDeck.children[num].innerHTML = null;    

    } else if (this === aiPlayer){
      this.score > 20
      ? humanPlayer.winHandler(humanPlayer)
      : console.log ('useCard: checking if human player won'); 
      

    } else {
      console.log('useCard() error');
    }
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
const gm = new player ("gm", new Array, new Array, 0);