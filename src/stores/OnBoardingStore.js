import { makeAutoObservable } from "mobx";
import { onBoardingLayouts } from "@/data/OnBoardingLayouts";
import { onBoardingButtons } from "@/data/OnBoardingButtons";

class OnBoardingStore {
  username = "";
  avatar = "";
  categoryIndex = 0;
  category = "";
  otherCategory = "";
  tags = [];
  bio = "";

  onBoardingTemplate = {
    pageLayout: "layout-01",
    buttonStyle: "button-01", // You need to define how to get this information
    layoutColours: {
      background: "bg-action",
      middleGround: "bg-white",
      mainText: "text-action",
      subText: "text-primary-dark",
    },
    buttonColours: {
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

  updateField = (field, value) => {
    this[field] = value;
  };

  updateLayout = (id) => {
    this.onBoardingCurrent.pageLayout = onBoardingLayouts[id].layoutID;
  };

  updateButtonStyle = (id) => {
    this.onBoardingCurrent.buttonStyle = onBoardingButtons[id].layoutID;
  };

  updateLayoutColour = (element, colour) => {
    this.onBoardingCurrent.layoutColours[element] = colour;
  };

  updateButtonColour = (element, colour) => {
    this.onBoardingCurrent.buttonColours[element] = colour;
  };

  resetLayoutColours = (id) => {
    this.onBoardingCurrent.layoutColours = {};
    this.onBoardingCurrent.layoutColours = {
      ...onBoardingLayouts[id].colours,
    };
  };

  resetButtonStyleColours = (id) => {
    this.onBoardingCurrent.buttonColours = {};
    this.onBoardingCurrent.buttonColours = {
      ...onBoardingButtons[id].colours,
    };
  };

  validateCurrentStep = (page) => {
    // define a feedback array to send back to the user
    const feedback = [];

    // identify all the tests required by page
    // [ test, warning message, condition whether to run the test or not ]
    const validationChecks = {
      "page-one": [],
      "page-two": [],
      "page-three": [],
      "page-four": [
        [
          this.username.length > 0,
          `You will need a username. Your awesome followers can't find you without it.`,
          null,
        ],
        [
          this.username.length > 2,
          `A username must be at least 3 characters long.`,
          this.username.length > 0,
        ],
        [
          /^[a-zA-Z0-9]/.test(this.username),
          `Your username can only start with a letter or a number.`,
          this.username.length > 2,
        ],
        [
          /^[a-zA-Z0-9_]+$/.test(this.username),
          `Your username can only start with a letter or a number.`,
          this.username.length > 2,
        ],
        [
          this.category.length > 0,
          `Oops! You forgot to select a category.`,
          null,
        ],
        [
          this.otherCategory.length > 0,
          "Please specify which category your Pop Off best fits into.",
          (this.category = "Other.."),
        ],
      ],
    };

    // make sure there is a valid array of checks for the current step/page
    const currentPageChecks = validationChecks[page] || [];

    // run through the current page checks and validate
    currentPageChecks.forEach(([condition, message]) => {
      if (!condition) {
        feedback.push(message);
      }
    });

    // return the feedback array for user feedback
    return feedback;
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
