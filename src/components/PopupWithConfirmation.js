import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._container.querySelector('.form');
    this._handleSubmit = handleSubmit;
  }

  // Открывает попап, принимая обработчик, который должен быть вызван при нажатии "Да",
  // и объект с дополнительными данными, если их нужно передать обработчику.
  open(handleActionConfirmed, data) {
    this._handleActionConfirmed = handleActionConfirmed;
    this._data = data;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      this._handleSubmit(evt, this._handleActionConfirmed, this._data);
    });
  }
}
