///////////////////////////////
/* GLOBAL VARIABLES */
const _CARDSTACK = [];
const _OFFSTACK = [];

///////////////////////////////
/* GLOBAL FUNCTIONS */
function randomNumber() {
  random = Math.floor(Math.random() * _CARDSTACK.length);
  random > 0 && random <= 10 ? random : randomNumber();
  return random
}

function randomOperator() {
  random = randomNumber();
  return random <= 5
    ? 1
    : random > 5
    ? -1
    : console.log("error drawing operator");
}

function check() {
  return _CARDSTACK.every((currentValue) => currentValue === null);
}
