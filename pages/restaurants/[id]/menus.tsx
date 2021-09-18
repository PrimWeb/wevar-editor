import { FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import dynamic                                             from "next/dynamic";
import { useRouter }                                       from "next/router";
import React, { useState }                                 from "react";
import useSWR                                              from "swr";
import fetcherMiddleware, { fetcher }                      from "../../../middleware/fetcher";

const Daily_menus = () => {
    const router = useRouter();
    const {id} = router.query;
    const {data, error} = useSWR(`/api/r1/${id}/menus`, fetcher, {use: [ fetcherMiddleware ]});
    const [ results, setResults ] = useState();

    return !data ? <Grid container justifyContent="center" alignContent="center">
        Loading...
    </Grid> : <Grid container
                    justifyContent="center"
                    spacing={3}
                    alignContent="space-between">
        <Grid item xs={4}>
            <FormControl fullWidth>
                <InputLabel>Vyberte jídelní lístek</InputLabel>
                <Select
                    defaultValue=""
                    renderValue={(selected: string) => {
                        if (selected.length === 0) {
                            return <em>Vyberte jídelní lístek</em>;
                        }
                        return selected['name'];
                    }}
                    onChange={async (e) => {
                        const {value} = e.target;
                        // // Dynamically load fuse.js
                        const MenusCategories = dynamic(
                            () => import('@/components/restaurants/Elements/MenusCategories').then(mod => mod.default),
                            {
                                loading: () => <p>...</p>
                            });

                        console.log(value);
                        setResults(() => {
                            const categories = <MenusCategories title="Vyberte kategorii" items={value.categories}
                                                                value="" parent={value.id}/>;
                            return categories;
                        });
                    }}>
                    <MenuItem disabled value="">
                        <em>Vyberte jídelní lístek</em>
                    </MenuItem>
                    {data.map((item) => <MenuItem
                        key={item.id}
                        value={item}
                    >
                        {item.name}
                    </MenuItem>)}
                </Select>
            </FormControl>
        </Grid>
        {results}
    </Grid>;
};
export default Daily_menus;
