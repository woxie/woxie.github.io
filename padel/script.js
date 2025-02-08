/************* Data Structures & Persistence *************/
let players = {}; // Format: { name: { rank, away, matchesPlayed, wins, losses } }
let scheduledMatches = {}; // Format: { courtIndex: matchObject } – one match per court
let numberOfCourts = 1;

// Load persisted data from localStorage
function loadData() {
  const playersData = localStorage.getItem("players");
  if (playersData) players = JSON.parse(playersData);

  const courtsData = localStorage.getItem("numberOfCourts");
  if (courtsData) numberOfCourts = parseInt(courtsData);
}

// Save current data to localStorage
function saveData() {
  localStorage.setItem("players", JSON.stringify(players));
  localStorage.setItem("numberOfCourts", numberOfCourts);
}

/************* UI Update Functions *************/

// Update the player list table (Table1)
function updatePlayerTable() {
  const tbody = document.querySelector("#playerTable tbody");
  tbody.innerHTML = "";
  for (const name in players) {
    const p = players[name];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${name}</td>
      <td><input type="number" value="${
        p.rank
      }" min="1" max="10" class="rankInput" data-player="${name}"></td>
      <td><input type="checkbox" class="awayCheckbox" data-player="${name}" ${
      p.away ? "checked" : ""
    }></td>
      <td><button class="deletePlayerBtn" data-player="${name}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  }
}

// Update the player statistics table (Table2)
function updateStatsTable() {
  const tbody = document.querySelector("#statsTable tbody");
  tbody.innerHTML = "";
  for (const name in players) {
    const p = players[name];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${name}</td>
      <td>${p.matchesPlayed || 0}</td>
      <td>${p.wins || 0}</td>
      <td>${p.losses || 0}</td>
    `;
    tbody.appendChild(tr);
  }
}

// Update the displayed number of courts
function updateCourtCountDisplay() {
  document.getElementById("courtCountDisplay").innerText = numberOfCourts;
}

/************* Scheduling Algorithm *************/

// Given 4 player names, choose the best team split (minimizing average rank difference)
function computeMatchForPlayers(playerNames) {
  if (playerNames.length < 4) return null;
  const combos = [
    {
      teamA: [playerNames[0], playerNames[1]],
      teamB: [playerNames[2], playerNames[3]],
    },
    {
      teamA: [playerNames[0], playerNames[2]],
      teamB: [playerNames[1], playerNames[3]],
    },
    {
      teamA: [playerNames[0], playerNames[3]],
      teamB: [playerNames[1], playerNames[2]],
    },
  ];
  let best = null,
    bestDiff = Infinity;
  combos.forEach((combo) => {
    const avgA =
      (players[combo.teamA[0]].rank + players[combo.teamA[1]].rank) / 2;
    const avgB =
      (players[combo.teamB[0]].rank + players[combo.teamB[1]].rank) / 2;
    const diff = Math.abs(avgA - avgB);
    if (diff < bestDiff || (diff === bestDiff && Math.random() < 0.5)) {
      bestDiff = diff;
      best = combo;
    }
  });
  return best;
}

// Schedule a match for a specific court
function scheduleMatchForCourt(court) {
  // Collect players already scheduled in other courts (to avoid duplicates)
  let scheduledPlayers = [];
  for (let c in scheduledMatches) {
    if (parseInt(c) !== court && scheduledMatches[c]) {
      const match = scheduledMatches[c];
      scheduledPlayers.push(...match.teamA, ...match.teamB);
    }
  }
  // Get available players (not away and not already scheduled)
  let available = Object.keys(players).filter(
    (name) => !players[name].away && !scheduledPlayers.includes(name)
  );
  if (available.length < 4) {
    scheduledMatches[court] = null;
    return;
  }
  // Sort available players by matches played (with random tie-breaker for equal values)
  available.sort((a, b) => {
    const diff =
      (players[a].matchesPlayed || 0) - (players[b].matchesPlayed || 0);
    return diff === 0 ? (Math.random() < 0.5 ? -1 : 1) : diff;
  });
  // Select the first 4 players for this match
  const selected = available.slice(0, 4);
  const match = computeMatchForPlayers(selected);
  scheduledMatches[court] = match;
}

/************* Scheduling Functions *************/
// This function is called when "Apply Changes" is pressed on the player table.
// It will update matches for new courts but will leave any currently scheduled match intact.
function scheduleAllMatches() {
  // Do not clear the existing scheduledMatches.
  // For each court index up to numberOfCourts, schedule a match if one isn't already set.
  for (let court = 0; court < numberOfCourts; court++) {
    if (!scheduledMatches[court]) {
      scheduleMatchForCourt(court);
    }
  }
  // Remove matches for any courts that exceed the current number of courts.
  for (let c in scheduledMatches) {
    if (parseInt(c) >= numberOfCourts) {
      delete scheduledMatches[c];
    }
  }
  saveData();
  updateCourtTables();
}

/************* UI Update for Court Matches *************/
function updateCourtTables() {
  const container = document.getElementById("courtsContainer");
  container.innerHTML = "";
  for (let court = 0; court < numberOfCourts; court++) {
    const courtDiv = document.createElement("div");
    courtDiv.className = "court-table";
    courtDiv.innerHTML = `<h3>Court ${court + 1}</h3>`;
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Team A</th>
          <th>Team B</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody id="court${court}Body">
      </tbody>
    `;
    courtDiv.appendChild(table);
    container.appendChild(courtDiv);

    const tbody = document.getElementById(`court${court}Body`);
    if (scheduledMatches[court]) {
      const match = scheduledMatches[court];
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${match.teamA.join(" & ")} <br> [Avg: ${(
        (players[match.teamA[0]].rank + players[match.teamA[1]].rank) /
        2
      ).toFixed(1)}]</td>
        <td>${match.teamB.join(" & ")} <br> [Avg: ${(
        (players[match.teamB[0]].rank + players[match.teamB[1]].rank) /
        2
      ).toFixed(1)}]</td>
        <td><button class="doneBtn" data-court="${court}">Done</button></td>
      `;
      tbody.appendChild(tr);
    } else {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td colspan="3">Not enough players to schedule a match.</td>`;
      tbody.appendChild(tr);
    }
  }
}

