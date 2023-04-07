export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = popupSelector;
  }

  open() {}

  close(element) {
    element.remove();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      window.removeEventListener("keydown", this._handleEscClose);
    }
  }

  _handleClickOutClose(evt) {
    this._popupElement.remove();
    this._popupElement.removeEventListener("click", this._handleClickOutClose);
  }

  setEventListener() {
    const closeBtn = document.querySelector(".modal__close-btn");
    closeBtn.addEventListener("click", this.close());
    window.addEventListener("keydown", (evt) => this._handleEscClose());
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("overlay")) {
        this._handleClickOutClose();
      }
    });
  }
}
