import { useState } from 'react'
import BlockWithTitle from './BlockWithTitle';
import ContinueWatching from './ContinueWatching';
import LinkWithIcon from './LinkWithIcon';
import Button from './Button';

import RecentlyReleased from "./RecentlyReleased";

export default function LessonButtons() {

  return (
    <div className="flex justify-between">
      <Button>Previous Lesson</Button>
      <Button>Next Lesson</Button>
    </div>
  )

}
