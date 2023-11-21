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

const Layout02 = observer(({ previewWindow = false }) => {
  const sampleLinks = [
    { url: "", title: "Book a Free Consultation" },
    { url: "", title: "My Website" },
    { url: "", title: "My Portfolio" },
    { url: "", title: "Email Me" },
  ];

  const { palette } = onBoardingStore.onBoardingCurrent;

  const currentButtonStyleIndex = onBoardingButtons.findIndex(
    (button) =>
      button.layoutID === onBoardingStore.onBoardingCurrent.buttonStyle
  );

  const currentButtonStyle = onBoardingButtons[currentButtonStyleIndex];

  return (
    <main
      className={`${
        previewWindow ? "block pb-2" : "block md:grid min-h-screen"
      } grid-cols-2 items-center justify-center font-proximaNova`}
      style={{
        backgroundColor: palette.background,
      }}
    >
      {/* Image */}
      <section className={previewWindow ? "h-[50%]" : "h-[50%] md:h-full"}>
        <img
          className="mb-3 w-full h-full bg-dashboard-primary-dark object-cover object-top object-center"
          src="https://images.pexels.com/photos/2410565/pexels-photo-2410565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Influencer Username"
        />
      </section>

      {/* Links */}
      <section
        className={`${
          previewWindow
            ? "py-4"
            : "py-6 md:pt-0 h-fit md:justify-center md:h-full max-w-lg"
        } mx-auto relative flex flex-col items-center gap-8 w-full overflow-y-auto`}
      >
        <article
          className={previewWindow ? "mx-auto w-[80%]" : "w-full md:w-72"}
        >
          <h1
            className="font-proximaNova font-black text-5xl text-center"
            style={{ color: palette.mainText }}
          >
            Username
          </h1>
          <p
            className="mx-auto mt-6 mb-8 text-base font-light text-center"
            style={{ color: palette.subText }}
          >
            This is a small block of text about the user who owns this
            particular profile.
          </p>
          <ul
            className={`mx-auto flex flex-col items-stretch font-bold text-center ${
              previewWindow ? "gap-2" : "gap-4 w-fit md:w-72"
            }`}
          >
            {sampleLinks.map((link, index) => {
              if (currentButtonStyle && currentButtonStyle.block) {
                return currentButtonStyle.block(
                  link.title,
                  onBoardingStore.onBoardingCurrent.palette,
                  index
                );
              }
            })}
          </ul>
        </article>

        {/* Social Media */}
        <section className="flex flex-row justify-center gap-4">
          <BiLogoFacebookCircle
            size={30}
            className={`opacity-80 hover:opacity-100`}
            style={{ color: palette.buttonMain }}
          />
          <BiLogoInstagramAlt
            size={30}
            className={`opacity-80 hover:opacity-100`}
            style={{ color: palette.buttonMain }}
          />
          <BiLogoTwitch
            size={30}
            className={`opacity-80 hover:opacity-100`}
            style={{ color: palette.buttonMain }}
          />
        </section>

        <footer
          className={`${
            !previewWindow && "md:absolute"
          } bottom-3 text-center text-sm`}
          style={{ color: palette.subText }}
        >
          Copyright © {new Date().getFullYear()}. My Pop Off
        </footer>
      </section>
    </main>
  );
});

export default Layout02;
