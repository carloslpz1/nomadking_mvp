import PostCard from '../PostCard/PostCard'
import './PostsLayout.css'

// Data
import { postsData } from '../../../data/user/PostsData'

const PostsLayout = () => {
  return (
    <div className="posts">
      {postsData.map((post, id) => {
        return <PostCard key={id} data={post} />
      })}
    </div>
  )
}

export default PostsLayout