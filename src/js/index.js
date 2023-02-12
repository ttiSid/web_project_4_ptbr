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

/*  Transformando os elementos em objetos */
const editBtn = document.querySelector(".profile__edit-button");
const generalModal = document.querySelectorAll(".general-modal");
const modalProfile = document.querySelector(".modal-profile");
const modalCard = document.querySelector(".modal-card");
const formProfile = document.querySelector(".form-profile");
const formCard = document.querySelector(".form-card");
const btnSubmit = document.querySelector(".modal__submit-btn");
const nameInput = formProfile.querySelector(".input-field-name");
const descriptionInput = formProfile.querySelector(".input-field-description");
const titleInput = document.querySelector(".input-field-title");
const urlInput = document.querySelector(".input-field-url");
const profileName = document.querySelector(".profile__name");
const descriptionProfile = document.querySelector(".profile__about-me");
const addCardButton = document.querySelector(".profile__add-card-button");
const btnCloseModal = document
  .querySelectorAll(".modal__close-btn")
  .forEach(function (closeButton) {
    closeButton.addEventListener("click", () => {
      generalModal.forEach(function (generalModal) {
        generalModal.classList.remove("overlay");
      });
    });
  });

cards.forEach(function (item, index) {
  createCard(item);
});

/*----  Criando    ----*/
function createCard(item) {
  const card = document.querySelector("#card").content;
  const cardContainer = document.querySelector(".pictures-container");
  const cardElement = card.querySelector(".picture-card").cloneNode(true);
  const deleteBtn = cardElement.querySelector(".picture-card__delete-btn");
  deleteBtn.addEventListener("click", function () {
    cards.shift(item);
    deleteBtn.parentElement.remove();
  });
  const likeBtn = cardElement.querySelector(".picture-card__like-btn");
  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("picture-card__like-btn_active");
  });

  const cardLink = item.link;
  const cardName = item.name;

  cardElement.querySelector(".picture-card__image").src = cardLink;
  cardElement.querySelector(".picture-card__description").textContent =
    cardName;
  cardElement.querySelector(".picture-card__image").alt = cardName + " image";
  cardElement
    .querySelector(".picture-card__image")
    .addEventListener("click", function () {
      const popup = document.querySelector("#popup").content;
      const popupElement = popup
        .querySelector(".popup-container")
        .cloneNode(true);
      popupElement.querySelector(".popup__image").src = cardLink;
      popupElement.querySelector(".popup__image").alt = cardName + " image";
      popupElement.querySelector(".popup__title").textContent = cardName;
      popupElement.classList.add("overlay");
      const btnCloseModal = popupElement.querySelector(".popup__close-btn");
      btnCloseModal.addEventListener("click", () => {
        popupElement.remove();
      });
      window.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          popupElement.remove();
        }
      });

      popupElement.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("overlay")) {
          evt.target.remove(popupElement);
        }
      });

      return cardContainer.append(popupElement);
    });

  return cardContainer.append(cardElement);
}

/*----  Enviando dados de perfil via formulário    ----*/

editBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  modalProfile.classList.add("overlay");
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      modalProfile.classList.remove("overlay");
    }
  });
  modalProfile.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("overlay")) {
      evt.target.classList.remove("overlay");
    }
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  modalProfile.classList.remove("overlay");
}

formProfile.addEventListener("submit", handleProfileFormSubmit);

/*----  Enviando dados para adicionar card via formulário   ----*/

addCardButton.addEventListener("click", () => {
  modalCard.classList.add("overlay");
  window.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      modalCard.classList.remove("overlay");
    }
  });
  modalCard.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("overlay")) {
      evt.target.classList.remove("overlay");
    }
  });
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cards.unshift({ name: titleInput.value, link: urlInput.value });
  const card = document.querySelector("#card").content;
  const cardContainer = document.querySelector(".pictures-container");
  const cardElement = card.querySelector(".picture-card").cloneNode(true);
  const cardLink = urlInput.value;
  const cardName = titleInput.value;
  const likeBtn = cardElement.querySelector(".picture-card__like-btn");
  likeBtn.addEventListener("click", function () {
    likeBtn.classList.toggle("picture-card__like-btn_active");
  });
  const deleteBtn = cardElement.querySelector(".picture-card__delete-btn");
  deleteBtn.addEventListener("click", function () {
    cards.shift(card);
    deleteBtn.parentElement.remove();
  });

  cardElement.querySelector(".picture-card__image").src = cardLink;
  cardElement.querySelector(".picture-card__description").textContent =
    cardName;
  cardElement.querySelector(".picture-card__image").alt = cardName + " image";

  cardElement
    .querySelector(".picture-card__image")
    .addEventListener("click", function () {
      const popup = document.querySelector("#popup").content;
      const popupElement = popup
        .querySelector(".popup-container")
        .cloneNode(true);
      popupElement.querySelector(".popup__image").src = cardLink;
      popupElement.querySelector(".popup__image").alt = cardName + " image";
      popupElement.querySelector(".popup__title").textContent = cardName;
      const btnCloseModal = popupElement.querySelector(".popup__close-btn");
      btnCloseModal.addEventListener("click", () => {
        popupElement.remove();
      });

      window.addEventListener("keydown", (evt) => {
        if (evt.key === "Escape") {
          popupElement.remove();
        }
      });

      popupElement.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("overlay")) {
          evt.target.remove(popupElement);
        }
      });

      popupElement.classList.add("overlay");

      return cardContainer.append(popupElement);
    });

  modalCard.classList.remove("overlay");
  cardContainer.prepend(cardElement);
}

formCard.addEventListener("submit", handleCardFormSubmit);
