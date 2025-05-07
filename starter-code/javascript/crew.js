import { initPrimaryNavigation } from "./nav.js";

initPrimaryNavigation();

const crewTabs = document.querySelector(".crew-tabs");
const crewInfo = document.querySelector(".crew-info");
const crewImage = document.querySelector(".crew-image");
const crewData = await getCrewData();

crewTabs.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target || !crewTabs.contains(target)) return;

  // update the selected tab
  switchTab(target);

  // find the index of the selected tab
  // and update the  crew data accordingly
  const buttons = Array.from(crewTabs.querySelectorAll("button"));
  const index = buttons.indexOf(target);

  updateCrewData(crewData[index]);
});

function switchTab(target) {
  crewTabs.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-selected", "false");
  });

  target.setAttribute("aria-selected", "true");
}

function updateCrewData(data) {
  crewInfo.innerHTML = `
        <h2 class="text-preset-3 text-white uppercase">
            <span class="block text-preset-4 text-gray">${data.role} </span>${data.name}
          </h2>
          <p class="text-accent text-preset-9">
            ${data.bio}
          </p>
    `;
  crewImage.src = `.${data.images.webp}`;
  crewImage.alt = data.name;
}

async function getCrewData() {
  try {
    const response = await fetch("../data.json");
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(`HTTP error! ${response.status}: ${text}`);
      });
    }
    const data = await response.json();
    return data.crew;
  } catch (error) {
    console.error("Error fetching crew data:", error);
    return [];
  }
}
