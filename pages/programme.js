import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar.js';
import BlockWithTitle from '../components/BlockWithTitle.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

export default function Programme() {

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
