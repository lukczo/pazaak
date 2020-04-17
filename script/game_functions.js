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
        ? _CARDSTACK.push(parseInt(output + 1))
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
    setTimeout(aiBehavior, 1000);
    setTimeout(clickSound, 1000);
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
  
    tossCards();
  
    console.log('Game was reset')
  }
  
  function start() {
    if (humanPlayer.hand.length > 0) {
      multiPlayer();
      clickSound();
      pickHandDeckBtn.classList.toggle('unclickable');
      drawCardBtn.classList.toggle('unclickable');
      standBtn.classList.toggle('unclickable');
      startBtn.classList.toggle('unclickable');
      resetBtn.classList.toggle('unclickable');
      startBtn.removeEventListener('click', start);  
      drawCardBtn.removeEventListener('click', start);
  } else {
    alert('Please choose your cards first');
  }
  }

///////////////////////////////
/* Function calls */ 
tossCards();