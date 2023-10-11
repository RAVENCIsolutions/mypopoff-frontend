const SplitThirdSection = ({
  heading,
  subHeading,
  callToAction,
  image,
  lefTtoRight,
}) => {
  return (
    <section className="mt-28 mb-14 md:my-40 px-6 md:px-14 flex flex-col-reverse md:flex-row items-center w-full max-w-windowed gap-14">
      <article className="w-full md:w-1/3">
        <h2 className="mb-3 leading-tight font-bold text-primary-dark dark:text-primary-light">
          {heading || "Possible level two heading"}
        </h2>
        <h4 className="font-medium text-secondary-light dark:text-secondary-dark">
          {subHeading || "Lorem ipsum dolor sit"}
        </h4>
        <button className="mt-10 md:mt-20 px-8 md:px-10 lg:px-12 py-3 md:py-4T lg:py-6 bg-action hover:bg-action/90 rounded-full text-white dark:text-primary-dark text-lg md:text-xl lg:text-2xl font-medium duration-300 transition-all">
          {callToAction || "Call to action"}
        </button>
      </article>

      <article className="flex flex-grow justify-center md:justify-end">
        <img className="" src={image || "https://placehold.co/650x600"} />
      </article>
    </section>
  );
};

export default SplitThirdSection;
