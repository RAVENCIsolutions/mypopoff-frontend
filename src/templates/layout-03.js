import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import { observer } from "mobx-react";
import onBoardingStore from "@/stores/OnBoardingStore";
import { onBoardingButtons } from "@/data/OnBoardingButtons";

const Layout03 = observer(({ previewWindow = false }) => {
  const sampleLinks = [
    { url: "", title: "Book a Free Consultation" },
    { url: "", title: "My Website" },
    { url: "", title: "My Portfolio" },
    { url: "", title: "Email Me" },
  ];

  const { palette } = onBoardingStore.onBoardingCurrent;

  const currentButtonStyleIndex = onBoardingButtons.findIndex(
    (button) => button.id === onBoardingStore.onBoardingCurrent.buttonStyle,
  );

  const currentButtonStyle = onBoardingButtons[currentButtonStyleIndex];

  return (
    <main
      className={`p-4 relative flex ${
        previewWindow
          ? "py-10 items-center min-h-full"
          : "items-center min-h-screen"
      } h-fit bg-stone-700 font-barlowCondensed text-white bg-[url(/images/templates/takeMeAway_background.jpg)] bg-cover bg-center`}
    >
      <div
        className={`absolute block left-0 top-0 ${
          previewWindow ? "w-full h-full" : "w-screen h-screen"
        } bg-stone-900/70`}
      ></div>
      <section className="flex flex-col items-center w-full max-w-xs text-center gap-6 z-10">
        <h1
          className={`font - bold uppercase ${
            previewWindow ? "text-3xl" : "text-3xl md:text-5xl"
          } text-center tracking-wider`}
          style={{ color: palette.mainText }}
        >
          username
        </h1>
        <p
          className={`mb-4 ${
            previewWindow ? "text-lg" : "text-lg md:text-2xl"
          }`}
          style={{ color: palette.subText }}
        >
          This is a small block of text about the user who owns this particular
          profile.
        </p>

        {/* Links */}
        <ul
          className={`flex flex-col ${
            currentButtonStyle.uniqueClasses
          } w-fit font-sans ${
            previewWindow
              ? "mb-2 gap-2 text-base"
              : "mb-6 gap-6 text-base md:text-xl"
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
        {/* Social Media */}
        <section className="flex flex-row gap-4">
          <BiLogoFacebookCircle
            size={30}
            className="cursor-pointer text-white/60 hover:text-white transition-all duration-300"
          />
          <BiLogoInstagramAlt
            size={30}
            className="cursor-pointer text-white/60 hover:text-white transition-all duration-300"
          />
          <BiLogoTwitch
            size={30}
            className="cursor-pointer text-white/60 hover:text-white transition-all duration-300"
          />
        </section>

        <footer
          className={`${
            previewWindow ? "relative" : "relative md:absolute"
          } bottom-3 text-base text-white/60`}
        >
          Copyright © {new Date().getFullYear()}. My Pop Off
        </footer>
      </section>
    </main>
  );
});

export default Layout03;
