// Класс FormValidator: настраивает валидацию полей формы
export class FormValidator {

  // Конструктор принимает объект настроек с селекторами и классами формы и элемент формы
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  // Показывает ошибку в заданной форме на заданном поле
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  // Скрывает ошибку в заданной форме на заданном поле
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }

  // Возвращает true, если в списке полей есть хотя бы одно, не прошедшее валидацию
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  // Блокирует или разблокирует кнопку отправки формы в зависимости от того, прошел ли валидацию список полей
  _adjustButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  // Показывает или скрывает ошибку на заданном поле в зависимости от того, прошло ли оно валидацию
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Добавляет к элементам формы обработчики событий
  _setEventListeners() {
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._adjustButtonState(inputList, buttonElement);
      });
    });
  }

  // Включает валидацию формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
