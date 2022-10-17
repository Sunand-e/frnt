// from https://tailwindcomponents.com/component/vertical-timelineimport { useContext } from "react"

import { motion, Reorder, useDragControls, useMotionValue } from "framer-motion";
import { GraduationCap } from "styled-icons/fa-solid";
import { useRaisedShadow } from "../../hooks/useRaisedShadow";
import ItemWithImage from "../common/cells/ItemWithImage";
import { DragIndicator } from "@styled-icons/material/DragIndicator";
import { TrashIcon } from "@heroicons/react/outline";
import { resourceTypes } from "../resources/resourceTypes";
import { startCase } from 'lodash';
import { useRouter } from "../../utils/router";
import ProgressBar from "../common/ProgressBar"
import { useEffect, useState } from "react";
import useGetUserPathway from "../../hooks/users/useGetUserPathway";

const ConditionalReorderItemWrapper = ({ item, y, editMode, children }) => (
  editMode ? (
    <Reorder.Item value={item} id={item.id} style={{ y }}>
      {children}
    </Reorder.Item>
  ) : (
    children
  ) 
)

const PathwayTimelineItem = ({
  editMode=false, 
  item, 
  onRemove
}) => {

  const router = useRouter()
  const { pid } = router.query
  const { user } = useGetUserPathway(pid);
  
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if(user) {
      let userContent
      switch(item.itemType) {
        case 'course': {
          userContent = user.courses.edges.find(userContentEdge => userContentEdge.node.id === item.id)
          break
        }
        case 'library_item': {
          userContent = user.libraryItems.edges.find(userContentEdge => userContentEdge.node.id === item.id)
          break
        }
      }
      setProgress(userContent?.score || 0)
    }
  },[user, item])

  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls()

  let icon;
  let itemWithImage;

  switch(item.itemType) {
    case 'course': {
      icon = <GraduationCap className="w-10" />
      itemWithImage = <ItemWithImage
        image={item.image}
        icon={<GraduationCap className='p-1'/>}
        title={item.title}
        secondary={item.tags?.map?.(tag => tag.label).join(', ')}
        href={editMode ? null : {
          pathname: `/course`,
          query: { 
            ...router.query,
            id: item.id
           },
        }}
      />
      break;
    }
    case 'library_item': {
      const IconComponent = resourceTypes[item.contentType]?.icon
      icon = IconComponent ? <IconComponent className="w-10" /> : null
      itemWithImage = <ItemWithImage
        image={item.image}
        icon={icon}
        title={item.title}
        secondary={startCase(item.contentType)}
        href={editMode ? null : {
          pathname: `/resource`,
          query: { 
            ...router.query,
            id: item.id
           },
        }}
      />
      break;
    }
  }

  return (
    <ConditionalReorderItemWrapper editMode={editMode} item={item} y={{ y }}>
      <div className="flex">
        <div className="mr-10 relative">
          <div className="h-full w-6 flex items-center justify-center">
            <div className="h-full w-1 bg-main-secondary pointer-events-none">
            </div>
          </div>
          <div
            className="w-6 h-6 absolute flex p-1 top-1/2 -mt-3 rounded-full bg-main text-white shadow"
          >
            {icon}
          </div>
        </div>
        
        <div
          className="rounded-2xl shadow overflow-hidden bg-white my-2 mr-auto"
        >
          <motion.div
            className="w-96 p-4 bg-main-superlight flex flex-col space-y-2 items-start"
            style={{boxShadow}}
          >
            <div className="flex w-full justify-between">
              { itemWithImage }
              { editMode && (
                <div className="flex">
                  <TrashIcon className="w-5 cursor-pointer stroke-red-600/80" onClick={() => onRemove(item)} />
                  <DragIndicator className="w-5 ml-2 cursor-pointer" />
                </div>
              )}
            </div>
            { !editMode && progress !== null && progress !== undefined && (
              <ProgressBar value={progress} className={`-mb-0.5`} />
            )}
          </motion.div>
        </div>
      </div>
    </ConditionalReorderItemWrapper>
  )
}

export default PathwayTimelineItem
