
import React, { FunctionComponent } from 'react';
import Link from './Link';

interface LinkBlockProps {
  block: {
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
