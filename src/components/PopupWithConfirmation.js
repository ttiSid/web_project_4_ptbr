import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
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
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleFormSubmit(evt);
    });
  }
}
