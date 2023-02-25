const moles = document.querySelectorAll('.mole');
const animals = document.querySelectorAll('.animals');
const allies = document.querySelectorAll('.ally');
const holes = document.querySelectorAll('.holes');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
let lastIndex;
let score = Number(scoreDisplay.textContent);
let time = Number(timeDisplay.textContent);
let gameTime;
let isPlaying = false;
let user = document.querySelector('.username');
// let userName = prompt('Please enter your name:');

// user.textContent = userName;

function getRandomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomIndex(animals) {
  let randomIndex = Math.floor(Math.random() * animals.length);
  if (randomIndex === lastIndex) {
    return getRandomIndex(animals);
  }
  lastIndex = randomIndex;
}

function retreat(index) {
  delete animals[index].dataset.active;
}

function spawnRandomMole() {
  getRandomIndex(animals);
  animals[lastIndex].dataset.active = true;
  setTimeout(() => {
    retreat(lastIndex);
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

function hitMole() {
  score++;
  retreat(lastIndex);
  console.log('banged');
  scoreDisplay.textContent = score;
}

function hitAlly() {
  if (score <= 0) return;
  score--;
  scoreDisplay.textContent = score;
}

moles.forEach((mole) => mole.addEventListener('click', hitMole));
allies.forEach((ally) => ally.addEventListener('click', hitAlly));
