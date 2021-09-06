import { useNode }                                                                      from '@craftjs/core';
import { Divider, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, } from '@material-ui/core';
import { makeStyles }                                                                   from '@material-ui/core/styles';
import React                                                                            from 'react';
import Restaurant                                                                       from './Restaurant';

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

// noinspection JSUnusedGlobalSymbols
export const ListSection = ({title, props, summary, children}: any) => {
    const panelClasses = usePanelStyles({});
    const summaryClasses = useSummaryStyles({});
    const {nodeProps} = useNode((node) => ({
        nodeProps:
            props &&
            props.reduce((res: any, key: any) => {
                res[key] = node.data.props[key] || null;
                return res;
            }, {}),
    }));
    return (
        <ExpansionPanel classes={panelClasses}>
            <ExpansionPanelSummary classes={summaryClasses}>
                <Restaurant {...props} title={title}
                            summary={summary}
                            children={children}/>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{padding: '0px 24px 20px'}}>
                <Divider/>
                <Grid container spacing={1}>
                    {children}
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};
