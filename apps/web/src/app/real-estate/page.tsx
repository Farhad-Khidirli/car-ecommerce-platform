import { CategoryPageView } from "../category-page";
import { getCategory } from "../sample-data";

type RealEstatePageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function RealEstatePage({ searchParams }: RealEstatePageProps) {
  const params = await searchParams;
  return <CategoryPageView category={getCategory("real-estate")!} query={params.q ?? ""} />;
}
