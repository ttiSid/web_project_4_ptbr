import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { evtListeners, configObj } from "./utils.js";
import Section from "./Section.js";
import { cards, cardContainer } from "./utils.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

/*  Abrindo formulário de card */

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

/*  Abrindo formulário de perfil */

export const renderProfileForm = () => {
  const newForm = new PopupWithForm("#modal-profile", (evt) => {
    evt.preventDefault();
    userInfo.editProfile();
  });

  const userInfo = new UserInfo({
    userName: ".profile__name",
    userAbout: ".profile__about-me",
  });

  userInfo.getUserInfo();

  const mainContainer = document.querySelector(".pictures-container");
  const newFormElement = newForm.open();
  mainContainer.append(newFormElement);

  new FormValidator(configObj, "#modal-profile").enableValidation();
};
