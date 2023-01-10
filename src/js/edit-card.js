/*Adicionar card*/

/*Selecionar o botão de adicionar*/

/*Quando for clicado, abre o modal*/

/*-----------------------------------------*/

/* Botão de deletar */

/*Selecionar o botão de deletar*/
const deleteBtn = document.querySelectorAll(".picture-card__delete-btn");
/*Quando for clicado, remove o card*/
deleteBtn.forEach(function (deleteItem) {
  deleteItem.addEventListener("click", function () {
    deleteItem.parentElement.remove();
  });
});
/*-----------------------------------------*/

/*Popup do card*/

/*-----------------------------------------*/

/*Like button*/
const likeBtn = document.querySelectorAll(".picture-card__like-btn");
likeBtn.forEach(function (item) {
  function clickLikeBtn() {
    item.classList.toggle("picture-card__like-btn_active");
  }
  item.addEventListener("click", clickLikeBtn);
});
/*-----------------------------------------*/
