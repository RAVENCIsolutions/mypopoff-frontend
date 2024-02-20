"use client";

import { useEffect, useState } from "react";
import { exploreAll } from "@/utility/dbUtils";
import Link from "next/link";
import ExploreSingle from "@/components/ExploreSingle";
import { CircularProgress, Stack } from "@mui/material";

const ExploreBlock = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      exploreAll().then((data) => setData(data));

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <section
      className={`my-4 md:-7 mx-auto px-5 md:px-10 w-full max-w-windowed`}
    >
      {loading ? (
        <article className={`flex flex-col items-center justify-center gap-4`}>
          <p className={`text-base font-bold`}>
            Finding you some great matches...
          </p>
          <Stack sx={{ color: "grey.500" }} spacing={2}>
            <CircularProgress color="inherit" size={30} />
          </Stack>
        </article>
      ) : (
        <>
          <h2 className={`text-2xl font-bold`}>Influencers You Might Love</h2>
          <section
            className={`relative my-4 md:my-7 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
          >
            {data &&
              data.map((user, index) => (
                <ExploreSingle theUser={user} key={`explore-user-${index}`} />
              ))}
          </section>
        </>
      )}
    </section>
  );
};

export default ExploreBlock;
