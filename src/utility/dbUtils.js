import supabase from "@/config/Supbase";
import { users } from "@clerk/nextjs/api";

const usersTable = process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE;
const usersImages = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_BUCKET;

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
    .select(
      "username, bio, category, otherCategory, tags, page_layout, button_style, palette, links",
    )
    .eq("username", value)
    .single();

  if (error) return false;
  return data;
};

const usernameExists = async (value) => {
  const { data, error } = await supabase
    .from(usersTable)
    .select()
    .eq("username", value)
    .single();

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

// const uploadImage = async (id, file) => {
//   console.log(Date.now());
//
//   return;
//   const uploadFilename = `${id}_${Date.now()}_${btoa(file.name.toString())}.${
//     file.extension
//   }`;
//
//   const { data, error } = await supabase.storage
//     .from(usersImages)
//     .upload(`/${uploadFilename}`, file, {
//       cacheControl: "3600",
//       upsert: false,
//     });
//
//   if (error) return false;
//
//   return data;
// };

export { fetchUser, fetchUsername, usernameExists, createUser, updateUser };
