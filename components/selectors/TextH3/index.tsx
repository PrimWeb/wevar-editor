import { useEditor, useNode } from '@craftjs/core';
import React                  from 'react';
import ContentEditable        from 'react-contenteditable';
import { TextSettings }       from './TextSettings';

export type RestuTextProps = {
    fontSize: string; textAlign: string; fontWeight: string; color: Record<'r'|'g'|'b'|'a', string>; shadow: number; text: string; margin: [ string|number, string|number, string|number, string|number ]; tagName: string;
};

export const RestuText = (props: Partial<RestuTextProps>) => {
    const {
              color  = { r: 92, g: 90, b: 90, a: 1 },
              fontSize,
              fontWeight,
              margin = [ 0, 0, 0, 0 ],
              shadow,
              tagName,
              text,
              textAlign
          } = props;
    const {
              connectors: { connect }, setProp,
          } = useNode();
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));
    return (<ContentEditable
        innerRef={connect}
        html={text} // innerHTML of the editable div
        disabled={!enabled}
        onChange={(e) => {
            setProp((prop) => (prop.text = e.target.value), 500);
        }} // use true to disable editing
        tagName={tagName} // Use a custom HTML tag (uses a div by default)
        style={{
            color:      `rgba(${Object.values(color)})`,
            fontSize:   `${fontSize}`,
            fontWeight,
            margin:     `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`,
            textAlign,
            textShadow: `0px 0px 2px rgba(0,0,0,${(shadow || 0) / 100})`,
            width:      '100%',

        }}
    />);
};

RestuText.craft = {
    displayName: 'RestuText', props: {
        color:      { r: 92, g: 90, b: 90, a: 1 },
        fontSize:   '22',
        fontWeight: '500',
        margin:     [ 0, 0, 0, 0 ],
        shadow:     0,
        tagName:    "h3",
        text:       'RestuText',
        textAlign:  'center'
    }, related:  {
        toolbar: TextSettings,
    },
};
