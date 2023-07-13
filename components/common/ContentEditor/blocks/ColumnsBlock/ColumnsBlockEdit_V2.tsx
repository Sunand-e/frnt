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
    <React.Fragment key={childBlock.id}>
      <Section style={{ overflow: 'visible' }} 
      // defaultSize={widths[index]}
      // size={index*100}
      >
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
    // get the width of the container
    const containerWidth = resizer.getTotalSize()
    // get the grid unit width, a 12th of the container width
    const gridUnitWidth = containerWidth/12

    const sectionCount = block.children.length
    let sectionEndPoint = 0
    // create array to hold the column widths in grid units (e.g. [3,3,6])
    let newWidths = []
    // for each column,
    for (let sectionIndex = 0; sectionIndex < sectionCount; sectionIndex++) {

      // get the column size
      sectionEndPoint = resizer.getSectionSize(sectionIndex)
      // get the integer part of the number of grid units the column takes up
      let integerPart = Math.floor(sectionEndPoint/gridUnitWidth);
      // determine if it is closer to the next grid line
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
    }
    console.log(newWidths)
    setWidths(newWidths)
  }

  useEffect(() => {
    const container = containerRef.current;
    const resizer = container.getResizer()

    const containerWidth = resizer.getTotalSize()
    const gridUnitWidth = containerWidth/12

    widths?.forEach((colSize, index) => {
      resizer.resizeSection(index, { toSize: colSize * gridUnitWidth });
    })
    container.applyResizer(resizer);

    updateBlock({...block, widths})
  
  }, [JSON.stringify(widths)])

  // This useeffect triggers if there is any change in the cached block's widths,
  // e.g. from adding a new column from the block menu.
  useEffect(() => {
    setWidths(block.widths)
  }, [JSON.stringify(block.widths)])



  // useEffect(() => {
  //   if(!widths?.length) {
  //     alert('!widths?.length')
  //     return
  //   }
  //   // alert('JSON.stringify(widths)')
  //   // alert(JSON.stringify(widths))
  //   const container = containerRef.current;
  //   const resizer = container.getResizer()

  //   const containerWidth = resizer.getTotalSize()
  //   const gridUnitWidth = containerWidth/12

  //   widths.forEach((colSize, index) => {
  //     resizer.resizeSection(index, { toSize: colSize * gridUnitWidth });
  //   })
  //   container.applyResizer(resizer);

  //   updateBlock({...block, widths})
  
  // }, [JSON.stringify(widths)])

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