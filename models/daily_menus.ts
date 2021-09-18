import { Items }        from "../types/restaurants";
import { RestaurantId } from "./vRestaurants";

export type DailyMenus = {
    restaurants_id: RestaurantId; date: string; items: Items[];
}
