import { useCallback, useContext, useRef, useState } from "react";
import { PlusCircle } from '@styled-icons/heroicons-solid/PlusCircle'
import AddItemToCourseForm from "../AddItemToCourseForm";
import Tippy from '@tippyjs/react';
import LineWithIcon from '../../common/LineWithIcon'
import Select, { components } from "react-select";
import SelectNewCourseItem from "../SelectNewCourseItem";
import NewCourseItemList from "../NewCourseItemList";

const NewItemButton = ({container: containerId}) => {

  const [tippy, setTippy] = useState(null);

  const onNewItemSelect = () => {
    tippy?.hide()
  }

  return (
    <Tippy
      interactive={true}
      className={`text-white px-2 py-2 z-50 w-[calc(300px-4rem)]`}
      theme={'memberhub-block-menu light'}
      arrow={true}
      placement='bottom'
      trigger='click'
      content={<NewCourseItemList sectionId={containerId} onSelect={onNewItemSelect} />}
      onCreate={(instance) => setTippy(instance)}
    >
      <div
        className={`text-main opacity-0 max-w-screen-lg items-center group-hover:opacity-100 w-full ${true && 'opacity-100'}`}
      >
        <div className={`
          flex items-center py-2 h-10 justify-center
        `}>
          <PlusCircle className={`px-4 w-14`} />
        </div>
      </div>
    </Tippy>
  )
}

export default NewItemButton