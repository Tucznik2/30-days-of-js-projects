const button = document.getElementsByTagName("button")[0];
const planetImg = document.getElementsByClassName("planet-image")[0];
const imgContainer = document.getElementsByClassName("image")[0];
const resultContainer = document.getElementsByClassName("description")[0];
const choosenPlanet = () => {
  return document.getElementsByTagName("select")[0].value;
};
const weightOnPlanet = {
  earth: 1,
  jupiter: 2.528,
  mars: 0.377,
  mercury: 0.378,
  moon: 0.166,
  neptune: 1.125,
  pluto: 0.067,
  saturn: 1.064,
  uranus: 0.889,
  venus: 0.907,
};
button.addEventListener("click", () => {
  const mass = document.getElementById("mass").value;
  resultContainer.style.display = "flex";
  resultContainer.textContent = "";
  if (!mass) {
    imgContainer.style.display = "none";
    resultContainer.textContent = "Mass is required";
    return;
  } else {
    if (choosenPlanet() === "none") {
      imgContainer.style.display = "none";
      resultContainer.textContent = "You did not choose a planet";
      return;
    }
    resultContainer.textContent = "The weight weight of the object on";
    const planetName = document.createElement("span");
    planetName.textContent = choosenPlanet();
    planetName.classList.add("choosen-planet");
    const result = document.createElement("div");
    result.textContent =
      Math.round(mass * weightOnPlanet[choosenPlanet()]) + "   N";
    result.classList.add("result");
    resultContainer.append(planetName);
    resultContainer.append(result);
    imgContainer.style.display = "block";
  }
  planetImg.src = `images/${choosenPlanet()}.png`;
});
