const cards = document.querySelectorAll(".h-card");
const search = document.getElementById("search-button");


let cardCount = 0;

async function fetchData() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    const lifecheck = data.results.filter((re) => {
      return re.status == "Alive";
    });

    for (const iterator of lifecheck) {
      const eps = iterator["episode"];
      const role = eps.length > 25 ? "MAIN character" : "SIDE character";

      cards[
        cardCount
      ].innerHTML = `<h4>${role}</h4><br><h3>${iterator.name}</h3><img src="${iterator.image}">`;

      cardCount++;
    }

    search.addEventListener("input", () => {
      const searchValue = search.value.toLowerCase();

      for (let i = 0; i < cards.length; i++) {
        const cardName = cards[i].querySelector("h3").textContent.toLowerCase();

        if (!cardName.includes(searchValue)) {
          cards[i].style.display = "none";
        } else {
          cards[i].style.display = "grid";
        }
      }
    });
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

fetchData();
