import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { evtListeners } from "./utils.js";
import Section from "./Section.js";
import { cards, cardContainer } from "./utils.js";

/*  Inserindo cards existentes ao DOM */

const cardList = new Section(
  {
    items: cards,
    renderer: (item) => {
      const card = new Card(item, ".card");
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  cardContainer
);
cardList.renderer();

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
