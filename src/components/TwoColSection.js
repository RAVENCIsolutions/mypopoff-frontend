const TwoColSection = ({ heading, callToAction }) => {
  return (
    <section className="my-40 flex flex-row items-start w-full max-w-windowed">
      <h2 className="mb-3 w-1/3 leading-tight text-6xl font-bold text-primary-dark dark:text-primary-light">
        {heading || "Possible level two heading"}
      </h2>

      <article className="pt-2 w-2/3">
        <p className="text-3xl font-light text-secondary-light dark:text-secondary-dark">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci{" "}
        </p>
        <button className="mt-12 px-16 py-5 bg-action hover:bg-action/90 rounded-full text-white dark:text-primary-dark text-2xl font-medium duration-300 transition-all">
          {callToAction || "Call to action"}
        </button>
      </article>
    </section>
  );
};

export default TwoColSection;
