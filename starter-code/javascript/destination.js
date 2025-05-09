import { initPrimaryNavigation } from "./nav.js";

initPrimaryNavigation();

const tabs = document.querySelector(".destination-tabs");
const destination = document.querySelector("h2");
const planetImg = document.querySelector(".planet-img");
const description = document.querySelector(".description");
const destinationInfo = document.querySelector(".destination-info");
const distance = destinationInfo.querySelector(":nth-of-type(1) > p");
const travel = destinationInfo.querySelector(":nth-of-type(2) > p");

const destinationsData = await getDestinationData();

tabs.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  switchTab(target);

  const selectedTab = target.textContent.toLowerCase().trim();
  const selectedDestination = destinationsData.find(
    (destination) => destination.name.toLowerCase() === selectedTab
  );

  if (selectedDestination) {
    updateDestination(selectedDestination);
  }
});

function switchTab(target) {
  // check if the clicked element is a button inside the tabs
  if (!target || !tabs.contains(target)) return;

  // set all buttons to aria-selected false
  tabs.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-selected", "false");
  });

  // set the clicked button to aria-selected true
  target.setAttribute("aria-selected", "true");
}

function updateDestination(data) {
  destination.textContent = data.name;
  planetImg.src = data.images.webp;
  planetImg.alt = data.name;
  description.textContent = data.description;
  distance.textContent = data.distance;
  travel.textContent = data.travel;
}

async function getDestinationData() {
  const response = await fetch("../data.json");
  const data = await response.json();

  return data.destinations;
}
