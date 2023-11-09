import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const Layout04 = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="relative py-6 flex flex-col items-between min-h-fit h-screen bg-neutral-800 text-orange-600">
      <section className="mx-auto px-4 flex flex-col justify-center items-center text-center">
        <h1 className="mb-4 font-newSpirit font-bold text-3xl md:text-6xl text-center">
          username
        </h1>
        <p className="text-base md:text-xl max-w-xs font-calluna font-light text-white text-center">
          This is a small block of text about the user who owns this particular
          profile.
        </p>
      </section>

      <ul className="mx-auto px-4 flex flex-col items-stretch justify-center gap-8 w-max max-w-full h-full font-calluna font-semibold md:text-3xl">
        {sampleLinks.map((link, index) => (
          <Link
            key={index}
            className="group cursor-pointer py-2 px-10 bg-orange-600 text-primary-dark text-center transition-all duration-300"
            href={link.url}
          >
            <li className="textlg md:text-2xl font-normal">{link.title}</li>
          </Link>
        ))}
      </ul>

      <footer className="mx-auto px-4 md:px-16 bottom-3 flex flex-col items-center justify-between gap-1 md:gap-3 w-max text-sm md:text-base text-neutral-500">
        {/* Social Media */}
        <section className="flex flex-row gap-4">
          <BiLogoFacebookCircle size={24} className="text-neutral-500" />
          <BiLogoInstagramAlt size={24} className="text-neutral-500" />
          <BiLogoTwitch size={24} className="text-neutral-500" />
        </section>
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
};

export default Layout04;
