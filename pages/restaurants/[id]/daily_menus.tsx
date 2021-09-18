import DailyMenusList                 from "@/components/restaurants/Elements/DailyMenusList";
import { Grid }                       from "@material-ui/core";
import { useRouter }                  from "next/router";
import useSWR                         from "swr";
import fetcherMiddleware, { fetcher } from "../../../middleware/fetcher";

const Daily_menus = () => {
    const router = useRouter();
    const {id} = router.query;
    const {data, error} = useSWR(`/api/r1/${id}/daily_menus`, fetcher, {use: [ fetcherMiddleware ]})

    if (!data) {
        return <div>Loading...</div>;
    }
    return (<><Grid container justifyContent="center" spacing={3} alignContent="center">
        <DailyMenusList items={data} title="Vybrat den ..."/>
    </Grid></>);
};
export default Daily_menus;
