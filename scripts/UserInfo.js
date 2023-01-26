export class UserInfo {
  constructor({nameSelector, infoSelector}) {
    this._name = nameSelector;
    this._info = infoSelector;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._name.textContent;
    userInfo.decription = this._info.textContent;
    console.log(`${this._info.textContent} ==> ${userInfo.decription}` );
    return userInfo;
  }

  setUserInfo(name, decription) {
    console.log(name)
    console.log(decription)
    this._name.textContent = name;
    console.log(decription);
    this._info.textContent = decription;
    console.log(this._info.textContent);
  }
}