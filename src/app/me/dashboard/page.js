export const metadata = {
  title: "Dashboard",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

export default function Dashboard() {
  return (
    <main className="w-full h-full rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-10 w-full h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Dashboard
          </h2>
        </section>
      </div>
    </main>
  );
}
