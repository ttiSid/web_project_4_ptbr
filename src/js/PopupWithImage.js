import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super();
  }

  /*  Recolhe e clona o template do popup */
  _getPopupTemplate() {
    const popup = document.querySelector("#popup").content;
    const popupElement = popup
      .querySelector(".popup-container")
      .cloneNode(true);

    return popupElement;
  }

  /*  Atribui os valores para as marcações do popup e adiciona ao DOM */
  open(name, link) {
    this._popupElement = this._getPopupTemplate();

    this._popupElement.querySelector(".popup__image").src = link;
    this._popupElement.querySelector(".popup__image").alt = `${name} image`;
    this._popupElement.querySelector(".popup__title").textContent = name;

    this._popupElement.classList.add("overlay");

    const cardContainer = document.querySelector(".pictures-container");

    return cardContainer.append(this._popupElement);
  }
}
