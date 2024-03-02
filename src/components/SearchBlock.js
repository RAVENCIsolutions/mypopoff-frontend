"use client";

import { useEffect, useState } from "react";
import { exploreAll } from "@/utility/dbUtils";
import { LuSearch } from "react-icons/lu";
import useWindowWidth from "@/hooks/useWindowWidth";
// import { categories } from "@/data/CustomisationData";
import { CircularProgress, Stack } from "@mui/material";
import ExploreSingle from "@/components/ExploreSingle";
import { StopWords } from "@/data/StopWords";

const SearchBlock = () => {
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  const windowWidth = useWindowWidth();
  const [placeholder, setPlaceholder] = useState("");
  const [inputAlignment, setInputAlignment] = useState("text-center");
  // const [categoryArray, setCategoryArray] = useState([]);

  const handleSearch = (term) => {
    setSearching(true);

    if (term.length > 2) {
      term = term.toLowerCase();

      exploreAll().then((data) => {
        let finalResults = [];

        const entireTerm = data.filter((item) => {
          const inUsername = item.username.toLowerCase().includes(term);
          const inBio = item.bio.toLowerCase().includes(term);
          const inCategory = item.category.toLowerCase().includes(term);
          const inTags = item.tags.some((tag) =>
            tag.toLowerCase().includes(term)
          );

          return item.public && (inUsername || inBio || inCategory || inTags);
        });

        finalResults = [...finalResults, ...entireTerm];

        const termsArray = term.match(/\w+/g);
        const filteredList = termsArray.filter(
          (word) => !StopWords.includes(word)
        );

        const anyTerm = data.filter((item) => {
          const inUsername = filteredList.some((word) =>
            item.username.toLowerCase().includes(word)
          );
          const inBio = filteredList.some((word) =>
            item.bio.toLowerCase().includes(word)
          );
          const inCategory = filteredList.some((word) =>
            item.category.toLowerCase().includes(word)
          );
          const inTags = filteredList.some((word) =>
            item.tags.some((tag) => tag.toLowerCase().includes(word))
          );

          return (
            item.public &&
            !finalResults.includes(item) &&
            (inUsername || inBio || inCategory || inTags)
          );
        });

        finalResults = [...finalResults, ...anyTerm];
        setData(finalResults);
      });
    }

    setSearching(false);
    // setTimeout(() => {
    // }, 500);
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
    // const shuffled = categories.sort(() => Math.random() - 0.5);
    // setCategoryArray(shuffled.slice(0, 5));
  }, []);

  return (
    <section
      className={`my-4 md:my-7 mx-auto px-5 md:px-10 w-full max-w-windowed`}
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
        data && (
          <section
            className={`relative ${
              data.length > 0 && "my-4 md:my-14"
            } grid grid-cols-1 3xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 2xs:gap-4 xs:gap-6`}
          >
            {data.map((user, index) => (
              <ExploreSingle theUser={user} key={`search-user-${index}`} />
            ))}
          </section>
        )
      )}
    </section>
  );
};

export default SearchBlock;
