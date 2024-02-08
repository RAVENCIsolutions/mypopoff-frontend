"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return isSignedIn ? (
    router.push("/auth/redirect")
  ) : (
    <SignUp
      signInUrl={"/auth/login"}
      afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL}
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
