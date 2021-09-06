import { useNode }                 from '@craftjs/core';
import { makeStyles }              from '@material-ui/core/styles';
import React, { ReactHTMLElement } from 'react';
import { Iterable }                from "immutable";
import { Grid }                    from '@material-ui/core';


const usePanelStyles = makeStyles((_) => ({
    root: {
        background: 'transparent',
        boxShadow: 'none',
        '&:before': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
        },
        '&.Mui-expanded': {
            margin: '0 0',
            minHeight: '40px',
            '&:before': {
                opacity: '1',
            },
            '& + .MuiExpansionPanel-root:before ': {
                display: 'block',
            },
        },
    },
}));

const useSummaryStyles = makeStyles((_) => ({
    root: {
        'min-height': '36px',
        padding: 0,
    },
    content: {
        margin: '0px',
    },
}));

const RestaurantDD = (val: any, key: any, nodeProps: [any]) => {
    val[key] = nodeProps[key];
    let elm: ReactHTMLElement<any>;
    elm = React.createElement('dt', {
        className: 'text-sm text-light-gray-1 text-left font-medium text-dark-gray',
        innerHTML: `<dt>${val}</dt>`
    });
    return elm;
};
// noinspection JSUnusedGlobalSymbols
const Restaurant = ({title, props, summary, children}: any) => {
    const panelClasses = usePanelStyles({});
    const summaryClasses = useSummaryStyles({className: "px-6 w-full"});
    const name = "details";
    const ddClass = "text-light-gray-2 text-sm text-right text-dark-blue";
    title = String((title ? title : props.text) || 'N/A');
    children = ((children instanceof Iterable) ? children : summary[children]) || null;
    const {nodeProps} = useNode((node) => ({
        nodeProps:
            props &&
            props.reduce((res: any, key: any) => {
                res[key] = node.data.props[key] || null;
                return res;
            }, {})

    }));
    return (
        <Grid container direction="row" alignItems="center" spacing={3}>
            <Grid item xs={4}>
                <dt className="text-sm text-light-gray-1 text-left font-medium text-dark-gray">
                    {title}
                </dt>
            </Grid>
            {summary && props ? (
                <Grid item xs={8}>
                    {summary(
                        props.reduce((acc: any, key: any) => {
                            return RestaurantDD(acc, key, nodeProps)
                        }, {})
                    )}
                </Grid>
            ) : null}
        </Grid>
    );
};

export default Restaurant; 
