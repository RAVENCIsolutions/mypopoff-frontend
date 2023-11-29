import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CookiesPolicy() {
  return (
    <main className="mx-auto flex flex-col items-start justify-start overflow-hidden w-full max-w-windowed">
      <NavBar />

      <section className="px-5 lg:px-14 text-primary-dark dark:text-primary-light/80">
        <h1 className="mb-8 leading-tight font-bold text-primary-dark dark:text-primary-light text-center md:text-left text-xl md:text-4xl">
          Cookie Policy
        </h1>
        <p className="text-base md:text-lg mb-4">
          Effective Date: <strong>29 November 2023</strong>
        </p>
        <p className="text-base md:text-lg mb-4">
          We use cookies to help improve your experience of our website at{" "}
          <Link className="text-action" href="https://mypopoff.com">
            https://mypopoff.com
          </Link>
          . This cookie policy is part of <strong>My Pop Off</strong>'s privacy
          policy. It covers the use of cookies between your device and our site.
        </p>
        <p className="text-base md:text-lg mb-4">
          We also provide basic information on third-party services we may use,
          who may also use cookies as part of their service. This policy does
          not cover their cookies.
        </p>
        <p className="text-base md:text-lg mb-4">
          If you don’t wish to accept cookies from us, you should instruct your
          browser to refuse cookies from{" "}
          <Link className="text-action" href="https://mypopoff.com">
            https://mypopoff.com
          </Link>
          . In such a case, we may be unable to provide you with some of your
          desired content and services.
        </p>
        <h2 className="mt-8 mb-4 text-lg md:text-2xl font-bold">
          What is a cookie?
        </h2>
        <p className="text-base md:text-lg mb-4">
          A cookie is a small piece of data that a website stores on your device
          when you visit. It typically contains information about the website
          itself, a unique identifier that allows the site to recognise your web
          browser when you return, additional data that serves the cookie’s
          purpose, and the lifespan of the cookie itself.
        </p>
        <p className="text-base md:text-lg mb-4">
          Cookies are used to enable certain features (e.g. logging in), track
          site usage (e.g. analytics), store your user settings (e.g. time zone,
          notification preferences), and to personalize your content (e.g.
          advertising, language).
        </p>
        <p className="text-base md:text-lg mb-4">
          Cookies set by the website you are visiting are usually referred to as
          first-party cookies. They typically only track your activity on that
          particular site.
        </p>
        <p className="text-base md:text-lg mb-4">
          Cookies set by other sites and companies (i.e. third parties) are
          called third-party cookies They can be used to track you on other
          websites that use the same third-party service.
        </p>
        <h2 className="mt-8 mb-4 text-lg md:text-2xl font-bold">
          How Can You Control Our Website's Use of Cookies?
        </h2>
        <p className="text-base md:text-lg mb-4">
          You have the right to decide whether to accept or reject cookies on
          our Website. You can manage your cookie preferences in our Cookie
          Consent Manager. The Cookie Consent Manager allows you to select which
          categories of cookies you accept or reject. Essential cookies cannot
          be rejected as they are strictly necessary to provide you with the
          services on our Website.
        </p>
        <p className="text-base md:text-lg mb-4">
          You may also be able to set or amend your cookie preferences by
          managing your web browser settings. As each web browser is different,
          please consult the instructions provided by your web browser
          (typically in the &quot;help&quot; section). If you choose to refuse
          or disable cookies you may still use the Website, though some of the
          functionality of the Website may not be available to you.
        </p>
        <h2 className="mt-8 mb-4 text-lg md:text-2xl font-bold">
          How Often Will We Update This Cookie Policy?
        </h2>
        <p className="text-base md:text-lg mb-4">
          We may update this Cookie Policy from time to time in order to reflect
          any changes to the cookies and related technologies we use, or for
          other operational, legal or regulatory reasons.
        </p>
        <p className="text-base md:text-lg mb-4">
          Each time you use our Website, the current version of the Cookie
          Policy will apply. When you use our Website, you should check the date
          of this Cookie Policy (which appears at the top of this document) and
          review any changes since the last version.
        </p>
        <h2 className="mt-8 mb-4 text-lg md:text-2xl font-bold">
          Where Can You Obtain Further Information?
        </h2>
        <p className="text-base md:text-lg mb-4">
          For any questions or concerns regarding our Cookie Policy, you may
          contact us using the following details:
        </p>
        <p className="text-base md:text-lg mb-4">
          <strong>My Pop Off</strong>
          <br />
          https://mypopoff.com/contact
        </p>
      </section>

      <Footer />
    </main>
  );
}
