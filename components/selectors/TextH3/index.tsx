import { useEditor, useNode } from '@craftjs/core';
import React                  from 'react';
import ContentEditable        from 'react-contenteditable';

import { TextSettings } from './TextSettings';

export type TextProps = {
    fontSize: string; textAlign: string; fontWeight: string; color: Record<'r' | 'g' | 'b' | 'a', string>; shadow: number; text: string; margin: [ string, string, string, string ];
};

export const TextH3 = ({
                           fontSize, textAlign, fontWeight, color, shadow, text, margin,
                       }: Partial<TextProps>) => {
    const {
              connectors: {connect}, setProp,
          } = useNode();
    const {enabled} = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    return (<ContentEditable
        innerRef={connect}
        html={text} // innerHTML of the editable div
        disabled={!enabled}
        onChange={(e) => {
            setProp((prop) => (prop.text = e.target.value), 500);
        }} // use true to disable editing
        tagName="h3" // Use a custom HTML tag (uses a div by default)
        style={{
            width: '100%', margin: `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
            color: `rgba(${Object.values(color)})`, fontSize: `${fontSize}px`,
            textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`, fontWeight, textAlign,
        }}
    />);
};

TextH3.craft = {
    displayName: 'TextH3', props: {
        fontSize: '22', textAlign: 'center', fontWeight: '500', color: {r: 92, g: 90, b: 90, a: 1},
        margin: [ 0, 0, 0, 0 ], shadow: 0, text: 'TextH3',
    }, related: {
        toolbar: TextSettings,
    },
};
