import React          from 'react';
import useSWR         from "swr";
import { randomUUID } from "crypto";
import { Container }  from "../../selectors";

export let error: Error;
export let data: any;

declare const RestaurantsList = (props: React.PropsWithChildren<any>) => {
    // noinspection JSVoidFunctionReturnValueUsed
    let ret = <Container {...props}
                         className="RestaurantsList-dt"
                         custom={{
                             data: null,
                             endpoint: '/restaurants',
                             error: Error,
                             url: URL
                         }}
    />;
    let url: string;
    url = String(process.env.API_URL) + endpoint;
    ({data, error} = useSWR(url));
    console.log(ret);
    data = this.data = data;
    ret.custom.error = this.error = error;
};

export default RestaurantsList;

export const render = (props) => (
    <RestaurantsList {...props} key={randomUUID()}/>
);

//
// export const setError: RestaurantsListElement = (message: string) => {
//     error = new Error(message);
//     return this;
// }

// export const hasError: boolean = () => !!this.error;
