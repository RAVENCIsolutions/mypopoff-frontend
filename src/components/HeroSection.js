const HeroSection = ({ title, subtitle, callToAction }) => {
  return (
    <section className="py-24 md:py-36 px-4 flex flex-col items-center justify-center text-center">
      <article className="mx-auto max-w-lg lg:max-w-squeezed">
        <h1 className="font-bold text-primary-dark dark:text-primary-light font-sans">
          {title}
        </h1>
        <h3 className="mt-3 font-bold text-secondary-light dark:text-secondary-dark font-medium">
          {subtitle}
        </h3>
        <button className="mt-20 px-8 md:px-10 lg:px-12 py-3 md:py-4T lg:py-6 bg-action hover:bg-action/90 rounded-full text-white dark:text-primary-dark text-lg md:text-xl lg:text-2xl font-medium duration-300 transition-all">
          {callToAction}
        </button>
      </article>
    </section>
  );
};

export default HeroSection;
