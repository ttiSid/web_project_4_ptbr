const initialCards = [
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

initialCards.forEach(function (item, index) {
  const card = document.querySelector("#card").content;
  const cardContainer = document.querySelector(".pictures-container");
  const cardElement = card.querySelector(".picture-card").cloneNode(true);

  const cardLink = item.link;
  const cardName = item.name;

  cardElement.querySelector(".picture-card__image").src = cardLink;
  cardElement.querySelector(".picture-card__description").textContent =
    cardName;

  return cardContainer.append(cardElement);
});
