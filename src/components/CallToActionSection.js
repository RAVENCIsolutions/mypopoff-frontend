const CallToActionSection = ({ heading, subheading, callToAction }) => {
  return (
    <section className="mt-40 p-52 flex flex-col justify-center items-center w-full bg-secondary-light dark:bg-secondary-dark">
      <h2 className="mb-4 text-5xl font-bold text-primary-light dark:text-primary-dark">
        {heading || "Ready to flaunt your pop off?"}
      </h2>
      <h3 className="mb-12 text-2xl text-primary-dark dark:text-primary-light">
        {subheading || "Join thousands of other influencers"}
      </h3>
      <button className="mt-12 px-16 py-5 bg-action hover:bg-action/90 rounded-full text-white dark:text-primary-dark text-2xl font-medium duration-300 transition-all">
        {callToAction || "Get started for free"}
      </button>
    </section>
  );
};

export default CallToActionSection;
