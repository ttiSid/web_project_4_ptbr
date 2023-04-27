import "./styles/index.css";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import { configObj } from "./components/utils.js";
import Section from "./components/Section.js";
import { cardContainer } from "./components/utils.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import { api } from "./components/API.js";

/*  Adicionando EventListeners aos botões de adicionar e editar perfil  */

(function () {
  const addCard = document.querySelector(".profile__add-card-button");
  addCard.addEventListener("click", () => {
    renderCardForm();
  });

  const editProfile = document.querySelector(".profile__edit-button");
  editProfile.addEventListener("click", () => {
    renderProfileForm();
  });
})();

/*  Inserindo cards existentes ao DOM */
const InitialCards = api.getInitialCards();
const cardList = new Section(
  {
    items: InitialCards.then((data) => {
      return data;
    }),
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
    api.postNewCard({ name: cardData.name, link: cardData.link });
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

  if (document.querySelector(".form") === null) {
    const mainContainer = document.querySelector(".pictures-container");
    const newFormElement = newForm.open();
    mainContainer.append(newFormElement);
  }

  new FormValidator(configObj, "#modal-card").enableValidation();
};

/*  Abrindo formulário de perfil */
const user = api.getUser();
export const renderProfileForm = () => {
  const newForm = new PopupWithForm("#modal-profile", (evt) => {
    evt.preventDefault();
    const userData = userInfo.editProfile();
    api.setProfile({ name: userData.name, about: userData.about });
  });

  const userInfo = new UserInfo({
    userName: user,
    userAbout: user,
  });
  userInfo.getUserInfo();

  if (document.querySelector(".form") === null) {
    const mainContainer = document.querySelector(".pictures-container");
    const newFormElement = newForm.open();
    mainContainer.append(newFormElement);
  }
  new FormValidator(configObj, "#modal-profile").enableValidation();
};

api.getUser().then((data) => {
  const profileName = document.querySelector(".profile__name");
  profileName.textContent = data.name;

  const profileAbout = document.querySelector(".profile__about-me");
  profileAbout.textContent = data.about;

  const profilePicture = document.querySelector(".profile__image");
  profilePicture.src = data.avatar;
});
