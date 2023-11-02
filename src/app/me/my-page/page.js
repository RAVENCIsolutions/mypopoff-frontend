export const metadata = {
  title: "My Landing Page | My Pop Off",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

export default function MyPage() {
  return (
    <main className="w-full h-full rounded-lg">
      <div className="flex flex-col sm:flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 sm:p-10 w-full sm:w-3/4 h-1/2 sm:h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="pb-2 sm:pb-4 mb-2 sm:mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Landing Page
          </h2>
        </section>
        <section className="p-5 sm:p-10 w-full sm:w-1/4 h-1/2 sm:h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark">
          <h2 className="pb-2 sm:pb-4 mb-2 sm:mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Links
          </h2>
        </section>
      </div>
    </main>
  );
}
