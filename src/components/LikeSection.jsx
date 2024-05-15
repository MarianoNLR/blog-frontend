import { LikeButton } from "./LikeButton.jsx"
import PropType from 'prop-types'

export function LikeSection ({ post, handleLike, handleUnlike }) {
    const userData = JSON.parse(localStorage.getItem('loggedBlogApp')) 
    return (
        <div className="likes-section">
        <div className="like-button-wrapper">
            {post.usersLike.includes(userData.id) ? 
                <LikeButton liked={true} handleLike={handleUnlike}></LikeButton>     
                : 
                <LikeButton liked={false} handleLike={handleLike}></LikeButton>       
            }
            
        </div>
        <span className="likes-number">{post.likes}</span>
    </div>
    )
}

LikeSection.propTypes = {
    post: PropType.object,
    usersLike: PropType.array,
    handleLike: PropType.func,
    handleUnlike: PropType.func
}