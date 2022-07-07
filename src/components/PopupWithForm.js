import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._container.querySelector('.form');
    this._handleSubmit = handleSubmit;
    // Сюда соберем все поля ввода в форме
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector('.popup__submit-btn');
    // Сохраним дефолтный текст на кнопке, чтобы восстановить после изменения на "Сохранение..."
    this._buttonSubmitDefaultText = this._buttonSubmit.value;
  }

  // Устанавливает значения полей перед открытием попапа
  setInputValues(data){
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // Собирает данные всех полей формы
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.id] = input.value;
    });
    return this._inputValues;
  }

  open() {
    this.restoreDefaultText();
    super.open();
  }

  close() {
    super.close();
    this._form.reset();
  }

  // Восстанавливает текст кнопки сабмита, нужно вызвать извне, если что-то пошло не так и попап не закрыт
  restoreDefaultText() {
    this._buttonSubmit.value = this._buttonSubmitDefaultText;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._buttonSubmit.value = 'Сохранение...';
      this._handleSubmit(this._getInputValues());
    });
  }
}
