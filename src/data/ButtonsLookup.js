import ButtonStyle01 from "@/onboardingComponents/button-style-01";
import ButtonStyle02 from "@/onboardingComponents/button-style-02";
import ButtonStyle03 from "@/onboardingComponents/button-style-03";
import ButtonStyle04 from "@/onboardingComponents/button-style-04";
import ButtonStyle05 from "@/onboardingComponents/button-style-05";
import ButtonStyle06 from "@/onboardingComponents/button-style-06";
import ButtonStyle07 from "@/onboardingComponents/button-style-07";
import ButtonStyle08 from "@/onboardingComponents/button-style-08";
import ButtonStyle09 from "@/onboardingComponents/button-style-09";
import ButtonStyle10 from "@/onboardingComponents/button-style-10";

export const ButtonsLookup = [
  {
    id: "button-01",
    title: "Solid Rounded",
    selector: "/images/onboarding/button-01.png",
    uniqueClasses: "items-stretch justify-center",
    colours: {
      buttonMain: ["#c68a4e", "Button Background"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle01
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-02",
    title: "Solid Squared",
    selector: "/images/onboarding/button-02.png",
    uniqueClasses: "items-stretch justify-center gap-3",
    colours: {
      buttonOutline: "border-transparent",
      buttonMain: ["#c68a4e", "Button Background"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle02
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-03",
    title: "Solid Slanted",
    selector: "/images/onboarding/button-03.png",
    uniqueClasses: "justify-start items-stretch gap-3",
    colours: {
      buttonMain: ["#c68a4e", "Button Background"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle03
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-04",
    title: "Neobrutalist",
    selector: "/images/onboarding/button-04.png",
    uniqueClasses: "-ml-[3px] justify-center items-stretch gap-3",
    colours: {
      buttonMain: ["#c68a4e", "Button Background"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle04
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-05",
    title: "The Grid",
    selector: "/images/onboarding/button-05.png",
    uniqueClasses: "justify-center",
    colours: {
      buttonMain: ["#c68a4e", "Main Button"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle05
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-06",
    title: "Outline Rounded",
    selector: "/images/onboarding/button-06.png",
    uniqueClasses: "justify-center gap-3",
    colours: {
      buttonMain: ["#c68a4e", "Main Button"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle06
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-07",
    title: "Outline Squared",
    selector: "/images/onboarding/button-07.png",
    uniqueClasses: "justify-center gap-3",
    colours: {
      buttonMain: ["#c68a4e", "Main Button"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle07
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-08",
    title: "Outline Slanted",
    selector: "/images/onboarding/button-08.png",
    uniqueClasses: "justify-center gap-3",
    colours: {
      buttonMain: ["#c68a4e", "Main Button"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle08
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-09",
    title: "Elegant List",
    selector: "/images/onboarding/button-09.png",
    uniqueClasses: "items-start gap-4",
    colours: {
      buttonMain: ["#c68a4e", "Accent"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle09
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
  {
    id: "button-10",
    title: "Underlined",
    selector: "/images/onboarding/button-10.png",
    uniqueClasses: "justify-start gap-4",
    colours: {
      buttonMain: ["#c68a4e", "Accent"],
      buttonText: ["#f7f5f3", "Button Text"],
    },
    component: (link, label, palette, index) => (
      <ButtonStyle10
        key={`button-${index}`}
        link={link}
        title={label}
        palette={palette}
      />
    ),
  },
];
