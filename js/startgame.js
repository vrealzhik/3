//import { winnerGame } from "./confetti.js";
import { createGameMenu } from "./menu.js";
import { createGameCard } from "./gamecard.js";
import { shuffleArray } from "./utils.js";
import { createFrontCards, duplicatedArray } from "./utils.js";
import { result } from "lodash";

const initialCardIcons = ["6p", "7p", "8p", "9p", "10p", "Qp", "Kp", "Jp", "Ap", "6h", "7h", "8h", "9h", "10h", "Qh", "Kh", "Jh", "Ah", "6c", "7c", "8c", "9c", "10c", "Qc", "Kc", "Jc", "Ac", "6b", "7b", "8b", "9b", "10b", "Qb", "Kb", "Jb", "Ab"]; 

export const startGame = (difficult) => {

  let firstCard = null;
  let secondCard = null;
  let clickable = true;

  const header = document.createElement("div");
  header.classList.add("header");

  const timerString = document.createElement("span");
  // timerString.textContent = "Оставшееся время: 0:00"
  timerString.classList.add("timer");

  const min = document.createElement("span");
  min.classList.add("min")
  const sek = document.createElement("span");
  sek.classList.add("sek")
  min.textContent = "min";
  sek.textContent = "sek";
  const time = document.createElement("p");
  time.classList.add("time")
  time.textContent = "03.00";
  timerString.append(min, sek, time)

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

  header.append(timerString, restartButton);

  gameSection.append(header, gameCardList);

  const cards = document.querySelectorAll(".game__card");


  const flipStartCard = new Promise((resolve, reject) =>{
    cards.forEach((card) => {
      card.classList.add("flip");
      setTimeout(() => {
        card.classList.remove("flip")
        resolve(result)
      }, 5000)
    })
  });


  let countdownTime = 3 * 60 * 1000;

  const timerElement = document.querySelector('.timer');


  flipStartCard.then(
    result => {
      const countdown = setInterval(() => {

        const minutes = Math.floor(countdownTime / 60000);
        const seconds = ((countdownTime % 60000) / 1000).toFixed(0);
    
        time.innerHTML = `0${minutes}.${seconds < 10 ? '0' : ''}${seconds}`;
    
        countdownTime -= 1000;
    
        if (countdownTime < 0) {
          clearInterval(countdown);
          timerElement.innerHTML = 'Время вышло!';
        }
      }, 1000);
      console.log(result);
    
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
    }
  )  
};

