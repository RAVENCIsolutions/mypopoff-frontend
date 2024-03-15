"use client";

import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";

import LinkBlock from "@/components/LinkBlock";
import { getFromStorage, saveToStorage } from "@/utility/localStorageUtils";
import { updateUser } from "@/utility/dbUtils";

const LinksList = ({ session, userLinks = [], setUserLinks }) => {
  const updateList = async (newList) => {
    const saveData = {
      ...getFromStorage("userData"),
      links: newList,
    };

    await updateUser(session.user.id, saveData)
      .then(() => {
        saveToStorage("userData", {
          ...getFromStorage("userData"),
          ...saveData,
        });

        const loginSession = getFromStorage("loginSession");
        loginSession.lastModified = new Date().getTime();

        saveToStorage("loginSession", loginSession);
      })
      .catch((e) => {
        console.log(e);
      });

    setUserLinks(newList);
  };

  const saveNewList = async (newOrder) => {
    const saveData = {
      ...getFromStorage("userData"),
      links: newOrder,
    };

    await updateUser(session.user.id, saveData)
      .then(() => {
        saveToStorage("userData", {
          ...getFromStorage("userData"),
          ...saveData,
        });

        const loginSession = getFromStorage("loginSession");
        loginSession.lastModified = new Date().getTime();

        saveToStorage("loginSession", loginSession);

        setUserLinks(newOrder);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Function to reorder list
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);

    result.splice(endIndex, 0, removed);

    return result;
  };

  // Move Link Up one Spot
  const moveUp = async (index) => {
    if (index === 0) return;

    const newOrder = reorder(userLinks, index, index - 1);
    await saveNewList(newOrder);
  };

  // Move Link Down one Spot
  const moveDown = async (index) => {
    if (index === userLinks.length - 1) return;

    const newOrder = reorder(userLinks, index, index + 1);
    await saveNewList(newOrder);
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
            initialList={userLinks}
            updateList={updateList}
          />
        </article>
      ))}
    </div>
  );
};

export default LinksList;
