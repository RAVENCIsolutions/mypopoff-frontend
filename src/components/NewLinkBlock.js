"use client";

import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";

const NewLinkBlock = () => {
  const [showNew, setShowNew] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [blockHeight, setBlockHeight] = useState("0");

  const showBlock = () => {
    setShowNew(true);

    setTimeout(() => {
      setBlockHeight("56");
    }, 25);
  };

  const hideBlock = () => {
    setBlockHeight("0");

    setTimeout(() => {
      setShowNew(false);
      setNewLink("");
      setNewLinkTitle("");
    }, 325);
  };

  return (
    <article className="pb-4 flex flex-col border-b-2 border-secondary-dark/30">
      {showNew ? (
        <div
          className={`p-${
            blockHeight === "0" ? "0" : "3"
          } flex flex-col gap-3 bg-dashboard-primary-light rounded-lg h-${blockHeight} box-border transition-all duration-300 overflow-hidden`}
        >
          <section className="mb-2 flex justify-between items-center">
            <h3 className="text-lg text-primary-dark">New Link</h3>
            <button className="" onClick={hideBlock}>
              <FaTimesCircle size={20} className="text-secondary-dark" />
            </button>
          </section>
          <input
            type="text"
            className="px-4 py-2 w-full rounded-lg outline-none shadow-md shadow-black/10"
            placeholder="Link URL"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
          />
          <input
            type="text"
            className="px-4 py-2 w-full rounded-lg outline-none shadow-md shadow-black/10"
            placeholder="Link Title"
            value={newLinkTitle}
            onChange={(e) => setNewLinkTitle(e.target.value)}
          />

          <button className="p-2 bg-emerald-600 rounded-lg" onClick={() => {}}>
            Add
          </button>
        </div>
      ) : (
        <button className="p-2 bg-action rounded-lg" onClick={showBlock}>
          + Add New Link
        </button>
      )}
    </article>
  );
};

export default NewLinkBlock;
