import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActivityBlock({children}) {
  return (
    <div className="w-full my-8 border-blue-dark border-4 relative">
      <span className="bg-main-dark text-white relative inline-block top-0 left-0 px-4">Activity</span>
      <div className="rounded-full absolute -top-4 -right-4 bg-main-dark text-white">
       <FontAwesomeIcon className="h-8 p-2" icon={`pencil-alt`} />
      </div>

      <div className="p-4 pb-2">
        <p>In this lesson, we’re going to answer the question, ‘What is a brand?’ and explain the role it plays in your business. We’ll also introduce you to the three core elements of your brand that we’ll be covering in this course – the 3 P’s – Principles, Positioning and Packaging.</p>
      </div> 
    </div>
  )
}