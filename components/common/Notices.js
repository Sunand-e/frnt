import { noticesVar } from '../../graphql/cache';
import { useReactiveVar } from '@apollo/client';
import NoticeBox from './NoticeBox';

export const Notices = () => {
  const notices = useReactiveVar(noticesVar);
  return (
    <>
      { notices && notices.map((notice, index) => (
        <NoticeBox key={index} notice={notice} />
      ))}
    </>
  );
};
