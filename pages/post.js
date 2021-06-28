import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar.js';
import BlockWithTitle from '../components/BlockWithTitle.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import Item from '../components/Item.js';

const Post = () => {

  const [post, setPost] = useState('');

  return (
    <ContentTypePage type="Post" setData={setPost}>
      <div className="flex-grow w-9/12">
        { !post && <LoadingSpinner /> }
        { post && <div className="mb-8" dangerouslySetInnerHTML={{__html: post.content}} /> }
      </div>
      <Sidebar>
        <BlockWithTitle title="More Posts">
        { !post && <LoadingSpinner className="transform scale-50"/> }
        {/* { post && relatedPosts.map((post, idx) => (
          <Item key={idx} item={post} options={{showType: false}} />
        ))} */}
        </BlockWithTitle>
      </Sidebar>
    </ContentTypePage>
  )
}

export default Post