import { ObjectID }   from "bson";
import { SchemaType } from "mongoose";

export * from "mongoose";

// @ts-ignore
declare const RestaurantId = new SchemaType('RestaurantId', {type: ObjectID, required: true});

export type Items = {
    id: number; name: string; type?: number; unit?: string; price?: number; ammount?: number; currency?: string; importance?: boolean; description?: string;
}

export type Categories = {
    id: number; name: string; items: [ Items ];
}

export type OpeningHours = {
    monday: [ Int8Array[] ], tuesday: [ Int8Array[] ], wednesday: [ Int8Array[] ], thursday: [ Int8Array[] ], friday: [ Int8Array[] ], saturday: [ Int8Array[] ], sunday: [ Int8Array[] ],
}
export type TagsTags = {
    id: number; name: string;
}
export type Tags = {
    id: number; name: string; tags: [ TagsTags ];
}
export type Photos = {
    id: number; original_url: string; thumbnail_url: string;
}
export type CoverPhoto = {
    id: number; original_url: string; thumbnail_url: string;
}
export type MenusId = {
    $oid: string;
}

export declare type RestaurantsListElm = {
    endpoint: string; type: string; error: string | Error; data: [ any ] | object;
};
