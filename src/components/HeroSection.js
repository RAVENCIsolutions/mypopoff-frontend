const HeroSection = ({ title, subtitle, callToAction }) => {
  return (
    <section className="py-36 px-4 flex flex-col items-center justify-center bg-primary-light dark:bg-primary-dark text-center">
      <article className="mx-auto max-w-lg lg:max-w-squeezed">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-dark dark:text-primary-light font-sans">
          {title}
        </h1>
        <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-bold text-secondary-light dark:text-secondary-dark font-medium">
          {subtitle}
        </h2>
        <button className="mt-20 px-8 mx:px-10 lg:px-12 py-3 md:py-4T lg:py-6 bg-action hover:bg-action/90 rounded-full text-white dark:text-primary-dark text-lg md:text-xl lg:text-2xl font-medium duration-300 transition-all">
          {callToAction}
        </button>
      </article>
    </section>
  );
};

export default HeroSection;
