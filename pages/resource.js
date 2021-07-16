import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar';
import BlockWithTitle from '../components/BlockWithTitle';
import LoadingSpinner from '../components/LoadingSpinner';

const Resource = () => {

  const [resource, setResource] = useState('');

  return (
    // <ContentTypePage type="Resource" setData={setResource}>
    <>
      <div className="flex-grow w-9/12">
        { !resource && <LoadingSpinner /> }
        { resource && <div className="mb-8" dangerouslySetInnerHTML={{__html: resource.content}} /> }
      </div>
      <Sidebar>
        <BlockWithTitle title="Downloads">
        { !resource && <LoadingSpinner className="transform scale-50"/> }
        </BlockWithTitle>
      </Sidebar>
    </>
    // </ContentTypePage>
  )
}

export default Resource