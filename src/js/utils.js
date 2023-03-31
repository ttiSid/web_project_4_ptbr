export { evtListeners };
import { renderCardForm, renderProfileForm } from "./index.js";

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
