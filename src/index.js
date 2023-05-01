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

  const editProfilePic = document.querySelector(".profile__edit-picture");
  editProfilePic.addEventListener("click", () => {
    renderPictureForm();
  });
})();

/*  Recebendo cards existentes da API ao DOM */

const cardList = new Section(
  {
    items: api.getCards().then((data) => {
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
          like: (evt) => {
            setLike(evt, item);
          },
          deleteCard: () => {
            const deleteConfirmation = new PopupWithForm(
              "#modal-card-delete",
              () => {
                api.deleteCard(item._id).then(() => {
                  setTimeout(() => {
                    document.querySelector(".general-modal").remove();
                    cardElement.remove();
                  }, 100);
                });
              }
            );
            isSingleForm(deleteConfirmation);
          },
        },
        ".card"
      );
      const cardElement = card.createCard();
      card._hasOwnerLiked();
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
    evt.submitter.innerText = "Salvando...";
    const cardData = newForm._getInputValues();
    api
      .postNewCard({
        name: cardData.name,
        link: cardData.link,
      })
      .then((item) => {
        evt.submitter.innerText = "Salvo";

        const card = new Card(
          {
            data: item,
            handleCardClick: (name, link) => {
              const popupImg = new PopupWithImage("#popup");
              popupImg.open(name, link);
              popupImg.setEventListeners();
            },
            like: (evt) => {
              setLike(evt, item);
            },
            deleteCard: () => {
              const deleteConfirmation = new PopupWithForm(
                "#modal-card-delete",
                () => {
                  api.deleteCard(item._id).then(() => {
                    setTimeout(() => {
                      document.querySelector(".general-modal").remove();
                      cardElement.remove();
                    }, 100);
                  });
                }
              );
              isSingleForm(deleteConfirmation);
            },
          },
          ".card"
        );

        const cardElement = card.createCard();
        card._hasOwnerLiked();

        const cardContainer = document.querySelector(".pictures-container");
        cardContainer.prepend(cardElement);

        setTimeout(() => {
          document.querySelector(".general-modal").remove();
        }, 100);
      });
  });
  isSingleForm(newForm);
  new FormValidator(configObj, "#modal-card").enableValidation();
};

/*  Abrindo formulário de perfil */
const user = api.getUser();
export const renderProfileForm = () => {
  const newForm = new PopupWithForm("#modal-profile", (evt) => {
    evt.preventDefault();
    evt.submitter.innerText = "Salvando...";
    const userData = userInfo.editProfile();
    api.setProfile({ name: userData.name, about: userData.about }).then(() => {
      evt.submitter.innerText = "Salvo";
      setTimeout(() => {
        document.querySelector(".general-modal").remove();
      }, 100);
    });
  });
  isSingleForm(newForm);

  const userInfo = new UserInfo({
    userName: user,
    userAbout: user,
  });

  userInfo.getUserInfo();

  new FormValidator(configObj, "#modal-profile").enableValidation();
};

/* Alterando foto de perfil */

const renderPictureForm = () => {
  const newForm = new PopupWithForm("#modal-profile-picture", (evt) => {
    evt.preventDefault();
    const url = newForm._getInputUrl();

    api.setProfilePic(url).then((res) => {
      const profilePicture = document.querySelector(".profile__image");
      profilePicture.src = res.avatar;
      setTimeout(() => {
        document.querySelector(".general-modal").remove();
      }, 100);
    });
  });
  isSingleForm(newForm);
  new FormValidator(configObj, "#modal-profile-picture").enableValidation();
};

/* Recebendo dados de usuário atualizados ao iniciar  */

api.getUser().then((data) => {
  const profileName = document.querySelector(".profile__name");
  profileName.textContent = data.name;

  const profileAbout = document.querySelector(".profile__about-me");
  profileAbout.textContent = data.about;

  const profilePicture = document.querySelector(".profile__image");
  profilePicture.src = data.avatar;
});

/* Valida se existe outro formulário aberto antes de adicionar um novo */

function isSingleForm(newForm) {
  if (document.querySelector(".form") === null) {
    const mainContainer = document.querySelector(".pictures-container");
    const newFormElement = newForm.open();
    mainContainer.append(newFormElement);
  }
}

/* Altera os estados de like */

function setLike(evt, item) {
  if (evt.target.classList.contains("picture-card__like-btn_active")) {
    evt.target.classList.remove("picture-card__like-btn_active");
    evt.target.nextElementSibling.textContent = --item.likes.length;
    api.removeLike(item._id);
  } else {
    evt.target.classList.add("picture-card__like-btn_active");
    evt.target.nextElementSibling.textContent = ++item.likes.length;
    api.addLike(item._id);
  }
}
