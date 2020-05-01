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

////////////////////////////////
/* MODALS */

function renderWelcomeModal(){
  const modalTemplateBody = document.importNode(modalCard.content.children[0], true);
  modalTemplateBody.classList.add('modal');
  renderModalContent = modalTemplateBody.querySelector('p').textContent = 'Goal of the game is to reach 20 points without going over, or at least come closer to it than the opponent. The player with the nearest sum to the number 20 wins the round, and the player who won 3 rounds won the match.';
  mainTag.append(modalTemplateBody);
  modalSizing();
  welcomeModalFunctions();
  toggleBackdrop();
}

function toggleBackdrop(){
  const backdropTemplate = document.importNode(document.querySelector('.backdrop-template').content.children[0], true);
  backdropTemplate.classList.add('backdrop');
  mainTag.append(backdropTemplate);
}

function removeBackdrop(){
  document.querySelector('.backdrop').remove();
}

function chooseCardsPrompt(){
  toggleBackdrop();
/*   window.addEventListener('resize', ()=>{
    window.innerWidth < 1365
    ? removeBackdrop()
    : toggleBackdrop();
  }) */

  toggleAllBtns('off');

  const modalTemplateBody = document.importNode(modalCard.content.children[0], true);
  modalTemplateBody.classList.add('modal');
  modalTemplateBody.children[2].remove();
  modalTemplateBody.children[0].remove();
  mainTag.append(modalTemplateBody);
  renderModalContent = modalTemplateBody.querySelector('p').textContent = 'Please choose your cards first!';
  modalTemplateBody.querySelector('p').style='margin: 100px;font-size: 2.5rem;'

  modalSizing()
  

  const modalBtn = modalTemplateBody.querySelector('.modal button');
  

  modalBtn.addEventListener('click', ()=>{ 
    modalTemplateBody.remove();
    removeBackdrop();
    toggleAllBtns('on');
 });
  modalBtn.addEventListener('click', renderCards);
  mainTag.append(modalTemplateBody);

}

function resultModal(result){
  toggleBackdrop();
/*   window.addEventListener('resize', ()=>{
    window.innerWidth < 1365
    ? removeBackdrop()
    : toggleBackdrop();
  }); */
  toggleAllBtns('off');

  const modalTemplateBody = document.importNode(modalCard.content.children[0], true);
  modalTemplateBody.classList.add('modal');
  modalTemplateBody.children[2].remove();
  modalTemplateBody.children[0].remove();
  mainTag.append(modalTemplateBody);
  modalSizing();

  modalTemplateBody.querySelector('p').style='margin: 100px;font-size: 2.5rem;'

  const modalBtn = modalTemplateBody.querySelector('.modal button');
  


  if (result === 'drawRound') {
    renderModalContent = modalTemplateBody.querySelector('p').textContent = 'A draw! This round is set.';
  } else if (result === 'humanWon') {
    renderModalContent = modalTemplateBody.querySelector('p').textContent = `Good job ${humanPlayer.name}! You win this round.`;
  } else if (result === 'aiWon') {
    renderModalContent = modalTemplateBody.querySelector('p').textContent = `Unfortunetely, you lose this round!`;
  } else if (result === 'won-final') {
    renderModalContent = modalTemplateBody.querySelector('p').textContent = `${humanPlayer.name}, you have won the game!`;
  } else if (result === 'lose-final') {
    renderModalContent = modalTemplateBody.querySelector('p').textContent = 'YOU LOSE. Opponent wins the game. Better luck next time!';
  } else {
    new Error('Modal result error');
  }


 
  modalBtn.addEventListener('click', ()=>{ 
    modalTemplateBody.remove();
    removeBackdrop();
  toggleAllBtns('on');
  disableBtns();
 });

}

renderWelcomeModal()

function welcomeModalFunctions(){
  const modalBtn = document.querySelector('.modal button');
  const modalInput = document.querySelector('.modal input');
  const modalCard = document.querySelector('.modal');

  modalBtn.addEventListener('click', ()=>{
    modalCard.remove();
    removeBackdrop();
    humanPlayer.name = modalInput.value;
    playerNameDisplayed.innerHTML = humanPlayer.name;
    toggleAllBtns('on');
  })

  function nameFieldValidation(){
    modalInput.value.length > 0
    ? modalBtn.removeAttribute('disabled', 'false')
    : modalBtn.setAttribute('disabled', 'true')

  modalInput.addEventListener('change', nameFieldValidation);
  }
  nameFieldValidation();
}



function modalSizing() {
  let currentModal = document.querySelector('.modal'); 

  const modalLeftPosition = cardInPlayerPool.offsetLeft + (cardInPlayerPool.offsetWidth / 2);

  currentModal.setAttribute('style', `left: ${modalLeftPosition}px; top: ${cardInPlayerPool.offsetTop}px; `);
}


function toggleAllBtns(onOff){
  allBtns = Array.from(document.querySelectorAll('button'));

  if (onOff === 'on'){
    for (const btns of allBtns){
      btns.removeAttribute('disabled', true)
  }
  } else if (onOff === 'off'){
    for (const btns of allBtns) {
      btns.setAttribute('disabled', true)
  }
  } else {
    console.log('errorrr')
  }
}

toggleAllBtns('off');
window.addEventListener('resize', modalSizing);



window.addEventListener('resize', ()=>
{
    if (window.innerWidth <= 700){
        const aiHandDeckPosition = document.querySelector('.ai').children[2].offsetTop;
        document.querySelector('.header').style.top = aiHandDeckPosition
        toggleAllBtns('on');
      } 
})
