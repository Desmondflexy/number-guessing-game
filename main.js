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
guessForm.addEventListener('submit', checkGuess);
resetButton.addEventListener('click', initGame);

function initGame() {
  N = Number(difficultySelect.value);
  document.getElementById('turns').innerHTML = N;

  guesses.parentElement.style.display = 'none';
  guesses.innerHTML = '<li>Previous guesses:</li>';
  resetButton.style.display = 'none';
  lastResult.innerHTML = '';
  lowOrHi.innerHTML = '';
  hint.innerHTML = '';

  guessInput.value = '';
  // guessInput.setAttribute('min', 1);
  // guessInput.setAttribute('max', 100);
  guessInput.disabled = false;
  guessInput.focus();

  guessSubmit.disabled = false;
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guessCount = 0;
}

function checkGuess(evt) {
  evt.preventDefault();
  guessCount++;
  if (guessCount === 1) {
    guesses.parentElement.style.display = 'block';
    resetButton.style.display = 'inline-block';
    hint.style.display = 'none';
  }
  const guess = Number(guessInput.value);
  const li = document.createElement('li'); guesses.append(li);
  li.innerHTML = guess;
  if (guess === randomNumber) {
    lastResult.innerHTML = 'Correct!'
    lastResult.id = 'correct';
    lowOrHi.innerHTML = `You got it right in ${guessCount} guesses.`
    gameOver();
    hint.style.display = 'none';
  } else {
    lastResult.id = 'incorrect';
    const low_hi = guess < randomNumber ? 'low' : 'high';
    const turnsNoun = N - guessCount === 1 ? 'turn' : 'turns';
    lowOrHi.innerHTML = `Your guess is too ${low_hi}. ${N - guessCount} ${turnsNoun} remaining.`;
    if (guessCount === N) {
      lastResult.innerHTML = 'Game Over!';
      lastResult.id = 'game-over';
      gameOver();
      hint.innerHTML = `The number is ${randomNumber}`;
    } else {
      lastResult.innerHTML = 'Wrong';
      if (guessCount === Math.floor(0.6 * N)) {
        hint.innerHTML = `Hint: It is an ${randomNumber % 2 ? 'odd' : 'even'} number`;
        hint.style.display = 'block';
      }
      guessInput.value = '';
      guessInput.focus();
      // low_hi === 'low' ?
      //   guessField.setAttribute('min', guess + 1)
      //   : guessField.setAttribute('max', guess - 1);
    }
  }
}

function gameOver() {
  guessInput.disabled = true;
  guessSubmit.disabled = true;
  resetButton.focus();
}
