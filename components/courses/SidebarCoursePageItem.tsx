import styles from './SidebarSection.module.scss';
import { gql } from '@apollo/client';
import classNames from '../../utils/classNames';
import ListItem from '../common/DndList/ListItem';
import {GraduationCap} from "@styled-icons/fa-solid/GraduationCap"
import { useRouter } from 'next/router';

export const ContentTitleFragment = gql`
  fragment ContentTitleFragment on ContentItem {
    id
    title
  }
`
export interface Props {
  editing?: boolean;
  onRemove?(): void;
}

export const SidebarCoursePageItem = ({
  editing = false,
  ...props
}: Props) => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  
  const handleClick = () => {
    router.push({query: {
      ...router.query,
      cid: null
    }})
  }

  return (
    <button
      className={classNames(
        'bg-white rounded-md mb-2 flex items-center text-sm w-full px-4 py-3',
        'space-x-2 text-left',
        'hover:bg-transparent',
        !contentId ? 'text-main' : 'text-main-secondary'
      )}
      onClick={handleClick}
    >
      <GraduationCap className="h-5 w-5 flex-0"/>
      <span className="min-w-0 flex-1 text-sm font-medium break-words">
        Course front page
      </span>
    </button>
  );
}