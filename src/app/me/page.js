import { redirect } from "next/navigation";

export default async function Me({ params }) {
  redirect("/me/dashboard");
}
