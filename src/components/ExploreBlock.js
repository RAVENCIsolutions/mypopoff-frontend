import ExploreSingle from "@/components/ExploreSingle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const ExploreBlock = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("users")
    .select()
    .neq("username", "")
    .is("public", true);

  return (
    <section
      className={`my-4 md:-7 mx-auto px-3 xs:px-5 md:px-10 w-full max-w-windowed`}
    >
      <h2 className={`text-lg 3xs:text-xl xs:text-2xl font-bold`}>
        Influencers You Might Love
      </h2>
      <article
        className={`relative my-4 md:my-7 grid grid-cols-1 3xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 2xs:gap-4 xs:gap-6`}
      >
        {data &&
          data.map((user, index) => (
            <ExploreSingle theUser={user} key={`explore-user-${index}`} />
          ))}
      </article>
    </section>
  );
};

export default ExploreBlock;
