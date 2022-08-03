import { useState } from 'react'
import ContentTypePage from "../components/ContentTypePage";
import Sidebar from '../components/Sidebar';
import BlockWithTitle from '../components/BlockWithTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import Item from '../components/Item';

const Post = () => {

  const [post, setPost] = useState('');

  return (
    <ContentTypePage type="Post" setData={setPost}>
      <div className="grow w-9/12">
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
