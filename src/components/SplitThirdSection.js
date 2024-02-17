import Link from "next/link";

const SplitThirdSection = ({
  heading,
  subHeading,
  callToAction,
  image,
  lefTtoRight,
}) => {
  return (
    <section className="mt-36 mb-14 md:my-40 px-6 md:px-14 flex flex-col md:flex-row items-center w-full max-w-windowed gap-4 md:gap-10">
      <article className="w-full md:w-1/3 flex flex-col items-center md:items-start">
        <h2 className="mb-3 leading-tight font-bold text-primary-dark dark:text-primary-light text-center md:text-left">
          {heading || "First level two heading"}
        </h2>
        <h4 className="font-medium text-secondary-light dark:text-secondary-dark text-center md:text-left">
          {subHeading || "Level three subheading"}
        </h4>

        <Link
          className="hidden md:block mt-20 px-8 lg:px-12 py-2 lg:py-3 bg-action hover:bg-action/90 self-start rounded-full text-white dark:text-primary-dark text-xl lg:text-2xl font-medium duration-300 transition-all"
          href={"/auth/register"}
        >
          {callToAction || "Start Creating!"}
        </Link>
      </article>

      <article className="flex flex-grow justify-center md:justify-end w-full sm:w-9/12">
        <img className="" src={image || "https://placehold.co/650x600"} />
      </article>

      <Link
        className="block md:hidden mt-4 px-8 lg:px-12 py-3 bg-action hover:bg-action/90 self-center rounded-full text-white dark:text-primary-dark text-lg font-medium duration-300 transition-all"
        href={"/auth/register"}
      >
        {callToAction || "Start Creating!"}
      </Link>
    </section>
  );
};

export default SplitThirdSection;
