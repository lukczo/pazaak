///////////////////////////////
/* GAME FUNCTIONS */ 
function tossCards() {
    stack = [];

    dealtCards = Math.random();
    dealtCards = dealtCards.toString();

    for (i = 2; i < dealtCards.length; ++i) {
      output = dealtCards.charAt(i);
      output === "0"
        ? _CARDSTACK.push(parseInt(output) + 2)
        : output === "1"
        ? _CARDSTACK.push(parseInt(output) + 1)
        : _CARDSTACK.push(parseInt(output));
    }
  
    /* console.log("--[LOG]---Current cardstack is:", _CARDSTACK); */
    return _CARDSTACK;
  }
  
  
  function clickSound() {
    clickAudio.play();
  }


function disableBtns() {
  drawCardBtn.setAttribute('disabled', 'true');
}

function enableBtns() {
  drawCardBtn.removeAttribute('disabled', 'false');
}


  function aiHandler() {
    clickSound();
    aiBehavior();
    enableBtns();
  }
  function uiResponseToTurns() {
    clickSound();
    disableBtns()
  }
  function multiPlayer() {
 
    if (humanPlayer.cardPool.length < 9
        && aiPlayer.cardPool.length < 9){
        
        if ((humanPlayer.score < 20) && aiPlayer.score < 20) {
                humanPlayer.drawCards(humanPlayer)
                setTimeout(aiHandler, 1000);
                uiResponseToTurns()
          } else if (humanPlayer.score > 20) {
                aiPlayer.winHandler(aiPlayer);

          } else if (aiPlayer.score > 20) {
                 humanPlayer.winHandler(humanPlayer);
                 
          } else if (humanPlayer.score < 20 && aiPlayer.score === 20) {
            humanPlayer.drawCards(humanPlayer);    
            enableBtns();
          } else if ((humanPlayer.score === 20) && aiPlayer.score < 20) {
            setTimeout(aiHandler, 1000);
            enableBtns();
        } else if (humanPlayer.score === 20 && aiPlayer.score === 20) {
            gm.winHandler(gm); /* outputs 'it's a draw' */
          } else {
            console.log("multiPlayer() win conditions error");
          }
    } else {
      gm.winHandler(gm);
      console.log('Card pool length exceeded');
  }



  }


function standGame() {
  disableBtns();
  standBtn.setAttribute('disabled', 'true');
  disableBtns();
  aiHandler();
  disableBtns();
}
function aiBehavior() {    
      aiPlayer.drawCards(aiPlayer);

for (const [index, aiHandCard] of aiPlayer.hand.entries()){
  if (aiHandCard === null) {
    continue
  }  
  else if (aiPlayer.score < 20 && aiHandCard !== null){
   (20 - aiPlayer.score) === aiHandCard.value
    ? console.log('AI Uses hand card no:' +  aiPlayer.hand[index].value)
      + setTimeout(aiPlayer.useCard(index),1000)
      + resetCardStyleAi (index)
/*       + showBtns()  */
    : console.log('Ai didnt use any hand cards');
    break
  } else if (aiPlayer.score > 20 && aiHandCard.value < 0  && aiHandCard !== null){ 
    (aiPlayer.score + aiHandCard.value) <= 20
    ? setTimeout(aiPlayer.useCard(index), 1000)
    + resetCardStyleAi (index)
/*     + showBtns()  */
    : console.log('AI Uses hand card no:')
    break
  }
  else{

  }
}
function resetCardStyleAi (index) {
  aiHandDeck.children[index].classList.remove(aiHandCardcolor);
  aiHandDeck.children[index].innerHTML = null;
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
  
  function start() {    
    if (humanPlayer.hand.length > 0) {

      multiPlayer();
      clickSound();
      toggleGameButtons();
      renderCardsBtns();

      startBtn.removeEventListener('click', start);  
      drawCardBtn.addEventListener("click", multiPlayer);
      /* Declared in ui_functions.js: const bindedToAiPlayer = aiPlayer.turn.bind(aiPlayer); */
      standBtn.addEventListener("click", standGame);
      resetBtn.addEventListener("click", reset);      
      pickHandDeckBtn.removeEventListener('click', renderCards)      
  } else {
    chooseCardsPrompt();
  }
  }

  function nextRound(){
  
    humanPlayer.cardPool.length = 0;
    humanPlayer.score = 0;
    aiPlayer.cardPool.length = 0;
    aiPlayer.score = 0;
    outputScore(humanPlayer.name, 0);
    outputScore(aiPlayer.name, 0);
    playerCardDom.classList.remove('shadow-drop-center');    
    aiCardDom.classList.remove('shadow-drop-center');

    playerPool = Array.from(playerPoolCards);
    for (const cards of playerPool){
      resetCardStyle(cards);
      cards.innerHTML = null;
    }
  
    aiPool = Array.from(aiPoolCards);
    for (const cards of aiPool){
      resetCardStyle(cards);
      cards.innerHTML = null;
    }

    enableBtns();
    continueBtn.classList.toggle('blocked');
  }

  function reset() {
    _CARDSTACK.length = 0;
    _aiWOnRounds.length = 0;
    _humanWonRounds.length = 0;
    aiRoundCounter.children[0].classList.remove('round-won');
    aiRoundCounter.children[1].classList.remove('round-won');
    aiRoundCounter.children[2].classList.remove('round-won');

    playerRoundCounter.children[0].classList.remove('round-won');
    playerRoundCounter.children[1].classList.remove('round-won');
    playerRoundCounter.children[2].classList.remove('round-won');

    humanPlayer.cardPool.length = 0;
    humanPlayer.hand.length = 0;
    humanPlayer.score = 0;
    aiPlayer.cardPool.length = 0;
    aiPlayer.hand.length = 0;
    aiPlayer.score = 0;
  
    outputScore(humanPlayer.name, 0);
    outputScore(aiPlayer.name, 0);
    renderCardsBtns('reset');
  
    handCards = Array.from(playerHandDeck.children);
    for (const cards of handCards){
      resetCardStyle(cards);
      cards.innerHTML = null;
    }
  
    playerPool = Array.from(playerPoolCards);
    for (const cards of playerPool){
      resetCardStyle(cards);
      cards.innerHTML = null;
    }
  
    aiPool = Array.from(aiPoolCards);
    for (const cards of aiPool){
      resetCardStyle(cards);
      cards.innerHTML = null;
    }
  
    resetBtn.innerHTML='RESET';
    playerCardDom.classList.remove('rotate-vert-center');    
    aiCardDom.classList.remove('rotate-vert-center');
    startBtn.addEventListener("click", start);     
    resetBtn.removeEventListener("click", reset);      
    drawCardBtn.removeEventListener('click', multiPlayer);
    /* Declared in ui_functions.js: const bindedToAiPlayer = aiPlayer.turn.bind(aiPlayer); */
    standBtn.removeEventListener("click", standGame);
    pickHandDeckBtn.addEventListener('click', renderCards);

    tossCards();
    toggleGameButtons();
    renderCards();

    drawCardBtn.classList.add('unclickable');
    standBtn.classList.add('unclickable');

    console.log('Game was reset')
  }
///////////////////////////////
/* Function calls */ 
  tossCards();
