import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import { Container, Section, Bar, Resizer } from 'react-simple-resizer';
import { Block } from '../../Block';
import BlockContainer from '../../BlockContainer';

export const ColumnsBlock = ({id, block, onUpdateBlock: updateBlock}) => {

  const containerRef = useRef()

  const columns = block.children?.map((childBlock, index, blocks) => (
    <React.Fragment key={index}>
      <Section style={{ overflow: 'hidden' }}>
      {/* <Section minSize={240} style={{ overflow: 'visible' }}> */}
        <BlockContainer 
          isColumn={true} 
          block={{
            ...childBlock,
            parent: id
          }}
        />
      </Section>
      { index + 1 !== blocks.length && 
        <Bar 
        key={index} 
        size={2}
        className={`bg-main bg-opacity-20 z-30 opacity-0 group-hover:opacity-100`}
        style={{ cursor: 'col-resize' }} 
        expandInteractiveArea={{
          top: 12,
          left: 12,
          right: 12,
          bottom: 12,
        }}
        />
      }
    </React.Fragment>
  ))
  
  // function to enforce grid 'snapping'
  const resizeToGrid = (resizer: Resizer): void => {
    // 
    const containerWidth = resizer.getTotalSize()
    const gridUnitWidth = containerWidth/12

    const sectionCount = block.children.length
    let sectionEndPoint = 0

    for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++) {

      sectionEndPoint = resizer.getSectionSize(sectionIndex)

      let integerPart = Math.floor(sectionEndPoint/gridUnitWidth);
      let floatingPointPart = (sectionEndPoint/gridUnitWidth) % 1;

      let sectionUnitCount = (floatingPointPart < 0.5) ? integerPart : integerPart + 1

      // Make sure sections are no smaller than 3 grid units
      sectionUnitCount = Math.max(sectionUnitCount, 3)
      
      // Make sure sections can't be too big to make the remaining no smaller than 3 grid units
      sectionUnitCount = Math.min(sectionUnitCount, 12 - (sectionCount - 1) * 3)
      
      resizer.resizeSection(sectionIndex, {
        toSize: sectionUnitCount * gridUnitWidth
      });
    }
  }
  // /* SNAP TO 12-GRID WITHIN 10PX OF BREAKPOINT
  // const beforeApplyResizer = (resizer: Resizer): void => {
  //   for (let sectionIndex = 0; sectionIndex < block.children.length; sectionIndex++) {
  //     const containerWidth = resizer.getTotalSize()
  //     for (let i = 0; i < 12; i++) {
  //       let breakpointPosition = (i / 12) * containerWidth;
  //       let barPosition = 0;
  //       for (let j = 0; j < sectionIndex+1; j++) {
  //         barPosition += resizer.getSectionSize(j)
  //       }
  //       console.log(barPosition)
  //       if (
  //         barPosition > breakpointPosition - 10 &&
  //         barPosition < breakpointPosition + 10
  //       ) {
  //         let previousSectionsWidth = 0
  //         for (let j = 0; j < sectionIndex; j++) {
  //           previousSectionsWidth += resizer.getSectionSize(j)
  //         }
    
  //         resizer.resizeSection(sectionIndex, {
  //           toSize: breakpointPosition - previousSectionsWidth
  //         });
  //       }
  //     }
  //   }
  // }
  useEffect(() => {
    if(containerRef.current) {
      resizeToGrid(containerRef.current.getResizer())
    }
  },[block])

  
  return (
      <Container
        ref={containerRef} 
        beforeApplyResizer={resizeToGrid}
        className={`group`}
      >
        { columns }
      </Container>
  );
}

export default ColumnsBlock