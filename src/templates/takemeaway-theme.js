import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const TakeMyAwayTheme = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="p-4 flex items-center justify-center h-screen min-h-fit bg-stone-700 font-barlowCondensed text-white bg-[url(/images/templates/takeMeAway_background.jpg)] bg-cover bg-center">
      <div className="fixed block left-0 top-0 w-screen h-screen bg-stone-900/70"></div>
      <section className="mb-10 flex flex-col items-center w-full max-w-xs text-center gap-6 z-50">
        <h1 className="font-bold uppercase text-3xl md:text-5xl text-center tracking-wider">
          username
        </h1>
        <p className="mb-4 text-lg md:text-2xl">
          This is a small block of text about the user who owns this particular
          profile.
        </p>

        {/* Links */}
        <ul className="mb-6 flex flex-col gap-6 items-center w-full font-sans text-base md:text-xl">
          {sampleLinks.map((link, index) => (
            <Link
              key={index}
              className="cursor-pointer pt-2 pb-2.5 px-3 md:px-5 w-full hover:bg-white border-2 border-white rounded-full font-light text-white hover:text-emerald-800 hover:font-medium transition-all duration-300"
              href={link.url}
            >
              <li>{link.title}</li>
            </Link>
          ))}
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
      </section>

      <footer className="absolute bottom-3 text-base text-white/60">
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
};

export default TakeMyAwayTheme;
