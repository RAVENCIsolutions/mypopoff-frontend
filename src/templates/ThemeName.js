import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const ThemeName = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="px-2 sm:px-10 py-10 flex flex-col items-center justify-center h-screen min-h-fit bg-stone-100">
      {/* Image */}
      <section className="mb-8">
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg shadow-black/40 bg-dashboard-primary-dark object-cover object-top"
          src="https://pixabay.com/get/gf4571bd937925f3f2842f350bd24e271e8d7754da107790077aa0a33e95574e7c74036aeae9b3bcda9301912b9f7ce9c_640.jpg"
          alt="Influencer Username"
        />
        <p className="font-medium text-lg text-center tracking-wide text-rose-600">
          username
        </p>
      </section>

      {/* Links */}
      <section className="mb-10 w-full">
        <ul className="mx-auto flex flex-col gap-4 items-center text-center w-full font-sans tracking-wide">
          {sampleLinks.map((link, index) => (
            <Link
              key={index}
              className="cursor-pointer py-2 px-5 w-full max-w-xs bg-rose-600 rounded-full text-stone-100 hover:shadow-md hover:shadow-black/30 hover:scale-105 transition-all duration-300"
              href={link.url}
            >
              <li>{link.title}</li>
            </Link>
          ))}
        </ul>
      </section>

      {/* Social Media */}
      <section className="flex flex-row gap-4">
        <BiLogoFacebookCircle size={30} className="text-stone-900" />
        <BiLogoInstagramAlt size={30} className="text-stone-900" />
        <BiLogoTwitch size={30} className="text-stone-900" />
      </section>

      <footer className="absolute bottom-3 text-sm text-stone-500">
        Copyright © {new Date().getFullYear()}.{" "}
        <Link href={"/"}>My Pop Off</Link>
      </footer>
    </main>
  );
};

export default ThemeName;
