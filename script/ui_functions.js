///////////////////////////////
/* UI FUNCTIONS */ 
function modalToggler(){
    modal.classList.toggle('blocked');
    backdrop.classList.toggle('blocked');
    document.body.classList.toggle('overflow');
    modal.addEventListener('click', modalToggler);
    backdrop.addEventListener('click', modalToggler);
  }

///////////////////////////////
/* Event listeners */ 
drawCardBtn.addEventListener("click", multiPlayer);
startBtn.addEventListener("click", start)
standBtn.addEventListener("click", aiPlayer.turn.bind(aiPlayer));
pickHandDeckBtn.addEventListener('click', renderCards)
resetBtn.addEventListener("click", reset)
pazaakTitle.addEventListener("click", () => {
  location.reload();
return false;
})