const cards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    isLiked: false,
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    isLiked: false,
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
];

class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._isLiked = data.isLiked;
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
      this._handleOpenPopup();
    });
  }

  _like() {
    this._isLiked = !this._isLiked;
  }

  /*  Recolhe e clona o template do popup */

  _getPopupTemplate() {
    const popup = document.querySelector("#popup").content;
    const popupElement = popup
      .querySelector(".popup-container")
      .cloneNode(true);

    return popupElement;
  }

  /*  Atribui os valores para as marcações do popup */

  _handleOpenPopup() {
    this._popupElement = this._getPopupTemplate();

    this._popupElement.querySelector(".popup__image").src = this._link;
    this._popupElement.querySelector(
      ".popup__image"
    ).alt = `${this._title} image`;
    this._popupElement.querySelector(".popup__title").textContent = this._title;

    this._popupElement
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => {
        this._handleClosePopup();
      });

    window.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this._removePopupWithEscape(evt);
      }
    });

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("overlay")) {
        this._removePopupWithClickOut();
      }
    });

    this._popupElement.classList.add("overlay");

    const cardContainer = document.querySelector(".pictures-container");

    return cardContainer.append(this._popupElement);
  }

  /*  Fecha o popup do card pelo botao  */

  _handleClosePopup() {
    this._popupElement.remove();
  }

  /*  Fecha o popup com a tecla ESC */

  _removePopupWithEscape(evt) {
    if (evt.key === "Escape") {
      this._handleClosePopup();
      window.removeEventListener("keydown", this._removePopupWithEscape);
    }
  }

  /*  Fecha o popup com o clique fora do popup  */

  _removePopupWithClickOut(evt) {
    this._popupElement.remove();
    this._popupElement.removeEventListener(
      "click",
      this._removePopupWithClickOut
    );
  }
}

const renderCards = () => {
  cards.forEach((cardItem) => {
    const newCard = new Card(cardItem, ".card");
    const cardContainer = document.querySelector(".pictures-container");
    const cardElement = newCard.createCard();
    cardContainer.append(cardElement);
  });
};
renderCards();
