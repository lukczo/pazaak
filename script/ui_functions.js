///////////////////////////////
/* UI FUNCTIONS */ 
function modalToggler(){
    modal.classList.toggle('blocked');
    backdrop.classList.toggle('blocked');
    document.body.classList.toggle('overflow');
    modal.addEventListener('click', modalToggler);
    backdrop.addEventListener('click', modalToggler);
  }

function toggleGameButtons() {
  pickHandDeckBtn.classList.toggle('unclickable');
  drawCardBtn.classList.toggle('unclickable');
  standBtn.classList.toggle('unclickable');
  startBtn.classList.toggle('unclickable');
  resetBtn.classList.toggle('unclickable');
}
///////////////////////////////
/* Event listeners */ 
startBtn.addEventListener("click", start)
pickHandDeckBtn.addEventListener('click', renderCards)
pazaakTitle.addEventListener("click", () => {
  location.reload();
return false;
})

const bindedToAiPlayer = aiPlayer.drawCards.bind(aiPlayer);


function modalSizing() {
  modalLeftPosition = cardInPlayerPool.offsetLeft + (cardInPlayerPool.offsetWidth / 2);
  modalLeftPosition;
  modalCard.setAttribute('style', `left: ${modalLeftPosition}px; top: ${cardInPlayerPool.offsetTop}px; `);
}

modalSizing();
window.addEventListener('resize', modalSizing);

modalBtn.addEventListener('click', ()=>{
  modalCard.classList.add('blocked');
  backdrop.remove();
  humanPlayer.name = modalInput.value;
  playerNameDisplayed.innerHTML = humanPlayer.name;
})

function nameFieldValidation(){
  modalInput.value.length > 0
  ? modalBtn.removeAttribute('disabled', 'false')
  : modalBtn.setAttribute('disabled', 'true')
}

nameFieldValidation();
modalInput.addEventListener('change', nameFieldValidation)