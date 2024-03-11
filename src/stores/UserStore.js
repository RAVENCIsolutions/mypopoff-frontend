import { defaultUser } from "@/data/defaultUser";
import { makeAutoObservable } from "mobx";

import { verifyUserData } from "@/utility/generalUtils";
import {
  createUser,
  fetchUser,
  updateUser,
  uploadAvatar,
  uploadImage,
} from "@/utility/dbUtils";
import { getFromStorage, saveToStorage } from "@/utility/localStorageUtils";

class UserStore {
  // initialise user data
  userData = {};

  avatar = null;
  image = null;

  constructor() {
    makeAutoObservable(this);
  }

  initialiseUser = async (id) => {
    let getData = getFromStorage("userData");

    if (!getData || !verifyUserData(getData)) {
      await this.loadUserData(id);
    } else {
      const getLastFetch =
        getFromStorage("lastFetch", sessionStorage, false) ||
        new Date().getTime();
      if (new Date().getTime() - getLastFetch > 1000 * 60 * 5) {
        await this.loadUserData(id);
      } else {
        this.userData = getData;
      }
    }
  };

  updateUserData = (updateValue) => {
    this.userData = { ...this.userData, ...updateValue };
    saveToStorage("userData", this.userData);
  };

  updateExtras = (updateValue) => {
    this.userData.extras = { ...this.userData.extras, ...updateValue };
    saveToStorage("userData", this.userData);
  };

  setUserData = (userData) => {
    this.userData = userData;
    saveToStorage("userData", this.userData);
  };

  addToPalette = (palette) => {
    this.userData.palette = { ...this.userData.palette, ...palette };
    saveToStorage("userData", this.userData);
  };

  setPalette = (palette) => {
    this.userData.palette = palette;
    saveToStorage("userData", this.userData);
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  setImage = (image) => {
    this.image = image;
  };

  pushAvatar = async (id) => {
    if (!this.avatar) return false;

    const file = this.avatar;

    await uploadAvatar(id, file).then((data) => {
      this.userData.avatar_url =
        process.env.NEXT_PUBLIC_SUPABASE_AVATARS_LINK + data.path;

      saveToStorage("userData", this.userData);
      this.avatar = null;
    });
  };

  pushImage = async (id) => {
    if (!this.image) return false;

    const file = this.image;

    await uploadImage(id, file).then((data) => {
      this.userData.images =
        process.env.NEXT_PUBLIC_SUPABASE_IMAGES_LINK + data.path;

      saveToStorage("userData", this.userData);
      this.image = null;
    });
  };

  createNewUser = async (id, data) => {
    await createUser(id, data).then((data) => {
      this.userData = data;
      saveToStorage("userData", data);
      return true;
    });
  };

  loadUserData = async (id) => {
    await fetchUser(id).then(async (data) => {
      if (data) {
        this.userData = data;
        saveToStorage("userData", data);
      } else {
        await this.createNewUser(id, { ...defaultUser }).then(() => true);
      }
    });

    saveToStorage("lastFetch", new Date().getTime(), sessionStorage, false);
  };

  saveUserData = async () => {
    if (this.avatar) await this.pushAvatar(this.userData.uid);
    if (this.image) await this.pushImage(this.userData.uid);

    await updateUser(this.userData.uid, this.userData).then(() => {
      saveToStorage("userData", this.userData);
      saveToStorage("lastFetch", new Date().getTime(), sessionStorage, false);
    });
  };

  addLink = async (link) => {
    const newLink = { ...link, public: true };

    if (this.userData.links === null) this.userData.links = [];
    this.userData.links.push(newLink);

    await this.saveUserData();
  };

  removeLink = async (id) => {
    const idInList = this.userData.links.findIndex((link) => link.id === id);

    this.userData.links.splice(idInList, 1);

    await this.saveUserData();
  };

  updateLink = async (linkId, linkData) => {
    const idInList = this.userData.links.findIndex(
      (link) => link.id === linkId
    );

    this.userData.links[idInList] = { ...linkData };

    await this.saveUserData();
  };

  resetLinkList = async (linkList) => {
    this.userData.links = linkList;

    await this.saveUserData();
  };
}

const userStore = new UserStore();
export default userStore;
