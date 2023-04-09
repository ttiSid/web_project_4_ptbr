export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._isLiked = data.isLiked;
    this.handleCardClick = handleCardClick;
  }

  /*  Recolhe e clona o template do card*/

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".picture-card")
      .cloneNode(true);

    return cardElement;
  }

  /*  Atribui os valores para atributos do elemento e cria o card */

  createCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".picture-card__image").src = this._link;
    this._element.querySelector(
      ".picture-card__image"
    ).alt = `${this._title} image`;
    this._element.querySelector(".picture-card__description").textContent =
      this._title;

    return this._element;
  }

  /*  Adiciona os EventListeners nos cards  */

  _setEventListeners() {
    const deleteBtn = this._element.querySelector(".picture-card__delete-btn");
    deleteBtn.addEventListener("click", (evt) => {
      deleteBtn.parentElement.remove();
    });

    const likeBtn = this._element.querySelector(".picture-card__like-btn");
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("picture-card__like-btn_active");
      return this._like();
    });

    const cardImage = this._element.querySelector(".picture-card__image");
    cardImage.addEventListener("click", () => {
      this.handleCardClick(this._title, this._link);
    });
  }

  _like() {
    this._isLiked = !this._isLiked;
  }
}
