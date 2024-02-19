import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Explore | My Pop Off",
  description:
    "Browse and search through My Pop Off's vast directory of creatives and amazing influencers!",
};

export default function Explore() {
  return (
    <main className="flex flex-col items-center justify-start overflow-hidden">
      <NavBar />
      <div
        className={`relative my-4 md:my-7 mx-auto px-5 md:px-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-windowed`}
      >
        <article
          className={`group relative rounded-2xl bg-dashboard-primary-light dark:bg-dashboard-primary-dark aspect-square overflow-hidden`}
        >
          <img
            src={`./images/smiling-female-influencer.jpg`}
            className={`rounded-b-3xl aspect-square object-cover`}
          />
          <div
            className={`pb-2 bottom-0 -translate-y-16 3xs:group-hover:-translate-y-full left-0 flex flex-col w-full bg-dashboard-primary-light dark:bg-dashboard-primary-dark rounded-tl-2xl transition-all duration-300 z-10`}
          >
            {/* Above the cut */}
            <section
              className={`px-2 py-1 flex flex-row items-center gap-2 h-16`}
            >
              <div
                className={`h-[90%] border-2 border-white bg-dashboard-secondary-light rounded-full aspect-square overflow-hidden`}
              >
                <p
                  className={`flex justify-center items-center h-full text-xl 2xs:text-3xl text-orange-500`}
                >
                  AW
                </p>
              </div>
              <div className={`flex-grow h-full flex flex-col justify-center`}>
                <p
                  className={`text-base 3xs:text-xl xs:text-xl font-bold text-dashboard-secondary-dark dark:text-dashboard-secondary-light`}
                >
                  username
                </p>
                <p
                  className={`-mt-2 text-sm 3xs:text-base text-dashboard-secondary-dark/30 dark:text-dashboard-secondary-light/30`}
                >
                  category
                </p>
              </div>
            </section>

            {/* Below the Cut */}
            <section className={`p-2 flex-grow`}>
              <p className={`text-sm opacity-80`}>
                An excerpt of this influencer's bio description that shows who
                they are, what they do...
              </p>
            </section>
          </div>
        </article>
      </div>
      <Footer />
    </main>
  );
}
