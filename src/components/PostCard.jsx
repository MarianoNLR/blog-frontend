import PropTypes from 'prop-types'
import './css/PostCard.css'
import { useNavigate } from 'react-router-dom'
import { DeletePostButton } from './DeletePostButton'

export function PostCard ({ item }) {
    const navigate = useNavigate()
    const handleClick = (id) => {
        console.log(id)
        navigate(`/post/${id}`)
    }

    const truncateDescription = (p) => {
        if (p.length > 100) {
            return p.slice(0, 300) + '...'
        } else {
            return p
        }
    }

    //TODO: call api to delete actual post
    const handleDeletePost = (e) => {
        e.preventDefault()

    }

    return (
        <div className='post-card-wrapper' onClick={() => handleClick(item.id)}> 
            <span>Posted by {item.user.username}</span>
            <h3 className='post-card-title'>{item.title}</h3>
            <p className='post-card-description'>{truncateDescription(item.description)}</p>
            <DeletePostButton handleDelete={handleDeletePost}></DeletePostButton>
        </div>
    )
}

PostCard.propTypes = {
    item: PropTypes.object
}