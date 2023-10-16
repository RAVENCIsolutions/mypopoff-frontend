export default function Dashboard() {
  return (
    <main className="w-full h-full rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-10 w-3/4 h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark">
            Dashboard
          </h2>
        </section>
        <section className="p-10 w-1/4 h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark">
          <h2 className="pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark">
            Links
          </h2>
        </section>
      </div>
    </main>
  );
}
