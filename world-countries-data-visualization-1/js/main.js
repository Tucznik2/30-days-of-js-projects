const subtitle = document.getElementsByClassName("subtitle")[0];
const populationButton = document.getElementsByClassName("population")[0];
const languagesButton = document.getElementsByClassName("languages")[0];
const rankingTitle = document.getElementsByClassName("graph-title")[0];
const graphWrapper = document.getElementById("stat");

subtitle.textContent = `Currently, we have ${countries_data.length} countries`;

const worldPopulation = () => {
  let worldPopulation = 0;
  countries_data.forEach((country) => {
    worldPopulation += country.population;
  });
  return worldPopulation;
};

let languages = {};
countries_data.forEach((country) => {
  country.languages.forEach((language) => {
    if (isNaN(languages[language])) {
      languages[language] = 1;
    } else {
      languages[language]++;
    }
  });
});

const essa = () => {
  return Object.entries(languages).sort((a, b) => b[1] - a[1]);
};
languages = essa();

const showPopulationRanking = () => {
  graphWrapper.innerHTML = "";
  const worldEl = document.createElement("div");
  worldEl.innerHTML = `
    <label for="world">World</label>
    <progress id="world" value="100" max="100"></progress>
    <span class="value">${worldPopulation().toLocaleString("en-US")}</span>
    `;
  worldEl.classList.add("country");
  graphWrapper.append(worldEl);
  countries_data.sort((a, b) => b.population - a.population);
  countries_data.forEach((country) => {
    const countryEl = document.createElement("div");
    countryEl.innerHTML = `
    <label for="${country.name}">${country.name}</label>
    <progress id="${country.name}" value="${
      (country.population / worldPopulation()) * 100
    }" max="100"></progress>
    <span class="value">${country.population.toLocaleString("en-US")}</span>
    `;
    countryEl.classList.add("country");
    graphWrapper.append(countryEl);
  });
};

const showLanguagesRanking = () => {
  graphWrapper.innerHTML = "";
  languages.forEach((language) => {
    const langEl = document.createElement("div");
    langEl.innerHTML = `<label for="${language[0]}">${language[0]}</label>
                <progress id="${language[0]}" value="${language[1]}" max="100"></progress>
                <span class="value">${language[1]}</span>
                `;
    langEl.classList.add("language");
    graphWrapper.append(langEl);
  });
};

populationButton.addEventListener("click", () => {
  rankingTitle.textContent = "10 Most populated countries in the world";
  showPopulationRanking();
});

languagesButton.addEventListener("click", () => {
  rankingTitle.textContent = "10 Most Spoken languages in the world";
  showLanguagesRanking();
});

rankingTitle.textContent = "10 Most populated countries in the world";
window.onload = showPopulationRanking();
