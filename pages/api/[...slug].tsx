import { fetcher } from "../../middleware/fetcher";

export default async function handler(req, res) {
    const data = await fetcher(req.url.replace('/api/r1', process.env.API_URL));

    if (await data) {
        res.status(200).json(data);
    }
}
