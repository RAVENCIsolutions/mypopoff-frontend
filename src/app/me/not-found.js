"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    router.push("/me");
  }, []);

  return (
    <main>
      <section className="p-5 md:p-6 w-full h-full rounded-sm">
        <h1 className={`mb-4 text-2xl font-bold`}>Oops!</h1>
        <p className={`text-base`}>
          Looks like you stumbled on a page that doesn't exist.
          <br />
          You will be automatically redirected soon!
        </p>
      </section>
    </main>
  );
}
