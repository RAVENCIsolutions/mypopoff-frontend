import { removeFromStorage, saveToStorage } from "@/utility/localStorageUtils";
import { supabase } from "@/config/Supbase";

const USER_DATA_KEY = "userData";
const LOGIN_SESSION_KEY = "loginSession";

const processLogOut = async () => {
  removeFromStorage(USER_DATA_KEY);
  removeFromStorage(LOGIN_SESSION_KEY);
  await supabase.auth.signOut();
};

const processLogin = (data, rememberMe) => {
  const now = new Date().getTime();

  saveToStorage(USER_DATA_KEY, data);
  saveToStorage(LOGIN_SESSION_KEY, {
    rememberMe,
    lastLogin: now,
    lastModified: now,
    lastFetch: now,
  });
};

export { processLogOut, processLogin };
