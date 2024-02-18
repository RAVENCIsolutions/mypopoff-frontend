import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function SecurityPage() {
  return (
    <main
      className={`flex flex-col items-center justify-start w-full min-h-dvh overflow-hidden`}
    >
      <NavBar />
      <section className={`py-6 md:py-10 px-4 max-w-xl`}>
        <h1 className={`mb-4 text-xl md:text-4xl font-bold`}>
          Security, First and Foremost
        </h1>
        <p className={`mb-4 text-base`}>
          My Pop Off cares about your privacy and security which is why we have
          a set of processes in place to ensure that your private data is never
          shared with anyone else.
        </p>
        <p className={`mb-4 text-base`}>
          Before we go on, let us make one thing clear:{" "}
          <strong>
            My Pop Off will never sell your private data to third-parties.
          </strong>{" "}
          That's not a promise that many platforms these days can make, and it's
          not a promise that we make lightly.
        </p>
        <p className={`mb-4 text-base`}>
          To authenticate your account, we simply ask for an email address and
          password. These are never shared outside of registration and logging
          in. Your email address is stored in a SOC 2 and CCPA compliant
          database along with a single-direction hashed version of your
          password.
        </p>
        <p className={`mb-4 text-base`}>
          Yor landing page customisations are not stored on the same database or
          even on the same server as your authentication information. This means
          that the only private details that you ever share with My Pop Off will
          never be accessible to anyone, not even by accident.
        </p>
        <h2 className={`mt-8 mb-4 text-lg md:text-xl font-bold`}>
          How Can I Protect Myself Even More?
        </h2>
        <p className={`mb-4 text-base`}>
          My Pop Off staff will never ask you for your password so never ever
          share that with anyone.
        </p>
        <p className={`mb-4 text-base`}>
          If you ever forget your password, the only way to gain access back to
          your account is by following the prompts from the{" "}
          <Link href={`/login`}>Login page</Link> for "Forgot Password?" which
          will guide you to reset your password.
        </p>
        <p className={`mb-4 text-base`}>
          Another thing to be careful of is when customising your landing page
          and adding account details (eg. bio description, tags, etc), you
          should not share any personal information that you don't want people
          to gain access to. Your bio description is used to personalise your
          page to you so it's important that you are comfortable that what you
          are sharing cannot be used against you.
        </p>
      </section>
      <Footer />
    </main>
  );
}
