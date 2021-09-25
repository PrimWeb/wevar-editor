import { Container, defaultProps as itemDefaultProps, RestuMenuItem, RestuMenuItemProps, RestuText } from "@/components/selectors";
import { Element }                                                                                   from "@craftjs/core";
import React                                                                                         from 'react';

export type RestuMenuCategoryProps = {
    id: number|string; name: string; items: RestuMenuItemProps[];
}
const defaultProps = {
    id: 0, name: "Default Category", items: [ itemDefaultProps ]
};
export const RestuMenuCategory = (props: Partial<RestuMenuCategoryProps>) => {
    (props) = { ...defaultProps, ...props };
    const { name, id, items } = props;
    return (<Element canvas id={`menu-category-${id}`} is={Container} key={`category_${id}`}
                     padding={[ '5', '5', '5', '5' ]}>
        <Element canvas id={`menu-category-title-${id}`} is={RestuText} tagName="h1" textAlign="center" text={name}
                 margin={[ 0, "auto", 15, "auto" ]}/>
        {items.map((item) => {
            item.id = `${item.id}`;
            return (<Element canvas is={RestuMenuItem} {...item} id={item.id} key={`${item.id}`}/>);
        })}
    </Element>);
};

RestuMenuCategory.craft = { ...Container.craft, displayName: 'Menu Category' };
