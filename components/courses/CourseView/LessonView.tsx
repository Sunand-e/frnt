import { Block } from "../../common/ContentEditor/Block";
import { useRouter } from "../../../utils/router";
import usePageTitle from "../../../hooks/usePageTitle";
import { useBlockStore } from "../../common/ContentEditor/useBlockStore";
import useGetUserCourse from "../../../hooks/users/useGetUserCourse";

const LessonView = () => {

  const blocks = useBlockStore(state => state.blocks)

  const router = useRouter()
  const { id, cid: moduleId } = router.query
  const { modules } = useGetUserCourse(id)
  
  const module = modules?.edges.find(edge => (
    edge.node.id === moduleId
  ))

  usePageTitle({
    title: module ? (module.node.title || 'Untitled lesson') : ''
  })

  return (
    <div className="w-full flex flex-col">
      {blocks && blocks.map(block => (
        <Block block={block} key={block.id} />
      ))}
    </div>
  )
}

export default LessonView