import { CategoryPageView } from "../category-page";
import { getCategory } from "../sample-data";

type GoodsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function GoodsPage({ searchParams }: GoodsPageProps) {
  const params = await searchParams;
  return <CategoryPageView category={getCategory("goods")!} query={params.q ?? ""} />;
}
