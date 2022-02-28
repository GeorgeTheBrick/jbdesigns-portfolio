export const randomArray = function () {
  const startArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  const randArray = [];

  //Push elements randomly to another array
  while (randArray.length < 16) {
    randArray.push(
      startArray.splice(Math.trunc(Math.random() * startArray.length), 1)[0]
    );
  }
  return randArray;
};

let tempArr = [];
let scoreP1 = 0;
let scoreP2 = 0;
let counter = 0;

const switchPlayer = function () {
  const P1 = document.querySelector(".player--1");
  const P2 = document.querySelector(".player--2");

  setTimeout(() => {
    P1.classList.toggle("player--active");
    P2.classList.toggle("player--active");
  }, 1000);
};

const checkPair = function () {
  if (tempArr[0] === tempArr[1]) {
    tempArr = [];

    let scP1 = document.querySelector(".score-number-player-1");
    let scP2 = document.querySelector(".score-number-player-2");

    const actP1 = document.querySelector(".player--1");
    const actP2 = document.querySelector(".player--2");

    if (actP1.classList.contains("player--active")) {
      scoreP1++;
      scP1.textContent = scoreP1;
    }
    if (actP2.classList.contains("player--active")) {
      scoreP2++;
      scP2.textContent = scoreP2;
    }
  }

  if (tempArr[0] !== tempArr[1]) {
    switchPlayer();
    document
      .querySelectorAll(".field-icon")
      .forEach(el => el.classList.add("unclickable"));
    setTimeout(() => {
      document
        .querySelectorAll(`[data-number="${tempArr[0]}"]`)
        .forEach(el => el.classList.add("hidden-icon"));

      document
        .querySelectorAll(`[data-number="${tempArr[1]}"]`)
        .forEach(el => el.classList.add("hidden-icon"));
      tempArr = [];
      document
        .querySelectorAll(".field-icon")
        .forEach(el => el.classList.remove("unclickable"));
    }, 1000);
  }
};

export const reveal = function (e) {
  const targetIcon = e.target;

  if (
    targetIcon.classList.contains("refresh-memory-app") ||
    targetIcon.classList.contains("close-memory-app")
  ) {
    scoreP1 = 0;
    scoreP2 = 0;
  }

  if (targetIcon.classList.contains("hidden-icon")) {
    counter++;
    tempArr.push(+targetIcon.dataset.number);
    targetIcon.classList.remove("hidden-icon");
    if (counter === 2) {
      checkPair();
      counter = 0;
    }
  }
};
