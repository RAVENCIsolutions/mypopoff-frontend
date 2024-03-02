import Link from "next/link";
import Image from "next/image";

const ExploreSingle = ({ theUser }) => {
  return (
    <Link
      href={process.env.NEXT_PUBLIC_HOME_ROUTE + theUser.username}
      className={`group relative rounded-2xl bg-dashboard-primary-light dark:bg-dashboard-primary-dark aspect-square overflow-hidden`}
    >
      <div className={`w-full h-full rounded-b-3xl overflow-hidden`}>
        {theUser.images && (
          <img
            src={theUser.images}
            className={`rounded-b-3xl aspect-square object-cover`}
          />
        )}
      </div>
      <div
        className={`absolute xs:relative pb-2 bottom-0 xs:-translate-y-16 xs:group-hover:-translate-y-[99%] left-0 flex flex-col w-full bg-dashboard-primary-light dark:bg-dashboard-primary-dark xs:rounded-tl-2xl transition-all duration-300 z-10`}
      >
        {/* Above the cut */}
        <section
          className={`px-2 py-1 flex flex-row items-center gap-2 xs:h-16`}
        >
          <div
            className={`hidden xs:block h-[90%] border-2 border-white bg-dashboard-secondary-light rounded-full aspect-square overflow-hidden`}
          >
            {theUser.avatar_url ? (
              <img
                src={theUser.avatar_url}
                alt={theUser.username}
                className={`w-full h-full object-cover`}
              />
            ) : (
              <p
                className={`flex justify-center items-center h-full 2xs:text-3xl text-orange-500`}
              >
                {theUser.username.slice(0, 2).toUpperCase()}
              </p>
            )}
          </div>
          <div className={`flex-grow h-full flex flex-col justify-center`}>
            <p
              className={`text-sm 2xs:text-base xs:text-xl font-bold text-dashboard-secondary-dark dark:text-dashboard-secondary-light`}
            >
              {theUser.username}
            </p>
            <p
              className={`-mt-1 text-xs 2xs:text-sm text-dashboard-secondary-dark/30 dark:text-dashboard-secondary-light/30`}
            >
              {theUser.category === "Other.."
                ? theUser.otherCategory
                : theUser.category}
            </p>
          </div>
        </section>

        {/* Below the Cut */}
        <section className={`hidden xs:block p-2 flex-grow`}>
          <p className={`text-sm opacity-80`}>
            {theUser.bio.slice(0, 150)}
            {theUser.bio.length > 150 && "..."}
          </p>
        </section>
      </div>
    </Link>
  );
};

export default ExploreSingle;
