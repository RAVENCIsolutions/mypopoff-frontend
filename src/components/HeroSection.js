import Link from "next/link";

const HeroSection = ({ title, subtitle, callToAction }) => {
  return (
    <section className="pt-10 pb-24 md:pt-16 md:pb-28 px-4 flex flex-col items-center justify-center text-center">
      <article className="mx-auto max-w-lg lg:max-w-squeezed">
        <h1 className="font-bold text-primary-dark dark:text-primary-light font-sans">
          {title}
        </h1>
        <h3 className="mt-3 text-secondary-light dark:text-secondary-dark font-medium">
          {subtitle}
        </h3>
      </article>
      <Link
        className="mt-20 px-8 md:px-10 lg:px-12 py-3 md:py-4 lg:py-6 bg-action hover:bg-primary-dark hover:dark:bg-primary-light rounded-full text-primary-light dark:text-primary-dark hover:text-action hover:dark:text-action text-lg md:text-xl lg:text-2xl font-medium duration-300 transition-all"
        href={"/explore"}
      >
        {callToAction}
      </Link>
    </section>
  );
};

export default HeroSection;
