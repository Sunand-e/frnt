import React from 'react';
import { CSSProp } from 'styled-components';

export interface ImageHandleProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  css?: CSSProp;
  className?: string;
}

export const ResizeableHandle = (props: ImageHandleProps) => <div {...props} />;
