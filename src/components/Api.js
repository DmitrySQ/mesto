export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      }),
    })
    .then(this._handleResponse);
  }

  addNewAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
    .then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  createCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        link: link,
      }),
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse);
  }

  setLike(cardID, method) {
    return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
      method: method,
      headers: this._headers,
    })
    .then(this._handleResponse);
  }
}