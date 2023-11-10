import { makeAutoObservable } from "mobx";

class OnBoardingStore {
  // lsOnBoardingItem = "current-onBoarding";

  onBoardingTemplate = {
    pageLayout: "layout-01",
    buttonStyle: "button-01", // You need to define how to get this information
    colours: {
      background: "bg-action",
      middleGround: "bg-white",
      mainText: "text-action",
      subText: "text-primary-dark",
      buttonOutline: "border-transparent",
      buttonMain: "bg-action",
      buttonHover: "bg-action/80",
      buttonText: "text-primary-light",
      buttonHoverText: "text-primary-light",
    },
    images: {
      background: "",
    },
  };

  colourLabels = {
    background: "Background",
    middleGround: "Card",
    mainText: "Special Text",
    subText: "Body Text",
    buttonOutline: "Outline",
    buttonMain: "Button Background",
    buttonHover: "Button Background on Hover",
    buttonText: "Text",
    buttonHoverText: "Text on Hover",
  };

  onBoardingCurrent = { ...this.onBoardingTemplate };

  constructor() {
    makeAutoObservable(this);
  }

  updateOnBoardingCurrent = (data, page) => {
    this.onBoardingCurrent = { ...this.onBoardingCurrent, ...data };

    // localStorage.setItem(
    //   this.lsOnBoardingItem,
    //   JSON.stringify({
    //     onBoardingCurrent: this.onBoardingCurrent,
    //     currentPage: page,
    //   })
    // );
  };

  validateOnBoardingCurrent = () => {
    //  Check if onBoardingCurrent is not empty
    if (Object.keys(this.onBoardingCurrent).length === 0) {
      return false;
    }

    // Validate pageLayout and buttonStyle
    const layoutPattern = /^layout-(0[1-9]|10)$/;
    const buttonPattern = /^button-(0[1-9]|10)$/;

    if (
      !layoutPattern.test(this.onBoardingCurrent.pageLayout) ||
      !buttonPattern.test(this.onBoardingCurrent.buttonStyle)
    ) {
      return false;
    }

    // Validate Colours
    const hexPattern = /^[0-9A-Fa-f]{6}$/; // Simple hex pattern
    const colourFields = [
      "background",
      "middleGround",
      "mainText",
      "subText",
      "buttonOutline",
      "buttonMain",
      "buttonHover",
      "buttonText",
      "buttonHoverText",
    ];
    const colourPrefixes = {
      background: "bg-",
      middleGround: "bg-",
      mainText: "text-",
      subText: "text-",
      buttonOutline: "border-",
      buttonMain: "bg-",
      buttonHover: "hover:bg-",
      buttonText: "text-",
      buttonHoverText: "hover:text-",
    };

    for (let field of colourFields) {
      const value = this.onBoardingCurrent.colours[field];
      if (!value) {
        this.onBoardingCurrent.colours[field] =
          this.onBoardingTemplate.colours[field];
        continue;
      }

      const [prefix, hexValue] = value.split("-");
      if (prefix !== colourPrefixes[field] || !hexPattern.test(hexValue)) {
        this.onBoardingCurrent.colours[field] =
          this.onBoardingTemplate.colours[field];
      }
    }

    return true;
  };

  finishOnBoarding = () => {};
}

const onBoardingStore = new OnBoardingStore();
export default onBoardingStore;