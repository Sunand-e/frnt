
import React, { FunctionComponent } from 'react';
import Link from './Link';

export interface LinkBlockProps {
  block: {
    id: string,
    type: string,
    properties: {
      buttonText: string;
      url: string;
      content: any;
    };
  };
}

export const LinkBlock: FunctionComponent<LinkBlockProps> = ({ block }) => {
  const { properties } = block

  return (
    <Link
      buttonText={properties?.buttonText}
      url={properties?.url}
      editable={false}
      content={properties?.content}
    />
  );
}

export default LinkBlock;
