import { Paper, PaperProps } from "@/components/selectors/Paper/index";
import { PaperSettings }     from "@/components/selectors/Paper/PaperSettings";
import { Element }           from "@craftjs/core";
import { getRandomId }       from "@craftjs/utils";
import { isArray }           from "lodash";
import React                 from "react";

export type PaperA4Props = PaperProps&{ width: string; height: string; key: string|number };

const defaultProps = {
    alignItems:     'flex-start',
    background:     { r: 255, g: 255, b: 255, a: 1 },
    color:          { r: 0, g: 0, b: 0, a: 1 },
    fillSpace:      'no',
    flexDirection:  'column',
    height:         '1131px',
    id:             0,
    justifyContent: 'flex-start',
    margin:         [ '0', '0', '0', '0' ],
    name:           "Example Category",
    padding:        [ '0', '0', '0', '0' ],
    radius:         0,
    shadow:         3,
    width:          '800px',
    items:          [ {
        currency:    "Kč",
        description: "Example Description - Place the steak in a soup pot, and flavor smoothly with dried crême fraîche.",
        id:          0,
        name:        "Example Item",
        price:       10,
        unit:        "g",
        weight:      "250"
    } ]
};

export const PaperA4 = ({
                            width, height, key = getRandomId(4), padding = null, background = null
                        }: Partial<PaperA4Props>) => {
    return <Element
        id={`paper-a4-list-${key}`}
        key={key}
        is={Paper}
        width={width}
        height={height}
        background={background || {
            r: 255, g: 255, b: 255, a: 1
        }}
        padding={isArray(padding) ? padding : [ padding || "20", padding || "20", padding || "20", padding || "20" ]}
        custom={{ displayName: "Paper A4" }}/>;
};

// noinspection JSUnusedGlobalSymbols
PaperA4.craft = {
    displayName: 'Paper', props: defaultProps, rules: {
        canDrag: () => false, canResize: () => false
    }, related:  {
        toolbar: PaperSettings,
    },
};
