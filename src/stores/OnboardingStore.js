import { makeAutoObservable } from "mobx";

import { defaultUser } from "@/data/defaultUser";
import { uploadImage, uploadAvatar, updateUser } from "@/utility/dbUtils";

class OnboardingStore {
  userData = defaultUser;
  avatar = null;
  image = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUserData = (userData) => {
    this.userData = userData;
  };

  updateUserData = (newData) => {
    this.userData = { ...this.userData, ...newData };
  };

  setAvatar = (avatar) => {
    this.avatar = avatar;
  };

  setImage = (image) => {
    this.image = image;
  };

  uploadAvatar = async (id) => {
    if (!this.avatar) return false;

    const file = this.avatar;

    await uploadAvatar(id, file).then((data) => {
      this.userData.avatar_url =
        process.env.NEXT_PUBLIC_SUPABASE_AVATARS_LINK + data.path;

      this.avatar = null;
    });
  };

  uploadImage = async (id) => {
    if (!this.image) return false;

    const file = this.image;

    await uploadImage(id, file).then((data) => {
      this.userData.images =
        process.env.NEXT_PUBLIC_SUPABASE_IMAGES_LINK + data.path;

      this.image = null;
    });
  };

  saveProgress = async () => {
    if (this.avatar) await this.uploadAvatar(this.userData.uid);
    if (this.image) await this.uploadImage(this.userData.uid);
    await updateUser(this.userData.uid, this.userData);

    const sessionData = sessionStorage.getItem("userData");

    if (sessionData) {
      sessionStorage.setItem("userData", JSON.stringify(this.userData));

      localStorage.removeItem("userData");
    } else {
      localStorage.setItem("userData", JSON.stringify(this.userData));
    }
  };
}

const onBoardingStore = new OnboardingStore();
export default onBoardingStore;
