import { defaultUser } from "@/data/defaultUser";
import { makeAutoObservable } from "mobx";

import { verifyUserData } from "@/utility/generalUtils";
import {
  uploadImage,
  uploadAvatar,
  updateUser,
  createUser,
  fetchUser,
} from "@/utility/dbUtils";
import { getFromStorage, saveToStorage } from "@/utility/localStorageUtils";

class OnboardingStore {
  // initialise user data
  userData = {};
  readyForOnboarding = false;

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
  };

  setUserData = (userData) => {
    this.userData = userData;
  };

  addToPalette = (palette) => {
    this.userData.palette = { ...this.userData.palette, ...palette };
  };

  setPalette = (palette) => {
    this.userData.palette = palette;
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

      this.avatar = null;
    });
  };

  pushImage = async (id) => {
    if (!this.image) return false;

    const file = this.image;

    await uploadImage(id, file).then((data) => {
      this.userData.images =
        process.env.NEXT_PUBLIC_SUPABASE_IMAGES_LINK + data.path;

      this.image = null;
    });
  };

  createNewUser = async (id, data) => {
    await createUser(id, data).then((data) => {
      this.userData = data;
      return true;
    });
  };

  loadUserData = async (id) => {
    await fetchUser(id).then(async (data) => {
      if (data) {
        this.userData = data;
      } else {
        await this.createNewUser(id, { ...defaultUser }).then(() => true);
      }
    });

    saveToStorage("lastFetch", new Date().getTime(), sessionStorage);
  };

  saveProgress = async () => {
    if (this.avatar) await this.pushAvatar(this.userData.uid);
    if (this.image) await this.pushImage(this.userData.uid);

    await updateUser(this.userData.uid, this.userData).then(() => {
      saveToStorage("userData", this.userData);
      saveToStorage("lastFetch", new Date().getTime(), sessionStorage);
    });
  };
}

const onBoardingStore = new OnboardingStore();
export default onBoardingStore;
