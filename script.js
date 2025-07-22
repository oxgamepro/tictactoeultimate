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

document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        // पहले से लगी clicked class को remove करो
        button.classList.remove("clicked");
        void button.offsetWidth; // reflow trick
        // फिर class जोड़ो जिससे छोटा हो
        button.classList.add("clicked");
        // 0.5 सेकंड बाद class हटा दो जिससे वापस normal हो
        setTimeout(() => {
          button.classList.remove("clicked");
        }, 200);
      });
    });
  


  const firebaseConfig = {
    apiKey: "AIzaSyBeGU1zEnmYmj2AM-IGG--5RHDtrzplsWE",
    authDomain: "leaderboard-15c73.firebaseapp.com",
    databaseURL: "https://leaderboard-15c73-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "leaderboard-15c73",
    storageBucket: "leaderboard-15c73.appspot.com",
    messagingSenderId: "981645460996",
    appId: "1:981645460996:web:a33c923a13df74ed7b9751"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  const rankIcons = ["🏆", "🎖️", "🏅", "🌟", "🌟", "⭐", "⭐", "⭐", "⭐", "⭐"];

  function loadLeaderboard() {
  db.ref("scores").once("value").then(snapshot => {
    const data = snapshot.val();
    if (!data) return;

    const list = Object.values(data);
    list.sort((a, b) => b.wins - a.wins);

    const ol = document.querySelector(".leaderboard");
    ol.innerHTML = "";

    list.forEach((player, index) => {
      const rank = index + 1;
      const icon = rankIcons[index] || "";
      const li = document.createElement("li");

      // ✅ Top 10: Only emoji | 11 and below: Only number
      const displayText = index < 10 ? `${icon}` : `${rank}`;

      li.innerHTML = `
        <span class="rank-icon">${displayText}</span> 
        <a
          class="${rank === 1 ? 'glow' : ''}"
          onclick="showPlayerDetails('${player.name}', ${rank}, '${icon}', ${player.wins})">
          ${player.name}
        </a>
      `;

      ol.appendChild(li);
    });
  });
}

window.showPlayerDetails = function (name, rank, icon, wins) {
  const detailDiv = document.getElementById("player-details");
  detailDiv.innerHTML = `
    <hr>
    <p><strong>Rank:</strong> ${rank} ${icon}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Wins:</strong> ${wins}</p>
  `;
};

  window.onload = loadLeaderboard;




const menuBtn = document.querySelector(".threeline");
  const sidebar = document.querySelector("#sidebar");

  // 1. Menu पर क्लिक → Toggle open class
  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation(); // ताकि नीचे वाला event ना चले
    sidebar.classList.toggle("open");
  });

  // 2. Sidebar के अंदर क्लिक किया तो भी बंद हो जाए (optional)
  sidebar.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
      sidebar.classList.remove("open");
    }
    e.stopPropagation(); // अंदर क्लिक करने पर body वाला इवेंट ना चले
  });

  // 3. Body पर कहीं भी क्लिक किया तो sidebar बंद
  document.body.addEventListener("click", function () {
    sidebar.classList.remove("open");
  });
