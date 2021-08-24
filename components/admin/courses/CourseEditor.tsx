import { useRef } from 'react';
import { useState } from 'react';
import BlockEditor from '../BlockEditor'
import Button from '../../Button'

const CourseEditor = (() => {

  const [courseData, setCourseData] = useState({ blocks: [] });
  const instanceRef = useRef(null);

  const handleClickChangeData = () => {
    instanceRef.current.blocks.insert(
      //type, blockdata, config, index, needToFocus
      "paragraph",
      {
        text: "555"
      }
    ); // update the block
    const newData = {
      blocks: [
        {
          type: "paragraph",
          data: {
            text: "555"
          }
        },
        ...courseData?.blocks
      ]
    };
    setCourseData(newData);
  };

  return (
    <>
      <Button onClick={handleClickChangeData}>change data</Button>
      <BlockEditor
        data={courseData}
        setData={setCourseData}
        instanceRef={instanceRef}
      />
      <pre>
        { JSON.stringify(courseData,null,2)}
      </pre>
    </>
  )
})

export default CourseEditor