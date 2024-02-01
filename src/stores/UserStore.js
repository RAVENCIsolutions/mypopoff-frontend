import { makeAutoObservable, toJS } from "mobx";
import { defaultUser } from "@/data/defaultUser";

import { createUser, fetchUser, updateUser } from "@/utility/dbUtils";
import { saveToLocalStorage } from "@/utility/localStorageUtils";

class UserStore {
  // initialise user data
  userData = defaultUser;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (id) => {
    this.userData.clerk_user_id = id;
  };

  setUserData = (userData) => {
    this.userData = userData;
    saveToLocalStorage("userData", userData);
  };

  loadUserData = async (id) => {
    const userData = await fetchUser(id);

    if (userData) {
      this.setUserData(userData);
      return userData;
    } else {
      await this.createUserData(id, this.userData);
    }
  };

  createUserData = async (id, data) => {
    const userData = await createUser(id, data);

    if (userData) {
      this.setUserData(userData);
      return userData;
    }
  };

  addLink = async (link) => {
    const newLink = { ...link, public: true };

    this.userData.links.push(newLink);

    await updateUser(this.userData.clerk_user_id, this.userData);
    saveToLocalStorage("userData", this.userData);
  };

  removeLink = async (id) => {
    const idInList = this.userData.links.findIndex((link) => link.id === id);

    this.userData.links.splice(idInList, 1);

    await updateUser(this.userData.clerk_user_id, this.userData);
    saveToLocalStorage("userData", this.userData);
  };

  updateLink = async (linkId, linkData) => {
    this.userData.links = this.userData.links.map((link) => {
      if (link.id === linkId) {
        return { ...link, ...linkData };
      }
      return link;
    });

    await updateUser(this.userData.clerk_user_id, this.userData);
    saveToLocalStorage("userData", this.userData);
  };

  resetLinkList = async (linkList) => {
    this.userData.links = linkList;

    await updateUser(this.userData.clerk_user_id, this.userData);
    saveToLocalStorage("userData", this.userData);
  };
}

const userStore = new UserStore();
export default userStore;
