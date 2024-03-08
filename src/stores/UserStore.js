import { makeAutoObservable, runInAction } from "mobx";
import { defaultUser } from "@/data/defaultUser";

import { createUser, fetchUser, updateUser } from "@/utility/dbUtils";
import { saveToLocalStorage } from "@/utility/localStorageUtils";

class UserStore {
  // initialise user data
  userData = defaultUser;

  constructor() {
    makeAutoObservable(this);
  }

  fixUserData = () => {
    if (this.userData.username === null) this.userData.username = "";
    if (this.userData.bio === null) this.userData.bio = "";
    if (this.userData.tagline === null) this.userData.tagline = "";
    if (this.userData.category === null) this.userData.category = "";
    if (this.userData.links === null) this.userData.links = [];
    if (this.userData.tags === null) this.userData.tags = [];
  };

  setUserData = (userData) => {
    this.userData = userData;
    this.fixUserData();
  };

  setPalette = (palette) => {
    this.userData.palette = palette;
  };

  loadUserData = async (id) => {
    const userData = await fetchUser(id);

    if (userData) {
      this.fixUserData();
      this.setUserData(userData);
      return userData;
    } else {
      await this.createUserData(id, { ...defaultUser, clerk_user_id: id });
    }
  };

  createUserData = async (id, data) => {
    const userData = await createUser(id, data);

    this.fixUserData();

    if (userData) {
      await this.loadUserData(id);
    }
  };

  saveUserData = async () => {
    this.fixUserData();

    await updateUser(this.userData.uid, this.userData);
    saveToLocalStorage("userData", this.userData);
  };

  addLink = async (link) => {
    const newLink = { ...link, public: true };

    if (this.userData.links === null) this.userData.links = [];
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
