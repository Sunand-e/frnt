import React, { useEffect, useRef, useState } from "react";
import { useMeasure } from "./use-measure";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Pager } from "./Pager";
import { useLessonContentFragment } from "../../../../hooks/lessons/useLessonContentFragment";
import { useRouter } from "../../../../utils/router";
import { moduleTypes } from "../../../courses/moduleTypes";
import CourseSidebarHeader from "../../../courses/CourseSidebarHeader";
import { useEditorViewStore } from "../useEditorViewStore";
import { sidebarPanels } from "./sidebarPanels";

const TabContainer = styled(motion.div)`
  overflow-y: hidden;
  box-shadow: none;
  flex-shrink: 0;
`;

const TabList = styled.div`
  position: relative;
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

export const Sidebar = () => {

  const router = useRouter()
  const { cid: contentId } = router.query
  const { complete, data: module } = useLessonContentFragment(contentId)
  const moduleTypeName = module.itemType === 'quiz' ? 'quiz' : module.contentType
  const moduleType = moduleTypes[moduleTypeName]
  const panels = ['structure', ...(moduleType?.sidebarPanels || [])]
  const activeSidebarPanel = useEditorViewStore(state => state.activeSidebarPanel)

  const childRefs = useRef(new Map());
  const tabListRef = useRef<HTMLDivElement>();
  const [slider, setSlider] = useState({ hasValue: false, left: 0, right: 0 });
  const { bounds, ref: tabContainerRef } = useMeasure();

  const handleTabClick = (name) => {
    useEditorViewStore.setState({activeSidebarPanel: name})
  }
  // measure our elements
  useEffect(() => {

    const target = childRefs.current.get(activeSidebarPanel);
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
  }, [activeSidebarPanel, bounds]);

  // const panels = sidebarPanels.filter(panel => {
  //   return moduleTypes[data?.contentType]?.sidebarPanels.includes(panel.name)
  // })

  const showTabs = panels?.length > 1
  
  return (
    <>
      <CourseSidebarHeader showProgress={false} />
      <AnimatePresence>
      { showTabs && panels && (
        <TabContainer ref={tabContainerRef}
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 1 }}
        >
          <TabList ref={tabListRef} className={`flex justify-evenly`}>
            {panels.map((panel, i) => (
              <TabItem
                key={panel}
                // isActive={panel === activeSidebarPanel}
                className={`${panel === activeSidebarPanel ? "text-main" : "text-main-secondary"}`}
                whileHover={{ backgroundColor: "#f1f3f5" }}
                transition={{ duration: 0.1 }}
                whileTap={{ backgroundColor: "#e9ecef" }}
                ref={el => childRefs.current.set(panel, el)}
                onClick={() => handleTabClick(panel)}
              >
                {sidebarPanels.find(p => panel === p.name).label}
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
      { panels && (
        <Pager>
          {panels.map(panel => (
            <div
              key={`${panel}${panel !== 'structure' && contentId}`}
              className="px-3 py-3"
              style={{
                width: "100%",
                height:'auto'
              }}
            >
              {sidebarPanels.find(p => panel === p.name).component}
            </div>
          ))}
        </Pager>
      )}
    </>
  );
}
