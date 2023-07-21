//import { winnerGame } from "./confetti.js";
import { createGameMenu } from "./menu.js";
import { createGameCard } from "./gamecard.js";
import { shuffleArray } from "./utils.js";
import { createFrontCards, duplicatedArray } from "./utils.js";

const initialCardIcons = ["6p", "7p", "8p", "9p", "10p", "Qp", "Kp", "Jp", "Ap", "6h", "7h", "8h", "9h", "10h", "Qh", "Kh", "Jh", "Ah", "6c", "7c", "8c", "9c", "10c", "Qc", "Kc", "Jc", "Ac", "6b", "7b", "8b", "9b", "10b", "Qb", "Kb", "Jb", "Ab"]; 

export const startGame = (difficult) => {
  let firstCard = null;
  let secondCard = null;
  let clickable = true;

  const timerString = document.createElement("div");
  timerString.textContent = "Время"
  timerString.classList.add("timer");

  const restartButton = document.createElement("button"); 
  restartButton.textContent = "Начать заново";
  restartButton.classList.add("restart__button");
  restartButton.addEventListener("click", createGameMenu);

  const gameSection = document.querySelector(".game__section"); 
  const gameCardList = document.createElement("div");
  gameCardList.classList.add("game__card_list");

  let cardIcons = shuffleArray(initialCardIcons); 
  gameSection.innerHTML = ""; 

  cardIcons = createFrontCards(difficult, cardIcons); 
  let duplicatedCardsIcons = duplicatedArray(cardIcons); 
  duplicatedCardsIcons = shuffleArray(duplicatedCardsIcons); 
  
  duplicatedCardsIcons.forEach(
    (icon) => gameCardList.append(createGameCard("shirt", icon)) 
  );

  gameSection.append(restartButton, gameCardList, timerString);

  const cards = document.querySelectorAll(".game__card");
  const flipStartCard = () =>{
    cards.forEach((card) => {
      card.classList.add("flip");
      setTimeout(() => {
        card.classList.remove("flip")
      }, 5000)
    })
  };
  flipStartCard();

let countdownTime = 3 * 60 * 1000;

const timerElement = document.querySelector('.timer');

const countdown = setInterval(() => {

  const minutes = Math.floor(countdownTime / 60000);
  const seconds = ((countdownTime % 60000) / 1000).toFixed(0);

  timerElement.innerHTML = `Оставшееся время: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  countdownTime -= 1000;

  if (countdownTime < 0) {
    clearInterval(countdown);
    timerElement.innerHTML = 'Время вышло!';
  }
}, 1000);

  cards.forEach((card, index) => {
    card.addEventListener("click", () => {
      if (clickable === true && !card.classList.contains("successfully")) {
        card.classList.add("flip");
      }
      if (firstCard === null) {
        firstCard = index; 
      } else {
        if (index !== firstCard) {
          secondCard = index;
          clickable = false;
        }
      }
      if (
        firstCard !== null &&
        secondCard !== null &&
        firstCard !== secondCard
      ) {
        if (
          cards[firstCard].firstElementChild.className ===
          cards[secondCard].firstElementChild.className
        ) {
          setTimeout(() => {
            cards[firstCard].classList.add("successfully");
            cards[secondCard].classList.add("successfully");

            firstCard = null;
            secondCard = null;
            clickable = true;
          }, 500);
        } else {
          setTimeout(() => {
            cards[firstCard].classList.remove("flip");
            cards[secondCard].classList.remove("flip");

            firstCard = null;
            secondCard = null;
            clickable = true;
          }, 500);
        }
      }
      if (Array.from(cards).every((card) => card.className.includes("flip"))) {
        //document.querySelector(".winner__confetti").innerHTML = winnerGame;
        alert("Вы победили!")
      }
    });
  });
};

