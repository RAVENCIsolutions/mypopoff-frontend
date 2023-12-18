import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthRedirect() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in page if user is not signed in
    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, []);
}
