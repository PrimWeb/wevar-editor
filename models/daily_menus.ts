import { Items, RestaurantId } from "./@types";

export type DailyMenus = {
    restaurants_id: RestaurantId;
    date: string;
    items: Items[];
}
