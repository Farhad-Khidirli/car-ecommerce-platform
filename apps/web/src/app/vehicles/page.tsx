import { CategoryPageView } from "../category-page";
import { getCategory } from "../sample-data";

export default function VehiclesPage() {
  return <CategoryPageView category={getCategory("vehicles")!} />;
}
