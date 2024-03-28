"use client";

import { useEffect, useState } from "react";

import { LinearProgress, Stack } from "@mui/material";

import { generateId } from "@/utility/generalUtils";

import LinksList from "@/components/LinksList";
import NewLinkBlock from "@/components/NewLinkBlock";

const LinksPageBlock = ({ session, data }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    if (session) {
      let tempLinks = [];

      if (!data) {
        console.log("No user data found");
      } else {
        tempLinks = data.links;

        tempLinks.map((link) => {
          if (!link.id) {
            link.id = generateId(
              5,
              userLinks.length > 0 ? userLinks.map((link) => link.id) : []
            );
          }

          if (!link.title) link.name = "untitled";
          if (!link.url) link.url = "";
          if (!link.public) link.public = true;
        });

        setUserLinks(tempLinks);
        setIsLoaded(true);
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full max-h-full text-primary-dark dark:text-primary-light">
      <section
        className={`px-2 xs:px-3 py-5 sm:p-6 flex justify-between items-center w-full border-b-2 border-secondary-dark/20`}
      >
        <h1 className="text-xl font-bold">My Links</h1>
      </section>

      {!isLoaded ? (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="inherit" />
        </Stack>
      ) : (
        <section className="p-3 sm:p-6 pb-6 sm:pb-10 w-full h-full bg-dashboard-secondary-light/50 dark:bg-dashboard-secondary-dark overflow-y-auto">
          <NewLinkBlock
            session={session}
            userLinks={userLinks}
            setUserLinks={setUserLinks}
          />

          <h3 className="mt-2 text-lg w-full">Existing Links</h3>

          <LinksList
            session={session}
            userLinks={userLinks}
            setUserLinks={setUserLinks}
          />
        </section>
      )}
    </div>
  );
};

export default LinksPageBlock;
