const SplitHalfWithThreeHeadings = ({ mainHeading, blocks, image }) => {
  return (
    <section className="mt-32 mb-10 px-6 md:px-12 flex flex-col w-full max-w-windowed gap-2 md:gap-10">
      <h2 className="mb-3 w-full leading-tight font-bold text-primary-dark dark:text-primary-light text-center">
        {mainHeading || "Third level two heading"}
      </h2>

      <article className="pt-2 grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full">
        <img
          className="rounded-2xl object-cover aspect-square"
          src={image.source || "https://placehold.co/600x600"}
          alt={image.text}
        />
        <div className={`flex flex-col gap-10`}>
          {blocks &&
            blocks.map((block) => (
              <div className={`flex flex-col items-start gap-2`}>
                {block.icon}
                <h3>{block.title || "Sub-Heading"}</h3>
                <p className="font-light text-secondary-light dark:text-secondary-dark">
                  {block.content ||
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit"}
                </p>
              </div>
            ))}
        </div>
      </article>
    </section>
  );
};

export default SplitHalfWithThreeHeadings;
