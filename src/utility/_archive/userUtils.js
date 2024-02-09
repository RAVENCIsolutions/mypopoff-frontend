import { defaultUser } from "@/data/defaultUser";
import supabase from "@/config/Supbase";

const userKeyInLocalStorage = "userData";
const userTable = process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE;

// PRIVATE FUNCTIONS
// PRIVATE FUNCTIONS
// PRIVATE FUNCTIONS

// validate user data
const validateData = (data) => {
  const typicalFields = Object.keys(defaultUser);

  // check if all fields are present
  for (const field of typicalFields) {
    if (!data[field]) {
      return false;
    }
  }

  return true;
};

// create user row in database
const createUser = async (clerkUserId, userData) => {
  const dataToInsert = { ...userData, clerk_user_id: clerkUserId };

  const { data, error } = await supabase
    .from(userTable)
    .insert([dataToInsert])
    .select();

  if (error) {
    console.error(`Error creating user record: ${error.message}`);
    return { error };
  }

  return { data: data[0] };
};

// check if user row exists in database
const fetchUser = async (clerkUserId) => {
  const { data, error } = await supabase
    .from(userTable)
    .select()
    .eq("clerk_user_id", clerkUserId)
    .single();

  if (error) {
    console.error(`Error checking if user record exists: ${error.message}`);
    return { error };
  }

  return { data: data[0] };
};

// load user data from local storage
const loadDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem(userKeyInLocalStorage));
};

// save user data to local storage
const saveDataToLocalStorage = (data) => {
  localStorage.setItem(userKeyInLocalStorage, JSON.stringify(data));
};

// PUBLIC FUNCTIONS
// PUBLIC FUNCTIONS
// PUBLIC FUNCTIONS

// safe create user
const safeCreateUser = async (clerkUserId, data) => {
  const dataToInsert = validateData(data) ? { ...data } : { ...defaultUser };

  return await createUser(clerkUserId, dataToInsert);
};

// load user data from database
const loadUserFromDatabase = async (clerkUserId) => {
  try {
    return await fetchUser(clerkUserId);
  } catch (error) {
    return { error };
  }
};

// save user data to database
const updateUserInDatabase = async (clerkUserId, newData) => {
  try {
    const { data, error } = await supabase
      .from(userTable)
      .update(newData)
      .eq("clerk_user_id", clerkUserId)
      .select();

    if (error) {
      console.error(`Error updating user record: ${error.message}`);
      return { error };
    } else {
      if (data && data.length === 0) {
        return await safeCreateUser(clerkUserId, newData);
      } else if (data && data.length > 0) {
        return { data: data[0] };
      }
    }
  } catch (error) {
    return { error };
  }
};

// check if user data exists in local storage
const existsInLocalStorage = () => {
  return localStorage.getItem(userKeyInLocalStorage) !== null;
};

// safe load user data from local storage
const safeLoadDataFromLocalStorage = () => {
  if (existsInLocalStorage()) {
    const getData = loadDataFromLocalStorage();

    if (validateData(getData)) {
      return getData;
    } else {
      removeUserDataFromLocalStorage();
      safeSaveDataToLocalStorage(defaultUser);
      return defaultUser;
    }
  }

  return defaultUser;
};

// safe save user data to local storage
const safeSaveDataToLocalStorage = (data) => {
  if (validateData(data)) {
    saveDataToLocalStorage(data);
  }
};

// clear user data from local storage
const removeUserDataFromLocalStorage = () => {
  localStorage.removeItem(userKeyInLocalStorage);
};

export {
  safeCreateUser,
  loadUserFromDatabase,
  updateUserInDatabase,
  existsInLocalStorage,
  safeLoadDataFromLocalStorage,
  safeSaveDataToLocalStorage,
  removeUserDataFromLocalStorage,
  validateData,
};
