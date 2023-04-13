import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor() {
    super();
  }

  /*  Recolhe e clona o template do popup */
  _getPopupTemplate() {
    const popup = document.querySelector("#popup").content;
    this._formElement = popup.querySelector(".popup-container").cloneNode(true);

    return this._formElement;
  }

  /*  Atribui os valores para as marcações do popup e adiciona ao DOM */
  open(name, link) {
    this._formElement = this._getPopupTemplate();

    this._formElement.querySelector(".popup__image").src = link;
    this._formElement.querySelector(".popup__image").alt = `${name} image`;
    this._formElement.querySelector(".popup__title").textContent = name;

    this._formElement.classList.add("overlay");

    const cardContainer = document.querySelector(".pictures-container");

    return cardContainer.append(this._formElement);
  }

  close() {
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
