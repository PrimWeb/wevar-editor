// noinspection JSClassNamingConvention
import { DailyMenus }                             from "./daily_menus";
import { Menus }                                  from "./menus";
import { CoverPhoto, OpeningHours, Photos, Tags } from "../components/restaurants";
import { RestaurantId }                           from "./vRestaurants";

export * from "../components/restaurants";
export * from "./@types";

export type Restaurant = {
    _id: RestaurantId;
    description: string;
    phone: string[];
    email: string;
    web: string;
    review_count: number;
    accepts_vouchers: boolean;
    has_menu: boolean;
    has_daily_menu: boolean;
    number_of_checkin: number;
    reservation_duration_min: number;
    reservation_duration_max: number;
    web_url: string;
    opening_hours: [OpeningHours];
    smoking_type: number;
    tags: [Tags];
    photos: [Photos];
    name: string;
    seo_name: string;
    street: string;
    city: string;
    zip_code: string;
    review_rating: number;
    cover_photo: CoverPhoto;
    id: number;
    gps_lat: number;
    gps_lon: number;
    verified: boolean;
    can_make_reservation: boolean;
    menus: [Menus];
    daily_menus: [DailyMenus];
}
