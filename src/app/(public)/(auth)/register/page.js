import { SignUp } from "@clerk/nextjs";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export const metadata = {
  title: "Start your free Pop Off journey!",
  description:
    "Register a new Pop Off account for free and start your creative journey!",
};

export default function Register() {
  return (
    <SignUp
      appearance={{
        elements: {
          formFieldLabel: "font-sans text-sm font-light",
          formFieldInput:
            "font-sans text-base font-medium outline-active focus:shadow-lg transition-all duration-300",
          socialButtonsBlockButtonText: "font-sans text-sm font-medium",
          footerActionLink:
            "text-action hover:text-action/70 transition-all duration-300",
          formButtonPrimary:
            "bg-action hover:bg-action/70 focus:shadow-none transition-all duration-300",
        },
      }}
    />
  );
}
