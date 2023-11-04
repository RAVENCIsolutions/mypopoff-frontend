"use client";

import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LinkBlock from "@/components/LinkBlock";
import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";

const LinksList = () => {
  const initialLinks = [
    { id: "link-0", title: "Home", url: "/" },
    { id: "link-1", title: "About", url: "/" },
    { id: "link-2", title: "Contact", url: "/contact" },
    {
      id: "link-3",
      title: "this is a really long title to see how it looks",
      url: "/contact",
    },
    { id: "link-4", title: "Contact", url: "/contact" },
    { id: "link-5", title: "Contact", url: "/contact" },
    // more links with unique ids
  ];

  const [sampleLinks, setSampleLinks] = useState(initialLinks);

  // Function to reorder list
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const moveUp = (index) => {
    const newOrder = reorder(sampleLinks, index, index - 1);
    if (index === 0) return;
    setSampleLinks(newOrder);
  };

  const moveDown = (index) => {
    if (index === sampleLinks.length - 1) return;
    const newOrder = reorder(sampleLinks, index, index + 1);

    setSampleLinks(newOrder);
  };

  return (
    <>
      {sampleLinks.map((link, index) => (
        <article
          className="relative flex flex-row items-center justify-start"
          key={link.id}
        >
          <section className="mr-2 lg:mr-2 py-4 flex flex-col gap-10">
            <button
              className={`${
                index === 0 ? "opacity-0" : "opacity-100"
              } transition-all duration-300`}
              disabled={index === 0}
              onClick={() => moveUp(index)}
              title="Move Link Up"
            >
              <BsArrowUpSquare
                size={20}
                className="text-dashboard-secondary-dark/70 hover:text-primary-dark dark:text-dashboard-secondary-light/60 hover:dark:text-primary-light transition-all duration-300"
              />
            </button>
            {/*<p className="text-2xl text-center">{index}</p>*/}
            <button
              className={`${
                index === sampleLinks.length - 1 ? "opacity-0" : "opacity-100"
              } hover:shadow-xl shadow-black/50 transition-all duration-300`}
              disabled={index === sampleLinks.length - 1}
              onClick={() => moveDown(index)}
              title="Move Link Down"
            >
              <BsArrowDownSquare
                size={20}
                className="text-dashboard-secondary-dark/70 hover:text-primary-dark dark:text-dashboard-secondary-light/60 hover:dark:text-primary-light transition-all duration-300"
              />
            </button>
          </section>
          <LinkBlock index={index} title={link.title} url={link.url} />
        </article>
      ))}
    </>
  );
};

export default LinksList;
