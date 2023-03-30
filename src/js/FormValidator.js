(function setEventListeners() {
  const addCard = document.querySelector(".profile__add-card-button");
  addCard.addEventListener("click", () => {
    renderCardForm();
  });

  const editProfile = document.querySelector(".profile__edit-button");
  editProfile.addEventListener("click", () => {
    renderProfileForm();
  });
})();

class FormValidator {
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

  _getFormTemplate() {
    const formTemplate = document.querySelector(this.formSelect).content;

    this._formElement = formTemplate
      .querySelector(this.formSelect.replace("#", "."))
      .cloneNode(true);

    return this._formElement;
  }

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

    this._closeButton = this._formElement.querySelector(".modal__close-btn");
    this._closeButton.addEventListener("click", () => {
      this._closeButton.parentElement.parentElement.parentElement.remove();
    });
  };

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

  _hasInvalidInput = (inputList, inputElement) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  enableValidation = () => {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
  };

  _showInputError = (_formElement, inputElement, errorMessage) => {
    this._errorElement = _formElement.querySelector(
      `.${inputElement.id}-error`
    );
    this._errorElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
  };

  _hideInputError = (inputElement) => {
    if (this._errorElement) {
      this._errorElement.classList.remove(this._inputErrorClass);
      this._errorElement.textContent = "";
    }
  };

  _handleOpenForm() {
    this._formElement = this._getFormTemplate();

    this._setEventListeners();
    this._formElement.classList.add("overlay");

    return this._formElement;
  }
}

const renderCardForm = () => {
  const newForm = new FormValidator(
    {
      formSelector: ".form",
      inputSelector: ".modal__input-field",
      submitButtonSelector: ".modal__submit-btn",
      inactiveButtonClass: "modal__submit-btn_inactive",
      inputErrorClass: "modal__input-error_active",
    },
    "#modal-card"
  );
  const mainContainer = document.querySelector(".pictures-container");

  const newFormElement = newForm._handleOpenForm();
  mainContainer.append(newFormElement);
};

const renderProfileForm = () => {
  const newForm = new FormValidator(
    {
      formSelector: ".form",
      inputSelector: ".modal__input-field",
      submitButtonSelector: ".modal__submit-btn",
      inactiveButtonClass: "modal__submit-btn_inactive",
      inputErrorClass: "modal__input-error_active",
    },
    "#modal-profile"
  );
  const mainContainer = document.querySelector(".pictures-container");

  const newFormElement = newForm._handleOpenForm();
  mainContainer.append(newFormElement);
};
