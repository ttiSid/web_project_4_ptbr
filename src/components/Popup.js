export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = document.querySelector(popupSelector);
  }

  _getFormTemplate() {
    const formTemplate = document.querySelector(this.popupSelector).content;

    this._formElement = formTemplate
      .querySelector(this.popupSelector.replace("#", "."))
      .cloneNode(true);

    return this._formElement;
  }

  open() {
    this._formElement = this._getFormTemplate();
    this.setEventListeners();
    this._formElement.classList.add("overlay");

    return this._formElement;
  }

  close = () => {
    this._formElement.remove();
    document.removeEventListener("click", this.handleClickOutClose);
    window.removeEventListener("keydown", this.handleEscClose);
    const closeBtn = this._formElement.querySelector(".modal__close-btn");
    closeBtn.removeEventListener("click", this.close);
  };

  handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  handleClickOutClose = (evt) => {
    if (evt.target.classList.contains("overlay")) {
      this.close();
    }
  };

  setEventListeners() {
    window.addEventListener("keydown", this.handleEscClose);
    document.addEventListener("click", this.handleClickOutClose);
    const closeBtn = this._formElement.querySelector(".modal__close-btn");
    closeBtn.addEventListener("click", this.close);
  }
}
