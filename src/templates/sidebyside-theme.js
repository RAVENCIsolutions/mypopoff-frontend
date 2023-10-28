import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const SideBySideTheme = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="pt-0 sm:pt-6 md:pt-16 pb-20 md:pb-16 px-0 sm:px-6 md:px-16 flex items-center justify-center w-full h-screen bg-neutral-200 font-barlowCondensed text-stone-800">
      {/* Image */}
      <article className="flex flex-col-reverse md:flex-row w-full h-full bg-white">
        {/* Links */}
        <section className="p-6 pb-10 lg:pb-10 md:p-10 block md:flex flex-col justify-center w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto">
          <h1 className="mb-2 font-bold text-4xl uppercase tracking-wide">
            Username
          </h1>
          <h2 className="mb-12 font-light text-xl uppercase">Free Traveler</h2>
          <p className="mb-12 text-xl max-w-xs">
            This is a small block of text about the user who owns this
            particular profile.
          </p>
          <ul className="flex flex-col gap-4 items-stretch justify-start w-fit text-left md:text-center tracking-wide">
            {sampleLinks.map((link, index) => (
              <Link
                key={index}
                className="cursor-pointer py-2 px-6 hover:bg-stone-800 border-2 border-stone-800 uppercase hover:text-stone-50 transition-all duration-300"
                href={link.url}
              >
                <li>{link.title}</li>
              </Link>
            ))}
          </ul>
        </section>

        <section className="w-full md:w-1/2 h-1/2 md:h-full">
          <img
            className="w-full h-full object-cover object-center object-center"
            src="/images/templates/sideBySide_main.jpg"
            alt="Influencer Username"
          />
        </section>
      </article>

      <footer className="px-4 md:px-16 absolute bottom-3 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-0 w-full text-base text-neutral-500">
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

export default SideBySideTheme;
