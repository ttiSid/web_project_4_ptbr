export default class FormValidator {
  constructor(configObj, formSelect) {
    this._formSelector = configObj.formSelector; /* ".form" */
    this._inputSelector = configObj.inputSelector; /* ".modal__input-field" */
    this._submitButtonSelector =
      configObj.submitButtonSelector; /* ".modal__submit-btn "*/
    this._inactiveButtonClass =
      configObj.inactiveButtonClass; /* ".modal__submit-btn_inactive"  */
    this._inputErrorClass =
      configObj.inputErrorClass; /* ".modal__input-error_active" */

    this.formSelect = formSelect;
  }

  /*  Coleta o modelo do formulário de acordo com o parâmetro */

  _getFormTemplate() {
    const formTemplate = document.querySelector(this.formSelect).content;

    this._formElement = formTemplate
      .querySelector(this.formSelect.replace("#", "."))
      .cloneNode(true);

    return this._formElement;
  }

  /*  Adiciona os ouvintes aos elementos do formulário  */

  _setEventListeners = () => {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(this._formElement, inputElement);
        this._toggleButtonState(inputList, this._submitButtonSelector);
      });
    });

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );

    this._toggleButtonState(inputList, this._submitButtonSelector);

    this._formElement.addEventListener("submit", this.enableValidation);

    this._closeButton = this._formElement.querySelector(".modal__close-btn");
    this._closeButton.addEventListener("click", this._handleCloseForm);

    window.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this._removeFormWithEscape(evt);
      }
    });

    this._formElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("overlay")) {
        this._removeFormWithClickOut();
      }
    });
  };

  /*  Apresenta ou esconde os elementos de erro caso o input for inválido */

  _checkInputValidity = (_formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(
        _formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(inputElement);
    }
  };

  /*  Valida se os campos possuem um input inválido */

  _hasInvalidInput = (inputList, inputElement) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  /*  Altera o estado do botão de submit dependendo do retorno da validação */

  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  enableValidation = (evt) => {
    evt.preventDefault();
    if (this.formSelect == "#modal-card") {
    } else {
      console.log("perfil alterado");
    }
  };

  /*  Apresenta o elemento de erro dos inputs retornado pela validação  */

  _showInputError = (_formElement, inputElement, errorMessage) => {
    this._errorElement = _formElement.querySelector(
      `.${inputElement.id}-error`
    );
    this._errorElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  };

  /*  Esconde o elemento de erro dos inputs retornado pela validação  */

  _hideInputError = (inputElement) => {
    if (this._errorElement) {
      this._errorElement.classList.remove(this._inputErrorClass);
      this._errorElement.textContent = "";
    }
  };

  /*  Abre o modal do formulário e chama o ouvinte de eventos*/

  _handleOpenForm() {
    this._formElement = this._getFormTemplate();

    this._setEventListeners();
    this._formElement.classList.add("overlay");

    return this._formElement;
  }

  /*  Fecha o modal do formulário através do botão  */

  _handleCloseForm = () => {
    this._closeButton.parentElement.parentElement.parentElement.remove();
  };

  /*  Fecha o modal do formulário através da tecla ESC */

  _removeFormWithEscape(evt) {
    if (evt.key === "Escape") {
      this._handleCloseForm();
      window.removeEventListener("keydown", this._removeFormWithEscape);
    }
  }

  /*  Fecha o modal do formulário através do clique fora da janela  */

  _removeFormWithClickOut(evt) {
    this._formElement.remove();
    this._formElement.removeEventListener("click", this._formPopupWithClickOut);
  }
}
