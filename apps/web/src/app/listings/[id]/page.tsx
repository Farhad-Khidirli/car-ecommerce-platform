import { ListingDetail } from "./ListingDetail";

type ListingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  return <ListingDetail id={id} />;
}
