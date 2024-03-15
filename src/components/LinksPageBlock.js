"use client";

import { useEffect, useState } from "react";

import { LinearProgress, Stack } from "@mui/material";

import { generateId } from "@/utility/generalUtils";
import { processLogOut } from "@/utility/userUtils";
import { getFromStorage, saveToStorage } from "@/utility/localStorageUtils";

import LinksList from "@/components/LinksList";
import NewLinkBlock from "@/components/NewLinkBlock";

const LinksPageBlock = ({ session }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLinks, setUserLinks] = useState([]);

  useEffect(() => {
    if (session) {
      const storedUserData = getFromStorage("userData");
      const storedLoginSession = getFromStorage("loginSession");

      if (!storedLoginSession) processLogOut().then();

      if (!storedUserData) {
        processLogOut().then();
      } else {
        const tempLinks = getFromStorage("userData").links;

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

        saveToStorage("userData", { ...storedUserData, links: tempLinks });

        setUserLinks(tempLinks);
        setIsLoaded(true);
      }
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-full text-primary-dark dark:text-primary-light">
      <section className="px-3 py-5 sm:p-6 w-full min-h-full sm:overflow-y-auto">
        <h2 className="pb-2 lg:pb-4 mb-4 text-xl w-full border-b-2 border-secondary-dark/20">
          My Links
        </h2>

        {!isLoaded ? (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="inherit" />
          </Stack>
        ) : (
          <section className="flex flex-col gap-4">
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
      </section>
    </div>
  );
};

export default LinksPageBlock;
