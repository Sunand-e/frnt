import BlockButtonList from './BlockButtonList'
import BlockButton from './BlockButton'

const BlockSelector = ({children}) => {

  const BlockButtons = BlockButtonList.map(({type, text, icon}, index) => (
    <BlockButton key={index} type={type} text={text} Icon={icon} />
  ))
  
  return (
    <div className="p-4 flex flex-col text-center text-main-dark divide-main-dark divide-y">
      <h3>Blocks</h3>
      <div className="pt-4 grid grid-cols-2 h-4 gap-4 sm:grid-cols-2 lg:grid-cols-2 text-sm">
        { BlockButtons }
      </div>
    </div>
  )
}

export default BlockSelector