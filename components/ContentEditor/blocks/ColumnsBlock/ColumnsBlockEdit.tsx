import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Container, Section, Bar, Resizer } from 'react-simple-resizer';
import BlockContainer from '../../BlockContainer';
import useBlockEditor from '../../useBlockEditor';

export const ColumnsBlockEdit = ({id, block}) => {

  const [widths,setWidths] = useState(block.widths)
  const { updateBlock } = useBlockEditor(block)


  const containerRef = useRef<any>()

  const columns = block.children?.map((childBlock, index, blocks) => (
    <React.Fragment key={index}>
      <Section style={{ overflow: 'visible' }}>
        <BlockContainer
          isColumn={true} 
          id={childBlock.id}
          // block={{
          //   ...childBlock,
          //   parent: id
          // }}
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
          left: 8,
          right: 8,
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

    let newWidths = []
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
      newWidths.push(sectionUnitCount)

      // updateBlock(colBlock)
    }
    setWidths(newWidths)
  }

  useEffect(() => {

    if(!widths?.length) return
    // alert(JSON.stringify(widths))
    const resizer = containerRef.current.getResizer()

    const containerWidth = resizer.getTotalSize()
    const gridUnitWidth = containerWidth/12

    widths.forEach((colSize, index) => {
      resizer.resizeSection(index, { toSize: colSize * gridUnitWidth });
    })

    updateBlock({...block, widths})
  
  }, [JSON.stringify(widths)])

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
  // useEffect(() => {
  //   if(containerRef.current) {
  //     resizeToGrid(containerRef.current.getResizer())
  //   }
  // },[block])

  return (
    <>
      <Container
        ref={containerRef} 
        beforeApplyResizer={resizeToGrid}
        className={`group`}
        >
        { columns }
      </Container>
    </>
  );
}

export default ColumnsBlockEdit