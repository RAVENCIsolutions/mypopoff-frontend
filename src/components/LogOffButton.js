"use client";

import { useClerk } from "@clerk/nextjs";
import userStore from "@/stores/UserStore";
import { CgLogOff } from "react-icons/cg";

const LogOffButton = () => {
  return (
    <article
      className="cursor-pointer"
      onClick={async () => {
        useClerk()
          .signOut()
          .then(async () => {
            await userStore.logoutUser();
          });
      }}
    >
      <p
        className={`flex gap-1 text-dashboard-primary-light hover:text-action transition-all duration-300`}
      >
        <CgLogOff size={20} /> <span className="text-sm">Logout</span>
      </p>
    </article>
  );
};

export default LogOffButton;
