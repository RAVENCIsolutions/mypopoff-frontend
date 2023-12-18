export async function generateMetadata({ params }) {
  return {
    title: `@${params.influencer} | My Pop Off`,
  };
}

export default function InfluencerPage({ params }) {
  const influencerData = [
    {
      handle: "samplify",
      featuredImage: "https://picsum.photos/400/400",
    },
  ];

  return (
    <div>
      <h1>Influencer Page: {params.influencer}</h1>
    </div>
  );
}
