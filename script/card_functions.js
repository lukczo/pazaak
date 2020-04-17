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
      humanPlayer.hand.length = 0
      handdeck = Array.from(playerHandDeck.children);
      for (const [index, cards] of handdeck.entries()){
        cards.addEventListener("click", humanPlayer.useCard.bind(humanPlayer, index), { once: true});

        console.log(index, cards);
        random = randomNumber() * randomOperator();
  
        createdCardObject = createCardObjects(playerCard, random);
        cards.innerHTML = createdCardObject.name;
        console.log(index, cards.innerHTML);
        humanPlayer.hand.push(createdCardObject);
  
        resetCardStyle(cards);
  
       cards.classList.add(createdCardObject.color);
  
      }
  }
  
  function removeCard(num) {
    return playerHandDeck.children[num].removeEventListener("click", humanPlayer.useCard.bind(humanPlayer, num));
  
  }
  
  
  function resetCardStyle (element) {
    element.classList.remove('plus-card');
    element.classList.remove('minus-card');
    element.classList.remove('pazaak-card-pool');
  }