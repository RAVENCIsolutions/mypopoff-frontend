import InfluencerComponent from "@/components/InfluencerComponent";
import { fetchUsername } from "@/utility/dbUtils";
import { notFound, useParams } from "next/navigation";

async function getData(username) {
  const userData = await fetchUsername(username);

  if (!userData) {
    notFound();
  }

  return userData;
}

// export async function generateMetadata({ userData }) {
//   return {
//     title: `${userData.username} | My Pop Off`,
//   };
// }

export default async function Page({ params }) {
  console.log(await getData(params.influencer));

  return <div>{JSON.stringify(await getData(params.influencer))}</div>;
  // const data = getData(userData.username);
  // console.log(data);
  // return <InfluencerComponent username={userData.username} />;
}
