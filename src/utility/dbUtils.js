import supabase from "@/config/Supbase";
import { users } from "@clerk/nextjs/api";

const usersTable = process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE;

const fetchUser = async (id) => {
  const { data, error } = await supabase
    .from(usersTable)
    .select()
    .eq("clerk_user_id", id)
    .single();

  if (error) return false;

  return data;
};

const fetchUsername = async (value) => {
  const { data, error } = await supabase
    .from(usersTable)
    .select()
    .eq("username", value)
    .single();

  console.log(error);
  return !error;
};

const createUser = async (id, saveData) => {
  const { data, error } = await supabase
    .from(usersTable)
    .insert({ ...saveData, clerk_user_id: id })
    .select();

  if (error) return false;

  return data;
};

const updateUser = async (id, dataToSave) => {
  const { error } = await supabase
    .from(usersTable)
    .update({ ...dataToSave })
    .eq("clerk_user_id", id);

  console.log(error);
  return !error;
};

export { fetchUser, fetchUsername, createUser, updateUser };
