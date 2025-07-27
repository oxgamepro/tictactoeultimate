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






    // सभी बटन को select करो और loop में apply करो
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


//aaaaavvvvvaaaajjj


const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// 🎆 Firework Sound (Heavy)
function playHeavyFirework() {
  const now = audioCtx.currentTime;

  // 🎇 1. BOOM (longer)
  const boom = audioCtx.createBufferSource();
  const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 1, audioCtx.sampleRate); // 1 sec instead of 0.5
  const data = buffer.getChannelData(0);

  for (let i = 0; i < data.length; i++) {
    const fade = (1 - i / data.length);
    data[i] = (Math.random() * 2 - 1) * fade * Math.sin(i * 0.5);
  }

  boom.buffer = buffer;
  const boomGain = audioCtx.createGain();
  boomGain.gain.setValueAtTime(0.8, now);
  boomGain.gain.exponentialRampToValueAtTime(0.001, now + 1); // fade doubled
  boom.connect(boomGain).connect(audioCtx.destination);
  boom.start(now);

  // 🎇 2. Crackle (longer duration)
  for (let i = 0; i < 20; i++) {
    const t = now + 0.4 + Math.random() * 0.6; // starts later
    const crack = audioCtx.createBufferSource();
    const crackBuffer = audioCtx.createBuffer(1, 200, audioCtx.sampleRate); // more samples
    const crackData = crackBuffer.getChannelData(0);
    for (let j = 0; j < crackData.length; j++) {
      crackData[j] = (Math.random() * 2 - 1) * (1 - j / crackData.length);
    }

    crack.buffer = crackBuffer;
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.4, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2); // fade-out longer

    crack.connect(g).connect(audioCtx.destination);
    crack.start(t);
  }

  // 📱 Vibration
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }
}

// 🏆 Firework on leaderboard name click
document.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (li && li.parentElement.classList.contains("leaderboard")) {
    playHeavyFirework();
  }
});



// 🔊 Pop Sound (Longer)
const audioCtx2 = new (window.AudioContext || window.webkitAudioContext)();

function playRealisticPop() {
  const now = audioCtx2.currentTime;

  const osc = audioCtx2.createOscillator();
  const gain = audioCtx2.createGain();
  const filter = audioCtx2.createBiquadFilter();

  osc.type = "sine";
  osc.frequency.setValueAtTime(650, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.4); // double duration

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.3, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5); // extended fade

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1200, now);

  osc.connect(gain);
  gain.connect(filter);
  filter.connect(audioCtx2.destination);

  osc.start(now);
  osc.stop(now + 0.6); // longer
}

// 🔁 Apply pop to interactive elements
document.querySelectorAll("button, .game-btn, a, .sidebar li, svg").forEach(el => {
  el.addEventListener("click", () => {
    playRealisticPop();
  });
});
