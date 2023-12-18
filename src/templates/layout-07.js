import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const Layout07 = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="relative flex items-center justify-stretch w-full h-screen bg-neutral-800 text-orange-600">
      <section className="p-4 md:p-16 block md:flex flex-col justify-center">
        <h1 className="mb-2 font-newSpirit font-bold text-2xl md:text-6xl">
          @username
        </h1>
        <p className="mb-8 text-base md:text-xl max-w-xs font-sans font-light text-white">
          This is a small block of text about the user who owns this particular
          profile.
        </p>
        <ul className="py-4 flex flex-col items-start gap-8 h-full font-newSpirit font-bold text-base md:text-3xl overflow-y-auto">
          {sampleLinks.map((link, index) => (
            <Link
              key={index}
              className="group cursor-pointer transition-all duration-300"
              href={link.url}
            >
              <li className="relative">
                {link.title}
                <div className="absolute -bottom-1 md:-bottom-1.5 block h-0.5 md:h-1 w-0 group-hover:w-full bg-orange-600 transition-all duration-500"></div>
              </li>
            </Link>
          ))}
        </ul>
      </section>

      <footer className="fixed px-4 md:px-16 bottom-3 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-0 w-full text-base text-neutral-500 text-center">
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

export default Layout07;
