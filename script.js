function promptCardNumber(){
  let cardNum = prompt("Com quantas cartas gostaria de jogar? Apenas números pares, entre 4 e 14.");
  console.log(cardNum);
  if(isValidNum(cardNum)){
    drawCards(cardNum);
  }
  else {
    alert("Entrada inválida.")
    promptCardNumber();
  }
}

function isValidNum(number) {
  //Regex from: https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number

  //Can't read properties of null, check null first.
  if (number === null) {
    return(false);
  }
  //Regex match positive integers && limit to even numbers between 2 and 14.
  else if(number.match(/^-?\d+$/) && number >= 4 && number <= 14 && (number % 2 === 0)) {
    return(true);
  }
}

function drawCards(number) {
  const newCard = document.createElement("div");
  newCard.classList.add("card-back");

  const cardBackImg = document.createElement("img");
  cardBackImg.setAttribute("src", "assets/images/card-back.png");
  cardBackImg.setAttribute("alt", "A random card's back");
  
  newCard.appendChild(cardBackImg);
  
  const cardBox = document.querySelector(".card-box");
  
  for(let i = 0; i < number; i++) {
    cardBox.appendChild(newCard.cloneNode(true));
  }
}