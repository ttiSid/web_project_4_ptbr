export { evtListeners };
import { renderCardForm, renderProfileForm } from "./index.js";

export const cardContainer = ".pictures-container";
export const cards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
];

const evtListeners = (function () {
  const addCard = document.querySelector(".profile__add-card-button");
  addCard.addEventListener("click", () => {
    renderCardForm();
  });

  const editProfile = document.querySelector(".profile__edit-button");
  editProfile.addEventListener("click", () => {
    renderProfileForm();
  });
})();
