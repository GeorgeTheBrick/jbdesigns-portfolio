import View from "../../main/js/View.js";

class MemoryView extends View {
  parentElement = document.querySelector(".section-app");

  generateMarkup(data) {
    return `
    <div class="invisible-border" id="app-box"></div>
    <div class="memory-section">
    <div class="memory-container grid--memory-app">
      <button class="memory-close-btn" aria-label="Close memory app">
        <img class="close-memory-app" src="main/img/close-outline.svg" alt="close button" />
      </button>
      <button class="memory-new-btn" aria-label="Start new game">
        <img class="refresh-memory-app" src="main/img/refresh-outline.svg" alt="new game button" />
      </button>
      <div class="player player--1 player--active">Player 1</div>
      <div class="player player--2">Player 2</div>

      
      ${data
        .map(el => {
          return `<div class="memory-field">
          <img data-number="${el}" class="field-icon hidden-icon" src="main/img/icon-${el}.svg" alt="memory icon"  />
        </div>`;
        })
        .join("")}
      
      
      <div class="score player--1-score ">
        <p class="score-label">Score:</p>
        <p class="score-number score-number-player-1">0</p>
      </div>
      <div class="score player--2-score">
        <p class="score-label">Score:</p>
        <p class="score-number score-number-player-2">0</p>
      </div>        
    </div>
  </div>`;
  }

  addHandlerRenderNewMemory(handler) {
    const btnNew = document.querySelector(".memory-new-btn");
    btnNew.addEventListener("click", handler);
  }

  addHandlerCloseMemory(handler) {
    const btnClose = document.querySelector(".memory-close-btn");
    btnClose.addEventListener("click", handler);
  }

  addHandlerReveal(handler) {
    const field = document.querySelector(".memory-container");
    field.addEventListener("click", handler);
  }
}

export default new MemoryView();
