import { startGame } from "./startgame.js";
import "../style.css";

export const createGameMenu = () => {
    const appEl = document.querySelector('.game__section');

    const menuHtml = `       
        <div class="choice-box">
            <h1 class="title">Выбери сложность</h1>
            <form class="complex">
                <input
                    name="diff"
                    id="difficultChoice1"
                    class="complex__num"
                    type="radio"
                    value="1"
                />
                <label for="difficultChoice1">1</label>
                <input
                    name="diff"
                    id="difficultChoice2"
                    class="complex__num"
                    type="radio"
                    value="2"
                />
                <label for="difficultChoice2">2</label>
                <input
                    name="diff"
                    id="difficultChoice3"
                    class="complex__num"
                    type="radio"
                    value="3"
                />
                <label for="difficultChoice3">3</label>
            </form>
            <button id="startBtn" class="start-btn">Старт</button>
        </div>`

    appEl.innerHTML = menuHtml;

    const radioChoiceElemenet = document.querySelectorAll(`input[type=radio][name="diff"]`);
    const startElement = document.getElementById('startBtn');
    let diff = 0;

    radioChoiceElemenet.forEach((radio) =>
        radio.addEventListener('change', () => {
            diff = radio.value;
        })
    );

    startElement.addEventListener('click', () => {
        if (!diff) {
            alert('Выберите сложность!');
            return;
        }
        startGame(diff);
    });
}
createGameMenu()







