import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import { observer } from "mobx-react";
import { OnboardingButtons } from "@/data/OnboardingButtons";
import onBoardingStore from "@/stores/OnboardingStore";

const Layout04 = observer(({ previewWindow = false }) => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  const { palette } = onBoardingStore.onBoardingCurrent;

  const currentButtonStyleIndex = OnboardingButtons.findIndex(
    (button) => button.id === onBoardingStore.onBoardingCurrent.buttonStyle,
  );

  const currentButtonStyle = OnboardingButtons[currentButtonStyleIndex];

  return (
    <main
      className={`relative ${
        previewWindow ? "pt-12 pb-4 min-h-full" : "py-6 min-h-screen"
      } flex flex-col justify-between h-fit`}
      style={{ backgroundColor: palette.background, color: palette.mainText }}
    >
      <section className="mx-auto px-4 flex flex-col justify-center items-center text-center">
        <h1
          className={`mb-4 font-newSpirit font-bold ${
            previewWindow ? "text-3xl" : "text-3xl md:text-6xl"
          } text-center`}
        >
          username
        </h1>
        <p
          className={`${
            previewWindow ? "text-base" : "text-base md:text-xl"
          } max-w-xs font-calluna font-light text-center`}
          style={{ color: palette.subText }}
        >
          This is a small block of text about the user who owns this particular
          profile.
        </p>
      </section>
      <ul
        className={`mx-auto px-4 flex flex-col items-stretch ${
          currentButtonStyle.uniqueClasses
        } w-max max-w-full h-full font-calluna font-semibold ${
          previewWindow ? "gap-3" : "gap-8 md:text-3xl"
        }`}
      >
        {sampleLinks.map((link, index) => {
          if (currentButtonStyle && currentButtonStyle.component) {
            return currentButtonStyle.component(
              link.title,
              onBoardingStore.onBoardingCurrent.palette,
              index,
            );
          }
        })}
      </ul>

      <footer
        className={`mx-auto ${
          previewWindow
            ? "px-4 gap-1 text-sm"
            : "px-4 md:px-16 gap-1 md:gap-3 text-sm md:text-base"
        } bottom-3 flex flex-col items-center justify-between w-max text-neutral-500`}
      >
        {/* Social Media */}
        <section className="flex flex-row gap-4">
          <BiLogoFacebookCircle size={24} style={{ color: palette.subText }} />
          <BiLogoInstagramAlt size={24} style={{ color: palette.subText }} />
          <BiLogoTwitch size={24} style={{ color: palette.subText }} />
        </section>
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
});

export default Layout04;
