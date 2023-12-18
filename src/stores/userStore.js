import { defaultUser } from "@/data/defaultUser";
import { makeAutoObservable } from "mobx";
import supabase from "@/config/Supbase";

class UserStore {
  userData = defaultUser;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(data) {
    this.userData = { ...defaultUser, ...data };
  }

  async createUser(clerkUserId) {
    const { data, error } = await supabase
      .from(process.env.NEXT_SUPABASE_USERS_TABLE)
      .insert([{ ...this.userData, clerk_user_id: clerkUserId }]);

    if (error) {
      console.error(`Error creating user record: ${error.message}`);
      return { error };
    }

    this.setUser(data[0]);
    return { data: data[0] };
  }

  async fetchUser(clerkUserId) {
    const { data, error } = await supabase
      .from(process.env.NEXT_SUPABASE_USERS_TABLE)
      .select("*")
      .eq("clerk_user_id", clerkUserId)
      .single();

    if (error && error.message !== `No rows found`) {
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
