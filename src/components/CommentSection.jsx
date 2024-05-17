import { CommentForm } from "../components/CommentForm.jsx"
import PropType from 'prop-types'
import './css/CommentSection.css'

export function CommentSection ({ comments }) { 
    
    return (
        <div className="comments-section">
            Comments Section
            <CommentForm></CommentForm>
            <div className="comments-list">
                {comments.map(comment => (
                <div key={comment._id} className="comment-wrapper">
                        <span>{comment.username ? '👤 ' + comment.username : '👤 Unknown'}</span>
                        <p>{comment.comment}</p>
                    </div>
                
                ))}
            </div>
        </div>
    )
}

CommentSection.propTypes = {
    comments: PropType.array
}