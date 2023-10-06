const ThreeColSection = ({ heading, firstImage, secondImage, thirdImage }) => {
  return (
    <section className="my-40 px-14 flex flex-col w-full max-w-windowed">
      <h2 className="mb-12 leading-tight text-6xl font-bold text-primary-dark dark:text-primary-light">
        {heading || "First level two heading"}
      </h2>

      <article className="flex flex-row justify-between gap-12 w-full max-w-windowed">
        <img
          src={firstImage || "https://placehold.co/300x200"}
          className="w-1/3 rounded-3xl"
        />
        <img
          src={firstImage || "https://placehold.co/300x200"}
          className="w-1/3 rounded-3xl"
        />
        <img
          src={firstImage || "https://placehold.co/300x200"}
          className="w-1/3 rounded-3xl"
        />
      </article>
    </section>
  );
};

export default ThreeColSection;
