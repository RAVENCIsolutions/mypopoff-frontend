import { makeAutoObservable } from "mobx";
import { defaultUser } from "@/data/defaultUser";
import { OnboardingLayouts } from "@/data/OnboardingLayouts";
import { OnboardingButtons } from "@/data/OnboardingButtons";

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
    this.userData.page_layout = OnboardingLayouts[id].id;
  };

  resetColours = () => {
    const layoutIndex = OnboardingLayouts.findIndex(
      (layout) => layout.id === this.userData.page_layout,
    );

    const buttonIndex = OnboardingButtons.findIndex(
      (button) => button.id === this.userData.button_style,
    );

    this.userData.palette = {};
    this.userData.palette = {
      ...OnboardingLayouts[layoutIndex].colours,
      ...OnboardingButtons[buttonIndex].colours,
    };
  };
}

const onBoardingStore = new OnboardingStore();
export default onBoardingStore;
