import Link from "next/link";

const LapisAzuliTheme = () => {
  const sampleLinks = [
    { url: "/", title: "Book a Free Consultation" },
    { url: "/", title: "My Website" },
    { url: "/", title: "My Portfolio" },
    { url: "/", title: "Email Me" },
  ];

  return (
    <main className="relative flex items-center justify-stretch w-full h-screen bg-blue-800 text-yellow-500">
      <section className="block md:flex flex-col justify-center w-full">
        <article className="px-4 md:px-16">
          <h1 className="mb-4 font-calluna font-bold text-2xl md:text-6xl">
            Username
          </h1>
          <p className="mb-8 md:mb-12 w-full max-w-sm text-lg md:text-2xl font-sans font-light text-white">
            This is a small block of text about the user who owns this
            particular profile.
          </p>
        </article>
        <ul className="mt-6 flex flex-col items-start gap-0 w-full h-full border-b-2 border-yellow-500 font-calluna font-bold text-xl md:text-4xl overflow-y-auto">
          {sampleLinks.map((link, index) => (
            <Link
              key={index}
              className="group cursor-pointer pl-4 md:pl-16 py-3 md:py-5 flex items-center w-full hover:bg-yellow-500 border-t-2 border-yellow-500 text-yellow-500 hover:text-blue-800 transition-all duration-300"
              href={link.url}
            >
              <img
                src=""
                alt=""
                className="mr-4 md:mr-6 w-8 md:w-12 h-10 md:h-14 border-[0.3rem] border-yellow-500"
              />
              <li className="relative">{link.title}</li>
            </Link>
          ))}
        </ul>
      </section>

      <footer className="fixed px-4 md:px-16 bottom-3 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-0 w-full font-calluna text-base text-white/40 text-center">
        Copyright © {new Date().getFullYear()}. My Pop Off
      </footer>
    </main>
  );
};

export default LapisAzuliTheme;
