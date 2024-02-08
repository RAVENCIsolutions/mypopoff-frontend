import { makeAutoObservable } from "mobx";
import { defaultUser } from "@/data/defaultUser";
import supabase from "@/config/Supbase";
import {
  loadUserFromDatabase,
  safeCreateUser,
  safeLoadDataFromLocalStorage,
  safeSaveDataToLocalStorage,
} from "@/utility/userUtils";

class UserStore {
  // initialise user data
  userData = defaultUser;

  constructor() {
    makeAutoObservable(this);
  }

  // update store data with data from local storage
  updateStoreFromLocalStorage() {
    const userData = safeLoadDataFromLocalStorage();

    this.userData = userData ? userData : defaultUser;
  }

  // update local storage with store data
  saveUserToLocalStorage() {
    safeSaveDataToLocalStorage(this.userData);
  }

  setUser(userData) {
    this.userData = userData;
    this.saveUserToLocalStorage();
  }

  async createUser(clerkUserId) {
    let returnedData = {};

    try {
      returnedData = await safeCreateUser(clerkUserId, this.userData);
    } catch (error) {
      returnedData = { ...defaultUser };
    }

    this.setUser(returnedData);
    return { data: returnedData };
  }

  async fetchUser(clerkUserId) {
    const { data, error } = await supabase
      .from(process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE)
      .select()
      .eq("clerk_user_id", clerkUserId)
      .single();

    if (error) {
      console.error(`Error fetching user record: ${error.message}`);
    }

    if (data) {
      this.setUser(data);
      return { data };
    } else {
      // No user record found, create a new user
      return await this.createUser(clerkUserId);
    }
  }

  async updateUser(clerkUserId, newData) {
    const { data, error } = await supabase
      .from(process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE)
      .update(newData)
      .eq("clerk_user_id", clerkUserId)
      .select();

    if (error) {
      console.error(`Error updating user record: ${error.message}`);
    }

    return data;
  }
}

const userStore = new UserStore();
export default userStore;
