import { defaultUser } from "@/data/defaultUser";
import { makeAutoObservable } from "mobx";
import supabase from "@/config/Supbase";

class UserStore {
  userData = defaultUser;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromLocalStorage();
  }

  setUser(data) {
    this.userData = { ...defaultUser, ...data };
    this.saveUserToLocalStorage(data);
  }

  loadUserFromLocalStorage() {
    const userData = localStorage.getItem("userData");
    if (userData) {
      this.userData = JSON.parse(userData);
    }
  }

  saveUserToLocalStorage(userData) {
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  clearUserFromLocalStorage() {
    localStorage.removeItem("userData");
    this.userData = defaultUser;
  }

  async createUser(clerkUserId) {
    const dataToInsert = { ...this.userData, clerk_user_id: clerkUserId };
    console.log(dataToInsert);

    const { data, error } = await supabase
      .from(process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE)
      .insert([dataToInsert])
      .select();

    if (error) {
      console.error(`Error creating user record: ${error.message}`);
      return { error };
    }

    this.setUser(data[0]);
    return { data: data[0] };
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
}

const userStore = new UserStore();
export default userStore;
