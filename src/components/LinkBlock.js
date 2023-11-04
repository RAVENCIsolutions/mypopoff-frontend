"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaExternalLinkAlt,
  FaPencilAlt,
  FaShareAlt,
  FaTimesCircle,
  FaTrashAlt,
} from "react-icons/fa";
import { BsCardHeading, BsLink45Deg } from "react-icons/bs";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material";

const LinkBlock = ({ index, title, url }) => {
  const [makePublic, setMakePublic] = useState(true);
  const [blockVisible, setBlockVisible] = useState(false);
  const [blockLink, setBlockLink] = useState(url.toString());
  const [blockTitle, setBlockTitle] = useState(title.toString());
  const [blockHeight, setBlockHeight] = useState("0");

  const [editLink, setEditLink] = useState(false);
  const [editTitle, setEditTitle] = useState(false);

  const linkRef = useRef(null);
  const titleRef = useRef(null);

  const toggleBlock = (height = "60") => {
    if (blockVisible) {
      setBlockHeight("0");

      setTimeout(() => {
        setBlockVisible(false);
      }, 325);
    } else {
      setBlockVisible(true);

      setTimeout(() => {
        setBlockHeight(height);
      }, 25);
    }
  };

  const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#c68a4e",
      "&:hover": {
        backgroundColor: alpha("#c68a4e", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "black",
    },
  }));

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
    <>
      <section className="flex-grow flex flex-col overflow-x-clip">
        <div className="p-5 pb-2 flex flex-col items-stretch justify-between border-2 border-dashboard-primary-light dark:border-primary-dark/60 bg-dashboard-primary-light/50 dark:bg-dashboard-secondary-light/5 rounded-lg w-full text-primary-dark dark:text-primary-light shadow-lg shadow-black/10">
          <div className="flex flex-col gap-2 w-full">
            {editTitle ? (
              <input
                ref={titleRef}
                type="text"
                className="p-2 w-full rounded-lg outline-none font-medium text-primary-dark text-lg shadow-md shadow-black/10"
                placeholder="Link Title"
                value={blockTitle}
                onChange={(e) => setBlockLink(e.target.value)}
                onBlur={() => setEditTitle(false)}
              />
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div className="w-6" title="Link Title">
                  <BsCardHeading
                    size={18}
                    className="text-primary-dark/50 dark:text-primary-light/30 hover:text-primary-dark hover:dark:text-primary-light transition-all duration-300"
                  />
                </div>
                <h4 className="flex-grow font-medium text-lg truncate">
                  {blockTitle}
                </h4>
                <button
                  className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                  onClick={() => setEditTitle(true)}
                >
                  <FaPencilAlt size={15} />
                </button>
              </div>
            )}
            {editLink ? (
              <input
                ref={linkRef}
                type="text"
                className="px-4 py-2 w-full rounded-lg outline-none font-medium text-primary-dark text-lg shadow-md shadow-black/10"
                placeholder="Link Title"
                value={blockLink}
                onChange={(e) => setBlockLink(e.target.value)}
                onBlur={() => setEditLink(false)}
              />
            ) : (
              <div className="flex items-center justify-between gap-2">
                <div className="w-6" title="Link Destination">
                  <BsLink45Deg
                    size={18}
                    className="text-primary-dark/50 dark:text-primary-light/30 hover:text-primary-dark hover:dark:text-primary-light transition-all duration-300"
                  />
                </div>
                <p className="flex-grow font-light text-lg truncate">
                  {blockLink}
                </p>
                <button
                  className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                  onClick={() => setEditLink(true)}
                >
                  <FaPencilAlt size={15} />
                </button>
              </div>
            )}
          </div>
          {/*<section className="pt-2 px-4">*/}
          {/*  <button onClick={toggleBlock}>Open</button>*/}
          {/*</section>*/}
          <section className="mt-3 py-3 flex justify-between items-center border-t-2 border-dashboard-primary-light dark:border-primary-light/10">
            <article className="flex items-center gap-1">
              <button
                className="p-2 pr-2.5 rounded-full hover:bg-primary-dark dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                title="Share Link"
              >
                <FaExternalLinkAlt size={16} />
              </button>

              <button
                className="p-2 flex justify-center rounded-full hover:bg-primary-dark dark:bg-primary-light hover:text-primary-light hover:dark:text-primary-dark transition-all duration-300"
                title="Delete Link"
              >
                <FaTrashAlt size={15} />
              </button>
            </article>

            <article className="flex items-center">
              <p className="text-sm">Make Public?</p>
              <PinkSwitch
                color="warning"
                checked={makePublic}
                size={"small"}
                onChange={() => setMakePublic(!makePublic)}
              />
            </article>
          </section>
        </div>
      </section>
      {blockVisible && (
        <div
          id="add-link-block"
          className={`my-${blockHeight === "0" ? "0" : "4"} p-${
            blockHeight === "0" ? "0" : "3"
          } flex flex-col gap-3 bg-dashboard-primary-light rounded-lg h-${blockHeight} box-border transition-all duration-300 overflow-hidden`}
        >
          <section className="mb-2 flex justify-between items-center">
            <h3 className="text-lg text-primary-dark">New Link</h3>
            <button className="" onClick={toggleBlock}>
              <FaTimesCircle size={20} className="text-secondary-dark" />
            </button>
          </section>

          <button className="p-2 bg-emerald-600 rounded-lg" onClick={() => {}}>
            Add
          </button>
        </div>
      )}
    </>
  );
};

export default LinkBlock;
