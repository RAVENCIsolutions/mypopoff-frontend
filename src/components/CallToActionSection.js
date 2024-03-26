import Link from "next/link";

const CallToActionSection = ({ heading, subheading, callToAction }) => {
  return (
    <section className="mt-14 md:mt-40 p-10 md:p-32 lg:p-52 flex flex-col justify-center items-center w-full bg-secondary-light dark:bg-secondary-dark text-center">
      <h2 className="cta mb-4 font-bold text-primary-light dark:text-primary-dark">
        {heading || "Ready to flaunt your pop off?"}
      </h2>
      <h3 className="mb-12 text-primary-dark dark:text-primary-light">
        {subheading || "Join thousands of other influencers"}
      </h3>
      <Link href="/auth/register">
        <button className="mt-6 md:mt-10 lg:mt-20 px-8 md:px-10 lg:px-12 py-3 md:py-4T lg:py-6 bg-action hover:bg-primary-dark hover:dark:bg-primary-light rounded-full text-primary-light dark:text-primary-dark hover:text-action hover:dark:text-action text-lg md:text-xl lg:text-2xl font-medium duration-300 transition-all">
          {callToAction || "Get started for free"}
        </button>
      </Link>
    </section>
  );
};

export default CallToActionSection;
