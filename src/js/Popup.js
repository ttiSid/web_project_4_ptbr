export default class Popup {
  constructor(popupSelector) {
    this.popupSelector = document.querySelector(popupSelector);
  }

  open() {}

  close() {
    this._popupElement.remove();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
    window.removeEventListener("keydown", this._handleEscClose);
  }

  _handleClickOutClose(evt) {
    if (evt.target.classList.contains("overlay")) {
      this.close();
    }
    window.removeEventListener("click", this._handleClickOutClose);
  }

  setEventListeners() {
    const closeBtn = document.querySelector(".modal__close-btn");
    closeBtn.addEventListener("click", (evt) => {
      this.close();
    });
    window.addEventListener("keydown", (evt) => this._handleEscClose(evt));

    this._popupElement.addEventListener("click", (evt) =>
      this._handleClickOutClose(evt)
    );
  }
}
