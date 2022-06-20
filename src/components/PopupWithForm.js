import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._container.querySelector('.form');
    this._handleSubmit = handleSubmit;
    // Сюда соберем все поля ввода в форме
    this._inputList = this._container.querySelectorAll('.popup__input');
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.id] = input.value;
    });
    return this._inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._handleSubmit(evt, this._getInputValues());
    });
  }
}