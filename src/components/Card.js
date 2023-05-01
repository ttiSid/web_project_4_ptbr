export default class Card {
  constructor({ data, handleCardClick, like, deleteCard }, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._likes = data.likes;
    this._like = like;
    this._cardOwner = data.owner._id;
    this._owner = "a0995efe3421bff16c16b482";
    this.handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
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
    this._element.querySelector(".picture-card__likes").textContent =
      this._likes.length;

    return this._element;
  }

  /*  Adiciona os EventListeners nos cards  */

  _setEventListeners() {
    const deleteBtn = this._element.querySelector(".picture-card__delete-btn");
    deleteBtn.addEventListener("click", () => {
      deleteBtn.parentElement.remove();
      this._deleteCard();
    });

    if (this._cardOwner === this._owner) {
      deleteBtn.classList.remove("picture-card__delete-btn_hidden");
    }

    const likeBtn = this._element.querySelector(".picture-card__like-btn");

    likeBtn.addEventListener("click", (evt) => {
      this._like(evt);
    });

    const cardImage = this._element.querySelector(".picture-card__image");
    cardImage.addEventListener("click", () => {
      this.handleCardClick(this._title, this._link);
    });
  }

  _hasOwnerLiked = () => {
    const isLiked = this._likes.find((isLiked) => {
      return this._owner === isLiked._id;
    });

    if (isLiked === undefined) {
      const likeBtn = this._element.querySelector(".picture-card__like-btn");
      likeBtn.classList.remove("picture-card__like-btn_active");
    }

    return isLiked;
  };
}
