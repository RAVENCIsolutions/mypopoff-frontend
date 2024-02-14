import InfluencerComponent from "@/components/InfluencerComponent";
import { fetchUsername } from "@/utility/dbUtils";
import { notFound, useParams } from "next/navigation";
import Layout01 from "@/templates/layout-01";

async function getData(username) {
  const userData = await fetchUsername(username);

  if (!userData) {
    notFound();
  }

  return userData;
}

export async function generateMetadata({ params }) {
  const { username } = await getData(params.influencer);

  return {
    title: `@${username} | My Pop Off`,
  };
}

export default async function Page({ params }) {
  const userData = await getData(params.influencer);

  return userData && <Layout01 userData={userData} />;
}
