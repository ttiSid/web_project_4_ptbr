import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super();
    this.popupSelector = popupSelector;
    this.handleFormSubmit = handleFormSubmit;
  }

  _getFormTemplate() {
    const formTemplate = document.querySelector(this.popupSelector).content;

    this._formElement = formTemplate
      .querySelector(this.popupSelector.replace("#", "."))
      .cloneNode(true);

    return this._formElement;
  }

  open() {
    super.open();
    this._formElement = this._getFormTemplate();
    this.setEventListeners();
    this._formElement.classList.add("overlay");

    return this._formElement;
  }

  close() {
    super.close();

    /* document.removeEventListener("click", this.removeFormWithClickOut);
    closeBtn.removeEventListener("click", this.close); */
  }

  /* removeFormWithClickOut = (evt) => {
    if (evt.target.classList.contains("overlay")) {
      this.close();
    }
  };
 */
  _getInputValues() {
    this._link = this._formElement.querySelector("#card-url").value;
    this._name = this._formElement.querySelector("#card-name").value;

    this._cardData = {
      name: this._name,
      link: this._link,
    };

    return this._cardData;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(evt);
      this.close();
    });
  }
}
