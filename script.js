function promptCardNumber(){
  let cardNum = prompt("Com quantas cartas gostaria de jogar? Apenas números pares, entre 4 e 14.");
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
  card.classList.toggle("selected");
  checkMatch();
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
      setTimeout(removeClass, 1500, body, "disable-clicks");
    }
    else {
      for(const card of selectedCards){
        setTimeout(removeClass, 1500, card, "selected");
      }
      setTimeout(removeClass, 2000, body, "disable-clicks");
    }
  }
}

function removeClass(card, cardClass){
  card.classList.remove(cardClass);
}