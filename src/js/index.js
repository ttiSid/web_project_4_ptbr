import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { evtListeners } from "./utils.js";

const cards = [
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

const renderCards = () => {
  cards.forEach((cardItem) => {
    const newCard = new Card(cardItem, ".card");
    const cardContainer = document.querySelector(".pictures-container");
    const cardElement = newCard.createCard();
    cardContainer.append(cardElement);
  });
};
renderCards();

export const renderCardForm = () => {
  const newForm = new FormValidator(
    {
      formSelector: ".form",
      inputSelector: ".modal__input-field",
      submitButtonSelector: ".modal__submit-btn",
      inactiveButtonClass: "modal__submit-btn_inactive",
      inputErrorClass: "modal__input-error_active",
    },
    "#modal-card"
  );
  const mainContainer = document.querySelector(".pictures-container");

  const newFormElement = newForm._handleOpenForm();
  mainContainer.append(newFormElement);
};

export const renderProfileForm = () => {
  const newForm = new FormValidator(
    {
      formSelector: ".form",
      inputSelector: ".modal__input-field",
      submitButtonSelector: ".modal__submit-btn",
      inactiveButtonClass: "modal__submit-btn_inactive",
      inputErrorClass: "modal__input-error_active",
    },
    "#modal-profile"
  );
  const mainContainer = document.querySelector(".pictures-container");

  const newFormElement = newForm._handleOpenForm();
  mainContainer.append(newFormElement);
};
