import Link from "next/link";

export const metadata = {
  title: "Dashboard | My Pop Off",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

export default function Dashboard() {
  return (
    <main className="w-full h-full rounded-lg">
      <div className="flex flex-row w-full h-full text-primary-dark dark:text-primary-light">
        <section className="p-5 md:p-6 w-full h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="mb-2 md:mb-4 pb-2 md:pb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Dashboard
          </h2>
          <p className={`text-base`}>
            Start by{" "}
            <Link href={`/me/my-links`} className={`text-action`}>
              adding links
            </Link>{" "}
            or how about{" "}
            <Link href={`/me/customise`} className={`text-action`}>
              customising
            </Link>{" "}
            your Pop Off landing page.
          </p>
        </section>
      </div>
    </main>
  );
}
