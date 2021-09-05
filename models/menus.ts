import { Categories, RestaurantId } from "./@types";

export type Menus = {
    restaurants_id: RestaurantId;
    id: number;
    name: string;
    type: number;
    restu_url: string;
    categories: Categories[];
}
