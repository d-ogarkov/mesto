import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  // В конструктор передается обработчик сабмита, который в свою очередь получит
  // дополнительный обработчик (в каком-то связанном классе) и объект с дополнительными данными.
  // И то, и другое нужно задать перед открытием попапа через setActionConfirmed
  constructor(selector, handleSubmit) {
    super(selector);
    this._form = this._container.querySelector('.form');
    this._handleSubmit = handleSubmit;
  }

  // Принимает обработчик, который будет передан обработчику сабмита,
  // и объект с дополнительными данными, если он нужен
  setActionConfirmed(handleActionConfirmed, data) {
    this._handleActionConfirmed = handleActionConfirmed;
    this._data = data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._handleActionConfirmed, this._data);
    });
  }
}
