export const metadata = {
  title: "My Landing Page | My Pop Off",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

export default function CustomisePage() {
  return (
    <main className="w-full h-full rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 sm:p-6 w-full h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="pb-2 sm:pb-4 mb-2 sm:mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Customise
          </h2>
        </section>
      </div>
    </main>
  );
}
