import { makeAutoObservable } from "mobx";
import { defaultUser } from "@/data/defaultUser";
import { LayoutsLookup } from "@/data/LayoutsLookup";
import { ButtonsLookup } from "@/data/ButtonsLookup";

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

  updateLayout = (id) => {
    this.userData.page_layout = LayoutsLookup[id].id;
  };

  resetColours = () => {
    const layoutIndex = LayoutsLookup.findIndex(
      (layout) => layout.id === this.userData.page_layout,
    );

    const buttonIndex = ButtonsLookup.findIndex(
      (button) => button.id === this.userData.button_style,
    );

    this.userData.palette = {};
    this.userData.palette = {
      ...LayoutsLookup[layoutIndex].colours,
      ...ButtonsLookup[buttonIndex].colours,
    };
  };
}

const onBoardingStore = new OnboardingStore();
export default onBoardingStore;
