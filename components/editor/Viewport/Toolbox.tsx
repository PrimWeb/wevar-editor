import { RestuText }            from "@/components/selectors/TextH3";
import { Element, useEditor }   from '@craftjs/core';
import { Tooltip }              from '@material-ui/core';
import { ViewHeadlineOutlined } from "@material-ui/icons";
import CategorySvg              from '@material-ui/icons/Category';
import React                    from 'react';
import styled                   from 'styled-components';

import ButtonSvg                              from '../../../public/icons/toolbox/button.svg';
import ContainerSvg                           from '../../../public/icons/toolbox/container.svg';
import TypeSvg                                from '../../../public/icons/toolbox/text.svg';
import YoutubeSvg                             from '../../../public/icons/toolbox/video-line.svg';
import { Container, RestuMenuCategory, Text } from '../../selectors';
import { Button }                             from '../../selectors/Button';
import { Custom3 }                            from '../../selectors/Custom3';
import { Video }                              from '../../selectors/Video';

const ToolboxDiv = styled.div<{ enabled: boolean }>`
  transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  ${(props) => (!props.enabled ? `width: 0;` : '')}
  ${(props) => (!props.enabled ? `opacity: 0;` : '')}
`;

const Item = styled.a<{ move?: boolean }>`
  svg {
    width: 22px;
    height: 22px;
    fill: #707070;
  }
  ${(props) => props.move && `
    cursor: move;
  `}
`;

export const Toolbox = ({ props }) => {
    const {
              enabled, connectors: { create },
          } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    return (<ToolboxDiv
        enabled={enabled && enabled}
        className="toolbox transition w-12 h-full flex flex-col bg-white"
    >
        <div className="flex flex-1 flex-col items-center pt-3">
            <div ref={(ref) => create(ref, <Element
                canvas
                is={Container}
                background={{ r: 255, g: 255, b: 255, a: 0 }}
                color={{ r: 0, g: 0, b: 0, a: 1 }}
                height="5%"
                width="100%"/>)}>
                <Tooltip title="Container" placement="right">
                    <Item className="m-2 pb-2 cursor-pointer block" move>
                        <ContainerSvg/>
                    </Item>
                </Tooltip>
            </div>
            <div ref={(ref) => create(ref, <RestuMenuCategory/>)}>
                <Tooltip title="Category" placement="right">
                    <Item className="m-2 pb-2 cursor-pointer block" move>
                        <CategorySvg/>
                    </Item>
                </Tooltip>
            </div>
            <div ref={(ref) => create(ref, <RestuText fontSize="22" textAlign="center" text="Menu nadpis"/>)}>
                <Tooltip title="RestuText" placement="right">
                    <Item className="m-2 pb-2 cursor-pointer block" move>
                        <TypeSvg/>
                    </Item>
                </Tooltip>
            </div>
            <div
                ref={(ref) => create(ref, <Text fontSize="12" textAlign="left" text="Z??kladn?? text - popis, atp..."/>)}>
                <Tooltip title="Text" placement="right">
                    <Item className="m-2 pb-2 cursor-pointer block" move>
                        <ViewHeadlineOutlined/>
                    </Item>
                </Tooltip>
            </div>
            <div ref={(ref) => create(ref, <Button/>)}>
                <Tooltip title="Button" placement="right">
                    <Item className="m-2 pb-2 cursor-pointer block" move>
                        <ButtonSvg/>
                    </Item>
                </Tooltip>
            </div>
            <div ref={(ref) => create(ref, <Video/>)}>
                <Tooltip title="Video" placement="right">
                    <Item className="m-2 pb-2 cursor-pointer block" move>
                        <YoutubeSvg/>
                    </Item>
                </Tooltip>
            </div>
            <div ref={(ref) => create(ref, <Custom3 {...props}/>)}>
                <Tooltip title="Custom3" placement="right">
                    <Item className="m-2 pb-2 cursor-pointer block" move>
                        <TypeSvg/>
                    </Item>
                </Tooltip>
            </div>
        </div>
    </ToolboxDiv>);
};
