import { FunctionComponent } from 'react'
import DocumentItem from './DocumentItem';

const DocumentBlock: FunctionComponent = ({block}) => {

  return (
    <>
      { block.properties?.file && <DocumentItem file={block.properties?.file}/> }
    </>
  )
}

export default DocumentBlock
