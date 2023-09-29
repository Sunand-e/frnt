import { ScormPackage } from "../../../../graphql/generated";
import { closeModal, handleModal } from "../../../../stores/modalStore";
import PackageLibrary from "../../../packages/PackageLibrary";
import { useBlockStore } from "../useBlockStore";
import { Box } from "@styled-icons/boxicons-regular/Box";

export const ScormSettingsPanel = () => {

  const { blocks } = useBlockStore()
  const updateBlock = useBlockStore(state => state.updateBlock)

  const scormPackageBlock = blocks.find(
    block => block.type === 'package'
  )
  
  const handlePackageSelect = (scormPackage: ScormPackage) => {
    updateBlock({
      ...scormPackageBlock,
      properties: {
        ...scormPackageBlock?.properties,        
        url: scormPackage.launchUrl,
        moduleId: scormPackage.id,
        title: scormPackage.title
      }
    })
    // setValue('filename', _package.title)
    closeModal()
  }
  
  const handleInputClick = () => {
    handleModal({
      title: `Choose package`,
      content: <PackageLibrary onItemSelect={handlePackageSelect} />,
      size: 'lg'
    })
  }

  return (
    <div>
      <span className="text-sm font-medium text-secondary">SCORM zip file</span>
      <div className="flex items-star space-x-2">
        <Box className="w-8 text-main" />
      <div className="">
          <p className="text-sm font-medium text-main-secondary truncate">
            { scormPackageBlock?.properties?.title }
          </p>
          <p 
            className="text-sm text-main hover:font-bold cursor-pointer"
            onClick={handleInputClick}
          >Change package</p>
        </div>
      </div>
    </div>
  )
}