const ThreeColSection = ({ heading, firstImage, secondImage, thirdImage }) => {
  return (
    <section className="relative my-14 md:my-40 px-5 md:px-14 flex flex-col w-full max-w-windowed overflow-hidden">
      <h2 className="mb-12 leading-tight font-bold text-primary-dark dark:text-primary-light">
        {heading || "First level two heading"}
      </h2>

      <article className="flex flex-col sm:flex-row gap-4 md:gap-0 justify-between w-full max-w-windowed">
        <img
          src={firstImage || "https://placehold.co/300x200"}
          className="w-full sm:w-thirty rounded-3xl"
        />
        <img
          src={firstImage || "https://placehold.co/300x200"}
          className="w-full sm:w-thirty rounded-3xl"
        />
        <img
          src={firstImage || "https://placehold.co/300x200"}
          className="w-full sm:w-thirty rounded-3xl"
        />
      </article>
    </section>
  );
};

export default ThreeColSection;
