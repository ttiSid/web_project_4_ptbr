/*----  Abrindo o modal!    ----*/

/*  Transformando os elementos em objetos */
let editBtn = document.querySelector(".profile__edit-button");
let showOverlay = document.querySelector(".overlay_disable");
let btnCloseModal = document.querySelector(".modal__close-btn");
let formElement = document.querySelector(".modal-container");
let btnSubmit = document.querySelector(".modal__submit-btn");
let nameInput = document.querySelector(".input-field-name");
let descriptionInput = document.querySelector(".input-field-description");
let profileName = document.querySelector(".profile__name");
let descriptionProfile = document.querySelector(".profile__about-me");

/*  Definindo a função à ser tomada ao executar o evento    */
function openModal() {
  showOverlay.classList.add("overlay");
  nameInput.value = profileName.textContent;
  descriptionInput.value = descriptionProfile.textContent;
}

/*  Definindo a função à ser tomada ao executar o evento    */
function closeModal() {
  showOverlay.classList.remove("overlay");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  descriptionProfile.textContent = descriptionInput.value;
  showOverlay.classList.remove("overlay");
}

editBtn.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
formElement.addEventListener("submit", handleProfileFormSubmit);
