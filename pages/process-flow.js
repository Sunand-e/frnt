import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar.js';
import BlockWithTitle from '../components/BlockWithTitle.js';
import LoadingSpinner from '../components/LoadingSpinner.js';

const ProcessFlow = () => {

  const [processFlow, setProcessFlow] = useState('');

  return (
    <ContentTypePage type="ProcessFlow" setData={setProcessFlow}>
      <div className="flex-grow w-9/12">
        { !processFlow && <LoadingSpinner /> }
        { processFlow && <div className="mb-8" dangerouslySetInnerHTML={{__html: processFlow.content}} /> }
      </div>
      <Sidebar>
        <BlockWithTitle title="Downloads">
        { !processFlow && <LoadingSpinner className="transform scale-50"/> }
        </BlockWithTitle>
      </Sidebar>
    </ContentTypePage>
  )
}

export default ProcessFlow