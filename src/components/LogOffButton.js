"use client";

import { useClerk } from "@clerk/nextjs";
import userStore from "@/stores/UserStore";

import { CgLogOff } from "react-icons/cg";
import { supabase } from "@/config/Supbase";
import { useRouter } from "next/navigation";

const LogOffButton = () => {
  const router = useRouter();

  return (
    <article
      className="cursor-pointer"
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
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
