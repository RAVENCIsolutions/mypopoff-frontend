const SplitThirdSection = ({
  heading,
  subHeading,
  callToAction,
  image,
  lefTtoRight,
}) => {
  return (
    <section className="mt-80 mb-40 px-14 flex flex-row items-center w-full max-w-windowed gap-14">
      <article className="w-1/3">
        <h2 className="mb-3 leading-tight text-6xl font-bold text-primary-dark dark:text-primary-light">
          {heading || "Possible level two heading"}
        </h2>
        <h3 className="text-4xl font-medium text-secondary-light dark:text-secondary-dark">
          {subHeading || "Lorem ipsum dolor sit"}
        </h3>
        <button className="mt-20 px-16 py-5 bg-action hover:bg-action/90 rounded-full text-white dark:text-primary-dark text-2xl font-medium duration-300 transition-all">
          {callToAction || "Call to action"}
        </button>
      </article>

      <article className="flex flex-grow justify-end">
        <img className="" src={image || "https://placehold.co/650x600"} />
      </article>
    </section>
  );
};

export default SplitThirdSection;
