import React, {forwardRef, useEffect} from 'react';
import classNames from 'classnames';

import {Handle, Remove} from '../dnd-kit/Item';

import styles from './Container.module.scss';
import { GET_SECTION } from '../../graphql/queries/allQueries';
import { client } from '../../graphql/client';
import cache, { courseNavigationVar } from "../../graphql/cache"
import { ContentFragment } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import { useReactiveVar } from '@apollo/client';

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
      optimistic: true
    })

    const { expand } = useReactiveVar(courseNavigationVar)
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
        className={classNames(
          styles.Container,
          'bg-white bg-opacity-10',
          expand && styles.expanded
        )}
        //   unstyled && styles.unstyled,
        //   horizontal && styles.horizontal,
        //   hover && styles.hover,
        //   placeholder && styles.placeholder,
        //   scrollable && styles.scrollable,
        //   shadow && styles.shadow,
        // className={`
        // ${ !expand
        //   ? 'bg-white shadow sm:rounded-md mb-4'
        //   : 'mb-1'
        // }`}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className={ classNames(
            `flex justify-between mt-2 px-4`,
            expand ? styles.Header : ``
          )}>
            <span>
              { section ? section.title : label }
            </span>
            <div className={styles.Actions}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}

        {placeholder ? children : <ul className={`list-none divide-y divide-gray-200`}>{children}</ul>}

      </div>
    );
  }
);
