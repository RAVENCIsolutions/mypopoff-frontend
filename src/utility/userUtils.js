import {
  removeFromStorage,
  updateLastModified,
  updateLastSession,
  updateRememberMe,
} from "@/utility/localStorageUtils";

import { supabase } from "@/config/Supbase";

const REMEMBER_ME_KEY = "remember";
const LAST_MODIFIED_KEY = "latestMod";
const LAST_SESSION_KEY = "latestSes";

const processLogOut = async () => {
  removeFromStorage(REMEMBER_ME_KEY);
  removeFromStorage(LAST_SESSION_KEY);
  removeFromStorage(LAST_MODIFIED_KEY);

  await supabase.auth.signOut();
};

const processLogin = (rememberMe) => {
  updateLastSession();
  updateLastModified();
  updateRememberMe(rememberMe);
};

const verifyUserData = () => {};

export { processLogOut, processLogin };
