const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');
const resultParas = document.querySelectorAll('.resultParas>*');
const [guesses, lastResult, lowOrHi, hint] = resultParas;
const resetButton = document.querySelector('.start-game');
const difficulty = document.querySelector('#difficulty');

let randomNumber, guessCount, N;
initGame();
difficulty.addEventListener('change', initGame);

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  guessCount++;
  if (guessCount === 1) {
    guesses.parentElement.style.display = 'block';
    resetButton.style.display = 'inline-block';
    hint.style.display = 'none';
  }
  const guess = Number(guessField.value);
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
    lowOrHi.innerHTML = `Your guess is too ${low_hi}. ${N - guessCount} turns remaining.`;
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
      guessField.value = '';
      guessField.focus();
      // low_hi === 'low' ?
      //   guessField.setAttribute('min', guess + 1)
      //   : guessField.setAttribute('max', guess - 1);
    }
  }
})

resetButton.addEventListener('click', initGame);

function initGame() {
  N = difficulty.value;
  document.getElementById('turns').innerHTML = N;

  guesses.parentElement.style.display = 'none';
  guesses.innerHTML = '<li>Previous guesses:</li>';
  resetButton.style.display = 'none';
  lastResult.innerHTML = '';
  lowOrHi.innerHTML = '';
  hint.innerHTML = '';

  guessField.value = '';
  guessField.setAttribute('min', 1);
  guessField.setAttribute('max', 100);
  guessField.disabled = false;
  guessField.focus();

  guessSubmit.disabled = false;
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guessCount = 0;
}

function gameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton.focus();
}
