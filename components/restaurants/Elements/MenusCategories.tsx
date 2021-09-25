import { RestuMenuCategory }                               from "@/components/selectors";
import { useEditor }                                       from "@craftjs/core";
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React                                               from 'react';
import { RestaurantMenusCategories }                       from "../../../models/vRestaurants";

const MenusCategories = ({ title, value, items }: any) => {
    // const router = useRouter();
    const { actions, query } = useEditor(()/*state*/ => {
        let allDescendants = false;

        return { allDescendants }
    });
    // noinspection FunctionWithMultipleReturnPointsJS
    return <Grid item xs={12}>
        <FormControl fullWidth>
            <InputLabel>{title}</InputLabel>
            <Select
                defaultValue={value}
                renderValue={(selected: RestaurantMenusCategories) => {
                    if (!selected.id) {
                        return <em>Vyberte kategorii y</em>;
                    }
                    console.log();
                    return selected.name;
                }}
                onChange={(e) => {
                    // @ts-ignore
                    console.log(e.target.value);
                    const menuNodeTree = query.parseReactElement(<RestuMenuCategory {...e.target.value}/>)
                        .toNodeTree();
                    actions.addNodeTree(menuNodeTree);
                    console.log(actions.addNodeTree(menuNodeTree)); //|| 'ROOT_NODE'
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

export default MenusCategories;
