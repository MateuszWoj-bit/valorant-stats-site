async function fetchAccountInfo() {
  try {
    const response = await fetch(
      "https://api.henrikdev.xyz/valorant/v1/account/MikeSnicket/9005"
    );
    const data = await response.json();

    if (response.status === 200) {
      const accountInfo = data.data;
      const accountInfoContainer = document.getElementById("account-info");
      accountInfoContainer.innerHTML = `
                <p>Name: ${accountInfo.name}</p>
                <p>Tag: ${accountInfo.tag}</p>
                <p>Region: ${accountInfo.region}</p>
                <p>Account Level: ${accountInfo.account_level}</p>
                <img src="${accountInfo.card.large}" alt="Player Card">
            `;
    } else {
      console.error("Error fetching account information:", data);
    }
  } catch (error) {
    console.error("Error fetching account information:", error);
  }
}

async function fetchStoreItems() {
  try {
    const response = await fetch(
      "https://api.henrikdev.xyz/valorant/v2/store-featured"
    );
    const data = await response.json();

    if (response.status === 200) {
      const storeItems = data.data[0].items;
      const storeItemsContainer = document.getElementById("store-items");

      storeItems.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.className = "store-item";
        itemElement.innerHTML = `
                    <p>Name: ${item.name}</p>
                    <p>Type: ${item.type}</p>
                    <p>Price: ${item.base_price} Valorant Points</p>
                    <img src="${item.image}" alt="Item Image">
                `;
        storeItemsContainer.appendChild(itemElement);
      });
    } else {
      console.error("Error fetching store items:", data);
    }
  } catch (error) {
    console.error("Error fetching store items:", error);
  }
}

// fetchAccountInfo();
fetchStoreItems();


async function fetchAccountInfoBasedOnInput(event) {
  event.preventDefault();

  const playerName = document.getElementById("player-name").value;
  const playerTag = document.getElementById("player-tag").value;

  try {
    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/account/${playerName}/${playerTag}`
    );
    const data = await response.json();

    if (response.status === 200) {
      const accountInfo = data.data;
      const accountInfoContainer = document.getElementById("account-info");
      accountInfoContainer.innerHTML = `
                <h2>Account Information</h2>
                <p>Name: ${accountInfo.name}</p>
                <p>Tag: #${accountInfo.tag}</p>
                <p>Region: ${accountInfo.region}</p>
                <p>Account Level: ${accountInfo.account_level}</p>
                <img src="${accountInfo.card.large}" alt="Player Card">
            `;
    } else {
      console.error("Error fetching account information:", data);
    }
  } catch (error) {
    console.error("Error fetching account information:", error);
  }
}

const accountForm = document.getElementById("account-form");
accountForm.addEventListener("submit", fetchAccountInfoBasedOnInput);

// Function to fetch and display match information based on user input
async function fetchMatchInfoBasedOnInput(event) {
    event.preventDefault();

    const playerName = document.getElementById('player-name').value;
    const playerTag = document.getElementById('player-tag').value;

    try {
        // Fetch account information
        const accountResponse = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${playerName}/${playerTag}`);
        const accountData = await accountResponse.json();

        if (accountResponse.status === 200) {
            const accountInfo = accountData.data;

            // Fetch match information
            const matchResponse = await fetch(`https://api.henrikdev.xyz/valorant/v3/matches/eu/${playerName}/${playerTag}`);
            const matchData = await matchResponse.json();

            if (matchResponse.status === 200 && matchData.data.length > 0) {
                const matchInfo = matchData.data[0].metadata;
                const redTeamPlayers = matchData.data[0].players.red;
                const blueTeamPlayers = matchData.data[0].players.blue;

                // Display match information and player details
                const matchInfoContainer = document.getElementById('match-info');
                matchInfoContainer.innerHTML = `
                    <h2>Match Information</h2>
                    <p>Map: ${matchInfo.map}</p>
                    <p>Game Length: ${matchInfo.game_length} seconds</p>
                    <p>Mode: ${matchInfo.mode}</p>
                    <p>Rounds Played: ${matchInfo.rounds_played}</p>
                    
                    <h3>Players</h3>
                    <p><strong>Red Team:</strong></p>
                    <ul>
                        ${redTeamPlayers.map(player => `<li>${player.name} (${player.character}) - Level ${player.level}</li>`).join('')}
                    </ul>
                    
                    <p><strong>Blue Team:</strong></p>
                    <ul>
                        ${blueTeamPlayers.map(player => `<li>${player.name} (${player.character}) - Level ${player.level}</li>`).join('')}
                    </ul>
                `;
            } else {
                console.error('Error fetching match information:', matchData);
            }
        } else {
            console.error('Error fetching account information:', accountData);
        }
    } catch (error) {
        console.error('Error fetching information:', error);
    }
}



accountForm.addEventListener('submit', fetchMatchInfoBasedOnInput);
