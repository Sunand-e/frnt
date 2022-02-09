import { FC, useEffect } from "react"
// import { useReactiveVar } from '@apollo/client';

import { pageTitleVar } from "../../graphql/cache";
import EasyEdit, {Types} from 'react-easy-edit';
import { useReactiveVar } from "@apollo/client";
import {Cancel} from '@styled-icons/material-rounded/Cancel'
import {Save} from '@styled-icons/material-rounded/Save'
const PageTitle : FC = () => {
  
  const pageTitle = useReactiveVar(pageTitleVar)
  // useEffect(() => {
  //   viewVar({
  //     ...viewVar(),
  //     title, 
  //     subtitle,
  //     // editableTitle,
  //   })
  // },[])
  
  return (
    <h1 className="flex my-3 items-center overflow-hidden w-auto text-xl text-main-dark font-bold">
      <span className="pr-2">{ pageTitle.title }</span>
      { !!pageTitle.editable &&
        <EasyEdit
        type={Types.TEXT}
        onSave={pageTitle?.onEdit}
        saveButtonLabel={<Save className="w-6"  />}
        cancelButtonLabel={<Cancel className="w-6 text-red-600"  />}
        placeHolder="Enter a title..."
        attributes={{ name: "awesome-input", id: 1}}
        value={ pageTitle.editable }
      />
    }
    </h1>
  )
}

export default PageTitle