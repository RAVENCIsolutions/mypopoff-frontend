import { makeAutoObservable } from "mobx";
import { defaultUser } from "@/data/defaultUser";

class OnboardingStore {
  userData = defaultUser;

  constructor() {
    makeAutoObservable(this);
  }

  updateValue(key, value) {
    this.userData[key] = value;
  }

  updateColour(key, colour) {
    this.userData.palette[key] = colour;
  }
}

const onBoardingStore = new OnboardingStore();
export default onBoardingStore;
