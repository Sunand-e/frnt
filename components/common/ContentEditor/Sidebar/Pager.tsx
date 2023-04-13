import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useEditorViewStore } from "../useEditorViewStore";
import { useRouter } from "../../../../utils/router";
import { useLessonContentFragment } from "../../../../hooks/lessons/useLessonContentFragment";
import { lessonTypes } from "../../../courses/lessonTypes";

const PagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
`;

const PagerAnimtedContainer = styled(motion.div)`
  flex-direction: row;
  direction: ltr;
  will-change: transform;
  min-height: 0;
  flex: 1;
  display: flex;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-self: stretch;
  justify-content: flex-start;
  flex-shrink: 0;
  height: 100%;
  overflow: hidden;
  outline: none;
`;

export function Pager({ children }) {
  
  const router = useRouter()
  const { cid: contentId } = router.query
  const { complete, data } = useLessonContentFragment(contentId)

  const visiblePanels = lessonTypes[data?.contentType]?.sidebarPanels
  const activeSidebarPanel = useEditorViewStore(state => state.activeSidebarPanel)
  const activeIndex = visiblePanels?.indexOf(activeSidebarPanel) || null

  return (
    <PagerContainer>
      <PagerAnimtedContainer
        transition={{
          tension: 190,
          friction: 70,
          mass: 0.4
        }}
        initial={false}
        animate={{ x: activeIndex * -100 + "%" }}
      >
        {children.map((child, i) => (
          <Page
            key={i}
            aria-hidden={activeIndex !== i}
            tabIndex={activeIndex === i ? 0 : -1}
          >
            {child}
          </Page>
        ))}
      </PagerAnimtedContainer>
    </PagerContainer>
  );
}
