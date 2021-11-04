let turnCounter = 0;
let miliseconds = 0;
let seconds = 0;
let cron;

function playCounter(){
  turnCounter++;
}

function promptCardNumber(){
  let cardNum = prompt("With how many cards do you wish to play? Only even numbers, between 4 and 14.");
  if(isValidNum(cardNum)){
    makeCard(cardNum);
  }
  else{
    alert("Entrada inválida.")
    promptCardNumber();
  }
}

function comparador(){ 
	return Math.random() - 0.5; 
}

function isValidNum(number){
  //Regex from: https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number

  //Can't read properties of null, check null first.
  if (number === null){
    return(false);
  }
  //Regex match positive integers && limit to even numbers between 2 and 14.
  else if(number.match(/^-?\d+$/) && number >= 4 && number <= 14 && (number % 2 === 0)){
    return(true);
  }
}

function shuffleDeck(){
  const cardFront = [];
  cardFront.push('bobrossparrot.gif');
  cardFront.push('explodyparrot.gif');
  cardFront.push('fiestaparrot.gif');
  cardFront.push('metalparrot.gif');
  cardFront.push('revertitparrot.gif');
  cardFront.push('tripletsparrot.gif');
  cardFront.push('unicornparrot.gif');
  
  cardFront.sort(comparador);

  return (cardFront);
}

function makeCard(cards){
  const cardBox = document.querySelector(".card-box");

  const shuffled = shuffleDeck();

  const cardArray = [];

  for(let i = 0; i < 2; i++){
    for(let j = 0; j < (cards/2); j++){
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.setAttribute("onclick", "selected(this)");

      const cardFront = document.createElement("div");
      cardFront.classList.add("face", "front-face", "flex-column", "center");
      const cardFrontImg = document.createElement("img");
      cardFrontImg.setAttribute("src", "assets/images/card-back.png");
      cardFrontImg.setAttribute("alt", "A random card's face");
      cardFront.appendChild(cardFrontImg);

      const cardBack = document.createElement("div");
      cardBack.classList.add("face", "back-face", "flex-column", "center");
      const randBack = document.createElement("img");
      const string = "assets/images/" + shuffled[j];
      randBack.setAttribute("src", string);
      cardBack.appendChild(randBack);

      newCard.appendChild(cardFront);
      newCard.appendChild(cardBack);

      cardArray.push(newCard.cloneNode(true));
    }
    cardArray.sort(comparador);
    j = 0;
  }
  cardArray.sort(comparador);
  for(let i = 0; i < cardArray.length; i++){
    cardBox.appendChild(cardArray[i]);
  }
}

function selected(card){
  if(!card.classList.contains("selected")){
    card.classList.add("selected");
    if(turnCounter === 0) {
      startTimer();
    }
    checkMatch();
    playCounter();
    setTimeout(checkWin, 300);
  }
}

function checkMatch() {
  const body = document.body;
  const selectedCards = document.querySelectorAll(".selected");
  if(selectedCards.length === 2){
    body.classList.add("disable-clicks");
    if(selectedCards[0].querySelector(".back-face").innerHTML === selectedCards[1].querySelector(".back-face").innerHTML){
      for(const card of selectedCards){
        removeClass(card, "selected");
        card.classList.add("match");
      }
      setTimeout(removeClass, 1000, body, "disable-clicks");
    }
    else {
      for(const card of selectedCards){
        setTimeout(removeClass, 1000, card, "selected");
      }
      setTimeout(removeClass, 1000, body, "disable-clicks");
    }
  }
}

function removeClass(card, cardClass){
  card.classList.remove(cardClass);
}

function checkWin() {
  const numberOfCards = document.querySelectorAll(".card").length;
  const numberOfMatches = document.querySelectorAll(".match").length;
  if(numberOfCards === numberOfMatches){
    clearInterval(cron);
    let string = "You've won in ";
    string += turnCounter;
    string += " turns!";
    string += "\nIt took you only ";
    string += seconds;
    string += " seconds to win this time!";
    turnCounter = 0;
    miliseconds = 0;
    seconds = 0;
    setTimeout(alert, 300, string);
    setTimeout(newGame, 300);
  }
}

function startTimer() {
  clearInterval(cron);
  cron = setInterval(() => { timer(); }, 1000);
}

function timer() {
  miliseconds++;
  if (miliseconds += 10 === 1000){
    miliseconds = 0;
    seconds++;
    document.querySelector(".seconds").innerHTML = seconds;
  }
}

function newGame() {
  const ans =  prompt("Would you like to play again? Yes / No");
  if (ans === "Yes"){
    const newCardBox = document.createElement("div");
    newCardBox.classList.add("card-box", "flex-row", "center")

    const cardBox = document.querySelector(".container").querySelector(".card-box");
    document.querySelector(".container").removeChild(cardBox);
    document.querySelector(".container").appendChild(newCardBox);
    document.querySelector(".seconds").innerHTML = seconds;
    setTimeout(promptCardNumber, 300);
  }
  else if (ans === "No"){
    alert("Thank you for playing!");
  }
  else {
    alert("Sorry, I couldn't understand your answer.");
    newGame();
  }
}