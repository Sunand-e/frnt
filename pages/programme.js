import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar';
import BlockWithTitle from '../components/BlockWithTitle';
import LoadingSpinner from '../components/LoadingSpinner';

const Programme = () => {

  const [programme, setProgramme] = useState('');

  return (
    <ContentTypePage type="Programme" setData={setProgramme}>
        <div className="flex-grow w-9/12">
          { !programme && <LoadingSpinner /> }
          { programme && <div className="mb-8" dangerouslySetInnerHTML={{__html: programme.content}} /> }
        </div>
        <Sidebar>
          <BlockWithTitle title="Downloads">
          { !programme && <LoadingSpinner className="transform scale-50"/> }
          </BlockWithTitle>
        </Sidebar>
    </ContentTypePage>
  )
}

export default Programme