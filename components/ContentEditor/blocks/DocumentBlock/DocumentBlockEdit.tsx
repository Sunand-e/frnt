import { FunctionComponent } from 'react'
import MediaLibrary from '../../../MediaLibrary/MediaLibrary'
import useBlockEditor from '../../useBlockEditor';
import DocumentItem from './DocumentItem';
// @styled-icons/bootstrap/FilePdf
// @styled-icons/simple-icons/Microsoftexcel
// @styled-icons/boxicons-solid/FileDoc

const DocumentBlockEdit: FunctionComponent = ({block}) => {
  const { updateBlock } = useBlockEditor()

  const file = block?.properties?.file;

  const selectFile = (file) => {
    console.log('file')
    console.log(file)
    updateBlock({
      ...block,
      properties: {
        ...block.properties,
        file
      }
    })
  }

  return (
    <>
    <p>{JSON.stringify(file,null,2)}</p>
    { file ? (
      <DocumentItem file={file}/>
    ) : (
      <MediaLibrary typeFilter={['document']} onItemSelect={selectFile} />
    )
    }
    </>
  )
}

export default DocumentBlockEdit
