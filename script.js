let turnCounter = 0;
let miliseconds = 0;
let seconds = 0;
let cron;

function playCounter(){
  turnCounter++;
}

function comparador(){ 
	return Math.random() - 0.5; 
}


function shuffleDeck(){
  const cardFront = [];

  // Push every image name to an array
  cardFront.push('bobrossparrot.gif');
  cardFront.push('explodyparrot.gif');
  cardFront.push('fiestaparrot.gif');
  cardFront.push('metalparrot.gif');
  cardFront.push('revertitparrot.gif');
  cardFront.push('tripletsparrot.gif');
  cardFront.push('unicornparrot.gif');
  
  //Randomize it
  cardFront.sort(comparador);

  return (cardFront);
}

function promptCardNumber(){
  let cardNum = prompt("With how many cards do you wish to play? Only even numbers, between 4 and 14.");
  if(isValidNum(cardNum)){
    // If it's valid, make random cards and draw them on the table
    makeCard(cardNum);
  }
  else{
    alert("Entrada inválida.")
    promptCardNumber();
  }
}

function isValidNum(number){
  //Regex from: https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number

  // Can't read properties of null: check null first.
  if (number === null){
    return(false);
  }

  // Regex match positive integers && limit to even numbers between 2 and 14.
  else if(number.match(/^-?\d+$/) && number >= 4 && number <= 14 && (number % 2 === 0)){
    return(true);
  }
}

function makeCard(cards){
  const cardBox = document.querySelector(".card-box");

  const shuffled = shuffleDeck();

  const cardArray = [];

  for(let i = 0; i < 2; i++){
    
    // Adds a card from the shuffled deck
    for(let j = 0; j < (cards/2); j++){

      // Just making the card element, its front and its back
      const newCard = document.createElement("div");
      newCard.classList.add("card");
      newCard.setAttribute("onclick", "selected(this)");
      newCard.setAttribute("data-identifier", "card");

      const cardFront = document.createElement("div");
      cardFront.classList.add("face", "front-face", "flex-column", "center");
      cardFront.setAttribute("data-identifier", "front-face");
      const cardFrontImg = document.createElement("img");
      cardFrontImg.setAttribute("src", "assets/images/card-back.png");
      cardFrontImg.setAttribute("alt", "A random card's face");
      cardFront.appendChild(cardFrontImg);

      const cardBack = document.createElement("div");
      cardBack.classList.add("face", "back-face", "flex-column", "center");
      cardBack.setAttribute("data-identifier", "front-face");
      const randBack = document.createElement("img");
      
      // Concat src string to card image name from the shuffled deck
      const string = "assets/images/" + shuffled[j];
      randBack.setAttribute("src", string);
      cardBack.appendChild(randBack);

      // Appends front and back to the card
      newCard.appendChild(cardFront);
      newCard.appendChild(cardBack);

      // Pushes entire card to array
      cardArray.push(newCard.cloneNode(true));
    }

    // Randomizes the cards placement in array
    cardArray.sort(comparador);

    // Now, add the same cards again, to make them pairs
    j = 0;

  }
  
  for(let i = 0; i < cardArray.length; i++){
    // Draw cards to the card-box
    cardBox.appendChild(cardArray[i]);
  }

}

function selected(card){
  if(!card.classList.contains("selected")){
    card.classList.add("selected");
    if(turnCounter === 0) {
      // If it's the first time a player clicks, start the timer
      startTimer();
    }
    // Runs a check to see if cards are a pair every time a card is clicked
    checkMatch();
    // Adds one to the plays counter
    playCounter();
    // Waits 300ms before checking for a win.
    setTimeout(checkWin, 300);
  }
}

function checkMatch() {
  const body = document.body;
  const selectedCards = document.querySelectorAll(".selected");
  if(selectedCards.length === 2){
    // Disables clicks so selected cards > 2
    body.classList.add("disable-clicks");
    if(selectedCards[0].querySelector(".back-face").innerHTML === selectedCards[1].querySelector(".back-face").innerHTML){
      for(const card of selectedCards){
        removeClass(card, "selected");
        card.classList.add("match");
      }
      // Re-enables clicks after adding match class
      setTimeout(removeClass, 1000, body, "disable-clicks");
    }
    else {
      for(const card of selectedCards){
        // Waits one second before turning card face-down
        setTimeout(removeClass, 1000, card, "selected");
      }
      // Re-enables clicks after waiting for the card to turn face-down
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
  // If matched pairs === amount of cards, then you win
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
  // Runs interval with the set interval of 1000
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
    // Makes a new card-box element
    const newCardBox = document.createElement("div");
    newCardBox.classList.add("card-box", "flex-row", "center")
    
    // Removes old one, adds new one.
    const cardBox = document.querySelector(".card-box");
    document.querySelector(".container").removeChild(cardBox);
    document.querySelector(".container").appendChild(newCardBox);
    document.querySelector(".seconds").innerHTML = seconds;
    setTimeout(promptCardNumber, 300);
  }
  else if (ans === "No"){
    alert("Thank you for playing!");
  }
  else {

    // Can't understand if it's not Yes / No :3
    alert("Sorry, I couldn't understand your answer.");
    newGame();
  }
}

function newGameOld() {
  const ans =  prompt("Would you like to play again? Yes / No");
  if (ans === "Yes"){
    const cardBox = document.querySelector(".card-box");
    console.log(cardBox.children);

    //???? Sorbram duas cartas, após terminar um jogo com 4. 
    // for(const child of cardBox.children){
    //   cardBox.removeChild(child);
    // }
    // document.querySelector(".seconds").innerHTML = seconds;
    // setTimeout(promptCardNumber, 300);
  }
  else if (ans === "No"){
    alert("Thank you for playing!");
  }
  else {
    alert("Sorry, I couldn't understand your answer.");
    newGameOld();
  }
}