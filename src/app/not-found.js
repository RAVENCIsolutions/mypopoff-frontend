import Link from "next/link";
import MPOLetterMark from "@/components/MPOLetterMark";

export default function NotFound() {
  return (
    <>
      <title>Page Not Found | My Pop Off</title>

      <main>
        <article
          className={`flex items-center justify-center min-w-full min-h-dvh bg-primary-dark`}
        >
          <section className={`text-center text-primary-light`}>
            <MPOLetterMark
              width={80}
              className={`mx-auto mb-10 fill-primary-light`}
            />
            <h1 className={`text-2xl font-bold`}>
              It looks like this Pop Off doesn't yet exist
            </h1>
            <p className={`text-lg`}>
              Would you like to claim it?{" "}
              <Link href={`/auth/register`} className={`text-action underline`}>
                Make your Pop Off.
              </Link>
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
