import React, {forwardRef, useEffect} from 'react';
import classNames from 'classnames';

import {Handle, Remove} from '../common/dnd-kit/Item';

import styles from './SidebarSection.module.scss';
import { courseNavigationVar } from "../../graphql/cache"
import { gql, useReactiveVar } from '@apollo/client';
import {Cancel} from '@styled-icons/material-rounded/Cancel'
import {Save} from '@styled-icons/material-rounded/Save'
import EasyEdit, {Types} from 'react-easy-edit';
import useUpdateSection from '../../hooks/sections/useUpdateSection';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useContentTitle } from '../common/ContentEditor/useContentTitle';

export const ContentTitleFragment = gql`
  fragment ContentTitleFragment on ContentItem {
    id
    title
  }
`
export interface Props {
  id?: UniqueIdentifier;
  children: React.ReactNode;
  columns?: number;
  style?: React.CSSProperties;
  editing?: boolean;
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

export const SidebarSection = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      children,
      editing = false,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: Props,
    ref
  ) => {

    const { updateSection } = useUpdateSection(id)
    const { title } = useContentTitle(id)
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
          styles.SidebarSection,
          // 'bg-white bg-opacity-10',
          expand && styles.expanded,
          unstyled && styles.unstyled,
          horizontal && styles.horizontal,
          hover && styles.hover,
          placeholder && styles.placeholder,
          scrollable && styles.scrollable,
          shadow && styles.shadow,
        )}
        // className={`
        // ${ !expand
        //   ? 'bg-white shadow sm:rounded-md mb-4'
        //   : 'mb-1'
        // }`}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {id && id !== 'placeholder' ? (
          <div className={ classNames(
            `flex justify-between px-4`,
            styles.Header
            // expand ? styles.Header : ``
          )}>
            <span>
              {editing ? (
                <EasyEdit
                  type={Types.TEXT}
                  onSave={(title: String) => updateSection({title})}
                  saveButtonLabel={<Save className="w-6"  />}
                  cancelButtonLabel={<Cancel className="w-6 text-red-600"  />}
                  placeHolder="Section title..."
                  attributes={{ name: "awesome-input", id: 1}}
                  value= { title }
                />
              // ) : data?.title }
              ) : title }
            </span>
            <div className={styles.Actions}>
              { onRemove && <Remove onClick={onRemove} /> }
              { handleProps && <Handle {...handleProps} /> }
            </div>
          </div>
        ) : null}

        {/* {placeholder ? children : <ul className={`list-none divide-y divide-gray-200`}>{children}</ul>} */}
        {placeholder ? children : <ul className={`list-none border-b border-gray-200`}>{children}</ul>}
      </div>
    );
  }
);
