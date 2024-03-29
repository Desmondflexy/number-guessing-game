const difficultySelect = document.querySelector('#difficulty');
const guessForm = document.querySelector('#form');
const guessInput = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');
const resetButton = document.querySelector('.start-game');
const resultParas = document.querySelectorAll('.resultParas>*');
const [guesses, lastResult, lowOrHi, hint] = resultParas;
let randomNumber, guessCount, N;

initGame();
difficultySelect.addEventListener('change', initGame);
resetButton.addEventListener('click', initGame);
guessForm.addEventListener('submit', checkGuess);

function initGame() {
  N = Number(difficultySelect.value);
  document.getElementById('turns').innerHTML = N;

  guesses.parentElement.style.display = 'none';
  guesses.innerHTML = '<li id="guesses-header"></li>';
  lastResult.innerHTML = '';
  lowOrHi.innerHTML = '';
  hint.innerHTML = '';
  resetButton.style.display = 'none';

  guessInput.value = '';
  guessInput.disabled = false;
  guessInput.focus();

  guessSubmit.disabled = false;
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guessCount = 0;
}

function checkGuess(e) {
  e.preventDefault();
  guessCount++;

  if (guessCount === 1) showParas();
  const guess = Number(guessInput.value);
  const li = document.createElement('li');
  guesses.append(li);
  li.innerHTML = guess;
  document.querySelector('#guesses-header').innerHTML = guesses.childElementCount > 2 ? 'Previous guesses:' : 'Previous guess:';

  if (guess === randomNumber) {
    lastResult.innerHTML = 'You win!'
    lastResult.id = 'correct';
    lowOrHi.innerHTML = `You got it right in ${guessCount} ${guessCount - 1 ? 'guesses' : 'guess'}.`;
    hint.style.display = 'none';
    gameOver();

  } else {
    lastResult.id = 'incorrect';
    const low_hi = guess < randomNumber ? 'low' : 'high';
    const remain = N - guessCount  // remaining number of guesses.
    lowOrHi.innerHTML = `Your guess is too ${low_hi}. Try a ${low_hi === 'low' ? 'higher' : 'lower'} number.`;

    if (guessCount !== N) {
      lastResult.innerHTML = `Wrong. ${remain} ${remain === 1 ? 'turn' : 'turns'} remaining.`;
      if (guessCount === Math.floor(0.6 * N)) showHint();
      guessInput.value = '';
      guessInput.focus();

    } else {
      lastResult.innerHTML = 'Game Over!';
      lastResult.id = 'game-over';
      lowOrHi.style.display = 'none';
      hint.innerHTML = `The number is ${randomNumber}`;
      gameOver();
    }
  }
}

function gameOver() {
  guessInput.disabled = true;
  guessSubmit.disabled = true;
  resetButton.focus();
}

function showHint() {
  hint.style.display = 'block';
  hint.innerHTML = `Hint: It is an ${randomNumber % 2 ? 'odd' : 'even'} number`;
}

function showParas() {
  guesses.parentElement.style.display = 'block';
  lowOrHi.style.display = 'block';
  hint.style.display = 'none';
  resetButton.style.display = 'inline-block';
}