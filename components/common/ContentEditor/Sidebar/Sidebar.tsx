import React, { useEffect, useRef, useState } from "react";
import { useMeasure } from "./use-measure";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Pager } from "./Pager";
import BlockSelector from "../BlockSelector";
import CourseStructureEditor from "../../../courses/CourseStructureEditor/CourseStructureEditor";
import SidebarEditableItem from "../../../courses/CourseStructureEditor/SidebarEditableItem";
import { useLessonContentFragment } from "../../../../hooks/lessons/useLessonContentFragment";
import { useRouter } from "../../../../utils/router";
import { lessonTypes } from "../../../courses/lessonTypes";
import CourseSidebarHeader from "../../../courses/CourseSidebarHeader";

const TabContainer = styled(motion.div)`
  overflow-y: hidden;
  box-shadow: none;
`;

const TabList = styled.div`
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

const TabItem = styled(motion.button)`
  white-space: nowrap;
  -webkit-appearance: none;
  box-sizing: border-box;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  user-select: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: none;
  cursor: pointer;
  text-decoration: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  padding: 10px 1rem;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  text-size-adjust: none;
  text-overflow: ellipsis;
  line-height: 1.5;
  margin: 0px;
  overflow: hidden;
`;

const Slider = styled(motion.div)`
  height: 4px;
  margin-left: 2px;
  margin-right: 2px;
  bottom: 0;
  position: absolute;
`;

export const sidebarBlockButtonClassName = `
  aspect-square flex flex-col justify-center items-center 
  space-y-2 p-2 text-center
  bg-white rounded-lg
  shadow shadow-lg
`
const allTabs = [
  {
    name: "structure",
    label: "Structure",
    component: (
      <CourseStructureEditor
        renderItem={SidebarEditableItem}
      />
    )
  },
  {
    name: "blocks",
    label: "Blocks",
    component: <BlockSelector
    className="text-main-secondary gap-3 p-3  align-center items-center grid sm:grid-cols-2 text-sm" 
    blockButtonClassName={sidebarBlockButtonClassName}
    />
  },
]

export const Sidebar = () => {

  const router = useRouter()
  const { cid: contentId } = router.query

  const [value, setValue] = useState(0);
  const childRefs = useRef(new Map());
  const tabListRef = useRef();
  const [slider, setSlider] = useState({ hasValue: false, left: 0, right: 0 });
  const { bounds, ref: tabContainerRef } = useMeasure();
  const { complete, data } = useLessonContentFragment(contentId)

  const handleTabClick = (i) => {
    setValue(i)
  }
  // measure our elements
  useEffect(() => {

    const target = childRefs.current.get(value);
    const container = tabListRef.current;
    if (target) {
      const cRect = container.getBoundingClientRect();

      // when container is `display: none`, width === 0.
      // ignore this case
      if (cRect.width === 0) {
        return;
      }

      const tRect = target.getBoundingClientRect();
      const left = tRect.left - cRect.left;
      const right = cRect.right - tRect.right;

      setSlider({
        hasValue: true,
        left: left + 8,
        right: right + 8
      });
    }
  }, [value, bounds]);

  const tabs = allTabs.filter(tab => {
    return lessonTypes[data?.contentType]?.sidebarPanels.includes(tab.name)
  })

  const showTabs = lessonTypes[data?.contentType]?.sidebarPanels?.length > 1
  
  return (
    <>
      <CourseSidebarHeader showProgress={false} />
      <AnimatePresence>
      { showTabs && (
        <TabContainer ref={tabContainerRef} 
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 1 }}
        >
          <TabList ref={tabListRef} className={`flex justify-center justify-evenly`}>
            {tabs.map((tab, i) => (
              <TabItem
                key={tab.name}
                isActive={i === value}
                className={`${i === value ? "text-main" : "text-main-secondary"}`}
                whileHover={{ backgroundColor: "#f1f3f5" }}
                transition={{ duration: 0.1 }}
                whileTap={{ backgroundColor: "#e9ecef" }}
                ref={el => childRefs.current.set(i, el)}
                onClick={() => handleTabClick(i)}
              >
                {tab.label}
              </TabItem>
            ))}
            {slider.hasValue && (
              <Slider
              className="bg-main"
                layout={true}
                transition={{
                  bounceDamping: 3,
                }}
                initial={false}
                style={{
                  left: slider.left,
                  right: slider.right
                }}
              />
            )}
          </TabList>
        </TabContainer>
      )}
      </AnimatePresence>
      <Pager value={value}>
        {tabs.map(tab => (
          <div
            key={tab.name}
            className="px-3 py-3"
            style={{
              width: "100%",
              height:'auto'
            }}
          >
            {tab.component}
          </div>
        ))}
      </Pager>
    </>
  );
}
