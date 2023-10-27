import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
  BiLogoTwitch,
} from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

const VelvetographyTheme = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="block md:grid grid-cols-2 items-center justify-center h-screen min-h-fit font-proximaNova">
      {/* Image */}
      <section className="h-[50%] md:h-full">
        <img
          className="mb-3 w-full h-full bg-dashboard-primary-dark object-cover object-top object-center"
          src="https://images.pexels.com/photos/2410565/pexels-photo-2410565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Influencer Username"
        />
      </section>

      {/* Links */}
      <section className="p-10 pb-24 relative flex flex-col items-center justify-center w-full border-2 h-fit md:h-full overflow-y-auto">
        <article className="mb-8">
          <h1 className="font-proximaNova font-black text-5xl text-center text-stone-900">
            Username
          </h1>
          <p className="mx-auto mt-6 mb-8 w-72 text-base font-light text-center">
            This is a small block of text about the user who owns this
            particular profile.
          </p>
          <ul className="mx-auto flex flex-col gap-4 items-center font-bold text-center w-72">
            {sampleLinks.map((link, index) => (
              <Link
                key={index}
                className="cursor-pointer py-2.5 px-3 w-full max-w-xs bg-[#cd6971] rounded-full text-stone-100 hover:shadow-md hover:shadow-black/30 hover:scale-105 transition-all duration-300"
                href={link.url}
              >
                <li>{link.title}</li>
              </Link>
            ))}
          </ul>
        </article>

        {/* Social Media */}
        <section className="flex flex-row justify-center gap-4">
          <BiLogoFacebookCircle size={30} className="text-[#cd6971]/50" />
          <BiLogoInstagramAlt size={30} className="text-[#cd6971]/50" />
          <BiLogoTwitch size={30} className="text-[#cd6971]/50" />
        </section>

        <footer className="absolute bottom-3 text-center text-sm text-stone-500">
          Copyright © {new Date().getFullYear()}. My Pop Off
        </footer>
      </section>
    </main>
  );
};

export default VelvetographyTheme;
