import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar.js';
import BlockWithTitle from '../components/BlockWithTitle.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import Item from '../components/Item.js';

const Snapshot = () => {

  const [snapshot, setSnapshot] = useState('');

  return (
    <ContentTypePage type="Snapshot" setData={setSnapshot}>
      <div className="flex-grow w-9/12">
        { !snapshot && <LoadingSpinner /> }
        { snapshot && <div className="mb-8" dangerouslySetInnerHTML={{__html: snapshot.content}} /> }
      </div>
      <Sidebar>
        <BlockWithTitle title="More Snapshots">
        { !snapshot && <LoadingSpinner className="transform scale-50"/> }
        {/* { snapshot && relatedSnapshots.map((snapshot, idx) => (
          <Item key={idx} item={snapshot} options={{showType: false}} />
        ))} */}
        </BlockWithTitle>
      </Sidebar>
    </ContentTypePage>
  )
}

export default Snapshot