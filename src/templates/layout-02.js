import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";

import Link from "next/link";

import { defaultUser } from "@/data/defaultUser";
import {
  getButtonStyleIndex,
  getContrastLuminance,
} from "@/utility/generalUtils";
import { ButtonsLookup } from "@/data/ButtonsLookup";

const Layout02 = ({ previewWindow = false, userData = defaultUser }) => {
  return (
    <main
      className={`${
        previewWindow ? "block pb-2" : "block md:grid min-h-screen"
      } grid-cols-2 items-center justify-center font-proximaNova`}
      style={{
        backgroundColor: userData.palette.background,
      }}
    >
      {/* Image */}
      <section className={previewWindow ? "h-[50vh]" : "h-[50vh] md:h-full"}>
        <img
          className="mb-3 w-full h-full bg-dashboard-primary-dark object-cover object-top object-center"
          src={userData.images || ""}
          alt={userData.username || ""}
        />
      </section>

      <section
        className={`${
          previewWindow ? "py-4" : "py-6 md:pt-0 h-[50vh] md:h-full max-w-lg"
        } mx-auto relative flex flex-col justify-between md:justify-center items-center gap-8 w-full overflow-y-auto`}
      >
        <article
          className={`my-10 ${previewWindow ? "mx-auto w-[80%]" : "w-full"}`}
        >
          <h1
            className="font-proximaNova font-black text-2xl text-center"
            style={{ color: userData.palette.mainText }}
          >
            @{userData.username && userData.username}
          </h1>
          <p
            className="mx-auto mt-6 mb-8 max-w-sm text-base font-light text-center"
            style={{ color: userData.palette.subText }}
          >
            {userData.bio && userData.bio}
          </p>

          {/* Links */}
          <div
            className={`flex flex-col w-fit text-base md:text-xl ${
              ButtonsLookup[getButtonStyleIndex(userData.button_style)]
                .uniqueClasses
            }`}
          >
            {userData.links &&
              userData.links.map((link, index) => {
                return (
                  link.public &&
                  ButtonsLookup[
                    getButtonStyleIndex(userData.button_style)
                  ].component(link.url, link.title, userData.palette, index)
                );
              })}
          </div>
        </article>

        {/* Social Media */}
        {/*<section className="flex flex-row justify-center gap-4">*/}
        {/*  <BiLogoFacebookCircle*/}
        {/*    size={30}*/}
        {/*    className={`opacity-80 hover:opacity-100`}*/}
        {/*    style={{ color: userData.palette.buttonMain }}*/}
        {/*  />*/}
        {/*  <BiLogoInstagramAlt*/}
        {/*    size={30}*/}
        {/*    className={`opacity-80 hover:opacity-100`}*/}
        {/*    style={{ color: userData.palette.buttonMain }}*/}
        {/*  />*/}
        {/*  <BiLogoTwitch*/}
        {/*    size={30}*/}
        {/*    className={`opacity-80 hover:opacity-100`}*/}
        {/*    style={{ color: userData.palette.buttonMain }}*/}
        {/*  />*/}
        {/*</section>*/}

        <footer
          className={`${
            !previewWindow && "md:absolute"
          } bottom-3 justify-self-end text-center text-xs`}
          style={{
            color: getContrastLuminance(userData.palette.background),
            opacity: 0.5,
          }}
        >
          Copyright © {new Date().getFullYear()}.{" "}
          <Link href={"/"}>My Pop Off</Link>
        </footer>
      </section>
    </main>
  );
};

export default Layout02;
