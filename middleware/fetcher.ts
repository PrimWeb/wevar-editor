// import { useSWRConfig } from "swr";
import fetch                 from 'cross-fetch';
import { getLocationOrigin } from "next/dist/shared/lib/utils";

export const fetcher = async (urlProp) => {
    let url = urlProp.startsWith('http') ? urlProp : (typeof window !== "undefined" ? getLocationOrigin()
        : 'https://we.prim.dev') + urlProp;
    console.log('Fetching', url);
    const [ res ] = await Promise.all([
        fetch(url, {
            mode: 'cors', referrerPolicy: 'same-origin', headers: new Headers({
                "Accept-Language": "cs", "Content-Type": "application/json", "X-Restu-Api-Key": process.env.API_KEY
            }) //
            //mode: 'no-cors', referrerPolicy: 'same-origin', 
        }).then(async (res) => await res.json())
    ]);
    return res;
};

const fetcherMiddleware = (useSWRNext) => {
    return (key, fetcher, config) => {
        // Before hook runs...
        console.log('Before: ', key);
        // Handle the next middleware, or the `useSWR` hook if this is the last one.
        const swr = useSWRNext(key, fetcher, config);
        // After hook runs...
        console.log('After: ', swr);

        return swr;
    }
};

export default fetcherMiddleware;
