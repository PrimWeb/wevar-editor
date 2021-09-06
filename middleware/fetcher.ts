import { Error } from "mongoose";

const fetcherMiddleware = (useSWRNext) => {
    return (key, fetcher, config) => {
        // Before hook runs...
        console.log('Before: ', key);
        // Handle the next middleware, or the `useSWR` hook if this is the last one.
        const swr = useSWRNext(key, fetcher, config)
        // After hook runs...
        console.log('After: ', swr);
        const extendedFetcher = (...args) => {
            console.log('SWR Args:', ...args)
            // If the status code is not in the range 200-299,
            // we still try to parse and throw it.
            if (!swr.ok) {
                const error = new Error('An error occurred while fetching the data.')
                // Attach extra info to the error object.
                error.stack = swr.json()
                error.name = swr.status
                throw error
            }

            return fetcher(...args)
        }
        return swr
    }
}

export const fetcher = async (url) => {
    const res = await fetch(url, {
        headers: new Headers({
            "Content-Type": "application/json",
            "X-Restu-Api-Key": process.env.API_KEY,
        }),
    }).then(async (res) => await res.json());

    return res;
}

export default fetcherMiddleware;
