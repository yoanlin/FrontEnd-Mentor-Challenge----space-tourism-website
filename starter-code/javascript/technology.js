import { initPrimaryNavigation } from "./nav.js";

initPrimaryNavigation();

const techTabs = document.querySelector(".technology-tabs");
const techImg = document.querySelector(".technology-pic");
const portraitImg = document.getElementById("portrait");
const landscapeImg = document.getElementById("landscape");
const techContent = document.querySelector(".technology-content > article");
const result = [];
fetch("../data.json")
  .then(async (response) => {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `HTTP error! ${response.status} ${response.statusText} ${text}`
      );
    }
    return response.json();
  })
  .then((data) => {
    result.push(data.technology);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

techTabs.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target || !techTabs.contains(target)) return;

  switchTab(target);

  const index = Array.from(techTabs.children).indexOf(target);
  updateTechnology(result[0][index]);
});

function switchTab(target) {
  techTabs.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-selected", "false");
  });
  target.setAttribute("aria-selected", "true");
}

function updateTechnology(data) {
  portraitImg.setAttribute("srcset", data.images.portrait);
  landscapeImg.setAttribute("srcset", data.images.landscape);
  techImg.setAttribute("src", data.images.portrait);
  techImg.setAttribute("alt", data.name);
  techContent.innerHTML = `
  <h2 class="uppercase text-gray text-preset-4">
              the terminology...
              <span class="text-white text-preset-3 block">${data.name}</span>
            </h2>
            <p class="text-accent text-preset-9 l-height-180">
              ${data.description}
            </p>`;
}
