import supabase from "@/config/Supbase";

const usersTable = process.env.NEXT_SUPABASE_USERS_TABLE;

const fetchUserData = async (userId) => {
  const { data, error } = await supabase
    .from(usersTable)
    .select()
    .eq("clerk_user_id", userId);

  if (error) {
    console.log(`Error fetching user data: ${error}`);
    return null;
  }

  return data;
};

const createUser = async (userId) => {};

export { fetchUserData, createUser };
