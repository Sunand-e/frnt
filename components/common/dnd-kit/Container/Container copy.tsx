import React, {forwardRef} from 'react';
import {Handle, Remove} from '../Item';
import styles from './Container.module.scss';
import cache from "../../../../graphql/cache"
import { ContentFragment } from "../../../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../../../graphql/queries/__generated__/ContentFragment';

export interface Props {
  children: React.ReactNode;
  columns?: number;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {

    const section = cache.readFragment<ContentFragmentType>({
      id:`ContentItem:${label}`,
      fragment: ContentFragment,
      fragmentName: 'ContentFragment',
      optimistic: true
    })

    return (
      <div
        {...props}
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        // className={classNames(
        //   styles.Container,
        //   unstyled && styles.unstyled,
        //   horizontal && styles.horizontal,
        //   hover && styles.hover,
        //   placeholder && styles.placeholder,
        //   scrollable && styles.scrollable,
        //   shadow && styles.shadow,
        // )}
        className={`bg-white shadow overflow-hidden sm:rounded-md mb-4`}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className={styles.Header}>
            { section ? section.title : label }
            {/* <br />
            {section.id} */}
            <div className={styles.Actions}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}

        {placeholder ? children : <ul className={`divide-y divide-gray-200`}>{children}</ul>}

      </div>
    );
  }
);
