import NewLinkBlock from "@/components/NewLinkBlock";
import LinksList from "@/components/LinksList";

export const metadata = {
  title: "My Landing Page | My Pop Off",
  description:
    "Create and manage your own Pop Off with our easy to use dashboard.",
};

export default function MyPage() {
  const sampleLinks = [
    { id: "link-0", title: "Home", url: "/" },
    { id: "link-1", title: "About", url: "/about" },
    { id: "link-2", title: "Contact", url: "/contact" },
    // more links with unique ids
  ];

  return (
    <article className="w-full h-full rounded-none sm:rounded-lg sm:overflow-hidden">
      <div className="flex flex-col md:flex-row w-full sm:h-full text-primary-dark dark:text-primary-light">
        <section className="hidden sm:block px-3 py-5 lg:p-6 w-full md:w-1/2 lg:w-3/5 h-1/2 md:h-full rounded-sm bg-dashboard-primary-light dark:bg-dashboard-primary-dark">
          <h2 className="pb-2 lg:pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Landing Page
          </h2>
        </section>
        <section className="px-3 py-5 lg:p-6 w-full md:w-1/2 lg:w-2/5 h-full bg-dashboard-secondary-light dark:bg-dashboard-secondary-dark sm:overflow-y-auto">
          <h2 className="pb-2 lg:pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
            Links
          </h2>
          <section className="flex flex-col gap-4">
            <NewLinkBlock />

            <h3 className="mt-2 text-lg w-full">Existing Links</h3>

            <LinksList />
          </section>
        </section>
      </div>
    </article>
  );
}
