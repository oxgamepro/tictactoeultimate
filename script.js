document.addEventListener("DOMContentLoaded", function () {
  const redirectPage = (targetPage) => {
    window.location.href = targetPage;
  };

  function handleSelection(buttons, storageKey, applyClass = true) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        if (applyClass) {
          buttons.forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
        }
        localStorage.setItem(storageKey, button.textContent.trim());
      });
    });
  }

  function loadSavedSelection(buttons, storageKey, defaultIndex = 0) {
    const savedValue = localStorage.getItem(storageKey);
    let selectedButton = null;

    if (savedValue) {
      selectedButton = Array.from(buttons).find(
        btn => btn.textContent.trim() === savedValue
      );
    }

    // अगर कुछ भी select नहीं मिला तो defaultIndex वाला select करो
    if (!selectedButton && buttons[defaultIndex]) {
      selectedButton = buttons[defaultIndex];
      localStorage.setItem(storageKey, selectedButton.textContent.trim());
    }

    if (selectedButton) {
      selectedButton.classList.add('selected');
    }
  }

  const boardButtons = document.querySelectorAll('.board-size');
  handleSelection(boardButtons, 'selectedBoardSize', true);
  loadSavedSelection(boardButtons, 'selectedBoardSize', 0); // default index = 0 (3x3)

  const modeButtons = document.querySelectorAll('.mode-btn');
  modeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const gameMode = button.textContent.trim();
      localStorage.setItem("selectedGameMode", gameMode);

      if (gameMode === "👤 VS 🤖" || gameMode === "👤 VS 👤") {
        redirectPage("game.html");
      } else if (gameMode === "Online Play") {
        redirectPage("online.html");
      }
    });
  });
});
