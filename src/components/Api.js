
export class Api {
  
}
// Проверка ответа от сервера
const handleResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}
//получаение карточки
export const getCards = async () => {
  const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
    headers: {
      authorization: 'bd60ed56-65da-400e-aff3-13c3befce97c'
    }
  })
  return handleResponse(res)
  }


//получение пользователя
export const getUser = async () => {
  const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
    headers: {
      authorization: 'bd60ed56-65da-400e-aff3-13c3befce97c'
    }
  })
  return handleResponse(res)
}
//Отправка созданной карточки на сервер
export const addCard = async (name,link) => {
  const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-59/cards', {
    method: 'POST',
    headers: {
      authorization: 'bd60ed56-65da-400e-aff3-13c3befce97c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  return handleResponse(res)
}
//Отправка информации профиля 
export const editProfile = async (name,about) => {
  const res = await fetch('https://mesto.nomoreparties.co/v1/cohort-59/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'bd60ed56-65da-400e-aff3-13c3befce97c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  return handleResponse(res)
}

export const deleteCard = (_id) => {
  const res = fetch(`https://mesto.nomoreparties.co/v1/cohort-59/cards/${_id}`, {
    method: "DELETE",
    headers: {
      authorization: 'bd60ed56-65da-400e-aff3-13c3befce97c',
      'Content-Type': 'application/json'
    }
  })
  console.log(res)
  return handleResponse(res);
}

