document.addEventListener("DOMContentLoaded", function () {
  let baseValue = 375.0;

  const baseDisplay = document.getElementById("base-value");
  const calcDisplay = document.getElementById("calculated-value");
  const incrementBtn = document.getElementById("increment");
  const decrementBtn = document.getElementById("decrement");

  function updateDisplay() {
    baseDisplay.innerText = `$${baseValue.toFixed(2)}`;
    const calculated = baseValue * 0.45;
    calcDisplay.innerText = `$${calculated.toFixed(2)}`;
  }

  incrementBtn.addEventListener("click", () => {
    baseValue += 25;
    updateDisplay();
  });

  decrementBtn.addEventListener("click", () => {
    baseValue = Math.max(0, baseValue - 25);
    updateDisplay();
  });

  updateDisplay();
});
