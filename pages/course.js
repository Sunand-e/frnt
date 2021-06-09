import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar';
import BlockWithTitle from '../components/BlockWithTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import Lesson from '../components/Lesson';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import lessons from '../lessons'
import LinkWithIcon from '../components/LinkWithIcon';

export default function Course() {

  
  const [course, setCourse] = useState('');

  
  const [currentLesson, setCurrentLesson] = useState(null)
  
  const handleLessonClick = (lesson_id => {
    setCurrentLesson(lesson_id)
    console.log('currentLesson')
    console.log(currentLesson)
  })
  
  const accordionChild = (child, idx, level=0) => {
    return (
      
      <div key={idx} className="">
        <div 
          key={idx} 
          onClick={() => handleLessonClick(child.id)} 
          className={`${currentLesson===child.id ? 'text-white bg-main-dark' : 'text-main-dark bg-white'} p-4 py-2 mb-1 flex items-center hover:text-white hover:bg-main-dark`}
        >
          <FontAwesomeIcon className="h-4 mr-2" icon={`angle-right`} />
          {/* { 
            [...Array(level)].map((e, i) => (
              <FontAwesomeIcon className="h-4 mr-2" icon={`angle-right`} key={i} />
            ))
          } */}
          <span>
            {/* {child.title} */}
            {child.title}
          </span>
        </div>
        {child.children && child.children.map((child, idx) => accordionChild(child, idx, level+1)) }
      </div>
    )
  }
  
  const lessonsBlock = lessons.map((lesson, idx) => accordionChild(lesson, idx))
  
  return (
    <ContentTypePage type="Course" setData={setCourse}>
      <div className="flex-grow w-9/12">
        { !course && <LoadingSpinner /> }
        { course && ( 
          currentLesson === null ? (
            <>
              <img className="object-cover h-96 mb-8 w-full" src={course.featuredImage.node.sourceUrl} />
              <div className="mb-8" dangerouslySetInnerHTML={{__html: course.content}} />
              <div className="flex justify-start">
              <Button onClick={() => setCurrentLesson(lessons[0].id)}>Start Course</Button>
              </div>
            </>
          ) : <Lesson lesson={lessons.find(lesson => lesson.id === currentLesson)} />
        ) }
      </div>
      <Sidebar>
        <BlockWithTitle title="Lessons">
        { !course && <LoadingSpinner className="transform scale-50"/> }
        { course && lessonsBlock }
        { course && (
          <div className="mt-4 text-main-dark">
            <a onClick={() => setCurrentLesson(null)}>Back to course overview</a>
          </div>
        ) }
        
        </BlockWithTitle>
        <BlockWithTitle title="Course Downloads">
          <LinkWithIcon href='#' icon={{prefix: 'fas', iconName: 'file-pdf'}}>
            Course Worksheet 1
          </LinkWithIcon>
          <LinkWithIcon href='#' icon={{prefix: 'fas', iconName: 'file-pdf'}}>
            Course Worksheet 2
          </LinkWithIcon>
        </BlockWithTitle>
      </Sidebar>
    </ContentTypePage>
  )
}
