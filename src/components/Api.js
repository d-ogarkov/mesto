export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _sendRequest(path, options = {}) {
    // Объект с опциями запроса нужно объединить с _headers для дальнейшей передачи в fetch
    // По умолчанию он пустой (для обычного GET-запроса без body)
    let optionsWithHeaders = { headers: this._headers };
    optionsWithHeaders = Object.assign(options, optionsWithHeaders);

    return fetch(`${this._baseUrl}/${path}`, optionsWithHeaders)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }

  getUserInfo() {
    return this._sendRequest('users/me');
  }

  setUserInfo({ name, about }) {
    return this._sendRequest('users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  getInitialCards() {
    return this._sendRequest('cards');
  }

  addCard({ name, link }) {
    return this._sendRequest('cards', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
  }

  deleteCard(id) {
    return this._sendRequest(`cards/${id}`, {
      method: 'DELETE'
    });
  }

  setLike(id) {
    return this._sendRequest(`cards/${id}/likes`, {
      method: 'PUT'
    });
  }

  unsetLike(id) {
    return this._sendRequest(`cards/${id}/likes`, {
      method: 'DELETE'
    });
  }

  setAvatar({ avatar }) {
    return this._sendRequest('users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }

}

