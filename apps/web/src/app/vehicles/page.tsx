import { CategoryPageView } from "../category-page";
import { getCategory } from "../sample-data";

type VehiclesPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function VehiclesPage({ searchParams }: VehiclesPageProps) {
  const params = await searchParams;
  return <CategoryPageView category={getCategory("vehicles")!} query={params.q ?? ""} />;
}
