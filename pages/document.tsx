import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import LoadingSpinner from '../components/LoadingSpinner';
import DownloadLinks from '../components/DownloadLinks';
import Sidebar from '../components/Sidebar';
import BlockWithTitle from '../components/BlockWithTitle';


// import PdfViewer from '../components/PdfViewer';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(
  () => import('../components/PdfViewer'),
  { ssr: false }
);

const Document = () => {

  const [document, setDocument]:[any,Function] = useState('');
  
  return (
    <ContentTypePage type="Document" setData={setDocument}>
      <div className="flex-grow w-9/12">
        { !document && <LoadingSpinner /> }
        { document && <div className="mb-8" dangerouslySetInnerHTML={{__html: document.content}} /> }
        { document?.smLinkedDocuments && document.smLinkedDocuments.map((download, idx) => {          
          const docUrl = download.sm_doc_file_attachment || download.sm_doc_url;
          return <PdfViewer key={idx} url={docUrl}/>
        }
        ) }
      </div>
      <Sidebar>
        <BlockWithTitle title="Downloads">
        { !document && <LoadingSpinner className="transform scale-50"/> }
        { document && <DownloadLinks downloads={document.smLinkedDocuments} /> }
        </BlockWithTitle>
      </Sidebar>
    </ContentTypePage>
  ) 
}

export default Document