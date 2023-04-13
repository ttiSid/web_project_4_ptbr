import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { evtListeners } from "./utils.js";
import Section from "./Section.js";
import { cards, cardContainer } from "./utils.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";

/*  Inserindo cards existentes ao DOM */

const cardList = new Section(
  {
    items: cards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (name, link) => {
            const popupImg = new PopupWithImage("#popup");
            popupImg.open(name, link);
            popupImg.setEventListeners();
          },
        },
        ".card"
      );
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  cardContainer
);

cardList.renderer();

export const renderCardForm = () => {
  const newForm = new PopupWithForm("#modal-card", (evt) => {
    evt.preventDefault();
    const cardData = newForm._getInputValues();
    const newCard = new Card(
      {
        data: cardData,
        handleCardClick: (name, link) => {
          const popupImg = new PopupWithImage("#popup");
          popupImg.open(name, link);
          popupImg.setEventListeners();
        },
      },
      ".card"
    );
    const cardContainer = document.querySelector(".pictures-container");
    const cardElement = newCard.createCard();
    cardContainer.prepend(cardElement);
  });

  const mainContainer = document.querySelector(".pictures-container");
  const newFormElement = newForm.open();
  mainContainer.append(newFormElement);
  new FormValidator(configObj, "#modal-card").enableValidation();
};

const configObj = {
  formSelector: ".form",
  inputSelector: ".modal__input-field",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input-error_active",
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