/************* Match Completion & Logging *************/
function completeMatch(court) {
  const match = scheduledMatches[court];
  if (!match) return;
  let winner = prompt(
    `Which team won? Enter "A" for Team A or "B" for Team B:`
  ).toUpperCase();
  while (winner !== "A" && winner !== "B") {
    winner = prompt(
      `Invalid entry. Please enter "A" for Team A or "B" for Team B:`
    ).toUpperCase();
  }

  // Update each player's match count
  [...match.teamA, ...match.teamB].forEach((name) => {
    players[name].matchesPlayed = (players[name].matchesPlayed || 0) + 1;
  });
  // Update wins and losses
  if (winner === "A") {
    match.teamA.forEach(
      (name) => (players[name].wins = (players[name].wins || 0) + 1)
    );
    match.teamB.forEach(
      (name) => (players[name].losses = (players[name].losses || 0) + 1)
    );
  } else {
    match.teamB.forEach(
      (name) => (players[name].wins = (players[name].wins || 0) + 1)
    );
    match.teamA.forEach(
      (name) => (players[name].losses = (players[name].losses || 0) + 1)
    );
  }

  // Log the match result
  const logTbody = document.querySelector("#matchLogTable tbody");
  const logTr = document.createElement("tr");
  logTr.innerHTML = `
    <td>${match.teamA.join(" & ")}</td>
    <td>${match.teamB.join(" & ")}</td>
    <td>Team ${winner} won</td>
  `;
  logTbody.appendChild(logTr);

  // Clear the completed match and schedule a new one for this court
  scheduledMatches[court] = null;
  scheduleMatchForCourt(court);
  saveData();
  updatePlayerTable();
  updateStatsTable();
  updateCourtTables();
}

/************* Event Listeners *************/

