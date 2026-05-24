import { CategoryPageView } from "../category-page";
import { getCategory } from "../sample-data";

export default function RealEstatePage() {
  return <CategoryPageView category={getCategory("real-estate")!} />;
}
