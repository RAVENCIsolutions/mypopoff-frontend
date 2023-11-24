import ButtonStyle01 from "@/onboardingComponents/button-style-01";
import ButtonStyle02 from "@/onboardingComponents/button-style-02";
import ButtonStyle03 from "@/onboardingComponents/button-style-03";
import ButtonStyle05 from "@/onboardingComponents/button-style-05";
import ButtonStyle04 from "@/onboardingComponents/button-style-04";
import ButtonStyle06 from "@/onboardingComponents/button-style-06";
import ButtonStyle10 from "@/onboardingComponents/button-style-10";
import ButtonStyle09 from "@/onboardingComponents/button-style-09";
import ButtonStyle08 from "@/onboardingComponents/button-style-08";
import ButtonStyle07 from "@/onboardingComponents/button-style-07";

export const onBoardingButtons = [
  {
    layoutID: "button-01",
    layoutTitle: "Solid Rounded",
    layoutImage: "/images/onboarding/button-01.png",
    listStyles: "items-stretch justify-center",
    colours: {
      buttonMain: "#c68a4e",
      buttonText: "#f7f5f3",
    },
    block: (label, palette, index) => (
      <ButtonStyle01 key={`button-${index}`} label={label} palette={palette} />
    ),
  },
  {
    layoutID: "button-02",
    layoutTitle: "Solid Squared",
    layoutImage: "/images/onboarding/button-02.png",
    listStyles: "items-stretch justify-center",
    colours: {
      buttonOutline: "border-transparent",
      buttonMain: "#c68a4e",
      buttonText: "#f7f5f3",
    },
    block: (label, palette, index) => (
      <ButtonStyle02 key={`button-${index}`} label={label} palette={palette} />
    ),
  },
  {
    layoutID: "button-03",
    layoutTitle: "Solid Slanted",
    layoutImage: "/images/onboarding/button-03.png",
    listStyles: "items-stretch justify-center",
    colours: {
      buttonMain: "#c68a4e",
      buttonText: "#f7f5f3",
    },
    block: (label, palette, index) => (
      <ButtonStyle03 key={`button-${index}`} label={label} palette={palette} />
    ),
  },
  {
    layoutID: "button-04",
    layoutTitle: "Neobrutalist",
    layoutImage: "/images/onboarding/button-04.png",
    listStyles: "-ml-[3px] justify-center items-stretch",
    colours: {
      buttonMain: "#c68a4e",
      buttonText: "#000",
    },
    block: (label, palette, index) => (
      <ButtonStyle04 key={`button-${index}`} label={label} palette={palette} />
    ),
  },
  {
    layoutID: "button-05",
    layoutTitle: "The Grid",
    layoutImage: "/images/onboarding/button-05.png",
    listStyles: "justify-center",
    colours: {
      buttonOutline: "#c68a4e",
      buttonMain: "#c68a4e",
      buttonText: "#c68a4e",
      buttonHoverText: "#f7f5f3",
    },
    block: (label, palette, index) => (
      <ButtonStyle05
        key={index + "-" + label}
        label={label}
        palette={palette}
      />
    ),
  },
  {
    layoutID: "button-06",
    layoutTitle: "Outline Rounded",
    layoutImage: "/images/onboarding/button-06.png",
    listStyles: "justify-center",
    colours: {
      buttonOutline: "#c68a4e",
      buttonHover: "#c68a4e",
      buttonText: "#c68a4e",
      buttonHoverText: "#f7f5f3",
    },
    block: (label, palette, index) => (
      <ButtonStyle06
        key={index + "-" + label}
        label={label}
        palette={palette}
      />
    ),
  },
  {
    layoutID: "button-07",
    layoutTitle: "Outline Squared",
    layoutImage: "/images/onboarding/button-07.png",
    listStyles: "justify-center",
    colours: {
      buttonOutline: "#c68a4e",
      buttonHover: "#c68a4e",
      buttonText: "#c68a4e",
      buttonHoverText: "#f7f5f3",
    },
    block: (label, palette, index) => (
      <ButtonStyle07 key={`button-${index}`} label={label} palette={palette} />
    ),
  },
  {
    layoutID: "button-08",
    layoutTitle: "Outline Slanted",
    layoutImage: "/images/onboarding/button-08.png",
    listStyles: "justify-center",
    colours: {
      buttonOutline: "#c68a4e",
      buttonHover: "#c68a4e",
      buttonText: "#c68a4e",
      buttonHoverText: "#f7f5f3",
    },
    block: (label, palette, index) => (
      <ButtonStyle08 key={`button-${index}`} label={label} palette={palette} />
    ),
  },
  {
    layoutID: "button-09",
    layoutTitle: "Elegant List",
    layoutImage: "/images/onboarding/button-09.png",
    listStyles: "items-start",
    colours: {
      buttonOutline: "#c68a4e",
      buttonHover: "#c68a4e",
      buttonText: "#c68a4e",
    },
    block: (label, palette, index) => (
      <ButtonStyle09 key={`button-${index}`} label={label} palette={palette} />
    ),
  },
  {
    layoutID: "button-10",
    layoutTitle: "Underlined",
    layoutImage: "/images/onboarding/button-10.png",
    listStyles: "justify-start",
    colours: {
      buttonMain: "#c68a4e",
      buttonText: "#c68a4e",
    },
    block: (label, palette, index) => (
      <ButtonStyle10 key={`button-${index}`} label={label} palette={palette} />
    ),
  },
];
