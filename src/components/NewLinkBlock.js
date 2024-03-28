"use client";

import { useState } from "react";

import { FaTimesCircle } from "react-icons/fa";
import { BsCardHeading, BsLink45Deg } from "react-icons/bs";

import { updateUser } from "@/utility/dbUtils";
import { ensureHttp, generateId } from "@/utility/generalUtils";
import { updateLastModified } from "@/utility/localStorageUtils";

const NewLinkBlock = ({ session, userLinks = [], setUserLinks }) => {
  const [processing, setProcessing] = useState(false);

  const [showNew, setShowNew] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [blockHeight, setBlockHeight] = useState(0);

  const [urlError, setUrlError] = useState("");
  const [titleError, setTitleError] = useState("");

  const showBlock = (links = []) => {
    setShowNew(true);

    setTimeout(() => {
      setBlockHeight(900);
    }, 100);
  };

  const hideBlock = () => {
    setBlockHeight(0);

    setTimeout(() => {
      setShowNew(false);
      setNewLink("");
      setNewLinkTitle("");

      setUrlError("");
      setTitleError("");
    }, 525);
  };

  const addLink = async () => {
    let urlIsValid = true,
      titleIsValid = true;

    setUrlError("");
    setTitleError("");

    if (newLink.length === 0) {
      setUrlError("You forgot to enter a link URL");
      urlIsValid = false;
    }

    if (newLinkTitle.length === 0) {
      setTitleError("You forgot to enter a link title");
      titleIsValid = false;
    }

    if (!urlIsValid || !titleIsValid) {
      return false;
    }

    setUrlError("");
    setTitleError("");

    setProcessing(true);

    const newId = generateId(
      5,
      userLinks.length > 0 ? userLinks.map((link) => link.id) : []
    );

    const newLinksArray = [
      ...userLinks,
      {
        id: newId,
        url: ensureHttp(newLink),
        title: newLinkTitle,
        public: true,
      },
    ];

    await updateUser(session.user.id, { links: newLinksArray })
      .then(() => {
        updateLastModified();
        setUserLinks(newLinksArray);
        setProcessing(false);
      })
      .catch((err) => {
        console.error(`Error adding link: ${err.message}`);
        setProcessing(false);
      });

    setNewLink("");
    setNewLinkTitle("");
    setShowNew(false);
    setProcessing(false);
  };

  return (
    <article className="pb-4 flex flex-col border-b-2 border-secondary-dark/20">
      {showNew ? (
        <div
          className={`self-center px-3 flex flex-col gap-3 bg-dashboard-primary-light rounded-lg w-full max-w-lg box-border transition-all duration-500 overflow-hidden`}
          style={{
            maxHeight: `${blockHeight}px`,
          }}
        >
          <section className="mt-3 mb-2 flex justify-between items-center">
            <h3 className="text-lg text-primary-dark">New Link</h3>
            <button className="" onClick={hideBlock}>
              <FaTimesCircle size={20} className="text-secondary-dark" />
            </button>
          </section>

          <div className="flex items-center justify-between gap-2">
            <div className="w-6" title="Link Title">
              <BsCardHeading
                size={18}
                className="text-primary-dark/50 dark:text-primary-dark/70 hover:text-primary-dark hover:dark:text-primary-light transition-all duration-300"
              />
            </div>
            <input
              type="text"
              className="px-4 py-2 w-full rounded-lg outline-none shadow-md shadow-black/10"
              placeholder="Link Title"
              value={newLinkTitle}
              onChange={(e) => {
                e.target.value.length > 0 && setTitleError("");
                setNewLinkTitle(e.target.value);
              }}
            />
          </div>
          <p className={`text-sm italic text-rose-700 font-semibold`}>
            {titleError.length > 0 && titleError}
          </p>

          <div className="flex items-center justify-between gap-2">
            <div className="w-6" title="Link Destination">
              <BsLink45Deg
                size={18}
                className="text-primary-dark/50 dark:text-primary-dark/70 hover:text-primary-dark hover:dark:text-primary-light transition-all duration-300"
              />
            </div>
            <input
              type="text"
              className="px-4 py-2 w-full rounded-lg outline-none shadow-md shadow-black/10"
              placeholder="Link URL"
              value={newLink}
              onChange={(e) => {
                e.target.value.length > 0 && setUrlError("");
                setNewLink(e.target.value);
              }}
            />
          </div>
          <p className={`text-sm italic text-rose-700 font-semibold`}>
            {urlError.length > 0 && urlError}
          </p>

          <button
            className="mb-3 p-2 bg-action rounded-lg"
            onClick={async () => {
              if (!processing) await addLink();
            }}
          >
            {processing ? "Adding..." : "Add"}
          </button>
        </div>
      ) : (
        <button
          className="self-center p-2 bg-action rounded-lg w-full max-w-xs text-white dark:text-primary-dark"
          onClick={showBlock}
        >
          + Add New Link
        </button>
      )}
    </article>
  );
};

export default NewLinkBlock;
