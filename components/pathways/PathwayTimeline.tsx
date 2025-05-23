// from https://tailwindcomponents.com/component/vertical-timelineimport { useContext } from "react"

import { Reorder } from "framer-motion"
import { useEffect } from "react"
import useGetPathway from "../../hooks/pathways/useGetPathway"
import { useRouter } from "../../utils/router"
import PathwayTimelineItem from "./PathwayTimelineItem"
import { usePathwayStore } from "./usePathwayStore"
import {Flow} from "@styled-icons/fluentui-system-regular/Flow"
import {FlagCheckered} from '@styled-icons/fa-solid/FlagCheckered'
import LoadingSpinner from '../common/LoadingSpinner'

const ConditionalReorderWrapper = ({ editMode, items, children, onReorder }) => (
  editMode ? (
    <Reorder.Group axis="y" values={items || []} onReorder={onReorder}>
      {children}
    </Reorder.Group>
  ) : (
    children
  )
)

const PathwayTimeline = ({editMode=false, onRemove=null}) => {

  const router = useRouter()
  const { pid } = router.query
  const { pathway } = useGetPathway(pid)
  const items = usePathwayStore(state => state.items)
  const setItems = usePathwayStore(state => state.setItems)
  const editItems = usePathwayStore(state => state.editItems)
  useEffect(() => {
    setItems(pathway?.children)
  },[pathway])

  return (
    <div className="container mb-8 bg-white shadow rounded-md p-6">
      <div className="flex flex-col mx-auto px-2">
        { !pathway ? (
          <LoadingSpinner text="Loading pathway" />
        ) : (
          <>
          <div className="flex relative mb-9">
            <div
              className="w-12 h-12 absolute flex p-1 top-1/4 -left-3 -mt-3 rounded-full bg-main text-white shadow"
            >
              <Flow />
            </div>
          </div>

          { !!items?.length && (
            <ConditionalReorderWrapper 
              editMode={editMode}
              items={items}
              onReorder={editItems}
            >
              {items?.map((item) => (
                <PathwayTimelineItem editMode={editMode} key={item.id} item={item} onRemove={onRemove} />
              ))}
            </ConditionalReorderWrapper>
          )}
          <div className="flex relative mt-3 mb-6">
            <div
              className="w-12 h-12 absolute flex p-1 top-1/4 -left-3 -mt-3 rounded-full bg-main text-white shadow"
            >
              <FlagCheckered className="p-2"/>
            </div>
          </div>
          </>
          )}
      </div>
    </div>
  )
}

export default PathwayTimeline