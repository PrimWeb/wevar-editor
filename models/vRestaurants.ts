// noinspection JSClassNamingConvention

export type VRestaurants = Restaurant[];

export type RestaurantId = {
    $oid: string;
}
export type RestaurantOpeningHours = {
    monday: Int8Array[][], tuesday: Int8Array[][], wednesday: Int8Array[][], thursday: Int8Array[][], friday: Int8Array[][], saturday: Int8Array[][], sunday: Int8Array[][],
}
export type RestaurantTagsTags = {
    id: number; name: string;
}
export type RestaurantTags = {
    id: number; name: string; tags: RestaurantTagsTags[];
}
export type RestaurantPhotos = {
    id: number; original_url: string; thumbnail_url: string;
}
export type RestaurantCoverPhoto = {
    id: number; original_url: string; thumbnail_url: string;
}
export type RestaurantMenusId = {
    $oid: string;
}
export type RestaurantMenusRestaurantsId = {
    $oid: string;
}
export type RestaurantMenusCategoriesItems = {
    id: number; type: number; description: string;
}
export type RestaurantMenusCategories = {
    id: number; name: string; items: RestaurantMenusCategoriesItems[];
}
export type RestaurantMenus = {
    _id: RestaurantMenusId; restaurants_id: RestaurantMenusRestaurantsId; id: number; name: string; type: number; restu_url: string; categories: RestaurantMenusCategories[];
}
export type RestaurantDailyMenusId = {
    oid: string;
}
export type RestaurantDailyMenusRestaurantsId = {
    oid: string;
}
export type RestaurantDailyMenusItems = {
    id: number; name: string; price: number; currency: string;
}
export type RestaurantDailyMenus = {
    _id: RestaurantDailyMenusId; restaurants_id: RestaurantDailyMenusRestaurantsId; date: string; items: RestaurantDailyMenusItems[];
}
export type Restaurant = {
    _id: RestaurantId; description: string; phone: string[]; email: string; web: string; review_count: number; accepts_vouchers: boolean; has_menu: boolean; has_daily_menu: boolean; number_of_checkin: number; reservation_duration_min: number; reservation_duration_max: number; web_url: string; opening_hours: RestaurantOpeningHours; smoking_type: number; tags: RestaurantTags[]; photos: RestaurantPhotos[]; name: string; seo_name: string; street: string; city: string; zip_code: string; review_rating: number; cover_photo: RestaurantCoverPhoto; id: number; gps_lat: number; gps_lon: number; verified: boolean; can_make_reservation: boolean; menus: RestaurantMenus[]; daily_menus: RestaurantDailyMenus[];
};
