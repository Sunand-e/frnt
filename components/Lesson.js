import ActivityBlock from "./ActivityBlock";
import LessonTabs from "./LessonTabs";
import LessonButtons from "./LessonButtons";
import LearningModule from "./LearningModule";

export default function Lesson({lesson}) {
  return (
    <div >
      <h2 className="text-3xl text-main-dark mb-8 border-b-4 border-main pb-4">
        {lesson.title}
      </h2>
      <p>In this lesson, we’re going to answer the question, ‘What is a brand?’ and explain the role it plays in your business. We’ll also introduce you to the three core elements of your brand that we’ll be covering in this course – the 3 P’s – Principles, Positioning and Packaging.</p>
      <LearningModule />
      <ActivityBlock />

      <LessonTabs />
      <LessonButtons />
    </div>
  )
}