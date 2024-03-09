"use client";

import { CgLogOff } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { removeFromStorage } from "@/utility/localStorageUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const LogOffButton = () => {
  const router = useRouter();

  return (
    <article
      className="cursor-pointer"
      onClick={async () => {
        const supabase = createClientComponentClient();
        await supabase.auth.signOut();
        removeFromStorage("userData");
        removeFromStorage("lastFetch");
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
