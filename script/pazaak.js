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


    function draw() {
      resultModal('drawRound')
    }

    /* */
/*     drawCardBtn.classList.add('unclickable');
    standBtn.classList.add('unclickable');
    drawCardBtn.removeEventListener('click', multiPlayer);
    standBtn.removeEventListener("click", bindedToAiPlayer); */
    disableBtns();


    switch (win){
      case gm:
          if (humanPlayer.score < 20
              && humanPlayer.score > aiPlayer.score
              && aiPlayer.score < 20) {
                humanWon()
          } else if(humanPlayer.score < 20
                  && humanPlayer.score < aiPlayer.score
                  && aiPlayer.score < 20) {
                    aiWon()
          } else if ( humanPlayer.score > 20) {
            aiWon()
          } else if (aiPlayer.score > 20) {
            humanWon()
          } else if (humanPlayer.score === aiPlayer.score) {
            draw()
          } else if (humanPlayer.cardPool.length === 9
            && humanPlayer.score < 20
            && aiPlayer.score === 20){
              aiWon()
          } else if (aiPlayer.cardPool.length === 9
            && aiPlayer.score < 20
            && humanPlayer.score === 20){
              humanWon()
          }else {
              console.log('case gm handler error');
          }
      break;
  
      case aiPlayer:
        aiWon()
  
      break;
  
      case humanPlayer:
        humanWon()
      break;
        }

        continueBtn.classList.toggle('blocked');
        continueBtn.addEventListener('click', nextRound);

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
      resetCardStyle(playerHandDeck.children[num]);
      playerHandDeck.children[num].innerHTML = null;   
      disableBtns(); 
      setTimeout(multiPlayer, 1000);
    } else if (this === aiPlayer){
      enableBtns();
    } else {
      console.log('useCard() error');
    } 


/*     if (this === humanPlayer){
      (humanPlayer.score <= 20 && aiPlayer.score <= 20)
      ? console.log('no trigger')
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
    } */
  }

   renderCards(){
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
}
} 


function humanWon() {
  playerCardDom.classList.toggle('shadow-drop-center');
  _humanWonRounds.push(1);
  numberOfRoundsWonByHuman = _humanWonRounds.length;

  switch (numberOfRoundsWonByHuman){
    case 1: 
      resultModal('humanWon')
      playerRoundCounter.children[0].classList.add('round-won');
    break;
    case 2:
      resultModal('humanWon')
      playerRoundCounter.children[1].classList.add('round-won');
    break;
    case 3:
      playerRoundCounter.children[2].classList.add('round-won');
      resultModal('won-final');
      continueBtn.classList.toggle('blocked');
      resetBtn.innerHTML = 'Play again?';
    break;
  }
}

function aiWon() {
  aiCardDom.classList.toggle('shadow-drop-center');
  _aiWOnRounds.push(1);
  numberOfRoundsWonByAi = _aiWOnRounds.length;
  switch (numberOfRoundsWonByAi){
    case 1: 
      resultModal('aiWon')
    aiRoundCounter.children[0].classList.add('round-won');
    break;
    case 2:
      resultModal('aiWon')
      aiRoundCounter.children[1].classList.add('round-won');
    break;
    case 3:
      resultModal('lose-final');
      aiRoundCounter.children[2].classList.add('round-won');
      continueBtn.classList.toggle('blocked');
      resetBtn.innerHTML = 'Play again?';
    break;
  }
}
/////////////////////////////////
/* Players declarations */ 
const humanPlayer = new player("Ukwial", new Array, new Array, 0);
const aiPlayer = new player("Opponent", new Array, new Array, 0);
const gm = new player ("gm", new Array, new Array, 0);