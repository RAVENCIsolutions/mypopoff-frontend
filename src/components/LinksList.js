"use client";

import { useEffect, useState } from "react";
import LinkBlock from "@/components/LinkBlock";
import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";
import { observer } from "mobx-react";
import userStore from "@/stores/UserStore";

const LinksList = observer(({ setProcessing }) => {
  const userLinks = userStore.userData.links;

  // Function to reorder list
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const moveUp = async (index) => {
    setProcessing(true);

    const newOrder = reorder(userLinks, index, index - 1);
    if (index === 0) return;

    await userStore.resetLinkList(newOrder).then(() => setProcessing(false));
  };

  const moveDown = async (index) => {
    setProcessing(true);

    if (index === userLinks.length - 1) return;
    const newOrder = reorder(userLinks, index, index + 1);

    await userStore.resetLinkList(newOrder).then(() => setProcessing(false));
  };

  return (
    <div className={`flex flex-col gap-4`}>
      {userLinks.map((link, index) => (
        <article
          className="relative flex flex-row items-center justify-start"
          key={link.id}
        >
          <section className="mr-2 py-4 flex flex-col gap-10">
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
                index === userLinks.length - 1 ? "opacity-0" : "opacity-100"
              } hover:shadow-xl shadow-black/50 transition-all duration-300`}
              disabled={index === userLinks.length - 1}
              onClick={() => moveDown(index)}
              title="Move Link Down"
            >
              <BsArrowDownSquare
                size={20}
                className="text-dashboard-secondary-dark/70 hover:text-primary-dark dark:text-dashboard-secondary-light/60 hover:dark:text-primary-light transition-all duration-300"
              />
            </button>
          </section>
          <LinkBlock
            id={link.id}
            title={link.title}
            url={link.url}
            isPublic={link.public}
          />
        </article>
      ))}
    </div>
  );
});

export default LinksList;
