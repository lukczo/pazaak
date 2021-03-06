///////////////////////////////
/* CARD FUNCTIONS */ 
function outputPool(player){
    if (player === humanPlayer.name){
      arrPlayerPoolCards = Array.from(playerPoolCards);
      for (const [index, card] of humanPlayer.cardPool.entries()) {
        arrPlayerPoolCards[index].innerHTML = card.name; 
        arrPlayerPoolCards[index].classList.add(humanPlayer.cardPool[index].color)
      }
  } else {
      arrAiPoolCards = Array.from(aiPoolCards);
      for (const [index, card] of aiPlayer.cardPool.entries()) {
        arrAiPoolCards[index].innerHTML = card.name; 
        arrAiPoolCards[index].classList.add(aiPlayer.cardPool[index].color)
    }
  }
  }
  
  function renderCards() {
    
    function random() {
      generateNumbers = randomNumber() * randomOperator();
      generateNumbers > -7 && generateNumbers < 7 ? generateNumbers : random();
      return generateNumbers;
    };       

      humanPlayer.hand.length = 0
      handdeck = Array.from(playerHandDeck.children);
      for (const [index, cards] of handdeck.entries()){
        createdCardObject = createCardObjects(playerCard, random());
        cards.innerHTML = createdCardObject.name;
        humanPlayer.hand.push(createdCardObject);  

        resetCardStyle(cards);  
        cards.classList.add(createdCardObject.color);
      }
      
      aiPlayer.hand.length = 0;
      aiHanddeck = Array.from(aiHandDeck.children);
      for (const cards of aiHanddeck){
        random()

        createdCardObject = createCardObjects(playerCard, random());
        aiPlayer.hand.push(createdCardObject);  
        /* cards.innerHTML = createdCardObject.name; */

        cards.classList.add(aiHandCardcolor);
      }      
  }
  function renderCardsBtns(onOff) {
    handdeck = Array.from(playerHandDeck.children);
     
    for (const [index, cards] of handdeck.entries()){
      boundfunction = humanPlayer.useCard.bind(humanPlayer, index);
      if (onOff === 'reset'){      
        cards.removeEventListener("click", boundfunction, { once: true});
    } else {
        cards.addEventListener("click", boundfunction, { once: true});
    }}
  }
  function removeCard(num) {
    return playerHandDeck.children[num].removeEventListener("click", humanPlayer.useCard.bind(humanPlayer, num));
  
  }
  
  
  function resetCardStyle (element) {
    element.classList.remove('plus-card');
    element.classList.remove('minus-card');
    element.classList.remove('pazaak-card-pool');
  }