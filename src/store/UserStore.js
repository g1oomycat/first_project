import { makeAutoObservable } from "mobx";

class UserStore {
  _user = {};
  _loggedIn = false;
  constructor() {
    makeAutoObservable(this);
  }
  setUser(user) {
    this._user = user;
  }
  get user() {
    return this._user;
  }
  getFirstName() {
    return this.user ? this.user.first_name : "";
  }
  getPhoneNumber() {
    return this.user ? this.user.phone_number : "";
  }
  setLoggedIn(loggenIn) {
    this._loggedIn = loggenIn;
  }
  get loggedIn() {
    return this._loggedIn;
  }
}

export default UserStore;
