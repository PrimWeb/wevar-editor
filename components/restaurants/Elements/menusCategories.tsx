import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useRouter }                                       from "next/router";
import React                                               from 'react';
import { RestaurantMenusCategories }                       from "../../../models/vRestaurants";

const menusCategories = ({ title, value, items, parent }: any) => {
    const router = useRouter();
    // noinspection FunctionWithMultipleReturnPointsJS
    return <Grid item xs={4}>
        <FormControl fullWidth={true}>
            <InputLabel>{title}</InputLabel>
            <Select
                defaultValue={value}
                renderValue={(selected: RestaurantMenusCategories) => {
                    if (!selected.id) {
                        return <em>Vyberte datum lístku</em>;
                    }
                    return selected.name;
                }}
                onChange={(e) => {
                    // @ts-ignore
                    router.push(router.asPath + '/' + parent + '/' + e.target.value.id).then(r => r);
                }}>
                <MenuItem disabled value="">
                    <em>Vyberte kategorii</em>
                </MenuItem>
                {items.map((item) => (<MenuItem
                    key={item.id}
                    value={item}
                >
                    {item.name}
                </MenuItem>))}
            </Select>
        </FormControl>
    </Grid>;
};

export default menusCategories;
