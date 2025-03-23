import { FC, SVGProps } from "react"
import { pageTitleVar, navStateVar } from "../../../graphql/cache";
import EasyEdit, {Types} from 'react-easy-edit';
import { useReactiveVar } from "@apollo/client";
import {Cancel} from '@styled-icons/material-rounded/Cancel'
import {Save} from '@styled-icons/material-rounded/Save'
import navStructureUser from "../../../navStructureUser";
import navStructureAdmin from "../../../navStructureAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useViewStore } from "../../../hooks/useViewStore";

const PageTitle : FC = () => {
  
  const navState = useReactiveVar(navStateVar)
  const pageTitle = useReactiveVar(pageTitleVar)

  const isAdminView = useViewStore(state => state.isAdminView)

  const navStructure = isAdminView ? navStructureAdmin : navStructureUser;
  const topLevelItem = navStructure?.find(topLevelItem => topLevelItem.name === navState?.topLevel)
  const secondaryLevelItem = topLevelItem?.subPages?.find(item => item.name === navState?.secondary)
  const currentItem = secondaryLevelItem ?? topLevelItem
  
  let iconComponent

  if(currentItem) {
    if(typeof currentItem.icon === 'string') {
      iconComponent = <FontAwesomeIcon className="text-xl" icon={{ prefix: 'fas', iconName: currentItem.icon }} />
    } else {
      let IconComponent = currentItem.icon
      let iconProps: SVGProps<SVGSVGElement> = { width: '24' }

      if(pageTitle.title === 'Groups') {
        iconProps = { className: 'p-1' }
      }
      iconComponent = <IconComponent {...iconProps} />
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
        {!pageTitle.editable && <span className="pr-2">{ pageTitle.header || pageTitle.title }</span>}
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
