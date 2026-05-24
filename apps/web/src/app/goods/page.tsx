import { CategoryPageView } from "../category-page";
import { getCategory } from "../sample-data";

export default function GoodsPage() {
  return <CategoryPageView category={getCategory("goods")!} />;
}
