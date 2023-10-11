import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Start your free Pop Off journey!",
  description:
    "Register a new Pop Off account for free and start your creative journey!",
};

export default function Register() {
  return (
    <section className="flex items-center justify-center h-screen min-h-fit">
      <SignUp />
    </section>
  );
}
