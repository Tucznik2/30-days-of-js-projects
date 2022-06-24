const mainContainer = document.querySelector("main.container");
const numberOfCountriesHeading = document.querySelector("h2");
const criteriaButtons = document.querySelectorAll("button");
const searchInput = document.getElementById("search");
const startWordButton = document.getElementById('start-criteria');
const anyWordCryteriaButton = document.getElementById('any-word-criteria');
const sortButton = document.getElementById('sort');
const sortButtonIcon = sortButton.querySelector('span > i');
const resultCount = document.getElementById('result-count');

numberOfCountriesHeading.textContent = `Total Number of countries: ${countries.length}`;

const generateCountries = (country) => {
  const countryContainer = document.createElement("div");
  countryContainer.classList.add("country");
  countryContainer.textContent = country;
  mainContainer.append(countryContainer);
};

const setDefaultSortingIcon = () => {
  sortButtonIcon.classList.remove('fa-arrow-down-z-a');
  sortButtonIcon.classList.add('fa-arrow-down-a-z');
  mainContainer.innerHTML = "";
  countries.forEach((country) => {
    generateCountries(country);
  });
};

countries.forEach((country) => {
  generateCountries(country);
});

startWordButton.addEventListener('click', setDefaultSortingIcon);
anyWordCryteriaButton.addEventListener('click', setDefaultSortingIcon);

criteriaButtons.forEach((button) => {
  button.addEventListener("click", () => {
    criteriaButtons.forEach((button) => {
      button.classList.remove("active");
    });
    if (!button.classList.contains("active")) {
      button.classList.add("active");
    }
  });
});

searchInput.addEventListener("input", (e) => {
  mainContainer.innerHTML = "";
  let i = 0;
  if (startWordButton.classList.contains('active')) {
    countries.forEach((country) => {
      if (country.startsWith(e.target.value)) {
        generateCountries(country);
        i++;
        resultCount.textContent = `Countries start with ${e.target.value} : ${i}`;
      }
    });
  } else if (anyWordCryteriaButton.classList.contains('active')) {
    countries.forEach((country) => {
      if (country.includes(e.target.value)) {
        generateCountries(country);
        i++;
        resultCount.textContent = `Countries that contains ${e.target.value} : ${i}`;
      }
    });
  }
  if (e.target.value === '') {
    resultCount.textContent = ' ';
  }
});

sortButton.addEventListener('click', () => {
  if (sortButtonIcon.classList.contains('fa-arrow-down-a-z')) {
    sortButtonIcon.classList.remove('fa-arrow-down-a-z');
    sortButtonIcon.classList.add('fa-arrow-down-z-a');
    mainContainer.innerHTML = '';
    countries.slice().reverse().forEach((country) => {
      generateCountries(country);
    });
  }
  else if (sortButtonIcon.classList.contains('fa-arrow-down-z-a')) {
    sortButtonIcon.classList.remove('fa-arrow-down-z-a');
    sortButtonIcon.classList.add('fa-arrow-down-a-z');
    mainContainer.innerHTML = '';
    countries.forEach((country) => {
      generateCountries(country);
    });
  }
});