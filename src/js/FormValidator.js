import Card from "./Card.js";

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

  enableValidation() {
    this._formElement = document.querySelector(this._formSelector);

    const inputList = Array.from(
      this._formElement.querySelectorAll(".modal__input-field")
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
  }
  /*----------------------  Validações  ----------------------*/

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

  /* Coleta os dados do perfil */

  _getProfileInfo = () => {
    this._profileName = document.querySelector(".profile__name");
    this._profileAbout = document.querySelector(".profile__about-me");

    this._getProfileName = this._formElement.querySelector("#profile-name");
    this._getProfileAbout = this._formElement.querySelector(
      "#profile-description"
    );
  };

  /* Edita os dados do perfil */

  _editProfile = () => {
    this._getProfileInfo();
    this._profileName.textContent = this._getProfileName.value;
    this._profileAbout.textContent = this._getProfileAbout.value;
  };
}
