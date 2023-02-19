export class UserInfo {
  constructor({nameElement, infoElement, avatarElement}) {
    this._name = nameElement;
    this._info = infoElement;
    this._avatar = avatarElement;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.description = this._info.textContent;

    return userInfo;  
  }

  setUserInfo(name, description, avatar, id) {
    this._name.textContent = name;
    this._info.textContent = description;
    this._avatar.src = avatar;
    this._id = id;
  }

  getID() {
    return this._id
  }
}