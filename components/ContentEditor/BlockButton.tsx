import { useStoreEditorState } from "@udecode/plate-core";
import { ELEMENT_H1 } from "@udecode/plate-heading";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { Transforms } from "slate";

const BlockButton = ({type, text, Icon}) => {

  const editor = useStoreEditorState();

  const handleClick = () => {
    let options = {}
    let children = [{text: 'hi'}]
    if(type === 'media_embed') {
      options.url = "https://player.vimeo.com/video/375411414"
    }
    if(type === 'multi-text') {
      children = [{children}]
    }

    Transforms.insertNodes(
      editor,
      {
        type,
        ...options,
        children
      },
      {
        at: [0]
      }
    )
  }
  return (
    <button onClick={handleClick} className="flex flex-col items-center space-y-2 p-2 text-center bg-white rounded-lg shadow shadow-lg">
      <Icon className="h-10" />
      <span>{text}</span>
    </button>
  )
}

export default BlockButton