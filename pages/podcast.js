import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar';
import BlockWithTitle from '../components/BlockWithTitle';
import LoadingSpinner from '../components/LoadingSpinner';

const Podcast = () => {

  const [podcast, setPodcast] = useState('');

  return (
    <ContentTypePage type="Podcast" setData={setPodcast}>
      <div className="flex-grow w-9/12">
        { !podcast && <LoadingSpinner /> }
        { podcast && <div className="mb-8" dangerouslySetInnerHTML={{__html: podcast.content}} /> }
      </div>
      <Sidebar>
        <BlockWithTitle title="Downloads">
        { !podcast && <LoadingSpinner className="transform scale-50"/> }
        </BlockWithTitle>
      </Sidebar>
    </ContentTypePage>
  )
}

export default Podcast