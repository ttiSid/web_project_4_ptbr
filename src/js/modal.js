/*----  Abrindo o modal!    ----*/

/*  Transformando os elementos em objetos */
let editBtn = document.querySelector(".profile__edit-button");
let generalModal = document.querySelectorAll(".general-modal");
let modalProfile = document.querySelector(".modal-profile");
let modalCard = document.querySelector(".modal-card");
let formProfile = document.querySelector(".form-profile");
let formCard = document.querySelector(".form-card");
let btnSubmit = document.querySelector(".modal__submit-btn");
let nameInput = document.querySelector(".input-field-name");
let descriptionInput = document.querySelector(".input-field-description");
let titleInput = document.querySelector(".input-field-title");
let urlInput = document.querySelector(".input-field-url");
let profileName = document.querySelector(".profile__name");
let descriptionProfile = document.querySelector(".profile__about-me");
let addCardButton = document.querySelector(".profile__add-card-button");
let btnCloseModal = document
  .querySelectorAll(".modal__close-btn")
  .forEach(function (closeButton) {
    closeButton.addEventListener("click", () => {
      generalModal.forEach(function (generalModal) {
        generalModal.classList.remove("overlay");
      });
    });
  });

editBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  modalProfile.classList.add("overlay");
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  modalProfile.classList.remove("overlay");
}

formProfile.addEventListener("submit", handleProfileFormSubmit);

addCardButton.addEventListener("click", () => {
  modalCard.classList.add("overlay");
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cards.push({ name: titleInput.value, link: urlInput.value });
  const card = document.querySelector("#card").content;
  const cardContainer = document.querySelector(".pictures-container");
  const cardElement = card.querySelector(".picture-card").cloneNode(true);
  const cardLink = urlInput.value;
  const cardName = titleInput.value;

  cardElement.querySelector(".picture-card__image").src = cardLink;
  cardElement.querySelector(".picture-card__description").textContent =
    cardName;
  cardElement.querySelector(".picture-card__image").alt = cardName + " image";
  modalCard.classList.remove("overlay");

  return cardContainer.append(cardElement);
}

formCard.addEventListener("submit", handleCardFormSubmit);
