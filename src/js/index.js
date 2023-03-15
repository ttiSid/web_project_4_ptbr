const cards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
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
    this._isLiked = false;
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

  _setEventListeners() {
    /**/
    const deleteBtn = this._element.querySelector(".picture-card__delete-btn");
    deleteBtn.addEventListener("click", () => {
      cards.shift(this._element);
      deleteBtn.parentElement.remove();
    });

    const likeBtn = this._element.querySelector(".picture-card__like-btn");
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("picture-card__like-btn_active");
      this._like();
    });
  }

  _like() {
    this._isLiked = !this._isLiked;
  }

  _handleOpenPopup() {}

  _handleClosePopup() {}
}

const renderElements = () => {
  cards.forEach((cardItem) => {
    const newCard = new Card(cardItem, ".card");
    const cardContainer = document.querySelector(".pictures-container");
    const cardElement = newCard.createCard();
    cardContainer.append(cardElement);
  });
};

renderElements();
