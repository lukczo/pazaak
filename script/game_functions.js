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
  
    console.log("--[LOG]---Current cardstack is:", _CARDSTACK);
    return _CARDSTACK;
  }
  
  
  function clickSound() {
    clickAudio.play();
  }
  
  function multiPlayer() {  
    clickSound();
    humanPlayer.turn(humanPlayer);

    (humanPlayer.score < 20 && aiPlayer.score < 20)
    || (humanPlayer.score === 20 && aiPlayer.score < 20)
    || (humanPlayer.score > 20 && aiPlayer.score < 20)
    || (humanPlayer.score > 20 && aiPlayer.score === 20)
    ? setTimeout(aiBehavior, 1000)
      + setTimeout(clickSound, 1000)
    : console.log('--[LOG]-- AI Chosen "OTHER" option in multiplayer()');    
  }
  
  function aiBehavior() {    
      stop !== 'stop' ? aiPlayer.turn(aiPlayer) : console.log('stopped');
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
      renderCardsBtns()

      startBtn.removeEventListener('click', start);  
      drawCardBtn.addEventListener("click", multiPlayer);
      /* Declared in ui_functions.js: const bindedToAiPlayer = aiPlayer.turn.bind(aiPlayer); */
      standBtn.addEventListener("click", bindedToAiPlayer);
      resetBtn.addEventListener("click", reset);      
      pickHandDeckBtn.removeEventListener('click', renderCards)
  } else {
    alert('Please choose your cards first');
  }
  }

  function reset() {
    _CARDSTACK.length = 0;
  
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
    standBtn.removeEventListener("click", bindedToAiPlayer);
    pickHandDeckBtn.addEventListener('click', renderCards);

    tossCards();
    toggleGameButtons();
  
    drawCardBtn.classList.add('unclickable');
    standBtn.classList.add('unclickable');

    console.log('Game was reset')
  }
///////////////////////////////
/* Function calls */ 
tossCards();