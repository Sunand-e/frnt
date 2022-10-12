import { FC } from "react"
// import { useReactiveVar } from '@apollo/client';

import { pageTitleVar, navStateVar, viewVar } from "../../../graphql/cache";
import EasyEdit, {Types} from 'react-easy-edit';
import { useReactiveVar } from "@apollo/client";
import {Cancel} from '@styled-icons/material-rounded/Cancel'
import {Save} from '@styled-icons/material-rounded/Save'
import navStructureUser from "../../../navStructureUser";
import navStructureAdmin from "../../../navStructureAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageTitle : FC = () => {
  
  const view = useReactiveVar(viewVar)
  const navState = useReactiveVar(navStateVar)
  const pageTitle = useReactiveVar(pageTitleVar)

  const navStructure = view.isAdmin ? navStructureAdmin : navStructureUser;
  const topLevelItem = navStructure?.find(topLevelItem => topLevelItem.name === navState?.topLevel)
  const secondaryLevelItem = topLevelItem?.subPages?.find(item => item.name === navState?.secondary)
  const currentItem = secondaryLevelItem ?? topLevelItem
  
  let iconComponent

  if(currentItem) {
    if(typeof currentItem.icon === 'string') {
      iconComponent = <FontAwesomeIcon className="text-xl" icon={{ prefix: 'fas', iconName: currentItem.icon }} />
    } else {
      let IconComponent = currentItem.icon
      iconComponent = <IconComponent width="24" />
    }
  }

  return (
    <div className="flex items-center text-main-secondary">

      { iconComponent && (
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-main mr-4 text-white">
          { iconComponent }
        </div>
      )}

      <h1 className="flex my-3 items-center overflow-hidden w-auto text-lg font-bold sm:text-xl">
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
      { pageTitle.after }
    </div>
  )
}

export default PageTitle
