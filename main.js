const moles = document.querySelectorAll('.mole');
const holes = document.querySelectorAll('.holes');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
let lastIndex;
let score = Number(scoreDisplay.textContent);
let time = Number(timeDisplay.textContent);
let gameTime;
let isPlaying = false;

function getRandomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomIndex(holes) {
  let randomIndex = Math.floor(Math.random() * holes.length);
  if (randomIndex === lastIndex) {
    return getRandomIndex(holes);
  }
  lastIndex = randomIndex;
}

function moleRetreat(index) {
  delete moles[index].dataset.active;
}

function spawnRandomMole() {
  getRandomIndex(holes);
  moles[lastIndex].dataset.active = true;
  setTimeout(() => {
    moleRetreat(lastIndex);
    if (isPlaying) {
      console.log('still play');
      spawnRandomMole();
    }
  }, getRandomTime(400, 900));
}

function timer() {
  if (time <= 0) {
    clearInterval(gameTime);
    isPlaying = false;
    time = 10;
    return;
  }
  time--;
  timeDisplay.textContent = time;
}

function startGame() {
  if (isPlaying) return;
  timeDisplay.textContent = time;
  spawnRandomMole();
  gameTime = setInterval(timer, 1000);
  isPlaying = true;
}

function getHit(index) {
  score++;
  moleRetreat(index);
  console.log('banged');
  scoreDisplay.textContent = score;
}

moles.forEach((mole, index) =>
  mole.addEventListener('click', () => {
    getHit(index);
  })
);
