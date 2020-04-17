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

const bindedToAiPlayer = aiPlayer.turn.bind(aiPlayer);