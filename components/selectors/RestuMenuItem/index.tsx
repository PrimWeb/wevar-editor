import { Container, RestuText, Text } from "@/components/selectors";
import { Element, useNode }           from "@craftjs/core";

export type RestuMenuItemProps = {
    id: number|string; name: string; currency: string; price: number; description: string; weight: string; unit: string;
}
export const defaultProps = {
    id:          0,
    name:        "Example Item",
    currency:    "Kč",
    price:       99,
    description: "Example Description",
    weight:      "250",
    unit:        "g",
};

export const RestuMenuItem = (props: Partial<RestuMenuItemProps>) => {
    (props) = { ...defaultProps, ...props };
    const { id, name, currency, price, description, weight, unit, } = props;

    const { connectors: { connect }, } = useNode();

    return (<Element id={`menu-item-${id}`} rel={connect} key={id} justifyContent="space-evenly" alignItems="stretch"
                     flexDirection="column">
        <Element canvas id={`menu-item-header-${id}`} is={RestuText} tagName="h2" text={name}/>
        <Element canvas id={`menu-item-body-${id}`} is={Container} justifyContent="space-between"
                 alignItems="stretch"
                 flexDirection="row" padding={[ "5px", "5px", "5px", "5px" ]}
                 key={`description_price_weight_${id}`}>
            <Element canvas id={`menu-item-description-${id}`} is={Container} width="75%"
                     children={<Text fontSize="15px" textAlign="left" text={description} fontWeight="normal"/>}/>
            <Element canvas id={`menu-item-details-${id}`} is={Container} flexDirection="column" width="25%"
                     justifyContent="space-evenly" alignItems="flex-end" key={`price_weight_${id}`}>
                <Element canvas id={`menu-item-price-${id}`} is={RestuText} text={`${price} ${currency}`}
                         tagName="strong"
                         fontSize="17px" textAlign="right"/>
                <Element canvas id={`menu-item-weight-${id}`} is={RestuText} text={`${weight} ${unit}`} tagName="em"
                         fontSize="15px" textAlign="right"/>
            </Element>
        </Element>
    </Element>)
};

RestuMenuItem.craft = { ...Container.craft, displayName: 'Menu Item', };
