const guessField = document.querySelector('.guessField');
const guessSubmit = document.querySelector('.guessSubmit');
const resultParas = document.querySelectorAll('.resultParas>*');
const [guesses, lastResult, lowOrHi, hint] = resultParas;
const resetButton = document.querySelector('.start-game');
const N = 8;  // max number of guess trials
let randomNumber, guessCount;

startGame();

function startGame() {
  resetGame()
  document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    checkGuess();
  }

  resetButton.onclick = startGame;

  function checkGuess() {
    guessCount++;
    if (guessCount === 1) {
      guesses.parentElement.style.display = 'flex';
      resetButton.style.display = 'block';
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
        lastResult.innerHTML = 'Game Over!'
        gameOver();
        hint.innerHTML = `The number is ${randomNumber}`;
      } else {
        lastResult.innerHTML = 'Wrong';
        if (guessCount === 5) {
          hint.innerHTML = `Hint: It is an ${randomNumber % 2 ? 'odd' : 'even'} number`;
          hint.style.display = 'block';
        }
        guessField.value = '';
        guessField.focus();
        low_hi === 'low' ?
          guessField.setAttribute('min', guess + 1)
          : guessField.setAttribute('max', guess - 1);
      }
    }
  }
}

function resetGame() {
  guesses.parentElement.style.display = 'none';
  resetButton.style.display = 'none';
  guesses.innerHTML = '<li>Previous guesses:</li>';
  lastResult.innerHTML = '';
  lowOrHi.innerHTML = '';
  hint.innerHTML = '';

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.focus();

  randomNumber = Math.floor(Math.random() * 100) + 1;
  guessCount = 0;
  guessField.value = '';
  guessField.setAttribute('min', 1);
  guessField.setAttribute('max', 100);
}

function gameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton.focus();
}
