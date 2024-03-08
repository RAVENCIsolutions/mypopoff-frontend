import { supabase } from "@/config/Supbase";
import { generateRandomString } from "@/utility/generalUtils";

const usersTable = process.env.NEXT_PUBLIC_SUPABASE_USERS_TABLE;
const usersImages = process.env.NEXT_PUBLIC_SUPABASE_IMAGES_BUCKET;
const usersAvatars = process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET;

const fetchUser = async (id) => {
  const { data, error } = await supabase
    .from(usersTable)
    .select()
    .eq("uid", id)
    .single();

  if (error) return false;

  return data;
};

const fetchUsername = async (value) => {
  const { data, error } = await supabase
    .from(usersTable)
    .select(
      "username, bio, category, otherCategory, tags, page_layout, button_style, palette, links, images, public"
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
    .insert({ ...saveData, uid: id })
    .select();

  if (error) return false;

  return data;
};

const updateUser = async (id, dataToSave) => {
  console.log("Saving");
  console.log(dataToSave);

  const { error } = await supabase
    .from(usersTable)
    .update({ ...dataToSave })
    .eq("uid", id);

  return !error;
};

const uploadImage = async (id, file) => {
  const uploadFilename = `${id}_${generateRandomString(10)}_${btoa(
    file.name.toString()
  )}.${file.extension}`;

  const { data, error } = await supabase.storage
    .from(usersImages)
    .upload(`/${uploadFilename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return false;

  return data;
};

const uploadAvatar = async (id, file) => {
  const uploadFilename = `${id}_${generateRandomString(10)}_${btoa(
    file.name.toString()
  )}.${file.extension}`;

  const { data, error } = await supabase.storage
    .from(usersAvatars)
    .upload(`/${uploadFilename}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return false;

  return data;
};

const exploreAll = async () => {
  const { data, error } = await supabase
    .from(usersTable)
    .select()
    .neq("username", "")
    .is("public", true);

  if (error) return false;
  return data;
};

const searchAll = async (value) => {
  const searchWords = value.split(/\s+/).filter(Boolean);

  const filters =
    searchWords
      .map(
        (word) =>
          `(bio.ilike.%${word}%, category.ilike.%${word}%, tags::text ilike '%${word}%')`
      )
      .join(",") +
    `or(bio.ilike.%${value}%, category.ilike.%${value}%, tags::text ilike '%${value}%)'`;

  const { data, error } = await supabase.from(usersTable).select().or(filters);

  if (error) return false;
  return data;
};

const getImage = async (filename) => {
  const { data } = supabase.storage.from(usersImages).getPublicUrl(filename);

  return data;
};

export {
  fetchUser,
  fetchUsername,
  usernameExists,
  createUser,
  updateUser,
  uploadImage,
  uploadAvatar,
  getImage,
  exploreAll,
  searchAll,
};
