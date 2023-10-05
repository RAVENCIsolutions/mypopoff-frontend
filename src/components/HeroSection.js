const HeroSection = ({ title, subtitle, callToAction }) => {
  return (
    <section className="py-36 flex flex-col items-center justify-center bg-primary-light dark:bg-primary-dark text-center">
      <article className="max-w-squeezed">
        <h1 className="text-7xl font-bold text-primary-dark dark:text-primary-light font-sans">
          {title}
        </h1>
        <h2 className="mt-3 text-3xl font-bold text-secondary-light dark:text-secondary-dark font-medium">
          {subtitle}
        </h2>
        <button className="mt-20 px-12 py-6 bg-action hover:bg-action/90 rounded-full text-white dark:text-primary-dark text-2xl font-medium duration-300 transition-all">
          {callToAction}
        </button>
      </article>
    </section>
  );
};

export default HeroSection;
