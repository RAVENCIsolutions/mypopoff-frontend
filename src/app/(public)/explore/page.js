import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Explore() {
  return (
    <main className="flex flex-col items-center justify-start overflow-hidden">
      <NavBar />
      <section
        className={`relative my-4 md:my-7 mx-auto px-5 md:px-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-windowed`}
      >
        <div
          className={`group relative rounded-3xl bg-dashboard-primary-dark aspect-square overflow-hidden`}
        >
          <img
            src={`./images/smiling-female-influencer.jpg`}
            className={`aspect-square object-cover`}
          />
          <div
            className={`p-1.5 absolute bottom-0 translate-y-[55%] group-hover:translate-y-0 left-0 flex flex-col w-full h-1/2 bg-dashboard-primary-light dark:bg-dashboard-primary-dark rounded-tl-3xl transition-all duration-300 z-10`}
          >
            <div className={`flex flex-row gap-3 h-[40%]`}>
              <div
                className={`h-full border-2 border-white bg-dashboard-secondary-light rounded-full aspect-square overflow-hidden`}
              >
                <p
                  className={`flex justify-center items-center h-full text-xl 2xs:text-3xl text-orange-500`}
                >
                  AW
                </p>
              </div>
              <div className={`h-full flex flex-col`}>
                <p
                  className={`relative h-1/2 -mt-1 2xs:mt-0 text-base 2xs:text-xl xs:text-lg font-bold text-dashboard-secondary-dark dark:text-dashboard-secondary-light`}
                >
                  username
                </p>
                <p
                  className={`h-1/2 mt-0 xs:-mt-1 text-sm 2xs:text-base text-dashboard-secondary-dark/30 dark:text-dashboard-secondary-light/30`}
                >
                  category
                </p>
              </div>
            </div>
            <div className={`p-1 flex-grow`}>
              <p className={`text-sm opacity-80`}>
                An excerpt of this influencer's bio description that shows who
                they are, what they do...
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
