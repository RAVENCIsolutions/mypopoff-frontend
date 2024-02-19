"use client";

import { useEffect, useRef, useState } from "react";

import { FaCheck, FaPencilAlt, FaTimes, FaTrashAlt } from "react-icons/fa";
import { BsCardHeading, BsLink45Deg } from "react-icons/bs";

import Switch from "@mui/material/Switch";

import { observer } from "mobx-react";
import userStore from "@/stores/UserStore";
import { ensureHttp } from "@/utility/generalUtils";

const LinkBlock = observer(({ id, title, url, isPublic = true }) => {
  const [blockLink, setBlockLink] = useState(url.toString());
  const [blockTitle, setBlockTitle] = useState(title.toString());

  const [previousLink, setPreviousLink] = useState(url.toString());
  const [previousTitle, setPreviousTitle] = useState(title.toString());

  const [makePublic, setMakePublic] = useState(isPublic);

  const [editLink, setEditLink] = useState(false);
  const [editTitle, setEditTitle] = useState(false);

  const linkRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (editTitle) {
      titleRef.current && titleRef.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    if (editLink) {
      linkRef.current && linkRef.current.focus();
    }
  }, [editLink]);

  return (
    <section className="flex-grow flex flex-col overflow-x-clip">
      <div
        className={`pl-3 pr-1 py-2 pb-0 sm:p-5 sm:pb-2 flex flex-col items-stretch justify-between border-2 bg-primary-light/50 dark:bg-dashboard-secondary-light/5 rounded-lg w-full text-primary-dark dark:text-primary-light ${
          makePublic
            ? "border-action shadow-lg"
            : "border-transparent shadow-none opacity-70"
        } shadow-black/10 transition-all duration-300`}
      >
        <div className="flex flex-col gap-0 sm:gap-2 w-full">
          {/* Title */}
          <div className="flex items-center justify-between gap-1 lg:gap-2">
            <div className="hidden sm:block w-6" title={"Title of your link"}>
              <BsCardHeading
                size={18}
                className="text-primary-dark/50 dark:text-primary-light/30 hover:text-primary-dark hover:dark:text-primary-light transition-all duration-300"
                title={"Title of your link"}
              />
            </div>
            {editTitle ? (
              <>
                <input
                  ref={titleRef}
                  type="text"
                  className="px-4 py-1 w-full rounded-lg outline-none font-medium text-primary-dark text-lg shadow-md shadow-black/10"
                  placeholder="Link Title"
                  value={blockTitle}
                  onChange={(e) => setBlockTitle(e.target.value)}
                />
                <button
                  className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:hover:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                  onClick={async () => {
                    setBlockTitle(previousTitle);
                    setEditTitle(false);
                  }}
                >
                  <FaTimes size={15} />
                </button>

                <button
                  className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:hover:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                  onClick={async () => {
                    await userStore.updateLink(id, { title: blockTitle });
                    setPreviousTitle(blockTitle);
                    setEditTitle(false);
                  }}
                >
                  <FaCheck size={15} />
                </button>
              </>
            ) : (
              <>
                <h4 className="pl-1 flex-grow font-medium sm:font-semibold text-base sm:text-xl truncate">
                  {blockTitle}
                </h4>
                <button
                  className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:hover:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                  onClick={() => {
                    setPreviousTitle(blockTitle);
                    setEditTitle(true);
                  }}
                >
                  <FaPencilAlt size={15} />
                </button>
              </>
            )}
          </div>

          {/* Link */}
          <div className="flex items-center justify-between gap-2">
            <div
              className="hidden sm:block w-6"
              title={"Destination of your link"}
            >
              <BsLink45Deg
                size={18}
                className="text-primary-dark/50 dark:text-primary-light/30 hover:text-primary-dark hover:dark:text-primary-light transition-all duration-300"
                title={"Destination of your link"}
              />
            </div>
            {editLink ? (
              <>
                <input
                  ref={linkRef}
                  type="text"
                  className="px-4 py-1 w-full rounded-lg outline-none font-medium text-primary-dark text-lg shadow-md shadow-black/10"
                  placeholder="Link Title"
                  value={blockLink}
                  onChange={(e) => setBlockLink(e.target.value)}
                />
                <button
                  className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:hover:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                  onClick={async () => {
                    setBlockLink(previousLink);
                    setEditLink(false);
                  }}
                >
                  <FaTimes size={15} />
                </button>

                <button
                  className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:hover:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                  onClick={async () => {
                    await userStore.updateLink(id, {
                      url: ensureHttp(blockLink),
                    });
                    setPreviousLink(blockLink);
                    setEditLink(false);
                  }}
                >
                  <FaCheck size={15} />
                </button>
              </>
            ) : (
              <>
                <p className="flex-grow font-light text-sm sm:text-lg truncate">
                  {blockLink}
                </p>
                <button
                  className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:hover:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                  onClick={() => {
                    setPreviousLink(blockLink);
                    setEditLink(true);
                  }}
                >
                  <FaPencilAlt size={15} />
                </button>
              </>
            )}
          </div>
        </div>

        <section className="mt-3 py-3 flex justify-between items-center border-t-2 border-secondary-dark/20 dark:border-primary-light/10">
          <article className="flex items-center gap-1">
            <button
              className="p-2 flex justify-center rounded-full bg-transparent hover:bg-primary-dark hover:dark:bg-dashboard-primary-light hover:text-dashboard-primary-light hover:dark:text-dashboard-primary-dark transition-all duration-300"
              title="Delete Link"
              onClick={async () => await userStore.removeLink(id)}
            >
              <FaTrashAlt size={15} />
            </button>
          </article>

          <article className="flex items-center">
            <p className="text-sm">Make Public?</p>
            <Switch
              sx={{
                "& .MuiSwitch-switchBase": {
                  color: "#c68a4e", // color for the off state
                  "&.Mui-checked": {
                    color: "#c68a4e", // color for the on state
                  },
                  "&.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#c68a4e", // background color for the on state
                  },
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#c68a4e", // adjust to change the track color when off if needed
                },
              }}
              checked={makePublic}
              size={"small"}
              onChange={async () => {
                await userStore.updateLink(id, { public: !makePublic });
                setMakePublic(!makePublic);
              }}
            />
          </article>
        </section>
      </div>
    </section>
  );
});

export default LinkBlock;
