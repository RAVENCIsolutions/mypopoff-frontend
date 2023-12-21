import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import styled from "@emotion/styled";
import { observer } from "mobx-react";

import onBoardingStore from "@/stores/OnBoardingStore";
import { onBoardingButtons } from "@/data/OnBoardingButtons";
import { getContrastLuminance } from "@/utility/utilities";

const ResponsiveMain = styled.main``;

const Layout01 = observer(({ previewWindow = false }) => {
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
      className={`${
        previewWindow ? "px-2 py-4" : "px-2 sm:px-10 py-2"
      } flex flex-col items-center justify-between`}
      style={{
        minHeight: previewWindow ? "100%" : "100vh",
        backgroundColor: palette.background,
      }}
    >
      {/* Image */}
      <article
        className={`flex-grow flex flex-col items-center justify-center w-full max-w-lg`}
      >
        <section
          className={`${
            previewWindow ? "mb-4" : "mb-8"
          } flex flex-col items-center max-w-[80%]`}
        >
          <img
            className="mb-3 w-32 h-32 rounded-full shadow-lg shadow-black/40 bg-dashboard-primary-dark object-cover object-center"
            src="https://img.freepik.com/free-photo/portrait-woman-with-blue-eyes_188544-7646.jpg"
            alt="Influencer Username"
          />
          <p
            className={`font-bold text-xl text-center tracking-wide uppercase`}
            style={{ color: palette.mainText }}
          >
            username
          </p>
          <p className="text-base text-center">
            A small quick bio about me and what I do.
          </p>
        </section>

        {/* Links */}
        <section className={`${previewWindow ? "mb-4" : "mb-10"} w-full`}>
          <ul
            className={`mx-auto flex flex-col ${
              previewWindow ? "gap-2" : "gap-4"
            } ${
              currentButtonStyle.uniqueClasses
            } text-center max-w-max font-sans tracking-wide`}
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
        </section>

        {/* Social Media */}
        <section className="flex flex-row gap-4">
          <BiLogoFacebookCircle size={30} style={{ color: palette.subText }} />
          <BiLogoInstagramAlt size={30} style={{ color: palette.subText }} />
          <BiLogoTwitch size={30} style={{ color: palette.subText }} />
        </section>
      </article>

      <footer
        className={`relative text-sm opacity-50`}
        style={{ color: getContrastLuminance(palette.background) }}
      >
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
});

export default Layout01;
