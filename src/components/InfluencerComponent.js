"use client";

import { useEffect, useState } from "react";
import { fetchUsername } from "@/utility/dbUtils";
import { defaultUser } from "@/data/defaultUser";
import { useRouter } from "next/navigation";
import Link from "next/link";

const InfluencerComponent = (props) => {
  const [influencerData, setInfluencerData] = useState(defaultUser);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { username } = props;

    const getData = async () => {
      setLoading(true);
      const data = await fetchUsername(username);

      if (data) return data;
      else setNotFound(true);
    };

    getData().then((data) => {
      setInfluencerData(data || defaultUser);
      setLoading(false);
    });
  }, []);

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : notFound ? (
        <>
          <article
            className={`flex items-center justify-center min-w-full min-h-dvh bg-primary-dark`}
          >
            <section className={`text-center text-primary-light`}>
              <h1 className={`text-2xl font-bold`}>
                It looks like this Pop Off doesn't yet exist
              </h1>
              <p className={`text-lg`}>
                Would you like to claim it?{" "}
                <Link
                  href={`/auth/register`}
                  className={`text-action underline`}
                >
                  Make your Pop Off.
                </Link>
              </p>
            </section>
          </article>
        </>
      ) : (
        <article>
          <h1>
            Username: {influencerData.username && influencerData.username}
          </h1>
          <p>Bio: {influencerData.bio && influencerData.bio}</p>
          <p>Category: {influencerData.category && influencerData.category}</p>
          <p>
            Other Category:{" "}
            {influencerData.otherCategory && influencerData.otherCategory}
          </p>
          <p>
            Tags:{" "}
            {influencerData.tags &&
              influencerData.tags.map((tag, index) => (
                <span key={`tag-${index}`}>{tag}, </span>
              ))}
          </p>
          <p>
            Links:
            <br />
            {influencerData.links &&
              influencerData.links.map((link, index) => (
                <span key={`link-${index}`}>
                  <strong>{link.id}:</strong> {link.title} ({link.url}),{" "}
                </span>
              ))}
          </p>
        </article>
      )}
    </main>
  );
};

export default InfluencerComponent;
