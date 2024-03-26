import Link from "next/link";

const SplitHalfSection = ({ heading, body, callToAction }) => {
  return (
    <section className="my-8 md:my-20 px-6 md:px-12 flex flex-col md:flex-row items-start w-full max-w-windowed gap-2 md:gap-10">
      <h2 className="mb-3 w-full md:w-1/3 leading-tight font-bold text-primary-dark dark:text-primary-light">
        {heading || "Possible level two heading"}
      </h2>

      <article className="pt-2 w-full md:w-2/3">
        <p className="font-light text-secondary-light dark:text-secondary-dark">
          {body ||
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci"}
        </p>
        <Link href="/explore">
          <button className="mt-10 md:mt-20 px-8 md:px-10 lg:px-12 py-3 md:py-4T lg:py-6 bg-action hover:bg-primary-dark hover:dark:bg-primary-light rounded-full text-primary-light dark:text-primary-dark hover:text-action hover:dark:text-action text-lg md:text-xl lg:text-2xl font-medium duration-300 transition-all">
            {callToAction || "Call to action"}
          </button>
        </Link>
      </article>
    </section>
  );
};

export default SplitHalfSection;