// Process textarea input to add players
document.getElementById("addPlayersBtn").addEventListener("click", () => {
  const input = document.getElementById("playerInput").value;
  const lines = input.split("\n");
  for (let line of lines) {
    line = line.trim();
    if (line === "") continue;
    const parts = line.split(" ");
    if (parts.length < 2) {
      alert(`Malformed line: "${line}"`);
      continue;
    }
    const name = parts[0];
    const rank = parseInt(parts[1]);
    if (isNaN(rank) || rank < 1 || rank > 10) {
      alert(`Invalid rank for player ${name}: "${parts[1]}"`);
      continue;
    }
    if (players[name]) {
      alert(`Duplicate entry for player: ${name}`);
      continue;
    }
    players[name] = { rank, away: false, matchesPlayed: 0, wins: 0, losses: 0 };
  }
  saveData();
  updatePlayerTable();
  updateStatsTable();
});

// Clear all players, scheduled matches, and the match log
document.getElementById("clearPlayersBtn").addEventListener("click", () => {
  if (
    confirm("Are you sure you want to clear all players and reset all data?")
  ) {
    players = {};
    scheduledMatches = {};
    localStorage.clear();
    updatePlayerTable();
    updateStatsTable();
    updateCourtTables();
    document.querySelector("#matchLogTable tbody").innerHTML = "";
  }
});

// Add a new player from the blank row in Table1
document.getElementById("addNewPlayerBtn").addEventListener("click", () => {
  const name = document.getElementById("newPlayerName").value.trim();
  const rank = parseInt(document.getElementById("newPlayerRank").value);
  if (!name) {
    alert("Please enter a player name.");
    return;
  }
  if (isNaN(rank) || rank < 1 || rank > 10) {
    alert("Please enter a valid rank (1-10) for the player.");
    return;
  }
  if (players[name]) {
    alert("Player already exists.");
    return;
  }
  players[name] = { rank, away: false, matchesPlayed: 0, wins: 0, losses: 0 };
  saveData();
  updatePlayerTable();
  updateStatsTable();
  document.getElementById("newPlayerName").value = "";
  document.getElementById("newPlayerRank").value = "";
});

// Handle changes in the player table (rank changes and away checkbox)
document.getElementById("playerTable").addEventListener("change", (e) => {
  if (e.target.classList.contains("rankInput")) {
    const name = e.target.getAttribute("data-player");
    const newRank = parseInt(e.target.value);
    if (isNaN(newRank) || newRank < 1 || newRank > 10) {
      alert("Please enter a valid rank (1-10).");
      e.target.value = players[name].rank;
    } else {
      players[name].rank = newRank;
    }
  }
  if (e.target.classList.contains("awayCheckbox")) {
    const name = e.target.getAttribute("data-player");
    players[name].away = e.target.checked;
  }
  saveData();
});

// Delete a player from Table1
document.getElementById("playerTable").addEventListener("click", (e) => {
  if (e.target.classList.contains("deletePlayerBtn")) {
    const name = e.target.getAttribute("data-player");
    if (confirm(`Delete player ${name}?`)) {
      delete players[name];
      saveData();
      updatePlayerTable();
      updateStatsTable();
    }
  }
});

// Apply changes button for players (below Table1)
// When clicked, it does NOT refresh the court matches that are currently displayed.
document
  .getElementById("applyPlayerChangesBtn")
  .addEventListener("click", () => {
    scheduleAllMatches();
  });

// Court controls: plus, minus, and apply court changes
document.getElementById("increaseCourtsBtn").addEventListener("click", () => {
  numberOfCourts++;
  updateCourtCountDisplay();
});
document.getElementById("decreaseCourtsBtn").addEventListener("click", () => {
  if (numberOfCourts > 1) {
    numberOfCourts--;
    updateCourtCountDisplay();
  }
});
document.getElementById("applyCourtsBtn").addEventListener("click", () => {
  // For court changes, we re-run the scheduling (this may refresh the matches)
  scheduledMatches = {};
  scheduleAllMatches();
});

// Handle "Done" button clicks in the court matches section
document.getElementById("courtsContainer").addEventListener("click", (e) => {
  if (e.target.classList.contains("doneBtn")) {
    const court = parseInt(e.target.getAttribute("data-court"));
    completeMatch(court);
  }
});

/************* Initialization *************/
loadData();
updatePlayerTable();
updateStatsTable();
updateCourtCountDisplay();
scheduleAllMatches();
