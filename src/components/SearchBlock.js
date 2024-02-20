"use client";

import { useEffect, useState } from "react";
import { exploreAll, searchAll } from "@/utility/dbUtils";
import Link from "next/link";
import { LuSearch } from "react-icons/lu";
import useWindowWidth from "@/hooks/useWindowWidth";
import { categories } from "@/data/CustomisationData";
import { CircularProgress, Stack } from "@mui/material";
import ExploreSingle from "@/components/ExploreSingle";

const SearchBlock = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(false);

  const windowWidth = useWindowWidth();
  const [placeholder, setPlaceholder] = useState("");
  const [inputAlignment, setInputAlignment] = useState("text-center");
  const [categoryArray, setCategoryArray] = useState([]);

  const handleSearch = (term) => {
    setSearching(true);

    if (term.length > 2) {
      term = term.toLowerCase();

      exploreAll().then((data) => {
        const searchResults = data.filter((item) => {
          const inBio = item.bio.toLowerCase().includes(term);
          const inCategory = item.category.toLowerCase().includes(term);
          const inTags = item.tags.some((tag) =>
            tag.toLowerCase().includes(term),
          );

          return inBio || inCategory || inTags;
        });

        setData(searchResults);
      });
    }

    setTimeout(() => {
      setSearching(false);
    }, 500);
  };

  useEffect(() => {
    if (windowWidth < 360) {
      setPlaceholder("Search...");
      setInputAlignment("text-left");
    } else {
      setPlaceholder("Find your next favourite influencer...");
      setInputAlignment("text-center");
    }
  }, [windowWidth]);

  useEffect(() => {
    // Get Random Categories
    const shuffled = categories.sort(() => Math.random() - 0.5);
    setCategoryArray(shuffled.slice(0, 5));
  }, []);

  return (
    <section
      className={`my-4 md:-7 mx-auto px-5 md:px-10 w-full max-w-windowed`}
    >
      <article className={`mb-5 md:mb-0 mx-auto relative w-full max-w-lg`}>
        <input
          type="text"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(search);
            }
          }}
          className={`px-4 2xs:px-8 py-1.5 w-full bg-dashboard-primary-dark/5 dark:bg-dashboard-primary-light/40 rounded-full shadow-none hover:shadow-xl focus:shadow-xl shadow-primary-dark/15 ${inputAlignment} outline-none transition-all duration-300 z-10`}
        />
        <LuSearch
          size={22}
          className={`cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 hover:scale-110 transition-all duration-300 z-10`}
          title={`Search`}
          onClick={() => handleSearch(search)}
        />
      </article>
      {/*<article className={`mt-5 mb-10 hidden md:flex justify-center gap-2`}>*/}
      {/*  {categoryArray.map((category) => (*/}
      {/*    <div*/}
      {/*      className={`px-2 py-1 border-[1px] border-dashboard-primary-dark/10 dark:border-dashboard-secondary-light rounded-full text-sm`}*/}
      {/*    >*/}
      {/*      {category.name}*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</article>*/}
      {searching ? (
        <article
          className={`mt-4 flex flex-col items-center justify-center gap-4`}
        >
          <p className={`text-base font-bold`}>Searching...</p>
          <Stack sx={{ color: "grey.500" }} spacing={2}>
            <CircularProgress color="inherit" size={30} />
          </Stack>
        </article>
      ) : (
        <section
          className={`relative my-4 md:my-14 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
        >
          {data &&
            data.map((user, index) => (
              <ExploreSingle theUser={user} key={`search-user-${index}`} />
            ))}
        </section>
      )}
    </section>
  );
};

export default SearchBlock;
